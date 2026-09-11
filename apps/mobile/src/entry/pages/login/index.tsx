import { useLoginWithKakao } from "@hyoit/auth";
import { KakaoLoginButton } from "@hyoit/ui";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import kakaoIcon from "@/src/entry/assets/images/kakao_icon.png";
import { BG, SUBTEXT } from "../../shared/config/theme";
import { navigateToTarget } from "../../shared/lib/router";

export default function LoginPage() {
  const { bottom } = useSafeAreaInsets();

  const { login, error } = useLoginWithKakao({
    onSuccess: () => {
      navigateToTarget("choose");
    },
  });

  return (
    <View style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.brand}>
          <Text style={styles.welcometext}>안녕하세요 👋{"\n"}효잇에 온걸 환영해요</Text>
          <Text style={styles.tip}>카카오 계정으로 쉽게 로그인할 수 있어요.</Text>
        </View>

        <View style={[styles.actions, { paddingBottom: bottom + 40 }]}>
          <KakaoLoginButton
            onPress={login}
            accessibilityLabel="카카오 계정으로 간편 로그인"
            iconSource={kakaoIcon}
          />

          <Text style={styles.caption} allowFontScaling={false}>
            *카카오 계정으로만 로그인이 가능합니다
          </Text>

          {error ? (
            <Text style={styles.errorText}>로그인에 실패했어요.</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  container: {
    flex: 1,
    paddingHorizontal: 26,
    justifyContent: "space-between",
  },
  brand: {
    marginTop: 124,
    justifyContent: "center",
  },
  welcometext:{
    fontSize: 25,
    fontWeight: "800",
  },
  tip:{
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: 'rgba(0,0,0,0.7)',
  },
  actions: {
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  caption: {
    color: SUBTEXT,
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  errorText: {
    marginTop: 4,
    color: "#FF4757",
    fontSize: 14,
    textAlign: "center",
  },
});
