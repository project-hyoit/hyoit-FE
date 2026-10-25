import type { DdayResponse } from "../dday";
import type { FamilyMember } from "../family";
import type { GameRecord } from "../game";
import type { BackendRole } from "../auth";
import type { NotificationSummary } from "../notification";

export interface MainUserSummary {
  id: number;
  nickname: string;
  profileImageUrl?: string | null;
  role: BackendRole;
  firstLogin: boolean;
}

export interface MainResponse {
  user: MainUserSummary;
  recentGameRecords: GameRecord[];
  familyMembers: FamilyMember[];
  upcomingDDays: DdayResponse[];
  notificationSummary: NotificationSummary;
}
