import assert from "node:assert/strict";
import test from "node:test";
import { toMainViewModel } from "./mainViewModel.ts";

test("maps the main aggregate to home display data", () => {
  assert.deepEqual(
    toMainViewModel({
      user: {
        id: 1,
        nickname: "효돌이",
        role: "USER",
        firstLogin: false,
      },
      recentGameRecords: [],
      familyMembers: [],
      upcomingDDays: [],
      notificationSummary: {
        todayCount: 2,
        uncheckedAnbuCount: 1,
        latestNotification: null,
        currentAnbus: [],
      },
    }),
    {
      name: "효돌이",
      uncheckedAnbuCount: 1,
      familyMembers: [],
      upcomingDDays: [],
    },
  );
});
