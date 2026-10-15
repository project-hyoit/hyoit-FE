import assert from "node:assert/strict";
import test from "node:test";
import { logout } from "./logout.ts";

test("notifies the backend before clearing the local session", async () => {
  const calls = [];
  let cleared = false;
  const client = {
    async post(path) {
      calls.push(path);
      return { data: { success: true, data: null } };
    },
  };

  await logout(client, async () => {
    cleared = true;
  });

  assert.deepEqual(calls, ["/api/auth/logout"]);
  assert.equal(cleared, true);
});
