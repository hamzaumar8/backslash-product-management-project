import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  removeUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  setToken: (token) => {
    localStorage.setItem("token", token || "");
    set({ token });
  },
  removeUser: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
