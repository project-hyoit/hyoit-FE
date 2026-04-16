// 게임 탭 전용 stack(라우팅 전용)
import { Stack } from "expo-router";

export default function GameStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="memory/index" />
      <Stack.Screen name="memory/play" />
    </Stack>
  );
}
