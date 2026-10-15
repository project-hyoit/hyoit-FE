import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse } from "@hyoit/types";

export async function checkSignupStatus(client = apiClient): Promise<boolean> {
  const response = await client.get<ApiResponse<boolean>>("/api/signup/status");
  const required = unwrapApiResponse(response.data);

  if (required === undefined) {
    throw new Error("회원가입 상태 응답 데이터가 없습니다.");
  }

  return required;
}
