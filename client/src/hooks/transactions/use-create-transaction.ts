import { useMutation, useQueryClient } from "@tanstack/react-query";
import post from "@/services/axios";

const url = process.env.NEXT_PUBLIC_API_URL + "/transactions";

type CreateTransactionPayload = {
  type: "expense" | "income";
  name: string;
  amount: number;
  category: string;
  date: string;
  recurring: boolean;
};

interface TransactionResponse {
  data?: {
    newTransaction?: {
      id: number;
      name: string;
      amount: number;
      category: string;
      date: string;
      recurring: boolean;
    };
  };
  error?: string;
  message?: string;
}

const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<TransactionResponse, Error, CreateTransactionPayload>({
    mutationFn: async (transactionData: CreateTransactionPayload) => {
      const response = await post({ url, data: transactionData });
      return response;
    },
    onSuccess: (data: TransactionResponse) => {
      const message = data.message || "";

      if (message.toLowerCase() === "success") {
        queryClient.invalidateQueries({
          queryKey: ["overviewData"],
        });
      } else if (data.error) {
        console.error("Transaction error:", data.error);
      }
    },
    onError: (error: Error) => {
      console.error("Error creating transaction:", error.message);
    },
  });
};

export default useCreateTransaction;
