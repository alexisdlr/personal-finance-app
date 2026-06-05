import { useRouter } from "next/navigation";
import useLogout from "./useLogout";
import { toast } from "react-hot-toast";

export default function useHandleLogout() {
  const router = useRouter();
  const { mutateAsync: logout } = useLogout();

  return async () => {
    try {
      const { error, message } = await logout();

      if (error) {
        toast.error(error);
        return;
      }

      toast.success(message || "Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
}
