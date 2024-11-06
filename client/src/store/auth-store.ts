// store/authStore.ts

import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  token: string | null;
  login: (user: { id: string; name: string }, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  login: (user, token) =>
    set({
      isAuthenticated: true,
      user,
      token,
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
      token: null,
    }),
}));
