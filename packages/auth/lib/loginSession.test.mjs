import assert from "node:assert/strict";
import test from "node:test";
import { createLoginSession } from "./loginSession.ts";

test("keeps first-login state and maps an ADMIN role", () => {
  assert.deepEqual(
    createLoginSession({
      accessToken: "service-token",
      firstLogin: true,
      role: "ADMIN",
    }),
    { isSignedIn: true, firstLogin: true, role: "parent" },
  );
});

test("keeps a missing role for first-login onboarding", () => {
  assert.deepEqual(
    createLoginSession({
      accessToken: "service-token",
      firstLogin: true,
    }),
    { isSignedIn: true, firstLogin: true, role: null },
  );
});
