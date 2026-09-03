import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import type { CheckInItem } from "@/src/shared/entities/check-in";

import ParentCheckInHistoryCard from "./ParentCheckInHistoryCard";

interface ParentCheckInHistorySectionProps {
  items: CheckInItem[];
  onPressHistory: () => void;
}

export default function ParentCheckInHistorySection({
  items,
  onPressHistory,
}: ParentCheckInHistorySectionProps) {
  return (
    <View style={s.section}>
      <View style={s.headerRow}>
        <Text style={s.sectionTitle}>주고받은 안부 보기</Text>
        <Pressable
          style={s.historyButton}
          onPress={onPressHistory}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="안부 기록 보기"
        >
          <Ionicons name="chevron-forward" size={22} color="#777777" />
        </Pressable>
      </View>
      <View style={s.listBox}>
        {items.length === 0 ? (
          <View style={s.emptyBox}>
            <Text style={s.emptyIcon}>💬</Text>
            <Text style={s.emptyText}>표시할 안부가 없어요.</Text>
          </View>
        ) : (
          <ScrollView
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s.listContent}
          >
            {items.map((item) => (
              <ParentCheckInHistoryCard key={item.id} item={item} />
            ))}
          </ScrollView>
        )}
      </View>

      {items.length > 0 && (
        <View style={s.noticeBox}>
          <Text style={s.noticeIcon}>◷</Text>
          <Text style={s.noticeText}>
            안부를 확인했거나 상대가 확인한 완료 상태는{"\n"}약 10분 후
            기록에서도 확인할 수 있어요.
          </Text>
        </View>
      )}
    </View>
  );
}
const s = StyleSheet.create({
  section: {
    gap: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111111",
  },
  historyButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  listBox: {
    height: 330,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#DEDEDE",
    backgroundColor: "#FFFFFF",
    padding: 12,
    overflow: "hidden",
  },
  listContent: {
    gap: 10,
    paddingBottom: 2,
  },
  emptyBox: {
    flex: 1,
    minHeight: 190,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  emptyIcon: {
    fontSize: 18,
    opacity: 0.35,
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#A0A0A0",
  },
  noticeBox: {
    minHeight: 58,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  noticeIcon: {
    fontSize: 20,
    color: "#8A8A8A",
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
    color: "#8A8A8A",
  },
});
