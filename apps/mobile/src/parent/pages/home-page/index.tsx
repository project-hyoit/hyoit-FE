import { router } from "expo-router";
import { useMemo } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getCheckInOverview,
  getLatestSentCheckIn,
  useCheckInStore,
} from "@/src/shared/entities/check-in";
import { toMainViewModel, useMainQuery } from "@/src/shared/entities/main";
import { toWeatherCard, useWeatherQuery } from "@/src/shared/entities/weather";
import { resolveHomeStatus } from "./resolveHomeStatus";
import {
  HomeCardGrid,
  HomeHeader,
  HomePrimaryAction,
  HomeStatusBanner,
} from "./ui";

export default function HomePage() {
  const { data: mainData } = useMainQuery();
  const main = mainData ? toMainViewModel(mainData) : undefined;
  const { data: weatherData } = useWeatherQuery({
    lat: 37.5665,
    lon: 126.978,
  });
  const weather = weatherData ? toWeatherCard(weatherData) : undefined;
  const profileName = main?.name ?? "효잇";
  const rawItems = useCheckInStore((state) => state.items);
  const hasHydrated = useCheckInStore((state) => state.hasHydrated);
  const overview = useMemo(
    () => getCheckInOverview(rawItems, "parent"),
    [rawItems],
  );
  const latestSentItem = getLatestSentCheckIn(overview.items);
  const pendingReceivedCount =
    main?.uncheckedAnbuCount ?? overview.pendingCount;

  const homeStatus = resolveHomeStatus({
    pendingReceivedCount,
    latestSentItem,
  });

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

        <HomeStatusBanner
          status={homeStatus}
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
          weather={weather}
          recentGreetingCount={pendingReceivedCount}
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
    gap: 14,
  },
});
