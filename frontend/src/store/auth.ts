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
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,

  setToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token || "");
    }
    set(() => ({ token }));
  },

  setUser: (user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
    set(() => ({ user }));
  },

  removeUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    set(() => ({ token: null, user: null }));
  },
}));
