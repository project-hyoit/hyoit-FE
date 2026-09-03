import type { CheckInItem } from "../model/types";

export type CheckInBannerState =
  | { type: "EMPTY" }
  | { type: "MULTIPLE_NEW"; item: CheckInItem; count: number }
  | { type: "NEW"; item: CheckInItem }
  | { type: "CHECKED"; item: CheckInItem }
  | { type: "SENT_WAITING"; item: CheckInItem }
  | { type: "SENT_CONFIRMED"; item: CheckInItem };

export const resolveCheckInBannerState = (
  item: CheckInItem | null,
  pendingCount: number,
): CheckInBannerState => {
  if (!item) return { type: "EMPTY" };

  if (
    item.direction === "RECEIVED" &&
    item.status === "NEW" &&
    pendingCount >= 2
  ) {
    return { type: "MULTIPLE_NEW", item, count: pendingCount };
  }

  if (item.direction === "RECEIVED" && item.status === "NEW") {
    return { type: "NEW", item };
  }

  if (item.direction === "RECEIVED" && item.status === "CHECKED") {
    return { type: "CHECKED", item };
  }

  if (item.direction === "SENT" && item.status === "WAITING_CONFIRM") {
    return { type: "SENT_WAITING", item };
  }

  if (item.direction === "SENT" && item.status === "CONFIRMED") {
    return { type: "SENT_CONFIRMED", item };
  }

  throw new Error(
    `Unsupported check-in banner state: ${item.direction}/${item.status}`,
  );
};
