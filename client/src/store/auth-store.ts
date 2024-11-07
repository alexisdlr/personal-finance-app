// store/auth-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string; lastName: string; email: string } | null;
  login: (user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
  }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
  (set) => ({
    isAuthenticated: false,
    user: null,
    login: (user) =>
      set({
        isAuthenticated: true,
        user,
      }),
    logout: () =>
      set({
        isAuthenticated: false,
        user: null,
      }),
  }),
  {
    name: "auth-storage"
  }
));
