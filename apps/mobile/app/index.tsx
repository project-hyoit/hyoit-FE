import { resolveEntryTarget, useAuthStore } from "@hyoit/auth";
import { Redirect } from "expo-router";

export default function Index() {
  const { isSignedIn, role } = useAuthStore();

  const target = resolveEntryTarget({
    authenticated: isSignedIn,
    role,
  });

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
