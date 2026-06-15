import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

type UpdateTransactionPayload = {
  id: number;
  type: "expense" | "income";
  name: string;
  amount: number;
  category: string;
  date: string;
  recurring: boolean;
};

interface TransactionResponse {
  data?: {
    updatedTransaction?: {
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

const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation<TransactionResponse, Error, UpdateTransactionPayload>({
    mutationFn: async ({ id, ...transactionData }) => {
      const response = await api.put<TransactionResponse>(
        `/transactions/${id}`,
        transactionData,
      );

      return response.data;
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
      console.error("Error updating transaction:", error.message);
    },
  });
};

export default useUpdateTransaction;
