import { IconSymbol } from "@/shared/ui/IconSymbol";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  icon: React.ComponentProps<typeof IconSymbol>["name"];
};

export default function Header({ title, icon }: Props) {
  return (
    <View style={styles.wrap}>
      <IconSymbol size={24} name={icon} color="#000" />
      <Text style={styles.title} allowFontScaling={false}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
