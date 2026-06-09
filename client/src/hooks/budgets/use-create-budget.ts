import { useMutation, useQueryClient } from "@tanstack/react-query";
import post from "@/services/axios";

const url = process.env.NEXT_PUBLIC_API_URL + "/budgets";

type CreateBudgetPayload = {
  category: string;
  maximum: number;
  theme: string;
};

interface BudgetResponse {
  budget?: {
    id: string;
    amount: number;
    category: string;
    theme: string;
  };
  error?: string;
  message?: string;
}

const useCreateBudget = () => {
  return useMutation<BudgetResponse, Error, CreateBudgetPayload>({
    mutationFn: async (budgetData: CreateBudgetPayload) => {
      const response = await post({ url, data: budgetData });
      return response;
    },
    onSuccess: (data: BudgetResponse) => {
      if (data.budget) {
        useQueryClient().invalidateQueries({
          queryKey: ["budgets", "overview"],
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

export default useCreateBudget;
