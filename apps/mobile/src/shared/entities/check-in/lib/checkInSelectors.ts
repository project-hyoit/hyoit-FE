import type {
  CheckInDisplayStatus,
  CheckInItem,
  CheckInRawItem,
  CheckInViewerRole,
} from "../model/types";

export const mapCheckInToViewItem = (
  item: CheckInRawItem,
  viewerRole: CheckInViewerRole,
): CheckInItem => {
  const direction = item.senderRole === viewerRole ? "SENT" : "RECEIVED";
  let status: CheckInDisplayStatus;

  if (direction === "RECEIVED") {
    status = item.checkedAt ? "CHECKED" : "NEW";
  } else {
    status = item.checkedAt ? "CONFIRMED" : "WAITING_CONFIRM";
  }

  return { ...item, direction, status };
};

export const getCheckInsForViewer = (
  items: CheckInRawItem[],
  viewerRole: CheckInViewerRole,
): CheckInItem[] =>
  items
    .map((item) => mapCheckInToViewItem(item, viewerRole))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

export const getLatestSentCheckIn = (
  items: CheckInItem[],
): CheckInItem | null => {
  let latest: CheckInItem | null = null;

  for (const item of items) {
    if (item.direction !== "SENT") continue;
    if (
      !latest ||
      new Date(item.createdAt).getTime() > new Date(latest.createdAt).getTime()
    ) {
      latest = item;
    }
  }

  return latest;
};

export const getPendingReceivedCheckIns = (
  items: CheckInItem[],
): CheckInItem[] =>
  items.filter(
    (item) => item.direction === "RECEIVED" && item.status === "NEW",
  );

export type CheckInOverview = {
  items: CheckInItem[];
  pendingCount: number;
  displayItem: CheckInItem | null;
};
export const getCheckInOverview = (
  rawItems: CheckInRawItem[],
  viewerRole: CheckInViewerRole,
): CheckInOverview => {
  const items = getCheckInsForViewer(rawItems, viewerRole);
  const pendingItems = getPendingReceivedCheckIns(items);

  return {
    items,
    pendingCount: pendingItems.length,
    displayItem: pendingItems[0] ?? items[0] ?? null,
  };
};
