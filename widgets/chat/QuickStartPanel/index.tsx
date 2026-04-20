import { QuickChips } from "@/features/chat/quick-questions";
import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

export default function QuickStartPanel({
  items,
  onPick,
}: {
  items: string[];
  onPick: (t: string) => void;
}) {
  return (
    <View style={s.panel}>
      <View style={s.header}>
        <Image 
          source={require("../../../assets/chat/character.png")} 
          style={s.avatar} 
          resizeMode="contain"
        />
        <Text style={s.greeting}>
          아래 있는 질문을 클릭해서 대화를 시작해 보세요.
        </Text>
      </View>
      <QuickChips items={items} onPick={onPick} />
    </View>
  );
}

const s = StyleSheet.create({
  panel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
    width: 294,
  },
  header: {
    marginBottom: 16,
  },
  avatar: {
    width: 122,
    height: 143,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
});