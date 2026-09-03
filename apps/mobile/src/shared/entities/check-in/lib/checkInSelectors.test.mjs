import assert from "node:assert/strict";
import test from "node:test";

const selectorModule = await import("./checkInSelectors.ts").catch(() => ({}));
const { getCheckInOverview, getLatestSentCheckIn } = selectorModule;

const receivedUnread = {
  id: "received-unread",
  senderRole: "child",
  receiverRole: "parent",
  message: "엄마 잘 지내?",
  type: "QUESTION",
  createdAt: "2026-09-03T09:00:00.000Z",
};

const sentLater = {
  id: "sent-later",
  senderRole: "parent",
  receiverRole: "child",
  message: "응 잘 지내",
  type: "QUESTION",
  createdAt: "2026-09-03T10:00:00.000Z",
};
test("prioritizes unread received check-ins over a later sent check-in", () => {
  assert.equal(typeof getCheckInOverview, "function");

  const overview = getCheckInOverview(
    [sentLater, receivedUnread],
    "parent",
  );

  assert.equal(overview.pendingCount, 1);
  assert.equal(overview.displayItem?.id, "received-unread");
  assert.equal(overview.displayItem?.status, "NEW");
});

test("falls back to the newest item when there is no unread received check-in", () => {
  const overview = getCheckInOverview([sentLater], "parent");

  assert.equal(overview.pendingCount, 0);
  assert.equal(overview.displayItem?.id, "sent-later");
  assert.equal(overview.displayItem?.status, "WAITING_CONFIRM");
});

test("returns the newest sent check-in regardless of input order", () => {
  assert.equal(typeof getLatestSentCheckIn, "function");

  const olderSent = {
    ...sentLater,
    id: "sent-older",
    createdAt: "2026-09-03T08:00:00.000Z",
    direction: "SENT",
    status: "WAITING_CONFIRM",
  };
  const newerSent = {
    ...sentLater,
    id: "sent-newer",
    createdAt: "2026-09-03T11:00:00.000Z",
    direction: "SENT",
    status: "CONFIRMED",
    checkedAt: "2026-09-03T11:05:00.000Z",
  };
  const received = {
    ...receivedUnread,
    direction: "RECEIVED",
    status: "NEW",
  };

  const latest = getLatestSentCheckIn([olderSent, received, newerSent]);

  assert.equal(latest?.id, "sent-newer");
});

test("returns null when the viewer has not sent a check-in", () => {
  const received = {
    ...receivedUnread,
    direction: "RECEIVED",
    status: "NEW",
  };

  assert.equal(getLatestSentCheckIn([received]), null);
});
