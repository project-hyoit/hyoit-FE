import { createHttpClient } from "./http/createHttpClient.ts";

export const apiClient = createHttpClient({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  getAccessToken: async () =>
    (await import("@hyoit/storage")).getToken().then(({ accessToken }) => accessToken),
});
