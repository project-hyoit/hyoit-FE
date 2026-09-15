import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "@/src/shared/ui/IconSymbol";

interface Props {
  onPressNotification: () => void;
  onPressChangePhoto: () => void;
  onPressHelp: () => void;
  onPressLogout: () => void;
}

const settings = [
  { label: "알림 설정", icon: "bell", action: "notification" },
  { label: "프로필 사진 변경", icon: "person.circle.fill", action: "photo" },
  { label: "도움말", icon: "questionmark", action: "help" },
] as const;

const logoutSetting = { label: "로그아웃", icon: "logout", action: "logout" } as const;

type SettingIconName = typeof settings[number]["icon"] | typeof logoutSetting["icon"];

type SettingAction = typeof settings[number]["action"] | typeof logoutSetting["action"];

export default function ProfileSettings({
  onPressNotification,
  onPressChangePhoto,
  onPressHelp,
  onPressLogout,
}: Props) {
  const handlePress = (action: SettingAction) => {
    switch (action) {
      case "notification":
        onPressNotification();
        break;
      case "photo":
        onPressChangePhoto();
        break;
      case "help":
        onPressHelp();
        break;
      case "logout":
        onPressLogout();
        break;
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>앱 설정</Text>
      <View style={styles.card}>
        {settings.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[styles.row, index === settings.length - 1 && styles.lastRow]}
            onPress={() => handlePress(item.action)}
            activeOpacity={0.7}
          >
            <View style={styles.left}>
              <View style={styles.iconBox}>
                <IconSymbol
                  name={item.icon as SettingIconName}
                  size={18}
                  color="#111827"
                />
              </View>
              <Text style={styles.label}>{item.label}</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color="#C4C4C4" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logoutCard}
        onPress={() => handlePress(logoutSetting.action)}
        activeOpacity={0.7}
      >
        <View style={styles.left}>
          <View style={styles.iconBoxDanger}>
            <IconSymbol
              name={logoutSetting.icon as SettingIconName}
              size={18}
              color="#E74343"
            />
          </View>
          <Text style={[styles.label, styles.labelDanger]}>{logoutSetting.label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F7F7F8",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBoxDanger: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FEEAEA",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  labelDanger: {
    color: "#E74343",
    fontWeight: "700",
  },
  logoutCard: {
    marginTop: 12,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});
