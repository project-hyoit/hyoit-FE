import { useOnboardingStore } from "@/entities/auth/model/onboarding.store";
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function UserInfo() {
  const { name, age, phone, set } = useOnboardingStore();
  const canNext = Boolean(name.trim() && age.trim() && phone.trim());

  const ageRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        효잇을 사용하기 위한{"\n"}기본 정보를 알려주세요
      </Text>

      <View style={s.field}>
        <Text style={s.label} allowFontScaling={false}>
          이름
        </Text>
        <TextInput
          placeholder="이름을 입력해주세요"
          placeholderTextColor="#B6B6B6"
          value={name}
          onChangeText={(v) => set({ name: v })}
          style={s.input}
          returnKeyType="next"
          onSubmitEditing={() => ageRef.current?.focus()}
        />
      </View>

      <View style={s.field}>
        <Text style={s.label} allowFontScaling={false}>
          나이
        </Text>
        <TextInput
          ref={ageRef}
          placeholder="나이를 입력해주세요"
          placeholderTextColor="#B6B6B6"
          keyboardType="number-pad"
          value={age}
          onChangeText={(v) => set({ age: v })}
          style={s.input}
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
      </View>

      <View style={s.field}>
        <Text style={s.label} allowFontScaling={false}>
          전화번호
        </Text>
        <TextInput
          ref={phoneRef}
          placeholder="전화번호를 입력해주세요"
          placeholderTextColor="#B6B6B6"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={(v) => set({ phone: v })}
          style={s.input}
          returnKeyType="done"
        />
      </View>

      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [
            s.next,
            !canNext && s.nextDisabled,
            pressed && canNext && { opacity: 0.9 },
          ]}
          disabled={!canNext}
          onPress={() => router.push("/onboarding/verify-code")}
          hitSlop={8}
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
  border: "#B6B6B6",
  label: "#454545",
  text: "#000000",
  placeholder: "#B6B6B6",
  primary: "#1E90FF",
  bg: "#FFFFFF",
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

  field: {
    marginBottom: 12,
  },
  label: {
    color: COLORS.label,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
    fontWeight: "500",
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

  nextRow: {
    marginTop: 16,
    alignItems: "flex-end",
  },
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
  nextDisabled: {
    opacity: 0.4,
  },
  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  nextArrow: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 2,
  },
});
