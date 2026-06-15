import { useMutation, useQueryClient } from "@tanstack/react-query";
import post from "@/services/axios";

const url = process.env.NEXT_PUBLIC_API_URL + "/pots";

type CreatePotPayload = {
  name: string;
  target: number;
  theme: string;
};

interface PotResponse {
  data?: {
    newPot?: {
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

const useCreatePot = () => {
  const queryClient = useQueryClient();

  return useMutation<PotResponse, Error, CreatePotPayload>({
    mutationFn: async (potData: CreatePotPayload) => {
      const response = await post({ url, data: potData });
      return response;
    },
    onSuccess: (data: PotResponse) => {
      const message = data.message || "";

      if (message.toLowerCase() === "success") {
        queryClient.invalidateQueries({
          queryKey: ["overviewData"],
        });
      } else if (data.error) {
        console.error("Pot error:", data.error);
      }
    },
    onError: (error: Error) => {
      console.error("Error creating pot:", error.message);
    },
  });
};

export default useCreatePot;
