import { useLoginWithKakao } from "@hyoit/auth";
import { KakaoLoginButton } from "@hyoit/ui";
import { Image, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <View style={styles.brand}>
          <Image
            style={styles.logo}
            source={require("@/assets/images/login/login_logo.png")}
          />
        </View>

        <View style={[styles.actions, { paddingBottom: bottom + 40 }]}>
          <KakaoLoginButton
            onPress={login}
            accessibilityLabel="카카오 계정으로 간편 로그인"
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
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  brand: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 86,
    height: 48,
    resizeMode: "contain",
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
    marginTop: 6,
  },
  errorText: {
    marginTop: 4,
    color: "#FF4757",
    fontSize: 14,
    textAlign: "center",
  },
});
