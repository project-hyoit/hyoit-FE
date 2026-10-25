import type { WeatherResponse } from "@hyoit/types";

export function toWeatherCard(weather: WeatherResponse) {
  return {
    temperature: weather.temperatureText || `${weather.temperature}°C`,
    sky: weather.sky || weather.description,
    maxTemperature:
      weather.maxTemperatureText ??
      (weather.maxTemperature == null ? "-" : `${weather.maxTemperature}°C`),
    minTemperature:
      weather.minTemperatureText ??
      (weather.minTemperature == null ? "-" : `${weather.minTemperature}°C`),
    description: weather.description,
  };
}
