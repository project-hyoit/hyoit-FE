import { useAuthStore } from "@hyoit/auth";
import { Redirect } from "expo-router";

export default function ChildIndex() {
  const hasOnboarded = useAuthStore((s) => s.hasOnboarded);

  if (!hasOnboarded) {
    return <Redirect href="/(child)/onboarding/parent-info" />;
  }

  return <Redirect href="/(child)/(tabs)" />;
}
