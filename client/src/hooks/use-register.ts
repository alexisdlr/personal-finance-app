import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import post from "@/services/axios";

const url = process.env.NEXT_PUBLIC_API_URL + "/sign-up";

interface RegisterData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  user?: {
    id: string;
    name: string;
    lastName: string;
    email: string;
  };
  error?: string;
  message?: string;
}

const useRegister = () => {
  const { login } = useAuthStore();

  return useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: async (newUser: RegisterData) => {
      // Realiza la solicitud al endpoint de registro
      const response = await post({ url, data: newUser });
      return response;
    },
    onSuccess: (data: RegisterResponse) => {
      if (data.user) {
        // Si el registro es exitoso, actualiza el estado de autenticación
        login(data.user);
      } else if (data.error) {
        console.error("Registration error:", data.error);
      }
    },
    onError: (error: Error) => {
      console.error("Error during registration:", error.message);
    }
  });
};

export default useRegister;
