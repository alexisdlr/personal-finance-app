import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

type UpdatePotPayload = {
  id: number;
  name: string;
  target: number;
  theme: string;
};

interface PotResponse {
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

const useUpdatePot = () => {
  const queryClient = useQueryClient();

  return useMutation<PotResponse, Error, UpdatePotPayload>({
    mutationFn: async ({ id, ...potData }) => {
      const response = await api.put<PotResponse>(`/pots/${id}`, potData);
      return response.data;
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
      console.error("Error updating pot:", error.message);
    },
  });
};

export default useUpdatePot;
