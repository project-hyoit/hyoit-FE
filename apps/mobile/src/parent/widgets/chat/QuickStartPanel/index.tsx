import { QuickChips } from "@/features/chat/quick-questions";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function QuickStartPanel({
  items,
  onPick,
}: {
  items: string[];
  onPick: (t: string) => void;
}) {
  return (
    <View style={s.panel}>
      <QuickChips items={items} onPick={onPick} />
    </View>
  );
}

const s = StyleSheet.create({
  panel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
});
