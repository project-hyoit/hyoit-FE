import type { MainResponse } from "@hyoit/types";

export function toMainViewModel(main: MainResponse) {
  return {
    name: main.user.nickname,
    uncheckedAnbuCount: main.notificationSummary.uncheckedAnbuCount,
    familyMembers: main.familyMembers,
    upcomingDDays: main.upcomingDDays,
  };
}
