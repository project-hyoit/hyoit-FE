import { resolveEntryTarget, useAuthStore } from "@hyoit/auth";
import { Redirect } from "expo-router";

export default function Index() {
  const { isSignedIn } = useAuthStore();

  const target = resolveEntryTarget({
    authenticated: isSignedIn,
    role: null,
  });

  if (target === "login") {
    return <Redirect href="/login" />;
  }

  if (target === "choose") {
    return <Redirect href="/choose" />;
  }

  return null;
}
