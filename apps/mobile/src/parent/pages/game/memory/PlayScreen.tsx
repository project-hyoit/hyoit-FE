import PlayContainer from "@/src/parent/features/game/memory/play-session/ui/PlayContainer";
import { useLocalSearchParams } from "expo-router";

export default function PlayScreen() {
  const { level } = useLocalSearchParams<{ level?: string }>();
  return <PlayContainer level={level} />;
}
