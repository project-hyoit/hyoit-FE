import assert from "node:assert/strict";
import test from "node:test";

const stateModule = await import("./checkInState.ts").catch(() => ({}));
const { createCheckIn, sendCheckIn, confirmCheckIn } = stateModule;

const NOW = "2026-09-03T18:00:00.000Z";

const createItem = (overrides = {}) =>
  createCheckIn({
    senderRole: "parent",
    message: "잘 지내고 있어요",
    id: "id-1",
    createdAt: NOW,
    ...overrides,
  });

test("creates a pending check-in for the opposite role", () => {
  const item = createItem();

  assert.equal(item.senderRole, "parent");
  assert.equal(item.receiverRole, "child");
  assert.equal(item.message, "잘 지내고 있어요");
  assert.equal(item.checkedAt, undefined);
});

test("normalizes message text at the domain boundary", () => {
  const item = createItem({ message: "   밥 먹었어?   " });

  assert.equal(item.message, "밥 먹었어?");
});

test("rejects a blank message before creating a check-in", () => {
  const item = createItem({ message: "   " });

  assert.equal(item, null);
});

test("sends a check-in without mutating the previous conversation", () => {
  assert.equal(typeof sendCheckIn, "function");
  const previousItem = createItem({ id: "old" });
  const previousItems = [previousItem];

  const result = sendCheckIn({
    items: previousItems,
    senderRole: "child",
    message: "  잘 있어요  ",
    id: "new",
    createdAt: NOW,
  });

  assert.equal(previousItems.length, 1);
  assert.equal(result.sentItem.id, "new");
  assert.equal(result.sentItem.message, "잘 있어요");
  assert.equal(result.sentItem.receiverRole, "parent");
  assert.deepEqual(result.items.map((item) => item.id), ["new", "old"]);
});

test("does not change conversation when sending a blank message", () => {
  const previousItem = createItem({ id: "old" });
  const previousItems = [previousItem];

  const result = sendCheckIn({
    items: previousItems,
    senderRole: "child",
    message: "   ",
    id: "new",
    createdAt: NOW,
  });

  assert.equal(result.sentItem, null);
  assert.equal(result.items, previousItems);
});

test("confirms a check-in and returns the confirmed item", () => {
  assert.equal(typeof confirmCheckIn, "function");
  const item = createItem({ id: "id-4" });
  const items = [item];

  const result = confirmCheckIn({
    items,
    itemId: "id-4",
    viewerRole: "child",
    checkedAt: NOW,
  });

  assert.equal(result.confirmedItem.id, "id-4");
  assert.equal(result.confirmedItem.checkedAt, NOW);
  assert.notEqual(result.items, items);
  assert.equal(result.items[0].checkedAt, NOW);
});

test("returns a no-op confirmation result for an invalid viewer", () => {
  const item = createItem({ id: "id-5" });
  const items = [item];

  const result = confirmCheckIn({
    items,
    itemId: "id-5",
    viewerRole: "parent",
    checkedAt: NOW,
  });

  assert.equal(result.confirmedItem, null);
  assert.equal(result.items, items);
});

test("returns a no-op confirmation result for a missing item", () => {
  const item = createItem({ id: "id-6" });
  const items = [item];

  const result = confirmCheckIn({
    items,
    itemId: "missing",
    viewerRole: "child",
    checkedAt: NOW,
  });

  assert.equal(result.confirmedItem, null);
  assert.equal(result.items, items);
});

test("keeps an already confirmed check-in unchanged", () => {
  const checkedItem = {
    ...createItem({ id: "id-7" }),
    checkedAt: NOW,
  };
  const items = [checkedItem];

  const result = confirmCheckIn({
    items,
    itemId: "id-7",
    viewerRole: "child",
    checkedAt: "2026-09-03T19:00:00.000Z",
  });

  assert.equal(result.confirmedItem, null);
  assert.equal(result.items, items);
  assert.equal(result.items[0].checkedAt, NOW);
});
