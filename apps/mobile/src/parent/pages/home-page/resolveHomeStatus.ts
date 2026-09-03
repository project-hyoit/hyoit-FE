import type { CheckInItem } from "@/src/shared/entities/check-in";

import type { HomeStatus } from "./types/home";

type ResolveHomeStatusParams = {
  pendingReceivedCount: number;
  latestSentItem: Pick<CheckInItem, "status"> | null;
};

export const resolveHomeStatus = ({
  pendingReceivedCount,
  latestSentItem,
}: ResolveHomeStatusParams): HomeStatus => {
  if (pendingReceivedCount > 1) return "multiple";
  if (pendingReceivedCount === 1) return "received";
  if (latestSentItem?.status === "WAITING_CONFIRM") return "sent";
  if (latestSentItem?.status === "CONFIRMED") return "checked";
  return "empty";
};
