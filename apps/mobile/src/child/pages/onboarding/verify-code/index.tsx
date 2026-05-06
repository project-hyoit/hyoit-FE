import { router } from "expo-router";
import { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function VerifyCodeScreen() {
  const myCode = "927582";
  const [childCode, setChildCode] = useState("");
  const [error, setError] = useState(false);
  const canNext = /^\d{6}$/.test(childCode);
  const handleNext = () => {
    if (childCode === myCode) {
      setError(false);
      router.push("/(child)/onboarding/success");
    } else {
      setError(true);
    }
  };

  return (
    <View style={s.wrap}>
      <Text style={s.title} allowFontScaling={false}>
        가족구성원 추가를 위한{"\n"}인증번호를 입력해주세요
      </Text>
      <View style={s.field}>
        <Text style={s.label}>인증번호</Text>

        <TextInput
          placeholder="부모님의 인증번호를 입력해주세요"
          placeholderTextColor="#B6B6B6"
          keyboardType="number-pad"
          maxLength={6}
          value={childCode}
          onChangeText={(v) => {
            setChildCode(v);
            setError(false);
          }}
          style={[
            s.input,
          ]}
        />
        {error && (
          <Text style={s.errorText}>
            인증번호가 다른 것 같아요 다시 입력해주세요
          </Text>
        )}
      </View>
      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [
            s.next,
            !canNext && s.nextDisabled,
            pressed && canNext && { opacity: 0.9 },
          ]}
          disabled={!canNext}
          onPress={handleNext}
        >
          <Text style={s.nextText}>다음</Text>
          <Text style={s.nextArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

const COLORS = {
  border: "#B6B6B6",
  label: "#454545",
  text: "#000000",
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
    fontSize: 24,
    lineHeight: 36,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: 64,
  },

  field: {
    marginBottom: 16,
  },

  label: {
    color: COLORS.label,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "600",
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

  errorText: {
    marginTop: 8,
    color: "#FF4757",
    fontSize: 12,
  },

  nextRow: {
    marginTop: "auto",
    alignItems: "flex-end",
    marginBottom: 64,
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
    backgroundColor: "#D9D9D9",
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