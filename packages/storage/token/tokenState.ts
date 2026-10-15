export function hasAccessToken(
  accessToken: string | null | undefined,
): accessToken is string {
  return Boolean(accessToken?.trim());
}
