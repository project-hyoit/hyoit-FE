
import { StyleSheet, Text, View } from "react-native";

import {
  formatCheckInTime,
  resolveCheckInBannerState,
  type CheckInItem,
} from "@/src/shared/entities/check-in";
import { ConfirmCheckInButton } from "@/src/shared/features/check-in/confirm-check-in";

interface ChildCheckInStatusBannerProps {
  latestItem: CheckInItem | null;
  pendingCount: number;
  onConfirm: (item: CheckInItem) => void;
}

export default function ChildCheckInStatusBanner({
  latestItem,
  pendingCount,
  onConfirm,
}: ChildCheckInStatusBannerProps) {
  const bannerState = resolveCheckInBannerState(latestItem, pendingCount);

  if (bannerState.type === "EMPTY") {
    return (
      <View style={s.emptyContainer}>
        <View style={s.textArea}>
          <Text style={s.emptyStatusLabel}>안부 없음</Text>
          <Text style={s.emptyTitle}>아직 도착한{"\n"}안부가 없어요!</Text>
          <Text style={s.emptyDescription}>
            먼저 부모님께{"\n"}안부를 보내볼까요?
          </Text>
        </View>
        <View style={s.characterArea}>
          <Text style={s.character}>💙</Text>
        </View>
      </View>
    );
  }

  const item = bannerState.item;

  if (bannerState.type === "MULTIPLE_NEW") {
    return (
      <View style={s.multipleNewContainer}>
        <View style={s.textArea}>
          <Text style={s.multipleNewStatusLabel}>새 안부 {bannerState.count}개</Text>
          <Text style={s.title}>“{item.message}”</Text>
          <Text style={s.description}>
            가장 최근 안부예요.{"\n"}
            확인하지 않은 안부가 {bannerState.count - 1}개 더 있어요.
          </Text>
          <View style={s.confirmButtonArea}>
            <ConfirmCheckInButton
              backgroundColor="#7658D6"
              onPress={() => onConfirm(item)}
            />
          </View>
        </View>
        <View style={s.characterArea}>
          <Text style={s.character}>💙</Text>
        </View>
      </View>
    );
  }

  if (bannerState.type === "NEW") {
    return (
      <View style={s.newContainer}>
        <View style={s.newBadge}>
          <Text style={s.newBadgeText}>N</Text>
        </View>
        <View style={s.textArea}>
          <Text style={s.newStatusLabel}>새 안부 도착!</Text>
          <Text style={s.title}>“{item.message}”</Text>
          <Text style={s.time}>{formatCheckInTime(item.createdAt)}</Text>
          <View style={s.confirmButtonArea}>
            <ConfirmCheckInButton onPress={() => onConfirm(item)} />
          </View>
        </View>
        <View style={s.characterArea}>
          <Text style={s.character}>💙</Text>
        </View>
      </View>
    );
  }

  if (bannerState.type === "CHECKED") {
    return (
      <View style={s.checkedContainer}>
        <View style={s.textArea}>
          <Text style={s.checkedStatusLabel}>안부를 확인했어요</Text>
          <Text style={s.title}>“{item.message}”</Text>
          <Text style={s.time}>{formatCheckInTime(item.createdAt)}</Text>
          <View style={s.divider} />
          <Text style={s.checkedDescription}>
            확인했어요{"\n"}나도 안부를 보내볼까요?
          </Text>
        </View>
        <View style={s.characterArea}>
          <Text style={s.character}>💙</Text>
        </View>
      </View>
    );
  }

  if (bannerState.type === "SENT_WAITING") {
    return (
      <View style={s.sentContainer}>
        <View style={s.waitingDotRow}>
          <View style={s.waitingDot} />
          <View style={s.waitingDot} />
          <View style={s.waitingDot} />
        </View>
        <View style={s.textArea}>
          <Text style={s.sentStatusLabel}>안부를 보냈어요</Text>
          <Text style={s.title}>“{item.message}”</Text>
          <Text style={s.time}>{formatCheckInTime(item.createdAt)}</Text>
          <Text style={s.sentDescription}>부모님이 아직 확인하지 않았어요!</Text>
        </View>
        <View style={s.characterArea}>
          <Text style={s.character}>💙</Text>
        </View>
      </View>
    );
  }

  if (bannerState.type === "SENT_CONFIRMED") {
    return (
      <View style={s.sentContainer}>
        <View style={s.confirmedBadge}>
          <Text style={s.confirmedBadgeText}>✓</Text>
        </View>
        <View style={s.textArea}>
          <Text style={s.sentStatusLabel}>안부를 보냈어요</Text>
          <Text style={s.title}>“{item.message}”</Text>
          <Text style={s.time}>{formatCheckInTime(item.createdAt)}</Text>
          <Text style={s.sentDescription}>부모님이 확인을 완료했어요!</Text>
        </View>
        <View style={s.characterArea}>
          <Text style={s.character}>💙</Text>
        </View>
      </View>
    );
  }

  return null;
}

