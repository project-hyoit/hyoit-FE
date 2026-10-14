import { getKeyValueStorage } from "../storage.ts";

const ACCESS_TOKEN_KEY = "accessToken";

export async function getToken() {
  const storage = getKeyValueStorage();
  const accessToken = await storage.getItem(ACCESS_TOKEN_KEY);

  return {
    accessToken,
  };
}
