import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  size: number;
  source: ImageSourcePropType;
};

export default function MemoryTile({ size, source }: Props) {
  return (
    <View style={[s.box, { width: size, height: size, borderRadius: 12 }]}>
      <Image source={source} style={s.img} resizeMode="contain" />
    </View>
  );
}

const s = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  img: { width: "72%", height: "72%" },
});
