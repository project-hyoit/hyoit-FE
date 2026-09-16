import { create } from "zustand";

type Onboarding = {
  name: string;
  age: string;
  phone: string;
  step: number;
  set: (p: Partial<Onboarding>) => void;
  reset: () => void;
};

export const useOnboardingStore = create<Onboarding>((set) => ({
  name: "",
  age: "",
  phone: "",
  step: 0,
  set: (p) => set(p),
  reset: () => set({ name: "", age: "", phone: "" }),
}));
