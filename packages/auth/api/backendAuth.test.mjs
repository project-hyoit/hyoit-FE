import assert from "node:assert/strict";
import test from "node:test";
import { checkSignupStatus } from "./checkSignupStatus.ts";
import { completeSignup } from "./completeSignup.ts";
import { loginWithKakao } from "./loginWithKakao.ts";

function createClient(response) {
  const calls = [];

  return {
    calls,
    async get(path) {
      calls.push({ method: "GET", path });
      return { data: response };
    },
    async post(path, body) {
      calls.push({ method: "POST", path, body });
      return { data: response };
    },
  };
}

test("logs in with a Kakao access token and unwraps the backend result", async () => {
  const client = createClient({
    success: true,
    data: {
      accessToken: "service-access-token",
      firstLogin: true,
    },
  });

  const result = await loginWithKakao("kakao-access-token", client);

  assert.deepEqual(result, {
    accessToken: "service-access-token",
    firstLogin: true,
  });
  assert.deepEqual(client.calls, [
    {
      method: "POST",
      path: "/api/auth/kakao/login",
      body: { accessToken: "kakao-access-token" },
    },
  ]);
});

test("rejects login without a Kakao access token", async () => {
  await assert.rejects(
    () => loginWithKakao(undefined, createClient({ success: true })),
    /카카오 access token provider가 설정되지 않았습니다\./,
  );
});

test("reads whether additional signup information is required", async () => {
  const client = createClient({ success: true, data: true });

  const result = await checkSignupStatus(client);

  assert.equal(result, true);
  assert.deepEqual(client.calls, [
    { method: "GET", path: "/api/signup/status" },
  ]);
});

test("submits backend signup fields with the backend role value", async () => {
  const client = createClient({
    success: true,
    data: {
      id: 1,
      nickname: "효돌이",
      age: 25,
      phoneNumber: "010-1234-5678",
      role: "USER",
      needsConnection: false,
    },
  });
  const request = {
    nickname: "효돌이",
    age: 25,
    phoneNumber: "010-1234-5678",
    role: "USER",
  };

  const result = await completeSignup(request, client);

  assert.equal(result.role, "USER");
  assert.deepEqual(client.calls, [
    { method: "POST", path: "/api/signup", body: request },
  ]);
});
