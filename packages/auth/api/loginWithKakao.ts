import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse, LoginWithKakaoResult } from "@hyoit/types";

export async function loginWithKakao(
  kakaoAccessToken: string,
  client = apiClient,
): Promise<LoginWithKakaoResult> {
  const response = await client.post<ApiResponse<LoginWithKakaoResult>>(
    "/api/auth/kakao/login",
    { accessToken: kakaoAccessToken },
  );
  const result = unwrapApiResponse(response.data);

  if (!result) {
    throw new Error("로그인 응답 데이터가 없습니다.");
  }

  return result;
}
