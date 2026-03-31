import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function VerifyCode() {
  const myCode = "927582";
  const [childCode, setChildCode] = useState("");
  const canNext = /^\d{6}$/.test(childCode);

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        가족구성원 추가를 위한{"\n"}인증번호가 생성되었어요
      </Text>

      <View style={s.myCodeCard}>
        <Text style={s.myCodeLabel} allowFontScaling={false}>
          내 인증 번호
        </Text>
        <Text style={s.myCodeText} allowFontScaling={false}>
          {myCode}
        </Text>
      </View>

      <View style={s.field}>
        <Text style={s.label} allowFontScaling={false}>
          인증번호
        </Text>
        <TextInput
          style={s.input}
          value={childCode}
          onChangeText={(v) => setChildCode(v.replace(/[^0-9]/g, ""))}
          placeholder="자녀분의 인증번호를 입력해주세요"
          placeholderTextColor="#B6B6B6"
          keyboardType="number-pad"
          maxLength={6}
          returnKeyType="done"
        />
      </View>

      <View style={s.nextRow}>
        <Pressable
          onPress={() => router.push("/onboarding/success")}
          disabled={!canNext}
          hitSlop={8}
          style={({ pressed }) => [
            s.next,
            !canNext && s.nextDisabled,
            pressed && canNext && { opacity: 0.9 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="다음"
        >
          <Text style={s.nextText} allowFontScaling={false}>
            다음
          </Text>
          <Text style={s.nextArrow} allowFontScaling={false}>
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
  label: "#454545",
  border: "#B6B6B6",
  card: "#F5F5F5",
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
  myCodeCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 32,
    marginBottom: 20,
    gap: 20,
  },
  myCodeLabel: { fontSize: 16, color: COLORS.text, fontWeight: "600" },
  myCodeText: {
    fontSize: 32,
    lineHeight: 40,
    color: COLORS.text,
    fontWeight: "800",
    letterSpacing: 2,
  },
  field: { marginTop: 8, marginBottom: 12 },
  label: {
    color: COLORS.label,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 14, android: 12 }),
    fontSize: 16,
    color: COLORS.text,
  },
  nextRow: { marginTop: 16, alignItems: "flex-end" },
  next: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
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
  nextDisabled: { opacity: 0.4 },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  nextArrow: { color: "#fff", fontSize: 16, marginLeft: 2 },
});
