import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string; // ex) "쉬움 난이도"
  hearts: number; // ex) 8
  onBack?: () => void;
};

export default function PlayHeader({ title, hearts, onBack }: Props) {
  const router = useRouter();

  return (
    <View style={[s.wrap]}>
      <Pressable onPress={onBack ?? router.back} hitSlop={16} style={s.left}>
        <Text style={s.back}>◀</Text>
      </Pressable>

      <Text style={s.title}>{title}</Text>

      <View style={s.right}>
        <Image
          source={require("@/assets/images/hart.png")}
          style={s.heart}
          resizeMode="contain"
        />
        <Text style={s.heartCount}>× {hearts}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 80,
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    width: 20,
    alignItems: "flex-start",
  },
  back: {
    fontSize: 18,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
  },
  right: {
    minWidth: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  heart: {
    width: 30,
    height: 26,
    marginRight: 4,
  },
  heartCount: {
    fontSize: 28,
    fontWeight: "700",
  },
});
