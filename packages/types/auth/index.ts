export type UserRole = "parent" | "child";

export interface LoginWithKakaoResult {
  accessToken: string;
  refreshToken: string;
}

export interface ChooseRoleResult {
  role: UserRole;
}
