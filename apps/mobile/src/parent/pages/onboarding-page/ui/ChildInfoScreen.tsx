import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import { router } from "expo-router";
import { useState, useEffect } from "react";
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
import ProgressBar from "@/src/ui/ProgressBar";

export default function ChildInfoScreen() {
  const { name, set } = useOnboardingStore();
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

  const canNext = Boolean(name.trim());
  const [isFocused, setIsFocused] = useState(false);


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
        안녕하세요!{"\n"}성함을 알려주세요
      </Text>
      <Text style={s.subtitle} allowFontScaling={false}>
        가족이 부모님을 알아볼 수 있도록{"\n"}실명을 입력해주세요.
      </Text>

      <View style={s.field}>
        <Text style={s.label} allowFontScaling={false}>
          성함
        </Text>
        <TextInput
          placeholder="예 : 김효잇"
          placeholderTextColor="#B6B6B6"
          value={name}
          onChangeText={(v) => set({ name: v })}
          style={[
            s.input,
            isFocused && s.inputFocused,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          returnKeyType="next"
        />
      </View>

        </ScrollView>

      <View
        style={[s.nextRow, isKeyboardVisible && s.nextRowWithKeyboard]}
      >
        <Pressable
          style={({ pressed }) => [
            s.next,
            !canNext && s.nextDisabled,
            pressed && canNext && { opacity: 0.9 },
          ]}
          disabled={!canNext}
          onPress={() => router.push("/(parent)/onboarding/age-info")}
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
  label: "#454545",
  text: "#000000",
  placeholder: "#B6B6B6",
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
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    lineHeight: 25,
    marginTop: 57,
    marginBottom: 9,
    fontWeight: "800",
  },
  input: {
  borderWidth: 1,
  borderColor: COLORS.border,
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: Platform.select({ ios: 14, android: 12 }),
  fontSize: 22,
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
    backgroundColor: "#1E90FF",
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
    backgroundColor: "#D9D9D9"
  },
  nextText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },

});
