import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  createCalendarDays,
  getDateKey,
  toCalendarRows,
  toDate,
  useDdayStore,
} from "@/src/child/entities/dday";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";

const NAME_LIMIT = 20;
const MEMO_LIMIT = 100;
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTH_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
});

const formatSelectedDate = (value: string) => {
  const date = toDate(value);
  const weekday = WEEKDAYS[date.getDay()];

  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}. ${String(date.getDate()).padStart(2, "0")} (${weekday})`;
};

export default function ChildDdayAddPage() {
  const addItem = useDdayStore((state) => state.addItem);
  const scrollRef = useRef<ScrollView>(null);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [monthDate, setMonthDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [memo, setMemo] = useState("");
  const todayKey = getDateKey(new Date());

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("일정 이름 필요", "디데이 이름을 입력해주세요.");
      return;
    }

    if (!selectedDate) {
      Alert.alert("날짜 선택", "달력에서 날짜를 선택해주세요.");
      return;
    }

    addItem({
      title: title.trim(),
      date: selectedDate,
      memo: memo.trim() || undefined,
    });
    router.back();
  };

  const moveMonth = (amount: number) => {
    setMonthDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + amount, 1),
    );
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(getDateKey(date));
    setMonthDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setIsCalendarOpen(false);
  };

  const calendarRows = toCalendarRows(createCalendarDays(monthDate));

  const handleMemoFocus = () => {
    setIsScrollEnabled(true);
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 120);
  };

  const handleMemoBlur = () => {
    setIsScrollEnabled(false);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerIconButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <IconSymbol name="arrow.left" size={28} color="#111111" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>디데이 추가</Text>
        </View>

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={isScrollEnabled}
          bounces={false}
          overScrollMode="never"
        >
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>일정 이름</Text>
            <View style={styles.inputBox}>
              <TextInput
                value={title}
                onChangeText={(value) => setTitle(value.slice(0, NAME_LIMIT))}
                style={styles.inputText}
                placeholder="일정 이름"
                placeholderTextColor="#A0A4AF"
              />
            </View>
            <Text style={styles.counter}>{title.length}/{NAME_LIMIT}</Text>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>날짜</Text>
            <TouchableOpacity
              style={styles.dateInputBox}
              onPress={() => setIsCalendarOpen(true)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.inputText,
                  !selectedDate && styles.placeholderText,
                ]}
              >
                {selectedDate ? formatSelectedDate(selectedDate) : "날짜 선택"}
              </Text>
              <IconSymbol name="calendar" size={23} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>메모 (선택)</Text>
            <View style={styles.memoBox}>
              <TextInput
                value={memo}
                onChangeText={(value) => setMemo(value.slice(0, MEMO_LIMIT))}
                onFocus={handleMemoFocus}
                onBlur={handleMemoBlur}
                style={styles.memoText}
                placeholder="메모를 입력해주세요"
                placeholderTextColor="#A0A4AF"
                multiline
                textAlignVertical="top"
              />
            </View>
            <Text style={styles.counter}>{memo.length}/{MEMO_LIMIT}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveButtonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={isCalendarOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.calendarSheet}>
            <View style={styles.calendarHeader}>
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
                    const isToday = day.key === todayKey;
                    const isSelected = day.key === selectedDate;

                    return (
                      <TouchableOpacity
                        key={day.key}
                        style={styles.dayCell}
                        onPress={() => handleSelectDate(day.date)}
                        activeOpacity={0.75}
                      >
                        <View
                          style={[
                            styles.dayCircle,
                            isToday && styles.todayDayCircle,
                            isSelected && styles.selectedDateCircle,
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
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.closeCalendarButton}
              onPress={() => setIsCalendarOpen(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeCalendarText}>닫기</Text>
            </TouchableOpacity>
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
  keyboardAvoidingView: {
    flex: 1,
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
  container: {
    paddingHorizontal: 14,
    paddingTop: 34,
    paddingBottom: 20,
    gap: 34,
  },
  fieldGroup: {
    gap: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: "900",
    color: "#222222",
  },
  inputBox: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADDE3",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  dateInputBox: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADDE3",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 14,
  },
  inputText: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#333842",
    padding: 0,
  },
  placeholderText: {
    color: "#A0A4AF",
  },
  memoBox: {
    minHeight: 118,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADDE3",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  memoText: {
    minHeight: 84,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "700",
    color: "#333842",
    padding: 0,
  },
  counter: {
    alignSelf: "flex-end",
    fontSize: 13,
    fontWeight: "700",
    color: "#8A8A8A",
  },
  footer: {
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 26,
    backgroundColor: "#FFFFFF",
  },
  saveButton: {
    height: 54,
    borderRadius: 8,
    backgroundColor: "#4D79F6",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: 18,
  },
  calendarSheet: {
    width: "100%",
    maxWidth: 380,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 18,
  },
  calendarHeader: {
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
  todayDayCircle: {
    backgroundColor: "#EAF3FF",
  },
  selectedDateCircle: {
    backgroundColor: "#4D79F6",
    borderRadius: 999,
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
  todayDayText: {
    color: "#4D79F6",
    fontWeight: "900",
  },
  selectedDayText: {
    color: "#FFFFFF",
  },
  closeCalendarButton: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADDE3",
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  closeCalendarText: {
    fontSize: 15,
    fontWeight: "900",
    color: "#333842",
  },
});
