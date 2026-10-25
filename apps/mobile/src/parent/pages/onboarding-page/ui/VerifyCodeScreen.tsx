import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ProgressBar from "../../../../shared/ui/ProgressBar";
import { useOnboardingStore } from "@/src/shared/entities/onboarding/model/onboarding.store";
import { IconSymbol } from "@/src/shared/ui";

const CODE_LENGTH = 6;

export default function VerifyCodeScreen() {
  const setStore = useOnboardingStore((s) => s.set);
  const [codeInputs, setCodeInputs] = useState<string[]>(
    Array.from({ length: CODE_LENGTH }, () => ""),
  );
  const inputRefs = useRef<(TextInput | null)[]>(
    Array.from({ length: CODE_LENGTH }, () => null),
  );

  useEffect(() => {
    setStore({ step: 3 });
  }, [setStore]);

  const handleCodeInput = useCallback((text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(0, 1);
    setCodeInputs((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    if (digit && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleCodeBackspace = useCallback((index: number) => {
    setCodeInputs((current) => {
      const next = [...current];
      if (!next[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      next[index] = "";
      return next;
    });
  }, []);

  const handleNext = () => {
    const codeInput = codeInputs.join("");
    if (codeInput.length !== CODE_LENGTH) return;

    router.push({
      pathname: "/(parent)/onboarding/verify-loading",
      params: { codeInput },
    });
  };

  const isComplete = codeInputs.every(Boolean);

  return (
    <View style={s.wrap}>
      <ProgressBar current={3} total={4} />
      <Text style={s.title} allowFontScaling={false}>
        자녀의 연결번호를 입력해주세요.
      </Text>
      <Text style={s.subtitle} allowFontScaling={false}>
        자녀 앱에 표시된 연결번호를 입력하면{"\n"}가족 연결을 시작할 수 있어요.
      </Text>

      <View style={s.indexCard}>
        <View style={s.codeInputRow}>
          {codeInputs.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={s.codeInput}
              value={value}
              onChangeText={(text) => handleCodeInput(text, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleCodeBackspace(index);
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              selectionColor="#1E90FF"
              allowFontScaling={false}
              caretHidden
            />
          ))}
        </View>

        <View style={s.successHint}>
          <View style={s.successIconWrap}>
            <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
          </View>
          <Text style={s.successHintText} allowFontScaling={false}>
            자녀에게 받은 6자리 번호를 입력해주세요.
          </Text>
        </View>
      </View>

      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [
            s.next,
            !isComplete && s.nextDisabled,
            pressed && isComplete && { opacity: 0.9 },
          ]}
          onPress={handleNext}
          disabled={!isComplete}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="확인"
        >
          <Text style={s.nextText}>확인</Text>
        </Pressable>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 120,
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 12,
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 25,
    marginBottom: 20,
  },
  indexCard: {
    marginTop: 20,
    borderRadius: 12,
  },
  codeInputRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 5,
  },
  codeInput: {
    width: 48,
    height: 52,
    backgroundColor: "#E9E9E9",
    borderRadius: 12,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    padding: 0,
  },
  successHint: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    backgroundColor: "#F0F6FF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  successIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
  successHintText: {
    flex: 1,
    fontSize: 14,
    color: "#000000",
    fontWeight: "500",
  },
  nextRow: {
    marginTop: "auto",
    alignItems: "flex-end",
    marginBottom: 64,
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
    backgroundColor: "#D9D9D9",
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "500",
  },
});
