import { useQuery } from "@tanstack/react-query";
import type { WeatherQuery } from "@hyoit/types";
import { getWeather } from "../api/getWeather";

export const weatherQueryKey = ["weather"] as const;

export function useWeatherQuery(query: WeatherQuery) {
  return useQuery({
    queryKey: [...weatherQueryKey, query.lat, query.lon, query.date],
    queryFn: () => getWeather(query),
  });
}
