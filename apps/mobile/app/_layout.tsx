import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { queryClient } from "@/src/shared/lib/queryClient";

export default function RootLayout() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="dark" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
