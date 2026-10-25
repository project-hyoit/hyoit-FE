import { create } from "zustand";

type Onboarding = {
  name: string;
  age: string;
  phone: string;
  invitationCode: string;
  connectedName: string;
  step: number;
  set: (p: Partial<Onboarding>) => void;
  reset: () => void;
};

export const useOnboardingStore = create<Onboarding>((set) => ({
  name: "",
  age: "",
  phone: "",
  invitationCode: "",
  connectedName: "",
  step: 0,
  set: (p) => set(p),
  reset: () =>
    set({
      name: "",
      age: "",
      phone: "",
      invitationCode: "",
      connectedName: "",
      step: 0,
    }),
}));
