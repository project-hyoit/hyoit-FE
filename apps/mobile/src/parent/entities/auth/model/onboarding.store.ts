import { create } from "zustand";

type Onboarding = {
  name: string;
  age: string;
  phone: string;
  set: (p: Partial<Onboarding>) => void;
  reset: () => void;
};

export const useOnboardingStore = create<Onboarding>((set) => ({
  name: "",
  age: "",
  phone: "",
  set: (p) => set(p),
  reset: () => set({ name: "", age: "", phone: "" }),
}));
