import assert from "node:assert/strict";
import test from "node:test";
import { toCheckInItem } from "./notificationViewModel.ts";

test("maps a received backend anbu notification to the check-in UI model", () => {
  assert.deepEqual(
    toCheckInItem({
      id: 10,
      content: "밥 먹었어?",
      sender: { id: 2, nickname: "자녀", role: "USER" },
      receiver: { id: 1, nickname: "부모", role: "ADMIN" },
      sentByMe: false,
      checked: false,
      direction: "RECEIVED",
      status: "새 안부",
      referenceType: "ANBU",
      referenceId: null,
      createdAt: "2026-10-26T09:00:00",
      checkedAt: null,
    }),
    {
      id: "10",
      senderRole: "child",
      receiverRole: "parent",
      message: "밥 먹었어?",
      type: "QUESTION",
      createdAt: "2026-10-26T09:00:00",
      direction: "RECEIVED",
      status: "NEW",
    },
  );
});

test("maps a checked sent backend anbu notification to confirmed status", () => {
  const item = toCheckInItem({
    id: 11,
    content: "잘 지내고 있어요",
    sender: { id: 1, nickname: "부모", role: "ADMIN" },
    receiver: { id: 2, nickname: "자녀", role: "USER" },
    sentByMe: true,
    checked: true,
    direction: "SENT",
    status: "자녀 확인함",
    referenceType: "ANBU",
    referenceId: null,
    createdAt: "2026-10-26T10:00:00",
    checkedAt: "2026-10-26T10:05:00",
  });

  assert.equal(item.id, "11");
  assert.equal(item.senderRole, "parent");
  assert.equal(item.receiverRole, "child");
  assert.equal(item.status, "CONFIRMED");
  assert.equal(item.checkedAt, "2026-10-26T10:05:00");
});
