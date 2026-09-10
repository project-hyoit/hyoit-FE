import { Image, StyleSheet, Text, View } from "react-native";

import { NotificationButton, SettingButton } from "@/src/shared/ui";

import HyoitLogo from "@/src/shared/assets/hyoit_logo_home.png";

type HomeHeaderProps = {
  name: string;
  hasNotification?: boolean;
  onPressNotification: () => void;
  onPressSetting: () => void;
};

export default function HomeHeader({
  name,
  hasNotification = true,
  onPressNotification,
  onPressSetting,
}: HomeHeaderProps) {
  return (
    <View style={s.container}>
      <View style={s.topRow}>
        <View style={s.logoBox}>
          <Image source={HyoitLogo} style={s.logoImage} resizeMode="contain" />
        </View>

        <View style={s.iconRow}>
          <NotificationButton
            hasNotification={hasNotification}
            onPress={onPressNotification}
          />

          <SettingButton onPress={onPressSetting} />
        </View>
      </View>

      <View style={s.titleArea}>
        <Text style={s.title}>오늘도 반가워요, {name}님 ☺️</Text>
        <Text style={s.subtitle}>효잇이 따뜻한 연결을 도와드려요.</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingTop: 14,
    marginBottom: 2,
  },

  topRow: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoBox: {
    width: 82,
    height: 44,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  logoImage: {
    width: 72,
    height: 42,
  },

  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  titleArea: {
    marginTop: 18,
    gap: 6,
  },

  title: {
    fontSize: 31,
    lineHeight: 40,
    fontWeight: "900",
    color: "#050505",
    letterSpacing: -0.9,
  },

  subtitle: {
    fontSize: 18,
    lineHeight: 25,
    fontWeight: "800",
    color: "#8A8A8A",
    letterSpacing: -0.2,
  },
});
