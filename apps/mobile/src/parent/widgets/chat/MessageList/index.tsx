import { Bubble } from "@/shared/ui/Bubble";
import React from "react";
import { FlatList, View } from "react-native";

// ✅ Message 타입을 이 파일 안에서 직접 정의
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageList({ items }: { items: Message[] }) {
  return (
    <FlatList
      data={items}
      keyExtractor={(_, i) => String(i)}
      contentContainerStyle={{ gap: 8, paddingBottom: 8, minHeight: 240 }}
      renderItem={({ item }) => (
        <View>
          <Bubble role={item.role}>{item.content}</Bubble>
        </View>
      )}
    />
  );
}
