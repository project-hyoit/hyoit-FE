import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type {
  ApiResponse,
  SignupRequest,
  SignupResult,
} from "@hyoit/types";

export async function completeSignup(
  request: SignupRequest,
  client = apiClient,
): Promise<SignupResult> {
  const response = await client.post<ApiResponse<SignupResult>>(
    "/api/signup",
    request,
  );
  const result = unwrapApiResponse(response.data);

  if (!result) {
    throw new Error("회원가입 응답 데이터가 없습니다.");
  }

  return result;
}
