import PlayContainer from "@/features/game/memory/play-session/ui/PlayContainer";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function PlayScreen() {
  const { level } = useLocalSearchParams<{ level?: string }>();
  return <PlayContainer level={level} />;
}
