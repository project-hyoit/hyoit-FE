export interface WeatherQuery {
  lat: number;
  lon: number;
  date?: string;
}

export interface WeatherResponse {
  locationName: string;
  forecastDate: string;
  displayDate: string;
  temperature: number;
  temperatureText: string;
  maxTemperature?: number | null;
  maxTemperatureText?: string | null;
  minTemperature?: number | null;
  minTemperatureText?: string | null;
  sky: string;
  weatherIcon: string;
  precipProb: number;
  precipType: string;
  humidity?: number | null;
  humidityText?: string | null;
  windSpeed?: number | null;
  windSpeedText?: string | null;
  dustGrade?: string | null;
  description: string;
}
