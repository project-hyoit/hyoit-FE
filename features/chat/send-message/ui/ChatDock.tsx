import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Image,
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
      <Pressable onPress={send} style={s.btn}>
        <Image
        style={s.Img}
        source={require("../../../../assets/chat/send.png")}
        />
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { 
    flex: 1, 
    flexDirection: "row", 
    gap: 8 
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  btnText: { 
    color: "#FFFFFF", 
    fontWeight: "600" 
  },
  btn: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Img: {
    width: 22,
    height: 16,
  },
});
