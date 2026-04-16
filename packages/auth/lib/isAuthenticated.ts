import { getToken } from "@hyoit/storage";

export async function isAuthenticated() {
  const { accessToken, refreshToken } = await getToken();

  return Boolean(accessToken && refreshToken);
}
