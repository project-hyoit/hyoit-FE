import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  filterCheckInHistory,
  groupCheckInHistoryByDate,
  getCheckInsForViewer,
  useCheckInStore,
  type CheckInHistoryFilter,
  type CheckInItem,
} from "@/src/shared/entities/check-in";

import ParentCheckInHistoryRecordCard from "./ui/ParentCheckInHistoryRecordCard";

const FILTERS: { key: CheckInHistoryFilter; label: string }[] = [
  { key: "ALL", label: "전체" },
  { key: "RECEIVED", label: "받은 안부" },
  { key: "SENT", label: "보낸 안부" },
  { key: "COMPLETED", label: "확인 완료" },
];
function HistorySection({ title, items }: { title: string; items: CheckInItem[] }) {
  if (items.length === 0) return null;

  return (
    <View style={s.historySection}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.cardList}>
        {items.map((item) => (
          <ParentCheckInHistoryRecordCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

export default function ParentCheckInHistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<CheckInHistoryFilter>("ALL");

  const rawItems = useCheckInStore((state) => state.items);
  const hasHydrated = useCheckInStore((state) => state.hasHydrated);
  const items = useMemo(
    () => getCheckInsForViewer(rawItems, "parent"),
    [rawItems],
  );
  const filteredItems = useMemo(() => filterCheckInHistory(items, filter), [items, filter]);
  const grouped = useMemo(() => groupCheckInHistoryByDate(filteredItems), [filteredItems]);

  if (!hasHydrated) {
    return <SafeAreaView style={s.safeArea} edges={["top"]} />;
  }

  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={s.backButton}
          onPress={() => router.back()}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="안부 화면으로 돌아가기"
        >
          <Ionicons name="chevron-back" size={30} color="#171717" />
        </Pressable>

        <View style={s.titleBlock}>
          <Text style={s.title}>안부 기록</Text>
          <Text style={s.description}>주고받은 안부와 확인 상태를 볼 수 있어요.</Text>
        </View>

        <View style={s.filterRow}>
          {FILTERS.map((item) => {
            const isActive = filter === item.key;

            return (
              <Pressable
                key={item.key}
                style={[s.filterButton, isActive && s.activeFilterButton]}
                onPress={() => setFilter(item.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <Text style={[s.filterText, isActive && s.activeFilterText]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={s.historyPanel}>
          {grouped.today.length === 0 && grouped.past.length === 0 ? (
            <View style={s.emptyBox}>
              <Text style={s.emptyText}>표시할 안부가 없어요.</Text>
            </View>
          ) : (
            <>
              <HistorySection title="오늘" items={grouped.today} />
              {grouped.today.length > 0 && grouped.past.length > 0 ? (
                <View style={s.separator} />
              ) : null}
              <HistorySection title="지난 기록" items={grouped.past} />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { paddingHorizontal: 24, paddingTop: 18, paddingBottom: 36 },
  backButton: {
    width: 40,
    height: 40,
    marginLeft: -8,
    marginBottom: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: { gap: 8, marginBottom: 28 },
  title: { fontSize: 30, lineHeight: 36, fontWeight: "900", color: "#111111" },
  description: { fontSize: 15, lineHeight: 22, fontWeight: "700", color: "#999999" },
  filterRow: { flexDirection: "row", gap: 8, marginBottom: 18 },
  filterButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  activeFilterButton: { backgroundColor: "#4F80F6", borderColor: "#4F80F6" },
  filterText: { fontSize: 13, fontWeight: "800", color: "#555555" },
  activeFilterText: { color: "#FFFFFF" },
  historyPanel: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#FCFCFC",
    padding: 14,
    gap: 18,
  },
  historySection: { gap: 12 },
  sectionTitle: { fontSize: 17, fontWeight: "900", color: "#222222" },
  cardList: { gap: 10 },
  separator: { height: 1, backgroundColor: "#ECECEC" },
  emptyBox: {
    minHeight: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: { fontSize: 14, fontWeight: "700", color: "#A0A0A0" },
});
