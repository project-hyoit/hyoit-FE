import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse, Me } from "@hyoit/types";

export async function getProfile(client = apiClient): Promise<Me> {
  const response = await client.get<ApiResponse<Me>>("/api/profile");
  const profile = unwrapApiResponse(response.data);

  if (!profile) {
    throw new Error("프로필 응답 데이터가 없습니다.");
  }

  return profile;
}
