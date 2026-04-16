import type { LoginWithKakaoResult } from "@hyoit/types";

export async function loginWithKakao(): Promise<LoginWithKakaoResult> {
  // TODO: 실제 카카오 로그인 API로 교체
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
  };
}
