import { create } from "zustand";

type ErrorState = {
  errors: Record<string, string[]>;
  setErrors: (errors: Record<string, string[]>) => void;
  clearErrors: () => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  errors: {},
  setErrors: (errors) => set({ errors }),
  clearErrors: () => set({ errors: {} }),
}));