const s = StyleSheet.create({
  emptyContainer: {
    minHeight: 164,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#DEDEDE",
    backgroundColor: "#FFFFFF",
    paddingLeft: 22,
    paddingVertical: 24,
    flexDirection: "row",
    overflow: "hidden",
  },
  multipleNewContainer: {
    minHeight: 164,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#9D83EA",
    backgroundColor: "#F1EAFF",
    paddingLeft: 22,
    paddingTop: 22,
    paddingBottom: 18,
    paddingRight: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
  newContainer: {
    position: "relative",
    minHeight: 164,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#66B4FF",
    backgroundColor: "#EEF5FF",
    paddingLeft: 22,
    paddingTop: 22,
    paddingBottom: 18,
    paddingRight: 8,
    flexDirection: "row",
    overflow: "visible",
  },
  checkedContainer: {
    minHeight: 164,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#66B4FF",
    backgroundColor: "#EEF5FF",
    paddingLeft: 22,
    paddingTop: 22,
    paddingBottom: 18,
    paddingRight: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
  sentContainer: {
    position: "relative",
    minHeight: 164,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#9CDEB2",
    backgroundColor: "#EAF8EF",
    paddingLeft: 22,
    paddingTop: 22,
    paddingBottom: 20,
    paddingRight: 8,
    flexDirection: "row",
    overflow: "visible",
  },
  textArea: {
    flex: 1,
    zIndex: 1,
  },
  emptyStatusLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
    color: "#555555",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "900",
    color: "#050505",
    marginBottom: 22,
  },
  emptyDescription: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "#8A8A8A",
  },
  multipleNewStatusLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#7658D6",
    marginBottom: 16,
  },
  newStatusLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#1478FF",
    marginBottom: 16,
  },
  checkedStatusLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#1478FF",
    marginBottom: 16,
  },
  sentStatusLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "900",
    color: "#4C8A62",
    marginBottom: 16,
  },
  title: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "900",
    color: "#050505",
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    color: "#6E6A72",
  },
  time: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: "#777777",
  },
  divider: {
    width: 100,
    height: 1,
    marginTop: 22,
    marginBottom: 14,
    borderStyle: "dashed",
    borderWidth: 0.8,
    borderColor: "#9BCBFF",
  },
  checkedDescription: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    color: "#111111",
  },
  sentDescription: {
    marginTop: 28,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "900",
    color: "#111111",
  },
  confirmButtonArea: {
    marginTop: 28,
  },
  characterArea: {
    width: 126,
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: -8,
    marginBottom: -10,
  },
  character: {
    fontSize: 84,
  },
  newBadge: {
    position: "absolute",
    top: -14,
    right: -12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF5C72",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  newBadgeText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  waitingDotRow: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 6,
    zIndex: 10,
  },
  waitingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#507D62",
  },
  confirmedBadge: {
    position: "absolute",
    top: -10,
    right: -8,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#3D9B5E",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  confirmedBadgeText: {
    fontSize: 22,
    lineHeight: 24,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
