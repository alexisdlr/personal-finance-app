import { useAuthStore } from "@/store/auth-store";
import { isDemoUserId } from "@/lib/demo-user";

export function useIsDemoUser() {
  const user = useAuthStore((state) => state.user);
  const isDemoUser = isDemoUserId(user?.id);

  return {
    isDemoUser,
    isReadOnly: isDemoUser,
  };
}
