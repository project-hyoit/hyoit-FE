import { completeSignup } from "@hyoit/auth";
import { getInvitationCode } from "@/src/shared/entities/family";
import { buildSignupRequest } from "@/src/shared/entities/onboarding/lib/signupRequest";
import { useOnboardingStore } from "@/src/shared/entities/onboarding/model/onboarding.store";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProgressBar from "../../../../shared/ui/ProgressBar";
import { IconSymbol } from "@/src/shared/ui";

type RequestState = "loading" | "ready" | "error";

export default function VerifyCodeScreen() {
  const { age, invitationCode, name, phone, set } = useOnboardingStore();
  const [requestState, setRequestState] = useState<RequestState>(
    invitationCode ? "ready" : "loading",
  );
  const [requestVersion, setRequestVersion] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    set({ step: 3 });
  }, [set]);

  useEffect(() => {
    if (invitationCode) {
      setRequestState("ready");
      return;
    }

    let cancelled = false;

    const issueInvitationCode = async () => {
      try {
        setRequestState("loading");
        setErrorMessage("");

        const signup = await completeSignup(
          buildSignupRequest({ name, age, phone, role: "child" }),
        );
        const code = signup.invitationCode ?? (await getInvitationCode());

        if (!code) {
          throw new Error("초대번호를 발급받지 못했어요.");
        }

        if (cancelled) return;
        set({ invitationCode: code, step: 3 });
        setRequestState("ready");
      } catch {
        if (cancelled) return;
        setErrorMessage("회원가입 또는 연결번호 발급에 실패했어요.");
        setRequestState("error");
      }
    };

    void issueInvitationCode();

    return () => {
      cancelled = true;
    };
  }, [age, invitationCode, name, phone, requestVersion, set]);

  const handleRetry = () => {
    setRequestState("loading");
    setRequestVersion((version) => version + 1);
  };

  const handleStart = () => {
    if (!invitationCode) return;
    router.replace("/(child)/onboarding/success");
  };

  return (
    <View style={s.wrap}>
      <ProgressBar current={3} total={4} />
      <Text style={s.title} allowFontScaling={false}>
        부모님께 전달할{"\n"}연결번호가 발급됐어요
      </Text>
      <Text style={s.subtitle} allowFontScaling={false}>
        아래 번호를 부모님 앱에 입력해달라고 알려주세요.
      </Text>

      {requestState === "loading" ? (
        <View style={s.stateContainer}>
          <ActivityIndicator size="large" color="#1E90FF" />
          <Text style={s.stateText}>연결번호를 발급하고 있어요...</Text>
        </View>
      ) : null}

      {requestState === "ready" && invitationCode ? (
        <View style={s.indexCard}>
          <View style={s.codeRow}>
            {invitationCode.split("").map((digit, index) => (
              <View key={`${digit}-${index}`} style={s.codeBox}>
                <Text style={s.codeText} allowFontScaling={false}>
                  {digit}
                </Text>
              </View>
            ))}
          </View>

          <View style={s.successHint}>
            <View style={s.successIconWrap}>
              <IconSymbol name="checkmark" size={16} color="#FFFFFF" />
            </View>
            <Text style={s.successHintText} allowFontScaling={false}>
              부모님이 이 번호를 입력하면 가족 연결이 완료돼요.
            </Text>
          </View>
        </View>
      ) : null}

      {requestState === "error" ? (
        <View style={s.errorContainer}>
          <Text style={s.errorText}>{errorMessage}</Text>
          <Pressable onPress={handleRetry} style={s.retryButton}>
            <Text style={s.retryText}>다시 시도</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [
            s.next,
            requestState !== "ready" && s.nextDisabled,
            pressed && requestState === "ready" && { opacity: 0.9 },
          ]}
          onPress={handleStart}
          disabled={requestState !== "ready"}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="시작하기"
        >
          <Text style={s.nextText}>시작하기</Text>
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
  stateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  stateText: {
    color: "#434343",
    fontSize: 16,
    fontWeight: "500",
  },
  indexCard: {
    marginTop: 20,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 12,
    borderWidth: 1,
    padding: 24,
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
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
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  errorText: {
    color: "#D93025",
    fontSize: 15,
    textAlign: "center",
  },
  retryButton: {
    borderRadius: 10,
    backgroundColor: "#F0F6FF",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  retryText: {
    color: "#1E90FF",
    fontSize: 16,
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
