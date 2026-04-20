import React from "react";
import { Pressable, StyleSheet, Text, Image } from "react-native";
import { useTranscribe } from "../model/useTranscribe";

export default function MicButton({ onText }: { onText: (t: string) => void }) {
  const { recording, text, start, stop } = useTranscribe();

  React.useEffect(() => {
    if (text) onText(text);
  }, [text]);

  return (
    <Pressable
      style={[s.btn, recording && s.rec]}
      onPress={recording ? stop : start}
    >
      <Text style={s.txt}>{recording ? "녹음중..." : <Image source={require("../../../../assets/chat/recording.png")} style={s.img} />}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  rec: { 
    backgroundColor: "#FFE3E3" 
  },
  txt: { 
    fontWeight: "600" 
  },
  img: {
    width: 22,
    height: 22,
  },
});
