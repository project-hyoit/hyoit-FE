import assert from "node:assert/strict";
import test from "node:test";
import { resolveEntryTarget } from "./resolveEntryTarget.ts";

test("routes unauthenticated users to login", () => {
  assert.equal(resolveEntryTarget({ authenticated: false }), "login");
});

test("routes first-login users to role selection", () => {
  assert.equal(
    resolveEntryTarget({ authenticated: true, firstLogin: true, role: null }),
    "choose",
  );
});

test("routes a completed parent login to the parent app", () => {
  assert.equal(
    resolveEntryTarget({
      authenticated: true,
      firstLogin: false,
      role: "parent",
    }),
    "parent",
  );
});

test("routes a completed child login to the child app", () => {
  assert.equal(
    resolveEntryTarget({
      authenticated: true,
      firstLogin: false,
      role: "child",
    }),
    "child",
  );
});

test("does not enter a role app without a server role", () => {
  assert.equal(
    resolveEntryTarget({ authenticated: true, firstLogin: false, role: null }),
    "choose",
  );
});
