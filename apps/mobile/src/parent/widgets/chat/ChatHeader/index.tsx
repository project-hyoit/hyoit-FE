import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ChatHeader() {
  return (
    <View style={s.wrap}>
      <View style={s.avatar} />
      <Text style={s.title}>아래있는 질문을 클릭해서 대화를 시작해보세요</Text>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#DFE8FF",
  },
  title: { fontSize: 14, color: "#70757D", flexShrink: 1 },
});
