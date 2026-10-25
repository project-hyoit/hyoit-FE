import assert from "node:assert/strict";
import test from "node:test";
import {
  checkAnbu,
  getAnbuHistory,
  getCurrentAnbus,
  getNotificationHistory,
  getNotificationSettings,
  getNotificationSummary,
  sendAnbu,
  updateNotificationSettings,
} from "./notification.ts";

function createClient(response) {
  const calls = [];
  return {
    calls,
    async get(path, config) {
      calls.push({ method: "GET", path, config });
      return { data: response };
    },
    async post(path, body) {
      calls.push({ method: "POST", path, body });
      return { data: response };
    },
    async patch(path, body) {
      calls.push({ method: "PATCH", path, body });
      return { data: response };
    },
  };
}

test("reads and partially updates notification settings", async () => {
  const client = createClient({ success: true, data: { anbuReceived: true, anbuReply: true, dday: false } });

  await getNotificationSettings(client);
  await updateNotificationSettings({ dday: false }, client);

  assert.deepEqual(client.calls, [
    { method: "GET", path: "/api/notification-settings", config: undefined },
    { method: "PATCH", path: "/api/notification-settings", body: { dday: false } },
  ]);
});

test("supports anbu send, history, current, and check flows", async () => {
  const client = createClient({ success: true, data: [] });

  await sendAnbu({ partnerId: 2, content: "잘 지내?" }, client);
  await getNotificationHistory({ partnerId: 2 }, client);
  await getAnbuHistory({ partnerId: 2, filter: "UNCHECKED" }, client);
  await getCurrentAnbus(client);
  await checkAnbu(10, client);
  await getNotificationSummary(client);

  assert.deepEqual(client.calls, [
    { method: "POST", path: "/api/notifications/anbu", body: { partnerId: 2, content: "잘 지내?" } },
    { method: "GET", path: "/api/notifications", config: { params: { partnerId: 2 } } },
    { method: "GET", path: "/api/notifications/anbu", config: { params: { partnerId: 2, filter: "UNCHECKED" } } },
    { method: "GET", path: "/api/notifications/anbu/current", config: undefined },
    { method: "PATCH", path: "/api/notifications/anbu/10/check", body: undefined },
    { method: "GET", path: "/api/notifications/summary", config: undefined },
  ]);
});
