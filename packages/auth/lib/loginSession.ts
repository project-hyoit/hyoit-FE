import type { LoginWithKakaoResult, UserRole } from "@hyoit/types";
import { backendRoleToUserRole } from "./roles.ts";

export interface LoginSession {
  isSignedIn: true;
  firstLogin: boolean;
  role: UserRole | null;
}

export function createLoginSession(
  result: LoginWithKakaoResult,
): LoginSession {
  return {
    isSignedIn: true,
    firstLogin: result.firstLogin,
    role: backendRoleToUserRole(result.role),
  };
}
