import { getKeyValueStorage } from "../storage";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function saveToken(params: {
  accessToken: string;
  refreshToken: string;
}) {
  const storage = getKeyValueStorage();
  await Promise.all([
    storage.setItem(ACCESS_TOKEN_KEY, params.accessToken),
    storage.setItem(REFRESH_TOKEN_KEY, params.refreshToken),
  ]);
}
