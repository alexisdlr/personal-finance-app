import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import post from "@/services/axios";

const url = process.env.NEXT_PUBLIC_API_URL + "/login";

interface User {
  id: string;
  name: string;
  email: string;
  lastName: string;
}

interface LoginResponse {
  error?: string;
  message?: string;
  user: User;
}

const useDemoLogin = () => {
  const { login } = useAuthStore();

  return useMutation<LoginResponse, Error>({
    mutationFn: async () => {
      const response = await post({
        url,
        data: {
          email: process.env.NEXT_PUBLIC_DEMO_EMAIL,
          password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
        },
      });

      return response;
    },
    onSuccess: (data) => {
      login(data.user);
    },
  });
};

export default useDemoLogin;
