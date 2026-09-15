import assert from "node:assert/strict";
import test from "node:test";
import { createCalendarDays, getDateKey, getDday, toCalendarRows, toDate } from "./date.ts";

test("date keys and parsing use local calendar dates", () => {
  const date = toDate("2026-09-15");
  assert.equal(date.getFullYear(), 2026);
  assert.equal(date.getMonth(), 8);
  assert.equal(date.getDate(), 15);
  assert.equal(getDateKey(date), "2026-09-15");
});

test("D-day labels use the calendar-day difference", () => {
  const today = new Date(2026, 8, 15);
  assert.equal(getDday("2026-09-15", today), "D-Day");
  assert.equal(getDday("2026-09-16", today), "D-1");
  assert.equal(getDday("2026-09-12", today), "D+3");
});

test("calendar creates six Sunday-first weeks with stable date keys", () => {
  const days = createCalendarDays(new Date(2026, 8, 1));
  assert.equal(days.length, 42);
  assert.equal(days[0].key, "2026-08-30");
  assert.equal(days[1].key, "2026-08-31");
  assert.equal(days[2].key, "2026-09-01");
  assert.equal(days[2].isCurrentMonth, true);
  assert.equal(days[0].isCurrentMonth, false);
});

test("calendar rows group days into weeks", () => {
  const days = createCalendarDays(new Date(2026, 8, 1));
  const rows = toCalendarRows(days);
  assert.equal(rows.length, 6);
  assert.ok(rows.every((row) => row.length === 7));
});
