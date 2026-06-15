import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

type ChangePasswordResponse = {
  message?: string;
  error?: string;
};

const useChangePassword = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationFn: async (passwordData) => {
      const response = await api.put<ChangePasswordResponse>(
        "/profile/password",
        passwordData,
      );

      return response.data;
    },
  });
};

export default useChangePassword;
