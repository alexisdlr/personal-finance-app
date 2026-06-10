import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

type DeleteBudgetPayload = {
  id: string;
};

interface BudgetResponse {
  error?: string;
  message?: string;
}

const useDeleteBudget = () => {
  const queryClient = useQueryClient();

  return useMutation<BudgetResponse, Error, DeleteBudgetPayload>({
    mutationFn: async (budgetData) => {
      const response = await api.delete<BudgetResponse>(
        `/budgets/${budgetData.id}`,
      );

      return response.data;
    },

    onSuccess: (data) => {
      const message = data.message || "";
      if (
        message?.toLowerCase() === "Budget deleted successfully".toLowerCase()
      ) {
        queryClient.invalidateQueries({
          queryKey: ["overviewData"],
        });
      }

      if (data.error) {
        console.error(data.error);
      }
    },

    onError: (error) => {
      console.error("Error during deletion:", error.message);
    },
  });
};

export default useDeleteBudget;
