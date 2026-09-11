import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import ProgressBar from "../../../../ui/ProgressBar";
import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import { IconSymbol } from "@/src/shared/ui";

interface VerifyLoadingScreenProps {
  codeInput?: string;
}

const EXPECTED_CODE = "927582";

export default function VerifyLoadingScreen({ codeInput }: VerifyLoadingScreenProps) {
  const setStore = useOnboardingStore((s) => s.set);
  useEffect(() => {
    setStore({ step: 3 });
  }, [setStore]);
  useEffect(() => {
    // 부모 측 로딩 (시뮬레이션)
    const timer = setTimeout(() => {
      if (codeInput === EXPECTED_CODE) {
        router.replace("/(child)/onboarding/success");
      } else {
        router.replace("/(child)/onboarding/fail");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [codeInput]);

  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

  }, [rotate]);

  const spin = rotate.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });

  return (
    <View style={s.wrap}>
      <ProgressBar current={3} total={4} />
      <Text style={s.title} allowFontScaling={false}>
        부모님 정보를 확인하고 있어요
      </Text>
      <Text style={s.subtitle} allowFontScaling={false}>
        잠시만 기다려주세요
      </Text>

      <View style={s.loadingContainer}>
        <Animated.View style={[s.ring, { transform: [{ rotate: spin }] }]} />
      </View>

      <View style={s.messageBox}>
        <View style={s.messageIconWrap}>
          <IconSymbol name="checkmark" size={18} color="#1E90FF" />
        </View>
        <Text style={s.message} allowFontScaling={false}>
          입력한 연결번호를 확인 중이에요.
        </Text>
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
    marginBottom: 20,
    textAlign: "left",
    alignSelf: "stretch",
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 25,
    color: "#000000",
    marginBottom: 60,
  },
  loadingContainer: {
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },
  ring: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "rgba(30,144,255,0.15)",
    borderTopColor: "#1E90FF",
    marginBottom: 12,
  },

  messageBox: {
    backgroundColor: "#F0F6FF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 40,
  },
  messageIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  message: {
    fontSize: 14,
    color: "#434343",
    fontWeight: "500",
    flex: 1,
  },
});
