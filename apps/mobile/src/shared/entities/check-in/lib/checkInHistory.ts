import type { CheckInItem } from "../model/types";

export type CheckInHistoryFilter =
  | "ALL"
  | "RECEIVED"
  | "SENT"
  | "COMPLETED";

const isCompletedCheckIn = (item: CheckInItem) =>
  item.status === "CHECKED" || item.status === "CONFIRMED";

export const filterCheckInHistory = (
  items: CheckInItem[],
  filter: CheckInHistoryFilter,
): CheckInItem[] => {
  switch (filter) {
    case "ALL":
      return items;
    case "RECEIVED":
      return items.filter((item) => item.direction === "RECEIVED");
    case "SENT":
      return items.filter((item) => item.direction === "SENT");
    case "COMPLETED":
      return items.filter(isCompletedCheckIn);
  }
};
const isSameCalendarDay = (date: Date, target: Date) =>
  date.getFullYear() === target.getFullYear() &&
  date.getMonth() === target.getMonth() &&
  date.getDate() === target.getDate();

export const groupCheckInHistoryByDate = (
  items: CheckInItem[],
  now = new Date(),
) => {
  const sorted = [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    today: sorted.filter((item) =>
      isSameCalendarDay(new Date(item.createdAt), now),
    ),
    past: sorted.filter(
      (item) => !isSameCalendarDay(new Date(item.createdAt), now),
    ),
  };
};
