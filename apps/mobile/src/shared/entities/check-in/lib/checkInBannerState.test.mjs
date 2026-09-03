import assert from "node:assert/strict";
import test from "node:test";

const bannerModule = await import("./checkInBannerState.ts").catch(() => ({}));
const { resolveCheckInBannerState } = bannerModule;

const receivedNew = {
  id: "1",
  senderRole: "child",
  receiverRole: "parent",
  message: "잘 지내?",
  type: "QUESTION",
  createdAt: "2026-09-03T09:00:00.000Z",
  direction: "RECEIVED",
  status: "NEW",
};

test("resolves empty banner state", () => {
  assert.equal(typeof resolveCheckInBannerState, "function");
  assert.deepEqual(resolveCheckInBannerState(null, 0), { type: "EMPTY" });
});
test("resolves multiple unread banner state", () => {
  const state = resolveCheckInBannerState(receivedNew, 2);

  assert.equal(state.type, "MULTIPLE_NEW");
  assert.equal(state.item.id, "1");
  assert.equal(state.count, 2);
});

test("resolves sent waiting state", () => {
  const sentWaiting = {
    ...receivedNew,
    direction: "SENT",
    status: "WAITING_CONFIRM",
  };

  const state = resolveCheckInBannerState(sentWaiting, 0);

  assert.equal(state.type, "SENT_WAITING");
  assert.equal(state.item.id, "1");
});
test("resolves single unread received state", () => {
  const state = resolveCheckInBannerState(receivedNew, 1);

  assert.equal(state.type, "NEW");
  assert.equal(state.item.id, "1");
});

test("resolves checked received state", () => {
  const checked = { ...receivedNew, status: "CHECKED", checkedAt: receivedNew.createdAt };
  const state = resolveCheckInBannerState(checked, 0);

  assert.equal(state.type, "CHECKED");
});

test("resolves sent confirmed state", () => {
  const confirmed = {
    ...receivedNew,
    direction: "SENT",
    status: "CONFIRMED",
    checkedAt: receivedNew.createdAt,
  };
  const state = resolveCheckInBannerState(confirmed, 0);

  assert.equal(state.type, "SENT_CONFIRMED");
});
test("rejects an unsupported direction and status combination", () => {
  const invalid = {
    ...receivedNew,
    direction: "RECEIVED",
    status: "CONFIRMED",
  };

  assert.throws(
    () => resolveCheckInBannerState(invalid, 0),
    /Unsupported check-in banner state/,
  );
});
