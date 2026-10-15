import type { BackendRole } from "../auth";

export interface Me {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
  phoneNumber?: string | null;
  age?: number | null;
  role: BackendRole | null;
  firstLogin: boolean;
  invitationCode?: string | null;
}
