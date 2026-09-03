import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  clearPersistedCheckIns,
  CHECK_IN_STORAGE_KEY,
  handleCheckInRehydrated,
  selectPersistedCheckInState,
} from "../lib/checkInPersistence";
import {
  confirmCheckIn as confirmCheckInState,
  sendCheckIn as sendCheckInState,
} from "../lib/checkInState";
import type { CheckInRawItem, CheckInViewerRole } from "./types";

type CheckInStore = {
  items: CheckInRawItem[];
  hasHydrated: boolean;
  sendCheckIn: (
    senderRole: CheckInViewerRole,
    message: string,
  ) => CheckInRawItem | null;
  confirmCheckIn: (itemId: string, viewerRole: CheckInViewerRole) => void;
  clearCheckIns: () => Promise<void>;
  setHydrated: (hydrated: boolean) => void;
};

const createCheckInId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useCheckInStore = create<CheckInStore>()(
  persist(
    (set, get) => ({
      items: [],
      hasHydrated: false,
      sendCheckIn: (senderRole, message) => {
        const result = sendCheckInState({
          items: get().items,
          senderRole,
          message,
          id: createCheckInId(),
          createdAt: new Date().toISOString(),
        });

        if (!result.sentItem) return null;

        set({ items: result.items });
        return result.sentItem;
      },
      confirmCheckIn: (itemId, viewerRole) => {
        const currentItems = get().items;
        const result = confirmCheckInState({
          items: currentItems,
          itemId,
          viewerRole,
          checkedAt: new Date().toISOString(),
        });

        if (!result.confirmedItem) return;
        set({ items: result.items });
      },
      clearCheckIns: () =>
        clearPersistedCheckIns({
          removeItem: AsyncStorage.removeItem,
          resetItems: () => set({ items: [] }),
        }),
      setHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: CHECK_IN_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => selectPersistedCheckInState(state),
      onRehydrateStorage: () => (state) => {
        handleCheckInRehydrated(state);
      },
    },
  ),
);
