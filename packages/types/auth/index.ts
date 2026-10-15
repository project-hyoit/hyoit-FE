export type UserRole = "parent" | "child";
export type BackendRole = "ADMIN" | "USER";

export interface LoginWithKakaoResult {
  accessToken: string;
  firstLogin: boolean;
  role?: BackendRole | null;
}

export interface ChooseRoleResult {
  role: UserRole;
}

export interface SignupRequest {
  nickname: string;
  age: number;
  phoneNumber: string;
  role: BackendRole;
}

export interface SignupResult {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
  age: number;
  phoneNumber: string;
  role: BackendRole;
  invitationCode?: string | null;
  needsConnection: boolean;
}
