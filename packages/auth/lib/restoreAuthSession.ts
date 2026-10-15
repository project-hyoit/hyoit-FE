import { clearToken, getToken, hasAccessToken } from "@hyoit/storage";
import { useAuthStore } from "../model/authStore";

export async function restoreAuthSession() {
  await useAuthStore.persist.rehydrate();

  try {
    const { accessToken } = await getToken();
    const store = useAuthStore.getState();

    if (hasAccessToken(accessToken)) {
      store.setSignedIn(true);
    } else {
      await clearToken();
      store.resetAuth();
    }
  } catch {
    useAuthStore.getState().resetAuth();
  } finally {
    useAuthStore.getState().setHydrated(true);
  }
}
