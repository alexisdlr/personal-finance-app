import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

interface AuthState {
  isAuthenticated: boolean;
  isAuthLoaded: boolean;
  user: { id: string; name: string; lastName: string; email: string } | null;
  login: (user: { id: string; name: string; lastName: string; email: string }) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAuthLoaded: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => {
        set({ isAuthenticated: false, user: null });
        document.cookie = "finance-app-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      },
      checkAuth: async () => {
        try {
          const res = await axios.get("http://localhost:8000/api/verify", { withCredentials: true }); // 👈 Asegúrate de usar la URL del backend
          set({ isAuthenticated: true, user: res.data.user });
        } catch (error) {
          set({ isAuthenticated: false, user: null });
        } finally {
          set({ isAuthLoaded: true });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
