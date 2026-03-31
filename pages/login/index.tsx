import { useAuthStore } from "@/entities/auth/model/authStore";
import { LoginButton } from "@/features/login-with-kakao/ui/LoginButton";
import { COLORS } from "@/shared/theme/colors";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginPage() {
  const { bottom } = useSafeAreaInsets();
  const setSignedIn = useAuthStore((s) => s.setSignedIn);

  const handleLogin = () => {
    setSignedIn(true);
    router.replace("/onboarding/user-info");
  };

  return (
    <View style={s.safe}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <View style={s.container}>
        <View style={s.brand}>
          <View style={s.brandRow}>
            <Text style={s.logoText} allowFontScaling={false}>
              효잇
            </Text>
            <Image source={require("@/assets/images/Vector.png")} />
          </View>
        </View>

        <View style={[s.actions, { paddingBottom: bottom + 40 }]}>
          <LoginButton
            onPress={handleLogin}
            accessibilityLabel="카카오 계정으로 간편 로그인"
          />
          <Text style={s.caption} allowFontScaling={false}>
            *카카오 계정으로만 로그인이 가능합니다
          </Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  brand: { flex: 1, alignItems: "center", justifyContent: "center" },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoText: {
    fontSize: 48,
    fontWeight: "600",
    color: COLORS.text,
    lineHeight: 56,
  },
  actions: { width: "100%", alignItems: "center", gap: 12 },
  caption: {
    color: COLORS.subText,
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
  },
});
