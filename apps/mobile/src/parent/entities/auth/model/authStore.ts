import { create } from "zustand";

type AuthState = {
  isSignedIn: boolean;
  hasOnboarded: boolean;
  setSignedIn: (v: boolean) => void;
  setOnboarded: (v: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isSignedIn: false,
  hasOnboarded: false,
  setSignedIn: (v) => set({ isSignedIn: v }),
  setOnboarded: (v) => set({ hasOnboarded: v }),
  reset: () => set({ isSignedIn: false, hasOnboarded: false }),
}));
