import { Bubble } from "@/shared/ui/Bubble";
import React, { ReactNode } from "react";
import { FlatList, View } from "react-native";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageList({
  items,
  children,
}: {
  items: Message[];
  children?: ReactNode;
}) {
  return (
    <FlatList
      data={items}
      keyExtractor={(_, i) => String(i)}
      contentContainerStyle={{ gap: 8, paddingBottom: 8, minHeight: 240 }}
      ListHeaderComponent={children ? <>{children}</> : null}
      renderItem={({ item }) => (
        <View>
          <Bubble role={item.role}>{item.content}</Bubble>
        </View>
      )}
    />
  );
}