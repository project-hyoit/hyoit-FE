import { useMemo } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { toCheckInItems, type CheckInItem } from "@/src/shared/entities/check-in";
import { useFamilyMembersQuery } from "@/src/shared/entities/family";
import {
  useAnbuHistoryQuery,
  useCheckAnbuMutation,
  useSendAnbuMutation,
} from "@/src/shared/entities/notification";

import ChildCheckInHeader from "./ui/ChildCheckInHeader";
import ChildCheckInHistorySection from "./ui/ChildCheckInHistorySection";
import ChildCheckInQuickActionSection from "./ui/ChildCheckInQuickActionSection";
import ChildCheckInStatusBanner from "./ui/ChildCheckInStatusBanner";

export default function ChildCheckInPage() {
  const { data: familyMembers = [] } = useFamilyMembersQuery();
  const partnerId = familyMembers.find((member) => member.role === "ADMIN")?.id;
  const { data: notifications = [] } = useAnbuHistoryQuery(partnerId);
  const sendAnbuMutation = useSendAnbuMutation();
  const checkAnbuMutation = useCheckAnbuMutation();

  const overview = useMemo(() => {
    const items = toCheckInItems(notifications);
    const pendingItems = items.filter(
      (item) => item.direction === "RECEIVED" && item.status === "NEW",
    );
    return {
      items,
      pendingCount: pendingItems.length,
      displayItem: pendingItems[0] ?? items[0] ?? null,
    };
  }, [notifications]);

  const handleSendCheckIn = async (message: string) => {
    if (!partnerId) {
      Alert.alert("가족 연결 필요", "안부를 보낼 부모님이 아직 연결되지 않았어요.");
      return;
    }

    try {
      await sendAnbuMutation.mutateAsync({ partnerId, content: message });
    } catch {
      Alert.alert("안부 전송 실패", "잠시 후 다시 시도해주세요.");
    }
  };

  const handleConfirmCheckIn = (item: CheckInItem) => {
    if (item.direction !== "RECEIVED") return;
    checkAnbuMutation.mutate(Number(item.id));
  };

  return (
    <SafeAreaView style={s.safeArea} edges={["top"]}>
      <View style={s.screen}>
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <ChildCheckInHeader
            hasNotification={overview.pendingCount > 0}
            onPressNotification={() => {}}
          />

          <ChildCheckInStatusBanner
            latestItem={overview.displayItem}
            pendingCount={overview.pendingCount}
            onConfirm={handleConfirmCheckIn}
          />

          <ChildCheckInHistorySection items={overview.items} />
        </ScrollView>

        <View style={s.fixedQuickAction}>
          <ChildCheckInQuickActionSection onSend={handleSendCheckIn} />
        </View>
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
