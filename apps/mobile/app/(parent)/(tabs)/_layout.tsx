import { IconSymbol } from "@/src/parent/shared/ui/IconSymbol";
import BottomTabBar from "@/src/parent/widgets/BottomTabBar/BottomTabBar";
import { Tabs } from "expo-router";

const ACTIVE = "#1E90FF";
const INACTIVE = "#D9D9D9";

export default function ParentTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ focused, size }) => (
            <IconSymbol
              name="house.fill"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "채팅",
          tabBarIcon: ({ focused, size }) => (
            <IconSymbol
              name="message.fill"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="game"
        options={{
          title: "게임",
          tabBarIcon: ({ focused, size }) => (
            <IconSymbol
              name="gamecontroller.fill"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "프로필",
          tabBarIcon: ({ focused, size }) => (
            <IconSymbol
              name="person.fill"
              size={size}
              color={focused ? ACTIVE : INACTIVE}
            />
          ),
        }}
      />
    </Tabs>
  );
}
