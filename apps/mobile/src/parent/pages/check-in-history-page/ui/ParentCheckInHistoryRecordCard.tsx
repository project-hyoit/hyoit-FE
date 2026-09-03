import { StyleSheet, Text, View } from "react-native";

import {
  formatCheckInTime,
  type CheckInItem,
} from "@/src/shared/entities/check-in";

interface ParentCheckInHistoryRecordCardProps {
  item: CheckInItem;
}

const isSameDay = (date: Date, target: Date) =>
  date.getFullYear() === target.getFullYear() &&
  date.getMonth() === target.getMonth() &&
  date.getDate() === target.getDate();

const getDayLabel = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) return "오늘";
  if (isSameDay(date, yesterday)) return "어제";
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};
const getStatusPresentation = (status: CheckInItem["status"]) => {
  switch (status) {
    case "NEW":
      return { label: "새 안부", color: "#FF5C67" };
    case "WAITING_CONFIRM":
      return { label: "자녀 확인 전", color: "#F08A24" };
    case "CONFIRMED":
      return { label: "자녀 확인 완료", color: "#4DA665" };
    case "CHECKED":
    default:
      return { label: "확인 완료", color: "#8A8A8A" };
  }
};

export default function ParentCheckInHistoryRecordCard({
  item,
}: ParentCheckInHistoryRecordCardProps) {
  const isReceived = item.direction === "RECEIVED";
  const status = getStatusPresentation(item.status);

  return (
    <View style={s.card}>
      <Text style={[s.badge, !isReceived && s.sentBadge]}>
        {isReceived ? "받은 안부" : "보낸 안부"}
      </Text>

      <Text style={s.message}>“{item.message}”</Text>
      <Text style={s.meta}>
        {getDayLabel(item.createdAt)} {formatCheckInTime(item.createdAt)} ·{" "}
        <Text style={[s.status, { color: status.color }]}>{status.label}</Text>
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 9,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    backgroundColor: "#EAF3FF",
    color: "#4C82F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    fontWeight: "800",
  },
  sentBadge: {
    backgroundColor: "#EAF8EF",
    color: "#4D9B6C",
  },
  message: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "900",
    color: "#111111",
  },
  meta: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
    color: "#8A8A8A",
  },
  status: {
    fontWeight: "800",
  },
});
