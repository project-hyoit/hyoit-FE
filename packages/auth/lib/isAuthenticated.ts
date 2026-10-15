import { getToken, hasAccessToken } from "@hyoit/storage";

export async function isAuthenticated() {
  const { accessToken } = await getToken();

  return hasAccessToken(accessToken);
}
