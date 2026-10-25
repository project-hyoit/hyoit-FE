import { apiClient, unwrapApiResponse } from "@hyoit/api";
import type { ApiResponse, WeatherQuery, WeatherResponse } from "@hyoit/types";

export async function getWeather(
  query: WeatherQuery,
  client = apiClient,
): Promise<WeatherResponse> {
  const response = await client.get<ApiResponse<WeatherResponse>>(
    "/api/weather",
    { params: query },
  );
  const weather = unwrapApiResponse(response.data);

  if (!weather) throw new Error("날씨 응답 데이터가 없습니다.");
  return weather;
}
