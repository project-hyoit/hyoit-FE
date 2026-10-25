import assert from "node:assert/strict";
import test from "node:test";
import { getMain } from "./getMain.ts";

test("gets the authenticated main screen aggregate", async () => {
  const calls = [];
  const client = {
    async get(path) {
      calls.push(path);
      return { data: { success: true, data: { user: { id: 1 }, familyMembers: [] } } };
    },
  };

  const result = await getMain(client);

  assert.deepEqual(result, { user: { id: 1 }, familyMembers: [] });
  assert.deepEqual(calls, ["/api/main"]);
});
