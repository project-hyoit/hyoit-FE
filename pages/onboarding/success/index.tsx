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
        <Text style={s.cardTitle} allowFontScaling={false}>
          연결된 자녀분
        </Text>
      <View style={s.card}>
          <Image
            source={require("@/assets/profileimg/mainprofile.png")}
            style={s.avatar}
          />
          <Text style={s.childName} allowFontScaling={false}>
            {child.name}
          </Text>
          <Text style={s.childPhone} allowFontScaling={false}>
            {child.phone}
          </Text>
      </View>

      <View style={[s.actions]}>
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
    fontSize: 24,
    lineHeight: 36,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: 64,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E9E9E9",
    borderRadius: 12,
    padding: 26,
    marginBottom: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: 8,
  },
  avatar: {    
    width: 120,
    height: 120,
    borderRadius: 18,
  },
  childName: {   
    marginTop: 8,
    fontSize: 20,
    fontWeight: "600",
  },
  childPhone: {     
    marginTop: 20,
    fontSize: 16, 
    fontWeight: "600", 
  },
  actions: {
    alignItems: "flex-end",
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
