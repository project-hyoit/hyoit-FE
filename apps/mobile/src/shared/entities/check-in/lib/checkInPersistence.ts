import type { CheckInRawItem } from "../model/types";

export const CHECK_IN_STORAGE_KEY = "hyoit-check-ins-v1";

type PersistableCheckInState = {
  items: CheckInRawItem[];
};

type HydratableCheckInState = {
  setHydrated: (hydrated: boolean) => void;
};

export const selectPersistedCheckInState = (
  state: PersistableCheckInState,
) => ({ items: state.items });

export const handleCheckInRehydrated = (
  state?: HydratableCheckInState,
) => {
  state?.setHydrated(true);
};

type ClearPersistedCheckInsParams = {
  removeItem: (key: string) => Promise<void>;
  resetItems: () => void;
};

export const clearPersistedCheckIns = async ({
  removeItem,
  resetItems,
}: ClearPersistedCheckInsParams) => {
  try {
    await removeItem(CHECK_IN_STORAGE_KEY);
  } catch {
    // Storage cleanup is best-effort; in-memory auth flow must still continue.
  } finally {
    resetItems();
  }
};
