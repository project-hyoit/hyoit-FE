import assert from "node:assert/strict";
import test from "node:test";

const module = await import("./resolveHomeStatus.ts").catch(() => ({}));
const { resolveHomeStatus } = module;

const sentItem = (status) => ({ status });

test("prioritizes multiple unread check-ins over sent state", () => {
  assert.equal(typeof resolveHomeStatus, "function");

  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 2,
      latestSentItem: sentItem("WAITING_CONFIRM"),
    }),
    "multiple",
  );
});

test("returns received for exactly one unread check-in", () => {
  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 1,
      latestSentItem: sentItem("CONFIRMED"),
    }),
    "received",
  );
});

test("returns sent while the latest sent check-in is waiting", () => {
  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 0,
      latestSentItem: sentItem("WAITING_CONFIRM"),
    }),
    "sent",
  );
});

test("returns checked after the latest sent check-in is confirmed", () => {
  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 0,
      latestSentItem: sentItem("CONFIRMED"),
    }),
    "checked",
  );
});

test("returns empty without unread or sent check-ins", () => {
  assert.equal(
    resolveHomeStatus({
      pendingReceivedCount: 0,
      latestSentItem: null,
    }),
    "empty",
  );
});

test("empty copy does not claim there has never been a received check-in", async () => {
  const { HOME_STATUS_CONTENT } = await import("./constants/homeStatus.ts");

  assert.match(HOME_STATUS_CONTENT.empty.title, /새로 도착한/);
  assert.doesNotMatch(HOME_STATUS_CONTENT.empty.title, /아직 도착한/);
});


test("multiple label reflects the actual unread count", async () => {
  const { resolveHomeStatusLabel } = await import("./constants/homeStatus.ts");

  assert.equal(resolveHomeStatusLabel("multiple", 3), "새 안부 3개");
  assert.equal(resolveHomeStatusLabel("multiple", 4), "새 안부 4개");
});
