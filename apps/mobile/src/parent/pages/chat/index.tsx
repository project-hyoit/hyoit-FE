import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

// 위젯
import ChatDock from "@/widgets/chat/ChatDock";
import ChatHeader from "@/widgets/chat/ChatHeader";
import MessageList from "@/widgets/chat/MessageList";
import QuickStartPanel from "@/widgets/chat/QuickStartPanel";

// 빠른 질문(칩) 피처
import { useQuickQuestions } from "@/features/chat/quick-questions";

// ✅ Message 타입을 이 파일 안에서 직접 정의
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "아래있는 질문을 클릭해서 대화를 시작해보세요",
    },
  ]);
  const quick = useQuickQuestions();

  const push = (role: Message["role"], text: string) =>
    setMessages((prev) => [...prev, { role, content: text }]);

  const send = (text: string) => {
    push("user", text);

    // 퍼블리싱용 더미 답변
    setTimeout(() => {
      push(
        "assistant",
        "가까운 공원에 가서 천천히 걸어보는 건 어때요? 바람 쐬면 한층 나아져요."
      );
    }, 250);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F7F9" }}>
      <View style={s.wrap}>
        <ChatHeader />
        <QuickStartPanel items={quick} onPick={send} />
        <View style={{ flex: 1 }}>
          <MessageList items={messages} />
        </View>
        <ChatDock onSend={send} onVoice={(t) => send(t)} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, gap: 12, padding: 16 },
});
