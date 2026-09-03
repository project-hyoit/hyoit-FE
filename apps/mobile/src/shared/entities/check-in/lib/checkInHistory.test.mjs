import assert from "node:assert/strict";
import test from "node:test";

const historyModule = await import("./checkInHistory.ts").catch(() => ({}));
const { filterCheckInHistory, groupCheckInHistoryByDate } = historyModule;

const items = [
  { id: "1", direction: "RECEIVED", status: "NEW", createdAt: "2026-09-02T15:14:00" },
  { id: "2", direction: "SENT", status: "WAITING_CONFIRM", createdAt: "2026-09-02T14:10:00" },
  { id: "3", direction: "RECEIVED", status: "CHECKED", createdAt: "2026-09-01T18:20:00" },
  { id: "4", direction: "SENT", status: "CONFIRMED", createdAt: "2026-09-01T10:05:00" },
];

test("filters check-in history by direction", () => {
  assert.equal(typeof filterCheckInHistory, "function");
  assert.deepEqual(filterCheckInHistory(items, "RECEIVED").map((item) => item.id), ["1", "3"]);
  assert.deepEqual(filterCheckInHistory(items, "SENT").map((item) => item.id), ["2", "4"]);
});
test("completed history includes checked received and confirmed sent items", () => {
  assert.equal(typeof filterCheckInHistory, "function");
  assert.deepEqual(filterCheckInHistory(items, "COMPLETED").map((item) => item.id), ["3", "4"]);
});

test("groups history into today and past records in newest-first order", () => {
  assert.equal(typeof groupCheckInHistoryByDate, "function");

  const grouped = groupCheckInHistoryByDate(items, new Date("2026-09-02T20:00:00"));

  assert.deepEqual(grouped.today.map((item) => item.id), ["1", "2"]);
  assert.deepEqual(grouped.past.map((item) => item.id), ["3", "4"]);
});
