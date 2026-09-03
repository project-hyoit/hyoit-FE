import assert from "node:assert/strict";
import test from "node:test";

const stateModule = await import("./checkInState.ts").catch(() => ({}));
const selectorModule = await import("./checkInSelectors.ts").catch(() => ({}));
const { sendCheckIn, confirmCheckIn } = stateModule;
const { getCheckInOverview } = selectorModule;

const SENT_AT = "2026-09-03T18:00:00.000Z";
const CHECKED_AT = "2026-09-03T18:05:00.000Z";

test("parent-to-child check-in lifecycle stays consistent for both viewers", () => {
  assert.equal(typeof sendCheckIn, "function");
  assert.equal(typeof confirmCheckIn, "function");

  const sent = sendCheckIn({
    items: [],
    senderRole: "parent",
    message: "밥 먹었어?",
    id: "conversation-1",
    createdAt: SENT_AT,
  });

  const childBeforeConfirm = getCheckInOverview(sent.items, "child");
  const parentBeforeConfirm = getCheckInOverview(sent.items, "parent");

  assert.equal(childBeforeConfirm.displayItem.status, "NEW");
  assert.equal(parentBeforeConfirm.displayItem.status, "WAITING_CONFIRM");
  const confirmed = confirmCheckIn({
    items: sent.items,
    itemId: "conversation-1",
    viewerRole: "child",
    checkedAt: CHECKED_AT,
  });

  const childAfterConfirm = getCheckInOverview(confirmed.items, "child");
  const parentAfterConfirm = getCheckInOverview(confirmed.items, "parent");

  assert.equal(confirmed.confirmedItem.checkedAt, CHECKED_AT);
  assert.equal(childAfterConfirm.displayItem.status, "CHECKED");
  assert.equal(parentAfterConfirm.displayItem.status, "CONFIRMED");
  assert.equal(childAfterConfirm.pendingCount, 0);
  assert.equal(parentAfterConfirm.pendingCount, 0);
});

test("child-to-parent check-in uses the same lifecycle rules", () => {
  const sent = sendCheckIn({
    items: [],
    senderRole: "child",
    message: "잘 지내고 있어요",
    id: "conversation-2",
    createdAt: SENT_AT,
  });

  assert.equal(getCheckInOverview(sent.items, "parent").displayItem.status, "NEW");
  const confirmed = confirmCheckIn({
    items: sent.items,
    itemId: "conversation-2",
    viewerRole: "parent",
    checkedAt: CHECKED_AT,
  });

  assert.equal(getCheckInOverview(confirmed.items, "parent").displayItem.status, "CHECKED");
  assert.equal(getCheckInOverview(confirmed.items, "child").displayItem.status, "CONFIRMED");
});
