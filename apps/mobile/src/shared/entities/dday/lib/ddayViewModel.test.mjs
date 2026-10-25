import assert from "node:assert/strict";
import test from "node:test";
import { toDdayItem } from "./ddayViewModel.ts";

test("maps a backend d-day response to the calendar item model", () => {
  assert.deepEqual(
    toDdayItem({
      id: 7,
      title: "병원 가는 날",
      targetDate: "2026-11-03",
      memo: "오전 예약",
      daysUntil: 8,
      ddayText: "D-8",
      past: false,
    }),
    {
      id: "7",
      title: "병원 가는 날",
      date: "2026-11-03",
      memo: "오전 예약",
    },
  );
});
