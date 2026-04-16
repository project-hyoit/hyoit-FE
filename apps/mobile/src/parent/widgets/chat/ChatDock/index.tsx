import ChatComposer from "@/src/parent/features/chat/send-message/ui/ChatComposer";
import MicButton from "@/src/parent/features/chat/transcribe-voice/ui/MicButton";
import { StyleSheet, View } from "react-native";

interface ChatDockProps {
  onSend: (text: string) => void;
  onVoice?: (text: string) => void;
}

export default function ChatDock({ onSend, onVoice }: ChatDockProps) {
  return (
    <View style={s.wrap}>
      <ChatComposer onSend={onSend} />
      {onVoice ? <MicButton onText={onVoice} /> : null}
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
