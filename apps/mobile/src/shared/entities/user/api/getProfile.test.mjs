import assert from "node:assert/strict";
import test from "node:test";
import { getProfile } from "./getProfile.ts";

test("gets the authenticated user's backend profile", async () => {
  const calls = [];
  const client = {
    async get(path) {
      calls.push(path);
      return {
        data: {
          success: true,
          data: {
            id: 1,
            nickname: "효돌이",
            profileImageUrl: "/uploads/profile-images/1.png",
            age: 25,
            phoneNumber: "010-1234-5678",
            role: "USER",
            firstLogin: false,
          },
        },
      };
    },
  };

  const result = await getProfile(client);

  assert.equal(result.nickname, "효돌이");
  assert.equal(result.role, "USER");
  assert.deepEqual(calls, ["/api/profile"]);
});
