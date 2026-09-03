import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getCheckInOverview,
  useCheckInStore,
  type CheckInItem,
} from "@/src/shared/entities/check-in";

import {
  ParentCheckInHeader,
  ParentCheckInHistorySection,
  ParentCheckInQuickActionSection,
  ParentCheckInSendSuccessModal,
  ParentCheckInStatusBanner,
} from "./ui";

export default function ParentCheckInPage() {
  const router = useRouter();
  const rawItems = useCheckInStore((state) => state.items);
  const hasHydrated = useCheckInStore((state) => state.hasHydrated);
  const sendCheckIn = useCheckInStore((state) => state.sendCheckIn);
  const confirmCheckIn = useCheckInStore((state) => state.confirmCheckIn);
  const [isSendSuccessModalVisible, setIsSendSuccessModalVisible] =
    useState(false);
  const [lastSentMessage, setLastSentMessage] = useState<string | null>(null);
  const overview = useMemo(
    () => getCheckInOverview(rawItems, "parent"),
    [rawItems],
  );

  const handleSendCheckIn = (message: string) => {
    const sentItem = sendCheckIn("parent", message);
    if (!sentItem) return;

    setLastSentMessage(sentItem.message);
    setIsSendSuccessModalVisible(true);
  };

  const handleConfirmCheckIn = (item: CheckInItem) => {
    if (item.direction !== "RECEIVED") return;
    confirmCheckIn(item.id, "parent");
  };

  const handleCloseSendSuccessModal = () => {
    setIsSendSuccessModalVisible(false);
  };

  const handleResendCheckIn = () => {
    if (!lastSentMessage) {
      setIsSendSuccessModalVisible(false);
      return;
    }

    const resentItem = sendCheckIn("parent", lastSentMessage);
    if (!resentItem) return;

    setLastSentMessage(resentItem.message);
    setIsSendSuccessModalVisible(false);
  };

  if (!hasHydrated) {
    return <SafeAreaView style={s.safeArea} edges={["top"]} />;
  }

  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <View style={s.screen}>
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ParentCheckInHeader
            hasNotification={overview.pendingCount > 0}
            onPressNotification={() => {}}
          />

          <ParentCheckInStatusBanner
            latestItem={overview.displayItem}
            pendingCount={overview.pendingCount}
            onConfirm={handleConfirmCheckIn}
          />

          <ParentCheckInHistorySection
            items={overview.items}
            onPressHistory={() => router.push("/(parent)/check-in-history")}
          />
        </ScrollView>

        <View style={s.fixedQuickAction}>
          <ParentCheckInQuickActionSection onSend={handleSendCheckIn} />
        </View>
        <ParentCheckInSendSuccessModal
          visible={isSendSuccessModalVisible}
          onConfirm={handleCloseSendSuccessModal}
          onResend={handleResendCheckIn}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  screen: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 230,
    gap: 18,
  },
  fixedQuickAction: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 18,
    backgroundColor: "#F8F8F8",
  },
});
