import { IconSymbol } from "@/shared/ui/IconSymbol";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Action = {
  label: string;
  icon: React.ComponentProps<typeof IconSymbol>["name"];
  onPress(): void;
};

type Props = { left: Action; right: Action };

export default function ActionBarDual({ left, right }: Props) {
  const iconColor = "#fff";

  return (
    <View style={s.wrap}>
      <Pressable
        onPress={left.onPress}
        style={({ pressed }) => [s.btn, pressed && s.pressed]}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        accessibilityRole="button"
        accessibilityLabel={left.label}
        hitSlop={8}
      >
        <IconSymbol size={26} name={left.icon} color={iconColor} />
        <Text style={s.btnText} allowFontScaling={false}>
          {left.label}
        </Text>
      </Pressable>

      <View style={s.divider} />

      <Pressable
        onPress={right.onPress}
        style={({ pressed }) => [s.btn, pressed && s.pressed]}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        accessibilityRole="button"
        accessibilityLabel={right.label}
        hitSlop={8}
      >
        <IconSymbol size={28} name={right.icon} color={iconColor} />
        <Text style={s.btnText} allowFontScaling={false}>
          {right.label}
        </Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E90FF",
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  btn: {
    flex: 1,
    minHeight: 32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  pressed: { opacity: 0.9 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  divider: { width: 1, height: 28, backgroundColor: "#fff", borderRadius: 1 },
});
