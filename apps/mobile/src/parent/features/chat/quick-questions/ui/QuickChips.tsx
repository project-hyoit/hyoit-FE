import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function QuickChips({
  items,
  onPick,
}: {
  items: string[];
  onPick: (t: string) => void;
}) {
  return (
    <View style={s.wrap}>
      {items.map((q) => (
        <Pressable key={q} style={s.chip} onPress={() => onPick(q)}>
          <Text style={s.text}>{q}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    backgroundColor: "#E7F0FF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
  },
  text: { color: "#224455", fontSize: 14 },
});
