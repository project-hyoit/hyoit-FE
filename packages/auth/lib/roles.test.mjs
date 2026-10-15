import assert from "node:assert/strict";
import test from "node:test";
import { backendRoleToUserRole, userRoleToBackendRole } from "./roles.ts";

test("maps backend ADMIN and USER roles to frontend parent and child roles", () => {
  assert.equal(backendRoleToUserRole("ADMIN"), "parent");
  assert.equal(backendRoleToUserRole("USER"), "child");
  assert.equal(backendRoleToUserRole(null), null);
  assert.equal(backendRoleToUserRole(undefined), null);
});

test("maps frontend roles to backend signup roles", () => {
  assert.equal(userRoleToBackendRole("parent"), "ADMIN");
  assert.equal(userRoleToBackendRole("child"), "USER");
});
