import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

type UpdateBudgetPayload = {
  id: string;
  category: string;
  maximum: number;
  theme: string;
};

interface BudgetResponse {
  updatedBudget?: {
    id: string;
    amount: number;
    category: string;
    theme: string;
  };
  error?: string;
  message?: string;
}

const useUpdateBudget = () => {
  const queryClient = useQueryClient();

  return useMutation<BudgetResponse, Error, UpdateBudgetPayload>({
    mutationFn: async ({ id, ...budgetData }) => {
      const response = await api.put<BudgetResponse>(
        `/budgets/${id}`,
        budgetData,
      );

      return response.data;
    },
    onSuccess: (data: BudgetResponse) => {
      const message = data.message || "";

      if (message.toLowerCase() === "success") {
        queryClient.invalidateQueries({
          queryKey: ["overviewData"],
        });
      } else if (data.error) {
        console.error("Registration error:", data.error);
      }
    },
    onError: (error: Error) => {
      console.error("Error during registration:", error.message);
    },
  });
};

export default useUpdateBudget;
