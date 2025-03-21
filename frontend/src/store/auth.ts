import { create } from "zustand";
import { User } from "../../types";

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  removeUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  setToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token || "");
    }
    set(() => ({ token }));
  },

  setUser: (user) => {
    set(() => ({ user }));
  },

  removeUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set(() => ({ token: null, user: null }));
  },
}));
