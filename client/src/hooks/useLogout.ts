import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import post from "@/services/axios";

const url = process.env.NEXT_PUBLIC_API_URL + "/logout";

interface LogoutResponse {
  error?: string;
  message?: string;
}

const useLogout = () => {
  const { logout } = useAuthStore();

  return useMutation<LogoutResponse, Error>({
    mutationFn: async () => {
      // Realiza la solicitud al endpoint de logout
      const response = await post({ url });
      return response;
    },
    onSuccess: (data: LogoutResponse) => {
      console.log(data);  // Opcional: para depuración
      // Limpia el estado de autenticación en el cliente
      logout();
    },
    onError: (error: Error) => {
      console.error("Error during logout:", error.message);
    }
  });
};

export default useLogout;