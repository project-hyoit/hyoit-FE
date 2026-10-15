import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { resolveEntryTarget, restoreAuthSession, useAuthStore } from "@hyoit/auth";
import { Redirect } from "expo-router";

const SPLASH_DURATION = 2000;

export default function Index() {
  const { isSignedIn, firstLogin, role, hasHydrated } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  const target = resolveEntryTarget({
    authenticated: isSignedIn,
    firstLogin,
    role,
  });

  useEffect(() => {
    void restoreAuthSession();
    const timer = setTimeout(() => setIsReady(true), SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady || !hasHydrated) {
    return (
      <View style={s.wrap}>
        <Image
          source={require("@/assets/images/hyoit-app-icon.png")}
          style={s.logo}
        />
      </View>
    );
  }

  if (target === "login") {
    return <Redirect href="/(entry)/login" />;
  }

  if (target === "choose") {
    return <Redirect href="/(entry)/choose" />;
  }

  if (target === "parent") {
    return <Redirect href="/(parent)" />;
  }

  if (target === "child") {
    return <Redirect href="/(child)" />;
  }

  return null;
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 84,
    height: 52,
    resizeMode: "contain",
  },
});
