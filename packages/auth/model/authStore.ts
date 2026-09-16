import type { UserRole } from "@hyoit/types";
import { getKeyValueStorage } from "@hyoit/storage";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";

interface AuthState {
  isSignedIn: boolean;
  role: UserRole | null;
  hasParentOnboarded: boolean;
  hasChildOnboarded: boolean;
  hasHydrated: boolean;

  setSignedIn: (value: boolean) => void;
  setRole: (role: UserRole | null) => void;
  setParentOnboarded: (value: boolean) => void;
  setChildOnboarded: (value: boolean) => void;
  setHydrated: (value: boolean) => void;
  resetAuth: () => void;
}

const authStorage: StateStorage = {
  async getItem(name) {
    return getKeyValueStorage().getItem(name);
  },
  async setItem(name, value) {
    await getKeyValueStorage().setItem(name, value);
  },
  async removeItem(name) {
    await getKeyValueStorage().removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isSignedIn: false,
      role: null,
      hasParentOnboarded: false,
      hasChildOnboarded: false,
      hasHydrated: false,

      setSignedIn: (value) => set({ isSignedIn: value }),
      setRole: (role) => set({ role }),
      setParentOnboarded: (value) => set({ hasParentOnboarded: value }),
      setChildOnboarded: (value) => set({ hasChildOnboarded: value }),
      setHydrated: (value) => set({ hasHydrated: value }),

      resetAuth: () =>
        set({
          isSignedIn: false,
          role: null,
          hasParentOnboarded: false,
          hasChildOnboarded: false,
        }),
    }),
    {
      name: "hyoit-auth-state",
      storage: createJSONStorage(() => authStorage),
      skipHydration: true,
      partialize: ({ role, hasParentOnboarded, hasChildOnboarded }) => ({
        role,
        hasParentOnboarded,
        hasChildOnboarded,
      }),
    },
  ),
);
