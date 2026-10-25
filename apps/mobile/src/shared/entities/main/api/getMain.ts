import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse, MainResponse } from "@hyoit/types";

export async function getMain(client = apiClient): Promise<MainResponse> {
  const response = await client.get<ApiResponse<MainResponse>>("/api/main");
  const main = unwrapApiResponse(response.data);

  if (!main) throw new Error("메인 화면 응답 데이터가 없습니다.");
  return main;
}
