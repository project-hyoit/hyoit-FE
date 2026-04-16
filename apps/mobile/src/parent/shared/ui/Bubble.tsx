import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <View style={[styles.base, isUser ? styles.user : styles.assistant]}>
      <Text
        style={[styles.text, isUser ? styles.userText : styles.assistText]}
      ></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    maxWidth: "80%",
    paddingVertical: 18,
    paddingHorizontal: 13,
    borderRadius: 14,
    shadowColor: "$#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  assistant: {
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
  },
  user: {
    alignSelf: "flex-end",
    backgroundColor: "#4B8CFF",
  },
  text: {
    fontSize: 15,
    lineHeight: 21,
  },
  assistText: {
    color: "#121417",
  },
  userText: {
    color: "#FFFFFF",
  },
});
