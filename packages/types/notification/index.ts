import type { BackendRole } from "../auth";

export type AnbuFilter = "ALL" | "RECEIVED" | "SENT" | "UNCHECKED";

export interface NotificationUserSummary {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
  role: BackendRole;
}

export interface NotificationItem {
  id: number;
  content: string;
  sender?: NotificationUserSummary | null;
  receiver: NotificationUserSummary;
  sentByMe: boolean;
  checked: boolean;
  direction: string;
  status: string;
  referenceType: string;
  referenceId?: number | null;
  createdAt: string;
  checkedAt?: string | null;
}

export interface NotificationSummary {
  todayCount: number;
  uncheckedAnbuCount: number;
  latestNotification?: NotificationItem | null;
  currentAnbus: NotificationItem[];
}

export interface NotificationSettings {
  anbuReceived: boolean;
  anbuReply: boolean;
  dday: boolean;
}

export interface NotificationSettingsPatch {
  anbuReceived?: boolean;
  anbuReply?: boolean;
  dday?: boolean;
}

export interface SendAnbuRequest {
  partnerId?: number;
  content: string;
}
