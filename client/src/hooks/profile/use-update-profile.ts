import { useMutation } from "@tanstack/react-query";
import api from "@/services/api";

type UpdateProfilePayload = {
  name: string;
  lastName: string;
  email: string;
};

type UpdateProfileResponse = {
  message?: string;
  error?: string;
  user?: {
    id: number;
    name: string;
    lastName: string;
    email: string;
  };
};

const useUpdateProfile = () => {
  return useMutation<UpdateProfileResponse, Error, UpdateProfilePayload>({
    mutationFn: async (profileData) => {
      const response = await api.put<UpdateProfileResponse>(
        "/profile",
        profileData,
      );

      return response.data;
    },
  });
};

export default useUpdateProfile;
