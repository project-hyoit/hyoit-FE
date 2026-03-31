import { useAuthStore } from "@/entities/auth/model/authStore";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Success() {
  const { bottom } = useSafeAreaInsets();
  const setOnboarded = useAuthStore((s) => s.setOnboarded);

  const child = { name: "김유찬", phone: "010-4610-3405" };

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        자녀 분과 연결이{"\n"}완료되었어요
      </Text>

      <View style={s.card}>
        <Text style={s.cardTitle} allowFontScaling={false}>
          연결된 자녀분
        </Text>

        <View style={s.childRow}>
          <View style={s.childLeft}>
            <Image
              source={require("@/assets/images/Vector.png")}
              style={s.avatar}
            />
            <View style={s.childNameCol}>
              <Text style={s.childName} allowFontScaling={false}>
                {child.name}
              </Text>
            </View>
          </View>

          <Text style={s.childPhone} allowFontScaling={false}>
            {child.phone}
          </Text>
        </View>
      </View>

      <View style={[s.actions, { marginBottom: bottom + 12 }]}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          style={({ pressed }) => [s.outlineBtn, pressed && { opacity: 0.9 }]}
          accessibilityRole="button"
          accessibilityLabel="돌아가기"
        >
          <Text style={s.leftArrow} allowFontScaling={false}>
            ←
          </Text>
          <Text style={s.outlineText} allowFontScaling={false}>
            돌아가기
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setOnboarded(true);
            router.replace("/(tabs)");
          }}
          hitSlop={8}
          style={({ pressed }) => [s.primaryBtn, pressed && { opacity: 0.9 }]}
          accessibilityRole="button"
          accessibilityLabel="시작하기"
        >
          <Text style={s.primaryText} allowFontScaling={false}>
            시작하기
          </Text>
          <Text style={s.arrow} allowFontScaling={false}>
            →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const COLORS = {
  bg: "#FFFFFF",
  text: "#000000",
  subText: "#666666",
  cardBg: "#F5F5F5",
  border: "#E6E6E6",
  primary: "#1E90FF",
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 120,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    gap: 16,
    marginTop: 16,
    marginBottom: 100,
  },
  cardTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "600",
    textAlign: "center",
  },
  childRow: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  childLeft: { flexDirection: "row", alignItems: "center", gap: 16 },
  avatar: { width: 34, height: 34, borderRadius: 17, resizeMode: "cover" },
  childNameCol: { justifyContent: "center" },
  childName: { fontSize: 16, fontWeight: "700", color: COLORS.text },
  childPhone: { fontSize: 12, color: COLORS.text, textAlign: "right" },
  actions: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  outlineBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  outlineText: { color: COLORS.primary, fontSize: 16, fontWeight: "700" },
  leftArrow: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "700",
    marginRight: 2,
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  arrow: { color: "#fff", fontSize: 16, marginLeft: 2 },
});
