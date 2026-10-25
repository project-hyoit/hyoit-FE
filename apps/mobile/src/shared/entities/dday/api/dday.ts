import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse, DdayRequest, DdayResponse } from "@hyoit/types";

export async function createDday(
  request: DdayRequest,
  client = apiClient,
): Promise<number> {
  const response = await client.post<ApiResponse<number>>("/api/ddays", request);
  const id = unwrapApiResponse(response.data);

  if (id === undefined) throw new Error("D-day 생성 응답 데이터가 없습니다.");
  return id;
}

export async function getDdayList(
  client = apiClient,
): Promise<DdayResponse[]> {
  const response = await client.get<ApiResponse<DdayResponse[]>>("/api/ddays");
  return unwrapApiResponse(response.data) ?? [];
}

export async function getUpcomingDdays(
  limit = 3,
  client = apiClient,
): Promise<DdayResponse[]> {
  const response = await client.get<ApiResponse<DdayResponse[]>>(
    "/api/ddays/upcoming",
    { params: { limit } },
  );
  return unwrapApiResponse(response.data) ?? [];
}

export async function getDday(
  ddayId: number,
  client = apiClient,
): Promise<DdayResponse> {
  const response = await client.get<ApiResponse<DdayResponse>>(
    `/api/ddays/${ddayId}`,
  );
  const dday = unwrapApiResponse(response.data);

  if (!dday) throw new Error("D-day 응답 데이터가 없습니다.");
  return dday;
}

export async function updateDday(
  ddayId: number,
  request: DdayRequest,
  client = apiClient,
): Promise<DdayResponse> {
  const response = await client.put<ApiResponse<DdayResponse>>(
    `/api/ddays/${ddayId}`,
    request,
  );
  const dday = unwrapApiResponse(response.data);

  if (!dday) throw new Error("D-day 응답 데이터가 없습니다.");
  return dday;
}

export async function deleteDday(
  ddayId: number,
  client = apiClient,
): Promise<null | undefined> {
  const response = await client.delete<ApiResponse<null>>(
    `/api/ddays/${ddayId}`,
  );
  return unwrapApiResponse(response.data);
}
