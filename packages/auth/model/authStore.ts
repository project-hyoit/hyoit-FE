import { create } from "zustand";
import type { UserRole } from "@hyoit/types";

interface AuthState {
  isSignedIn: boolean;
  role: UserRole | null;
  hasOnboarded: boolean;
  setSignedIn: (value: boolean) => void;
  setRole: (role: UserRole | null) => void;
  setOnboarded: (value: boolean) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  role: null,
  hasOnboarded: false,
  setSignedIn: (value) => set({ isSignedIn: value }),
  setRole: (role) => set({ role }),
  setOnboarded: (value) => set({ hasOnboarded: value }),
  resetAuth: () =>
    set({
      isSignedIn: false,
      role: null,
      hasOnboarded: false,
    }),
}));
