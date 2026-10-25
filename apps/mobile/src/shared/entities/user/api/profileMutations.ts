import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse, Me } from "@hyoit/types";

export interface UpdateProfileRequest {
  nickname?: string;
  age?: number;
}

export async function updateProfile(
  request: UpdateProfileRequest,
  client = apiClient,
): Promise<Me> {
  const response = await client.patch<ApiResponse<Me>>("/api/profile", request);
  const profile = unwrapApiResponse(response.data);

  if (!profile) {
    throw new Error("프로필 응답 데이터가 없습니다.");
  }

  return profile;
}

export async function deleteAccount(client = apiClient): Promise<void> {
  unwrapApiResponse(
    (await client.delete<ApiResponse<null>>("/api/account")).data,
  );
}
