import assert from "node:assert/strict";
import test from "node:test";
import { getGameRecords, saveGameRecord } from "./game.ts";

test("saves and lists game records", async () => {
  const calls = [];
  const client = {
    async post(path, body) {
      calls.push({ method: "POST", path, body });
      return { data: { success: true, data: 1 } };
    },
    async get(path) {
      calls.push({ method: "GET", path });
      return { data: { success: true, data: [] } };
    },
  };

  await saveGameRecord({ result: true, level: "EASY", live: 3 }, client);
  await getGameRecords(client);

  assert.deepEqual(calls, [
    { method: "POST", path: "/api/game/records", body: { result: true, level: "EASY", live: 3 } },
    { method: "GET", path: "/api/game/records/me" },
  ]);
});
