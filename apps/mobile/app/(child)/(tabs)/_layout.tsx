import { Tabs } from "expo-router";

export default function ChildTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
        }}
      />
    </Tabs>
  );
}
