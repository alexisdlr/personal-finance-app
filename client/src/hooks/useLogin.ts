import {
  useMutation,

} from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth-store";
import post from "@/services/axios";

const url = process.env.NEXT_PUBLIC_API_URL + "/login";

interface LoginData {
  password?: string;
  email?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  lastName: string;
}

interface LoginResponse {
  error?: string;
  message?: string,
  user: User;
}

const useLogin = () => {
  const {login} = useAuthStore()
  return useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (credentials: LoginData) => {
      const data = {
        email: credentials.email,
        password: credentials.password,
      };
      const response = await post({ url, data });
      
      return response;
    },
    onSuccess: (data: LoginResponse) => {
      login(data.user);
    },
  });
};

export default useLogin;
