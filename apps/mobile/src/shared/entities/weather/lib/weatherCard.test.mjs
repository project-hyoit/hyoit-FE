import assert from "node:assert/strict";
import test from "node:test";
import { toWeatherCard } from "./weatherCard.ts";

test("maps backend weather data to the home weather card", () => {
  assert.deepEqual(
    toWeatherCard({
      locationName: "서울",
      forecastDate: "2026-10-26",
      displayDate: "10월 26일",
      temperature: 22,
      temperatureText: "22°C",
      maxTemperature: 24,
      maxTemperatureText: "24°C",
      minTemperature: 19,
      minTemperatureText: "19°C",
      sky: "맑음",
      weatherIcon: "01d",
      precipProb: 0,
      precipType: "없음",
      description: "맑고 쾌청해요.",
    }),
    {
      temperature: "22°C",
      sky: "맑음",
      maxTemperature: "24°C",
      minTemperature: "19°C",
      description: "맑고 쾌청해요.",
    },
  );
});
