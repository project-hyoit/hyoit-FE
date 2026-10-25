import {
  useNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
} from "@/src/shared/entities/notification";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";
import { router } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NotificationSettings } from "@hyoit/types";

const notificationItems: {
  key: keyof NotificationSettings;
  title: string;
  description: string;
}[] = [
  {
    key: "anbuReceived",
    title: "안부 알림",
    description: "가족이 안부를 보내면 바로 알려드려요.",
  },
  {
    key: "anbuReply",
    title: "답장 알림",
    description: "가족이 내 안부에 답장을 남기면 알려드려요.",
  },
  {
    key: "dday",
    title: "디데이 알림",
    description: "등록한 일정이 가까워지면 미리 알려드려요.",
  },
];

const defaultSettings: NotificationSettings = {
  anbuReceived: true,
  anbuReply: true,
  dday: true,
};

export default function NotificationSettingsScreen() {
  const { data, isError, isLoading } = useNotificationSettingsQuery();
  const updateSettings = useUpdateNotificationSettingsMutation();
  const settings = data ?? defaultSettings;

  const toggleItem = (key: keyof NotificationSettings) => {
    updateSettings.mutate({ [key]: !settings[key] });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <IconSymbol name="arrow.left" size={30} color="#34363D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>알림 설정</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="small" color="#4D79F6" />
            <Text style={styles.statusText}>알림 설정을 불러오는 중이에요.</Text>
          </View>
        ) : null}
        {isError ? (
          <Text style={styles.errorText}>
            알림 설정을 불러오지 못해 기본값으로 표시하고 있어요.
          </Text>
        ) : null}

        <View style={styles.card}>
          {notificationItems.map((item, index) => (
            <View
              key={item.key}
              style={[
                styles.row,
                index === notificationItems.length - 1 && styles.lastRow,
              ]}
            >
              <View style={styles.textArea}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <Switch
                value={settings[item.key]}
                onValueChange={() => toggleItem(item.key)}
                disabled={updateSettings.isPending}
                trackColor={{ false: "#D7DBE5", true: "#BFD0FF" }}
                thumbColor={settings[item.key] ? "#4D79F6" : "#FFFFFF"}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FBFCFE",
  },
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEEF3",
    paddingHorizontal: 24,
  },
  headerIconButton: {
    position: "absolute",
    left: 24,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
  },
  content: {
    padding: 24,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  statusText: {
    color: "#6B7280",
    fontSize: 13,
  },
  errorText: {
    marginBottom: 12,
    color: "#B45309",
    fontSize: 13,
    lineHeight: 18,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  row: {
    minHeight: 86,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  textArea: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  description: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    color: "#6B7280",
  },
});
