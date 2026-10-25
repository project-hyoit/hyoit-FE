import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  toCheckInItems,
  type CheckInItem,
} from "@/src/shared/entities/check-in";
import { useFamilyMembersQuery } from "@/src/shared/entities/family";
import {
  useAnbuHistoryQuery,
  useCheckAnbuMutation,
  useSendAnbuMutation,
} from "@/src/shared/entities/notification";

import {
  ParentCheckInHeader,
  ParentCheckInHistorySection,
  ParentCheckInQuickActionSection,
  ParentCheckInSendSuccessModal,
  ParentCheckInStatusBanner,
} from "./ui";

export default function ParentCheckInPage() {
  const router = useRouter();
  const { data: familyMembers = [] } = useFamilyMembersQuery();
  const partnerId = familyMembers.find((member) => member.role === "USER")?.id;
  const { data: notifications = [] } = useAnbuHistoryQuery(partnerId);
  const sendAnbuMutation = useSendAnbuMutation();
  const checkAnbuMutation = useCheckAnbuMutation();
  const [isSendSuccessModalVisible, setIsSendSuccessModalVisible] =
    useState(false);
  const [lastSentMessage, setLastSentMessage] = useState<string | null>(null);
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
      Alert.alert("가족 연결 필요", "안부를 보낼 가족이 아직 연결되지 않았어요.");
      return;
    }

    try {
      const sentItem = await sendAnbuMutation.mutateAsync({
        partnerId,
        content: message,
      });
      setLastSentMessage(sentItem.content);
      setIsSendSuccessModalVisible(true);
    } catch {
      Alert.alert("안부 전송 실패", "잠시 후 다시 시도해주세요.");
    }
  };

  const handleConfirmCheckIn = (item: CheckInItem) => {
    if (item.direction !== "RECEIVED") return;
    checkAnbuMutation.mutate(Number(item.id));
  };

  const handleCloseSendSuccessModal = () => {
    setIsSendSuccessModalVisible(false);
  };

  const handleResendCheckIn = async () => {
    if (!lastSentMessage) {
      setIsSendSuccessModalVisible(false);
      return;
    }

    if (!partnerId) return;

    try {
      const resentItem = await sendAnbuMutation.mutateAsync({
        partnerId,
        content: lastSentMessage,
      });
      setLastSentMessage(resentItem.content);
      setIsSendSuccessModalVisible(false);
    } catch {
      Alert.alert("안부 재전송 실패", "잠시 후 다시 시도해주세요.");
    }
  };

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
