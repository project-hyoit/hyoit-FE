import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  createCalendarDays,
  getDateKey,
  getDday,
  toCalendarRows,
  toDate,
  useDdayStore,
  type DdayItem,
} from "@/src/child/entities/dday";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTH_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
});
const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
});

export default function ChildDdayPage() {
  const items = useDdayStore((state) => state.items);
  const deleteItem = useDdayStore((state) => state.deleteItem);
  const [monthDate, setMonthDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedItem, setSelectedItem] = useState<DdayItem | null>(null);
  const todayKey = useMemo(() => getDateKey(new Date()), []);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.date.localeCompare(b.date)),
    [items],
  );

  const eventDates = useMemo(
    () => new Set(items.map((item) => item.date)),
    [items],
  );

  const calendarDays = useMemo(
    () => createCalendarDays(monthDate),
    [monthDate],
  );
  const calendarRows = useMemo(
    () => toCalendarRows(calendarDays),
    [calendarDays],
  );

  const moveMonth = (amount: number) => {
    setMonthDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + amount, 1),
    );
  };

  const handleDelete = () => {
    if (!selectedItem) return;
    deleteItem(selectedItem.id);
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <IconSymbol name="arrow.left" size={28} color="#111111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>디데이</Text>

        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <IconSymbol name="info" size={23} color="#111111" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.calendarCard}>
          <View style={styles.monthHeader}>
            <TouchableOpacity
              style={styles.monthButton}
              onPress={() => moveMonth(-1)}
              activeOpacity={0.7}
            >
              <Text style={styles.monthArrow}>‹</Text>
            </TouchableOpacity>

            <View style={styles.monthTitleColumn}>
              <Text style={styles.yearText}>{monthDate.getFullYear()}년</Text>
              <Text style={styles.monthText}>
                {MONTH_FORMATTER.format(monthDate)}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.monthButton}
              onPress={() => moveMonth(1)}
              activeOpacity={0.7}
            >
              <Text style={styles.monthArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.weekRow}>
            {WEEKDAYS.map((day) => (
              <Text key={day} style={styles.weekday}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.dayGrid}>
            {calendarRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.dayRow}>
                {row.map((day) => {
                  const hasEvent = eventDates.has(day.key);
                  const isToday = day.key === todayKey;
                  const isSelected = hasEvent;

                  return (
                    <View key={day.key} style={styles.dayCell}>
                      <View
                        style={[
                          styles.dayCircle,
                          isToday && styles.todayDayCircle,
                          isSelected && styles.eventDayCircle,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            !day.isCurrentMonth && styles.mutedDayText,
                            isToday && styles.todayDayText,
                            isSelected && styles.selectedDayText,
                          ]}
                        >
                          {day.date.getDate()}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>다가오는 일정</Text>

        <View style={styles.list}>
          {sortedItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>등록된 디데이가 없어요.</Text>
            </View>
          ) : (
            sortedItems.map((item) => (
              <Pressable
                key={item.id}
                style={styles.scheduleCard}
                onLongPress={() => setSelectedItem(item)}
              >
                <Text style={styles.ddayText}>{getDday(item.date)}</Text>

                <View style={styles.scheduleContent}>
                  <Text style={styles.scheduleTitle}>{item.title}</Text>
                  <Text style={styles.scheduleDate}>
                    {DATE_FORMATTER.format(toDate(item.date))}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => setSelectedItem(item)}
                  activeOpacity={0.7}
                >
                  <IconSymbol name="trash" size={22} color="#6B7280" />
                </TouchableOpacity>
              </Pressable>
            ))
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/(child)/(tabs)/dday/add")}
          activeOpacity={0.8}
        >
          <IconSymbol name="plus" size={25} color="#4D79F6" />
          <Text style={styles.addButtonText}>디데이 추가하기</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={Boolean(selectedItem)} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteSheet}>
            <Text style={styles.deleteTitle}>디데이를 삭제할까요?</Text>
            <Text style={styles.deleteDescription}>
              삭제한 일정은 다시 복구할 수 없어요.
            </Text>

            <View style={styles.deleteActionRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setSelectedItem(null)}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>취소</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={handleDelete}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmDeleteText}>삭제</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  headerIconButton: {
    position: "absolute",
    left: 18,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111111",
  },
  infoButton: {
    position: "absolute",
    right: 18,
    width: 44,
    height: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 22,
    paddingBottom: 132,
  },
  calendarCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 18,
    backgroundColor: "#FFFFFF",
  },
  monthHeader: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  monthButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  monthArrow: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111111",
  },
  monthTitleColumn: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  monthText: {
    fontSize: 23,
    lineHeight: 28,
    fontWeight: "900",
    color: "#4D79F6",
  },
  yearText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#111111",
  },
  weekRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekday: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: "#4B5563",
  },
  dayGrid: {
    gap: 2,
  },
  dayRow: {
    height: 42,
    flexDirection: "row",
  },
  dayCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircle: {
    width: 34,
    aspectRatio: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  eventDayCircle: {
    backgroundColor: "#4D79F6",
    borderRadius: 999,
  },
  todayDayCircle: {
    backgroundColor: "#EAF3FF",
  },
  dayText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
    color: "#111827",
    includeFontPadding: false,
    textAlign: "center",
  },
  mutedDayText: {
    color: "#B8BDC6",
  },
  selectedDayText: {
    color: "#FFFFFF",
  },
  todayDayText: {
    color: "#4D79F6",
    fontWeight: "900",
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: 17,
    fontWeight: "900",
    color: "#111111",
  },
  list: {
    gap: 10,
  },
  scheduleCard: {
    minHeight: 76,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 22,
    paddingRight: 8,
  },
  emptyCard: {
    minHeight: 76,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#9CA3AF",
  },
  ddayText: {
    width: 78,
    fontSize: 24,
    fontWeight: "900",
    color: "#111827",
  },
  scheduleContent: {
    flex: 1,
    gap: 4,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111111",
  },
  scheduleDate: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6B7280",
  },
  deleteButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1.4,
    borderColor: "#4D79F6",
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#4D79F6",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.45)",
    paddingHorizontal: 12,
    paddingBottom: 96,
  },
  deleteSheet: {
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingTop: 34,
    paddingBottom: 22,
    alignItems: "center",
  },
  deleteTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111111",
  },
  deleteDescription: {
    marginTop: 14,
    fontSize: 15,
    fontWeight: "700",
    color: "#6B7280",
  },
  deleteActionRow: {
    marginTop: 30,
    flexDirection: "row",
    gap: 18,
  },
  cancelButton: {
    flex: 1,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmDeleteButton: {
    flex: 1,
    height: 54,
    borderRadius: 8,
    backgroundColor: "#E94F49",
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#333333",
  },
  confirmDeleteText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },
});
