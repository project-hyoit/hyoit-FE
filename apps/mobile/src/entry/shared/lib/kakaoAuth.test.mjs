import assert from "node:assert/strict";
import test from "node:test";
import { getKakaoAccessToken } from "./kakaoAuth.ts";

test("returns the native Kakao access token for the backend login request", async () => {
  const token = await getKakaoAccessToken(async () => ({
    accessToken: "kakao-access-token",
  }));

  assert.equal(token, "kakao-access-token");
});

test("rejects a native Kakao result without an access token", async () => {
  await assert.rejects(
    () => getKakaoAccessToken(async () => ({ accessToken: "" })),
    /카카오 access token을 받지 못했습니다\./,
  );
});
