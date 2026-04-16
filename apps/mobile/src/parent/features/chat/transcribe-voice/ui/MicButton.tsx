import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
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
      <Text style={s.txt}>{recording ? "녹음중..." : "음성"}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9ECEF",
    marginLeft: 6,
  },
  rec: { backgroundColor: "#FFE3E3" },
  txt: { fontWeight: "600" },
});
