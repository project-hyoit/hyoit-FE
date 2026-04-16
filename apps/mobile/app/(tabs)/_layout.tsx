import { QueryProvider } from "@/shared/providers/QueryProvider";
import { IconSymbol } from "@/shared/ui/IconSymbol";
import BottomTabBar from "@/widgets/BottomTabBar/BottomTabBar";
import { Tabs, usePathname } from "expo-router";
import React from "react";

export default function TabLayout() {
  const pathname = usePathname();
  const hideTabBar = pathname.includes("/game/memory/play");

  return (
    <QueryProvider>
      <Tabs
        tabBar={(props) => (hideTabBar ? null : <BottomTabBar {...props} />)}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="index"
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "시작",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="game"
          options={{
            title: "게임",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gamecontroller.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "대화",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={26} name="text.bubble.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "내 정보",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </QueryProvider>
  );
}
