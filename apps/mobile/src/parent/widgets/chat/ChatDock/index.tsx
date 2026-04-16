import { ChatDockFeature } from "@/features/chat/send-message";
import { MicButton } from "@/features/chat/transcribe-voice";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function ChatDock({
  onSend,
  onVoice,
}: {
  onSend: (t: string) => void;
  onVoice?: (t: string) => void;
}) {
  return (
    <View style={s.wrap}>
      <ChatDockFeature onSend={onSend} />
      {onVoice && <MicButton onText={onVoice} />}
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
});
