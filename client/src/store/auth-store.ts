// store/auth-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  user: { id: string; name: string; lastName: string; email: string } | null;
  login: (user: {
    id: string;
    name: string;
    lastName: string;
    email: string;
  }) => void;
  logout: () => void;
  setAuthLoaded: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAuthLoaded: false, // Nuevo estado de carga
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
      setAuthLoaded: () => set({ isAuthLoaded: true }), // Función para marcar que la autenticación ha cargado
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), // Excluir isAuthenticated e isAuthLoaded
    }
  )
);
