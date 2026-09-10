import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getCheckInOverview,
  getLatestSentCheckIn,
  useCheckInStore,
} from "@/src/shared/entities/check-in";
import { useUserProfileStore } from "@/src/parent/entities/user";
import { resolveHomeStatus } from "./resolveHomeStatus";
import type { HomeStatus } from "./types/home";
import {
  HomeCardGrid,
  HomeHeader,
  HomePrimaryAction,
  HomeStatusBanner,
} from "./ui";

export default function HomePage() {
  const profileName = useUserProfileStore((state) => state.profile.name);
  const [previewStatus, setPreviewStatus] = useState<HomeStatus | null>(null);
  const rawItems = useCheckInStore((state) => state.items);
  const hasHydrated = useCheckInStore((state) => state.hasHydrated);
  const overview = useMemo(
    () => getCheckInOverview(rawItems, "parent"),
    [rawItems],
  );
  const latestSentItem = getLatestSentCheckIn(overview.items);
  const pendingReceivedCount = overview.pendingCount;

  const homeStatus = resolveHomeStatus({
    pendingReceivedCount,
    latestSentItem,
  });
  const visibleStatus = previewStatus ?? homeStatus;

  if (!hasHydrated) {
    return <SafeAreaView style={s.safeArea} edges={["top"]} />;
  }

  const moveToCheckIn = () => {
    router.push("/(parent)/(tabs)/check-in");
  };

  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={s.container}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader
          name={profileName}
          hasNotification={pendingReceivedCount > 0}
          onPressNotification={moveToCheckIn}
          onPressSetting={() => {}}
        />

        <View style={s.previewRow}>
          {([
            ["received", "자녀가 보냈어요"],
            ["empty", "도착한 안부 없음"],
            ["sent", "안부를 보냈어요"],
            ["checked", "자녀가 확인했어요"],
          ] as const).map(([status, label]) => (
            <Pressable
              key={status}
              style={[s.previewButton, visibleStatus === status && s.previewButtonActive]}
              onPress={() => setPreviewStatus(status)}
            >
              <Text style={[s.previewText, visibleStatus === status && s.previewTextActive]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <HomeStatusBanner
          status={visibleStatus}
          pendingReceivedCount={pendingReceivedCount}
          onPress={moveToCheckIn}
        />

        <HomePrimaryAction
          label="자녀에게 안부 보내기"
          onPress={moveToCheckIn}
        />

        <HomeCardGrid
          onPressWeather={() => {}}
          onPressRecentGreeting={moveToCheckIn}
          onPressGame={() => router.push("/(parent)/(tabs)/game")}
          onPressHelp={() => {}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
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
  previewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  previewButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  previewButtonActive: {
    backgroundColor: "#1478FF",
  },
  previewText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4B5563",
  },
  previewTextActive: {
    color: "#FFFFFF",
  },
});
