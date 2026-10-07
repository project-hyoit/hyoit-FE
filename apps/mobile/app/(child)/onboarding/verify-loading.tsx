import { useLocalSearchParams } from "expo-router";
import { VerifyLoadingScreen } from "@/src/child/pages/onboarding-page";

export default function VerifyLoadingRoute() {
  const { codeInput } = useLocalSearchParams<{ codeInput: string }>();
  return <VerifyLoadingScreen codeInput={codeInput || ""} />;
}
