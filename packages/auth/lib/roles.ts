import type { BackendRole, UserRole } from "@hyoit/types";

export function backendRoleToUserRole(
  role: BackendRole | null | undefined,
): UserRole | null {
  if (role === "ADMIN") return "parent";
  if (role === "USER") return "child";
  return null;
}

export function userRoleToBackendRole(role: UserRole): BackendRole {
  return role === "parent" ? "ADMIN" : "USER";
}
