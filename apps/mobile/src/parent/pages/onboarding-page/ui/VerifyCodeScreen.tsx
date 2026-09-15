import { router } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import ProgressBar from "../../../../shared/ui/ProgressBar";
import { useOnboardingStore } from "@/src/shared/entities/onboarding/model/onboarding.store";
import { IconSymbol } from "@/src/shared/ui";

export default function VerifyCodeScreen() {
  const myCode = "927582";
  const setStore = useOnboardingStore((s) => s.set);

  useEffect(() => {
    setStore({ step: 3 });
  }, [setStore]);

  const INITIAL = 180; // 3 minutes in seconds
  const [remaining, setRemaining] = useState(INITIAL);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleTimeout = useCallback(() => {
    router.replace("/(parent)/onboarding/fail");
  }, []);

  const startTimer = useCallback(() => {
    setRemaining(INITIAL);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  useEffect(() => {
    if (remaining !== 0) {
      return;
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    handleTimeout();
  }, [handleTimeout, remaining]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleResendSmall = () => {
    // TODO: call resend API
    startTimer();
  };

  const handleNext = () => {
    // 로딩 페이지로 이동하여 내부 처리(애니메이션) 후 success/fail로 이동
    router.push({
      pathname: "/(parent)/onboarding/verify-loading",
      params: { codeInput: myCode },
    });
  };

  return (
    <View style={s.wrap}>
      <ProgressBar current={3} total={4} />
      <Text style={s.title} allowFontScaling={false}>
        연결번호가 만들어졌어요{"\n"}자녀에게 알려주세요
      </Text>
      <Text style={s.subtitle} allowFontScaling={false}>
        아래 번호를 자녀 앱에서 입력하면{"\n"}가족 연결이 시작돼요.
      </Text>

    <View style={s.indexCard}>
        <View style={s.myCodeCard}>
          <View style={s.codeRow}>
            {myCode.split("").map((num, index) => (
              <View key={index} style={s.codeBox}>
                <Text style={s.codeText} allowFontScaling={false}>
                  {num}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={s.successHint}>
          <View style={s.successIconWrap}>
            <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
          </View>
          <Text style={s.successHintText} allowFontScaling={false}>
            번호를 자녀에게 알려주세요!.
          </Text>
        </View>
      </View>
      <View style={s.timerRow}>
        <Text style={s.timerText}>{formatTime(remaining)}</Text>
        <Pressable onPress={handleResendSmall} hitSlop={8}>
          <Text style={s.resendSmall}>다시받기</Text>
        </Pressable>
      </View>

      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [s.next, pressed && { opacity: 0.9 }]}
          onPress={handleNext}
          hitSlop={8}
        >
          <Text style={s.nextText}>다음</Text>
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
    fontSize: 24,
    lineHeight: 36,
    color: COLORS.text,
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
  myCodeCard: {
    alignItems: "center",
    marginBottom: 20,
    gap: 20,
  },
  codeRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 5,
  },
  codeBox: {
    width: 40,
    height: 48,
    backgroundColor: "#E9E9E9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  codeText: {
    fontSize: 32,
    fontWeight: "700",
  },
  successHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 8,
    backgroundColor: "#F0F6FF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  successIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  successHintText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: "500",
  },
  modalButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  recertification: {
    backgroundColor:"#1E8FFF",
    marginTop: "auto",
    marginBottom: 58,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:14,
  },
  recertificationText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center", 
  },
  indexCard: {
    marginTop: 20,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 12,
    borderWidth: 1,
    padding: 24,
  },
  bottomSheet: {
    width: 364,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
  },
  sheetTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 16,
  },
  userCard: {
    backgroundColor:"#F5F5F5",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 36,
    justifyContent: "space-between",
    flexDirection: "row", 
    alignItems: "center",
  },
  surnameCircle:{
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#BCE1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  surnameText:{
    fontSize:20,
    fontWeight:"600",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    marginLeft: -24,
  },
  phone: {
    fontSize: 16,
    fontWeight: "500",
    color: "#434343",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: {
    color: "#262626",
    fontSize: 20,
    fontWeight: "500",
  },
  cancelButton: {
    paddingVertical:10,
    paddingHorizontal:48,
    backgroundColor:"#F5F5F5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ok: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "500",
  },
  okButton: {
    paddingVertical:10,
    paddingHorizontal:48,
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  timerText: {
    fontSize: 14,
    color: "rgba(0,0,0,0.6)",
  },
  resendSmall: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
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
  nextText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
});
