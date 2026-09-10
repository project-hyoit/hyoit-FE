import { router } from "expo-router";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDdayStore } from "@/src/child/entities/dday";
import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import HyoitLogo from "@/src/parent/assets/login/hyoit_logo_home.png";
import {
  formatCheckInTime,
  getCheckInOverview,
  getLatestSentCheckIn,
  useCheckInStore,
} from "@/src/shared/entities/check-in";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import avatar01 from "@/src/parent/entities/user/assets/profile-avatars/profile-avatar-01.png";
import avatar02 from "@/src/parent/entities/user/assets/profile-avatars/profile-avatar-02.png";
import avatar03 from "@/src/parent/entities/user/assets/profile-avatars/profile-avatar-03.png";

const DATE_FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
});

const toDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getDday = (date: string) => {
  const target = toDate(date);
  const today = new Date();
  const startOfTarget = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  );
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const diff = Math.ceil(
    (startOfTarget.getTime() - startOfToday.getTime()) / 86400000,
  );

  if (diff === 0) return "D-Day";
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
};

type ChildStatus = "waiting" | "confirmed" | "empty";

export default function ChildHomePage() {
  const [previewStatus, setPreviewStatus] = useState<ChildStatus | null>(null);
  const childName = useOnboardingStore((state) => state.name.trim() || "효잇");
  const ddayItems = useDdayStore((state) => state.items);
  const rawCheckIns = useCheckInStore((state) => state.items);
  const hasHydrated = useCheckInStore((state) => state.hasHydrated);

  const nextDday = useMemo(() => {
    return [...ddayItems].sort((a, b) => a.date.localeCompare(b.date))[0];
  }, [ddayItems]);

  const checkInOverview = useMemo(
    () => getCheckInOverview(rawCheckIns, "child"),
    [rawCheckIns],
  );
  const latestSentCheckIn = getLatestSentCheckIn(checkInOverview.items);
  const newReceivedCheckInCount = checkInOverview.pendingCount;
  const recordCountLabel =
    newReceivedCheckInCount > 0
      ? `새 기록 ${newReceivedCheckInCount}개`
      : "새 기록 없음";

  const actualStatus: ChildStatus = latestSentCheckIn
    ? latestSentCheckIn.status === "CONFIRMED"
      ? "confirmed"
      : "waiting"
    : "empty";
  const visibleStatus = previewStatus ?? actualStatus;
  const checkInStatusTitle = visibleStatus === "confirmed"
    ? "부모님이 안부를 확인했어요"
    : visibleStatus === "waiting"
      ? "부모님이 아직 확인하지 않으셨어요"
      : "아직 보낸 안부가 없어요";

  const checkInStatusMessage = visibleStatus === "empty"
    ? "부모님께 가볍게 안부를 보내볼까요?"
    : latestSentCheckIn
      ? `“${latestSentCheckIn.message}”`
      : "";

  const checkInStatusMeta = latestSentCheckIn
    ? visibleStatus === "confirmed" && latestSentCheckIn.checkedAt
      ? `${formatCheckInTime(latestSentCheckIn.checkedAt)}에 확인했어요`
      : visibleStatus === "waiting"
        ? `${formatCheckInTime(latestSentCheckIn.createdAt)}에 보냈어요`
        : ""
    : "";
  const childStatusImage = {
    waiting: avatar02,
    confirmed: avatar03,
    empty: avatar01,
  }[visibleStatus];

  if (!hasHydrated) {
    return <SafeAreaView style={styles.safeArea} edges={["top"]} />;
  }

  const moveToCheckIn = () => {
    router.push("/(child)/(tabs)/check-in");
  };

  const moveToDday = () => {
    router.push("/(child)/(tabs)/dday");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={styles.logoCircle}>
              <Image source={HyoitLogo} style={styles.logoImage} resizeMode="contain" />
            </View>

            <Pressable style={styles.notificationButton} onPress={moveToCheckIn}>
              <IconSymbol name="bell" size={25} color="#111111" />
              {newReceivedCheckInCount > 0 ? (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>
                    {newReceivedCheckInCount}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          </View>

          <View style={styles.titleRow}>
            <View style={styles.titleArea}>
              <Text style={styles.greeting}>오늘도 반가워요, {childName}님 😊</Text>
              <Text style={styles.heroTitle}>부모님의 안부를 함께 챙겨볼까요?</Text>
            </View>
          </View>
        </View>

        <View style={styles.statusPreviewRow}>
          {([
            ["waiting", "부모님 미확인"],
            ["confirmed", "부모님 확인"],
            ["empty", "보낸 안부 없음"],
          ] as const).map(([status, label]) => (
            <Pressable
              key={status}
              style={[styles.statusPreviewButton, visibleStatus === status && styles.statusPreviewButtonActive]}
              onPress={() => setPreviewStatus(status)}
            >
              <Text style={[styles.statusPreviewText, visibleStatus === status && styles.statusPreviewTextActive]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[
            styles.statusCard,
            visibleStatus === "waiting" && styles.statusCardWaiting,
            visibleStatus === "confirmed" && styles.statusCardConfirmed,
            visibleStatus === "empty" && styles.statusCardEmpty,
          ]}
          onPress={moveToCheckIn}
        >
          <View
            style={[
              styles.statusTextArea,
              visibleStatus === "empty" && styles.statusTextAreaEmpty,
            ]}
          >
            <Text style={styles.statusLabel}>부모님 안부 상태</Text>
            <Text style={styles.statusTitle}>{checkInStatusTitle}</Text>
            <Text style={styles.statusMessage}>{checkInStatusMessage}</Text>
            <Text style={styles.statusMeta}>{checkInStatusMeta}</Text>
            {visibleStatus !== "empty" && latestSentCheckIn ? (
              <Pressable style={styles.detailButton} onPress={moveToCheckIn}>
                <Text style={styles.detailButtonText}>상세 보기</Text>
              </Pressable>
            ) : null}
          </View>

          <View style={styles.statusVisual}>
            <Image
              source={childStatusImage}
              style={styles.statusVisualImage}
              resizeMode="contain"
            />
          </View>

        </Pressable>

        <Pressable style={styles.primaryAction} onPress={moveToCheckIn}>
          <IconSymbol name="paperplane.fill" size={27} color="#4D79F6" />
          <Text style={styles.primaryActionText}>부모님께 안부 보내기</Text>
        </Pressable>

        <View style={styles.cardGrid}>
          <View style={styles.cardRow}>
            <View style={styles.cardCol}>
              <HomeCard onPress={moveToDday}>
                <Text style={styles.cardEyebrow}>디데이</Text>
                {nextDday ? (
                  <>
                    <Text style={styles.ddayText}>
                      {getDday(nextDday.date)}
                    </Text>
                    <Text style={styles.cardTitle}>{nextDday.title}</Text>
                    <Text style={styles.cardDescription}>
                      {DATE_FORMATTER.format(toDate(nextDday.date))}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.emptyDdayText}>D-Day</Text>
                    <Text style={styles.cardTitle}>일정이 없어요</Text>
                    <Text style={styles.cardDescription}>새 일정을 추가해요</Text>
                  </>
                )}
              </HomeCard>
            </View>

            <View style={styles.cardCol}>
              <HomeCard onPress={moveToCheckIn}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardEyebrow}>안부 기록</Text>
                  <IconSymbol name="chevron.right" size={22} color="#4B5563" />
                </View>
                <Text
                  style={[
                    styles.recordCount,
                    newReceivedCheckInCount === 0 && styles.emptyRecordCount,
                  ]}
                >
                  {recordCountLabel}
                </Text>
                <Text style={styles.cardDescription}>
                  {newReceivedCheckInCount > 0
                    ? "최근 안부 상태를\n확인할 수 있어요"
                    : "새로 도착한\n안부가 없어요"}
                </Text>
              </HomeCard>
            </View>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.cardCol}>
              <HomeCard onPress={() => {}}>
                <Text style={styles.cardEyebrow}>오늘의 한마디</Text>
                <Text style={styles.cardBodyText}>
                  오늘도{"\n"}따뜻한 하루{"\n"}보내세요 🍀
                </Text>
                <View style={styles.cardVisualCircle}>
                  <Text style={styles.cardVisualText}>🌱</Text>
                </View>
              </HomeCard>
            </View>

            <View style={styles.cardCol}>
              <HomeCard onPress={() => {}}>
                <Text style={styles.cardEyebrow}>오늘의 날씨</Text>
                <View style={styles.weatherRow}>
                  <Text style={styles.weatherTemp}>22°</Text>
                  <Text style={styles.weatherLabel}>흐림</Text>
                </View>
                <Text style={styles.cardDescription}>최고 24° / 최저 19°</Text>
                <View style={styles.cardVisualCircle}>
                  <Text style={styles.cardVisualText}>☁️</Text>
                </View>
              </HomeCard>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeCard({
  children,
  onPress,
}: {
  children: ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.smallCard} onPress={onPress}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 132,
    gap: 14,
  },
  statusPreviewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusPreviewButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  statusPreviewButtonActive: {
    backgroundColor: "#4D79F6",
  },
  statusPreviewText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4B5563",
  },
  statusPreviewTextActive: {
    color: "#FFFFFF",
  },
  header: {
    paddingTop: 0,
    marginBottom: 2,
  },
  headerTopRow: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoCircle: {
    width: 50,
    height: 42,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  logoImage: {
    width: 50,
    height: 28,
  },
  titleRow: {
    minHeight: 150,
    marginTop: 0,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  titleArea: {
    flex: 1,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 31,
    lineHeight: 40,
    fontWeight: "900",
    color: "#050505",
    letterSpacing: -0.9,
  },
  heroTitle: {
    marginTop: 10,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
    color: "#8A8A8A",
    letterSpacing: -0.2,
  },
  notificationButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EB5757",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadgeText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  statusCard: {
    height: 316,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DCE7FF",
    backgroundColor: "#EEF5FF",
    paddingTop: 30,
    paddingLeft: 24,
    paddingRight: 18,
    overflow: "hidden",
  },
  statusCardWaiting: {
    backgroundColor: "#EEF5FF",
    borderColor: "#DCE7FF",
  },
  statusCardConfirmed: {
    backgroundColor: "#EEFAF3",
    borderColor: "#D1F0DE",
  },
  statusCardEmpty: {
    backgroundColor: "#FFF7EA",
    borderColor: "#F5E2BD",
  },
  statusTextArea: {
    width: "61%",
    zIndex: 2,
  },
  statusTextAreaEmpty: {
    paddingTop: 34,
  },
  statusLabel: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#4D79F6",
  },
  statusTitle: {
    marginTop: 14,
    fontSize: 20,
    lineHeight: 34,
    fontWeight: "900",
    color: "#111111",
  },
  statusMessage: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "800",
    color: "#526071",
  },
  statusMeta: {
    marginTop: 5,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "800",
    color: "#728096",
  },
  detailButton: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: "rgba(77, 121, 246, 0.14)",
  },
  detailButtonText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "800",
    color: "#4D79F6",
  },
  statusVisual: {
    position: "absolute",
    right: 8,
    top: 88,
    width: 140,
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  statusVisualImage: {
    width: 110,
    height: 110,
  },
  primaryAction: {
    height: 64,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#D8DDE8",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  primaryActionText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#4D79F6",
  },
  cardGrid: {
    gap: 12,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
  },
  cardCol: {
    flex: 1,
  },
  smallCard: {
    position: "relative",
    height: 210,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingTop: 18,
    paddingLeft: 18,
    paddingRight: 14,
    paddingBottom: 14,
    overflow: "hidden",
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardEyebrow: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
    color: "#3A3A42",
  },
  ddayText: {
    marginTop: 18,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    color: "#4D79F6",
  },
  emptyDdayText: {
    marginTop: 18,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    color: "#B8BDC6",
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "900",
    color: "#333333",
  },
  cardDescription: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "800",
    color: "#7A808A",
  },
  recordCount: {
    marginTop: 18,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
    color: "#F05656",
  },
  emptyRecordCount: {
    color: "#9CA3AF",
  },
  cardBodyText: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 25,
    fontWeight: "900",
    color: "#4A4A4A",
  },
  cardVisualCircle: {
    position: "absolute",
    right: 14,
    bottom: 14,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  cardVisualText: {
    fontSize: 40,
  },
  weatherRow: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8,
  },
  weatherTemp: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    color: "#111111",
  },
  weatherLabel: {
    fontSize: 16,
    fontWeight: "900",
    color: "#4A4A4A",
  },
});
