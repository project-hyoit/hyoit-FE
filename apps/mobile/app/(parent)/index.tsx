import { useAuthStore } from "@hyoit/auth";
import { Redirect } from "expo-router";

export default function ParentIndex() {
  const hasOnboarded = useAuthStore((s) => s.hasOnboarded);

  if (!hasOnboarded) {
    return <Redirect href="/(parent)/onboarding/child-info" />;
  }

  return <Redirect href="/(parent)/(tabs)" />;
}
