import { getKeyValueStorage } from "../storage";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function getToken() {
  const storage = getKeyValueStorage();
  const [accessToken, refreshToken] = await Promise.all([
    storage.getItem(ACCESS_TOKEN_KEY),
    storage.getItem(REFRESH_TOKEN_KEY),
  ]);

  return {
    accessToken,
    refreshToken,
  };
}
