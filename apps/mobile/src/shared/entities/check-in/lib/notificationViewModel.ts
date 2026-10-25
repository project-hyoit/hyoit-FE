import type { NotificationItem } from "@hyoit/types";
import type { CheckInItem, CheckInViewerRole } from "../model/types";

const toViewerRole = (role: "ADMIN" | "USER"): CheckInViewerRole =>
  role === "ADMIN" ? "parent" : "child";

export function toCheckInItem(notification: NotificationItem): CheckInItem {
  const direction = notification.sentByMe ? "SENT" : "RECEIVED";
  const status = notification.checked
    ? direction === "SENT"
      ? "CONFIRMED"
      : "CHECKED"
    : direction === "SENT"
      ? "WAITING_CONFIRM"
      : "NEW";

  return {
    id: String(notification.id),
    senderRole: toViewerRole(notification.sender?.role ?? "USER"),
    receiverRole: toViewerRole(notification.receiver.role),
    message: notification.content,
    type: "QUESTION",
    createdAt: notification.createdAt,
    ...(notification.checkedAt ? { checkedAt: notification.checkedAt } : {}),
    direction,
    status,
  };
}

export function toCheckInItems(notifications: NotificationItem[]): CheckInItem[] {
  return notifications.map(toCheckInItem);
}
