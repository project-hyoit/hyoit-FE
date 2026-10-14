import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse, Me } from "@hyoit/types";

export interface ProfileImageFile {
  uri: string;
  name?: string;
  type?: string;
}

export async function uploadProfileImage(
  image: ProfileImageFile,
  client = apiClient,
): Promise<Me> {
  const formData = new FormData();
  formData.append(
    "image",
    {
      uri: image.uri,
      name: image.name ?? "profile-image.jpg",
      type: image.type ?? "image/jpeg",
    } as unknown as Blob,
  );

  const response = await client.put<ApiResponse<Me>>(
    "/api/profile/image",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  const profile = unwrapApiResponse(response.data);

  if (!profile) {
    throw new Error("프로필 응답 데이터가 없습니다.");
  }

  return profile;
}
