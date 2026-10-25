import assert from "node:assert/strict";
import test from "node:test";
import { deleteAccount, updateProfile } from "./profileMutations.ts";

test("partially updates the backend profile", async () => {
  const calls = [];
  const client = {
    async patch(path, body) {
      calls.push({ method: "PATCH", path, body });
      return { data: { success: true, data: { id: 1, nickname: "효돌", age: 66 } } };
    },
  };

  const result = await updateProfile({ nickname: "효돌", age: 66 }, client);

  assert.equal(result.nickname, "효돌");
  assert.deepEqual(calls, [
    { method: "PATCH", path: "/api/profile", body: { nickname: "효돌", age: 66 } },
  ]);
});

test("deletes the authenticated account before local cleanup", async () => {
  const calls = [];
  const client = {
    async delete(path) {
      calls.push({ method: "DELETE", path });
      return { data: { success: true, data: null } };
    },
  };

  await deleteAccount(client);

  assert.deepEqual(calls, [{ method: "DELETE", path: "/api/account" }]);
});
