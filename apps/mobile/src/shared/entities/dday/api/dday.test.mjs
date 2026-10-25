import assert from "node:assert/strict";
import test from "node:test";
import {
  createDday,
  deleteDday,
  getDday,
  getDdayList,
  getUpcomingDdays,
  updateDday,
} from "./dday.ts";

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
    async put(path, body) {
      calls.push({ method: "PUT", path, body });
      return { data: response };
    },
    async delete(path) {
      calls.push({ method: "DELETE", path });
      return { data: response };
    },
  };
}

test("supports D-day CRUD and upcoming queries", async () => {
  const client = createClient({ success: true, data: { id: 1, title: "병원" } });
  const request = { title: "병원", targetDate: "2026-11-01", memo: "오전" };

  await createDday(request, client);
  await getDdayList(client);
  await getUpcomingDdays(3, client);
  await getDday(1, client);
  await updateDday(1, request, client);
  await deleteDday(1, client);

  assert.deepEqual(client.calls, [
    { method: "POST", path: "/api/ddays", body: request },
    { method: "GET", path: "/api/ddays", config: undefined },
    { method: "GET", path: "/api/ddays/upcoming", config: { params: { limit: 3 } } },
    { method: "GET", path: "/api/ddays/1", config: undefined },
    { method: "PUT", path: "/api/ddays/1", body: request },
    { method: "DELETE", path: "/api/ddays/1" },
  ]);
});
