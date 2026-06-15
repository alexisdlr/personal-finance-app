import { useMutation, useQueryClient } from "@tanstack/react-query";
import post from "@/services/axios";

type PotMoneyPayload = {
  id: number;
  amount: number;
};

interface PotMoneyResponse {
  data?: {
    updatedPot?: {
      id: number;
      name: string;
      target: number;
      total: number;
      theme: string;
    };
  };
  error?: string;
  message?: string;
}

const useWithdrawPotMoney = () => {
  const queryClient = useQueryClient();

  return useMutation<PotMoneyResponse, Error, PotMoneyPayload>({
    mutationFn: async ({ id, amount }) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/pots/${id}/withdraw`;
      const response = await post({ url, data: { amount } });
      return response;
    },
    onSuccess: (data: PotMoneyResponse) => {
      if (data.message?.toLowerCase() === "success") {
        queryClient.invalidateQueries({
          queryKey: ["overviewData"],
        });
      } else if (data.error) {
        console.error("Pot money error:", data.error);
      }
    },
    onError: (error: Error) => {
      console.error("Error withdrawing from pot:", error.message);
    },
  });
};

export default useWithdrawPotMoney;
