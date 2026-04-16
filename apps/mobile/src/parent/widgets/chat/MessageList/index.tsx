import { Bubble } from "@/src/parent/shared/ui/Bubble";
import { FlatList, View } from "react-native";

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
