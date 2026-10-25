import type { BackendRole } from "../auth";

export interface FamilyMember {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
  phoneNumber?: string | null;
  role: BackendRole;
  online: boolean;
  onlineStatus: string;
  onlineStatusColor: string;
}

export interface InvitationPreview {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
  phoneNumber?: string | null;
  invitationCode: string;
}
