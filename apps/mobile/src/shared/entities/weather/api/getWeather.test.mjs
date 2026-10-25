import assert from "node:assert/strict";
import test from "node:test";
import { getWeather } from "./getWeather.ts";

test("gets weather by Korean coordinates and optional date", async () => {
  const calls = [];
  const client = {
    async get(path, config) {
      calls.push({ path, config });
      return { data: { success: true, data: { temperature: 22, sky: "맑음" } } };
    },
  };

  const result = await getWeather({ lat: 37.5665, lon: 126.978, date: "2026-10-26" }, client);

  assert.equal(result.temperature, 22);
  assert.deepEqual(calls, [
    {
      path: "/api/weather",
      config: { params: { lat: 37.5665, lon: 126.978, date: "2026-10-26" } },
    },
  ]);
});
