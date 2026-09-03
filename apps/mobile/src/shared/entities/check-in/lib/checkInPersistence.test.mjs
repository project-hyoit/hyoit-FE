import assert from "node:assert/strict";
import test from "node:test";

const persistenceModule = await import("./checkInPersistence.ts").catch(() => ({}));
const {
  CHECK_IN_STORAGE_KEY,
  selectPersistedCheckInState,
  handleCheckInRehydrated,
  clearPersistedCheckIns,
} = persistenceModule;

const item = {
  id: "1",
  senderRole: "parent",
  receiverRole: "child",
  message: "잘 지내?",
  type: "QUESTION",
  createdAt: "2026-09-04T00:00:00.000Z",
};

test("persists only check-in items", () => {
  assert.equal(typeof selectPersistedCheckInState, "function");

  assert.deepEqual(
    selectPersistedCheckInState({ items: [item], hasHydrated: true }),
    { items: [item] },
  );
});

test("marks the store hydrated after rehydration", () => {
  let hydrated = false;

  handleCheckInRehydrated({
    setHydrated: (value) => {
      hydrated = value;
    },
  });

  assert.equal(hydrated, true);
});

test("clears in-memory check-ins even when storage removal fails", async () => {
  let resetCalled = false;

  await assert.doesNotReject(() =>
    clearPersistedCheckIns({
      removeItem: async (key) => {
        assert.equal(key, CHECK_IN_STORAGE_KEY);
        throw new Error("storage unavailable");
      },
      resetItems: () => {
        resetCalled = true;
      },
    }),
  );

  assert.equal(resetCalled, true);
});
