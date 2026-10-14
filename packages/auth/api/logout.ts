import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse } from "@hyoit/types";

type ClearToken = () => Promise<void>;

export async function logout(
  client = apiClient,
  clear: ClearToken = async () =>
    (await import("@hyoit/storage")).clearToken(),
): Promise<void> {
  const response = await client.post<ApiResponse<null>>("/api/auth/logout");
  unwrapApiResponse(response.data);
  await clear();
}
