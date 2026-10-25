import assert from "node:assert/strict";
import test from "node:test";
import {
  connectFamily,
  getFamilyMembers,
  getInvitationCode,
  previewFamilyConnection,
  removeFamilyMember,
} from "./family.ts";

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
    async delete(path) {
      calls.push({ method: "DELETE", path });
      return { data: response };
    },
  };
}

test("reads a USER invitation code", async () => {
  const client = createClient({ success: true, data: "123456" });

  assert.equal(await getInvitationCode(client), "123456");
  assert.deepEqual(client.calls, [
    { method: "GET", path: "/api/family/invitation-code", config: undefined },
  ]);
});

test("previews and connects a family invitation as an ADMIN", async () => {
  const client = createClient({ success: true, data: { userId: 2, nickname: "자녀" } });

  await previewFamilyConnection("123456", client);
  await connectFamily("123456", client);

  assert.deepEqual(client.calls, [
    {
      method: "GET",
      path: "/api/family/preview",
      config: { params: { invitationCode: "123456" } },
    },
    { method: "POST", path: "/api/family/connect", body: { invitationCode: "123456" } },
  ]);
});

test("lists and removes connected family members", async () => {
  const client = createClient({ success: true, data: [] });

  await getFamilyMembers(client);
  await removeFamilyMember(2, client);

  assert.deepEqual(client.calls, [
    { method: "GET", path: "/api/family/members", config: undefined },
    { method: "DELETE", path: "/api/family/members/2" },
  ]);
});
