import { useAuthStore } from "@/entities/auth/model/authStore";
import { Redirect } from "expo-router";
export default function Index() {
  const { isSignedIn, hasOnboarded } = useAuthStore();
  if (!isSignedIn) return <Redirect href="/login" />;
  if (!hasOnboarded) return <Redirect href="/onboarding/user-info" />;
  return <Redirect href="/(tabs)" />;
}
