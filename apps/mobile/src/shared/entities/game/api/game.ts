import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse, GameRecord, GameRecordRequest } from "@hyoit/types";

export async function saveGameRecord(
  request: GameRecordRequest,
  client = apiClient,
): Promise<number> {
  const response = await client.post<ApiResponse<number>>(
    "/api/game/records",
    request,
  );
  const id = unwrapApiResponse(response.data);

  if (id === undefined) throw new Error("게임 기록 응답 데이터가 없습니다.");
  return id;
}

export async function getGameRecords(
  client = apiClient,
): Promise<GameRecord[]> {
  const response = await client.get<ApiResponse<GameRecord[]>>(
    "/api/game/records/me",
  );
  return unwrapApiResponse(response.data) ?? [];
}
