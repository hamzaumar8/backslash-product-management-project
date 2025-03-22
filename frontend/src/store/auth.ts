import { create } from "zustand";
import Cookies from "js-cookie";
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
    typeof window !== "undefined" && Cookies.get("user")
      ? JSON.parse(Cookies.get("user")!)
      : null,
  token:
    typeof window !== "undefined" && Cookies.get("token")
      ? Cookies.get("token")
      : null,

  // Set the token and update cookies
  setToken: (token) => {
    if (typeof window !== "undefined") {
      if (token) {
        Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
      } else {
        Cookies.remove("token");
      }
    }
    set({ token });
  },

  // Set the user and update cookies
  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) {
        Cookies.set("user", JSON.stringify(user), { expires: 7 }); // Expires in 7 days
      } else {
        Cookies.remove("user");
      }
    }
    set({ user });
  },

  // Remove user and token from state and cookies
  removeUser: () => {
    if (typeof window !== "undefined") {
      Cookies.remove("token");
      Cookies.remove("user");
    }
    set({ token: null, user: null });
  },
}));
