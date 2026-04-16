import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTranscribe } from "../model/useTranscribe";

export default function ChatDock({ onSend }: { onSend: (t: string) => void }) {
  const { value, setValue, clear } = useTranscribe();

  const send = () => {
    const t = value.trim();
    if (!t) return;
    onSend(t);
    clear();
  };

  return (
    <View style={s.wrap}>
      <TextInput
        style={s.input}
        placeholder="내용 입력"
        value={value}
        onChangeText={setValue}
        onSubmitEditing={send}
        returnKeyType="send"
        blurOnSubmit={Platform.OS === "android"}
      />
      <Pressable style={s.btn} onPress={send}>
        <Text style={s.btnText}>전송</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { flex: 1, flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  btn: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4B8CFF",
  },
  btnText: { color: "#FFFFFF", fontWeight: "600" },
});
