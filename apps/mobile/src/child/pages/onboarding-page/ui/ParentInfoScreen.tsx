import { useOnboardingStore } from "@/src/shared/entities/onboarding/model/onboarding.store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ProgressBar from "../../../../shared/ui/ProgressBar";

type FieldName = "name" | "age" | "phone" | null;

export default function ParentInfoScreen() {
  const { age, name, phone, set } = useOnboardingStore();
  const [focusedField, setFocusedField] = useState<FieldName>(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    set({ step: 2 });
  }, [set]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const canNext = Boolean(name.trim() && age.trim() && phone.trim());

  return (
    <KeyboardAvoidingView
      style={s.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
    >
      <View style={s.screen}>
        <ScrollView
          style={s.content}
          contentContainerStyle={s.wrap}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        >
          <ProgressBar current={2} total={4} />
          <Text style={s.title} allowFontScaling={false}>
            안녕하세요!{"\n"}정보를 알려주세요
          </Text>
          <Text style={s.subtitle} allowFontScaling={false}>
            가족 연결을 위해 본인 정보를 입력해주세요.
          </Text>

          <View style={s.field}>
            <Text style={s.label} allowFontScaling={false}>
              성함
            </Text>
            <TextInput
              placeholder="예 : 김효잇"
              placeholderTextColor="#B6B6B6"
              value={name}
              onChangeText={(value) => set({ name: value })}
              style={[s.input, focusedField === "name" && s.inputFocused]}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              returnKeyType="next"
            />
          </View>

          <View style={s.field}>
            <Text style={s.label} allowFontScaling={false}>
              나이
            </Text>
            <TextInput
              placeholder="예 : 25"
              placeholderTextColor="#B6B6B6"
              value={age}
              onChangeText={(value) => set({ age: value.replace(/[^0-9]/g, "") })}
              keyboardType="number-pad"
              style={[s.input, focusedField === "age" && s.inputFocused]}
              onFocus={() => setFocusedField("age")}
              onBlur={() => setFocusedField(null)}
              returnKeyType="next"
            />
          </View>

          <View style={s.field}>
            <Text style={s.label} allowFontScaling={false}>
              전화번호
            </Text>
            <TextInput
              placeholder="예 : 010-1234-5678"
              placeholderTextColor="#B6B6B6"
              value={phone}
              onChangeText={(value) => set({ phone: value })}
              keyboardType="phone-pad"
              style={[s.input, focusedField === "phone" && s.inputFocused]}
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
              returnKeyType="done"
            />
          </View>
        </ScrollView>

        <View style={[s.nextRow, isKeyboardVisible && s.nextRowWithKeyboard]}>
          <Pressable
            style={({ pressed }) => [
              s.next,
              !canNext && s.nextDisabled,
              pressed && canNext && { opacity: 0.9 },
            ]}
            disabled={!canNext}
            onPress={() => router.push("/(child)/onboarding/verify-code")}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="다음"
          >
            <Text style={s.nextText} allowFontScaling={false}>
              다음
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const COLORS = {
  border: "#B6B6B6",
  text: "#000000",
  primary: "#1E90FF",
  bg: "#FFFFFF",
};

const s = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
  },
  wrap: {
    flexGrow: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 110,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    marginTop: 46,
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 25,
  },
  field: {
    marginTop: 24,
  },
  label: {
    fontSize: 18,
    lineHeight: 25,
    marginBottom: 9,
    fontWeight: "800",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: Platform.select({ ios: 14, android: 12 }),
    fontSize: 20,
    fontWeight: "500",
    color: COLORS.text,
  },
  inputFocused: {
    borderColor: "#66B3FF",
    borderWidth: 2,
  },
  nextRow: {
    alignItems: "flex-end",
    marginHorizontal: 24,
    marginBottom: 64,
  },
  nextRowWithKeyboard: {
    marginBottom: 32,
  },
  next: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
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
    backgroundColor: "#D9D9D9",
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "500",
  },
});
