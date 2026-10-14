import assert from "node:assert/strict";
import test from "node:test";
import { hasAccessToken } from "./tokenState.ts";

test("treats a non-empty access token as an authenticated session", () => {
  assert.equal(hasAccessToken("access-token"), true);
});

test("does not treat an empty access token as an authenticated session", () => {
  assert.equal(hasAccessToken("  "), false);
  assert.equal(hasAccessToken(null), false);
  assert.equal(hasAccessToken(undefined), false);
});
