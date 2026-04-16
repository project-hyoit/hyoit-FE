import Card from "@/shared/ui/Card";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  ctaLabel: string;
  onPress(): void;
};

export default function AskBanner({ title, ctaLabel, onPress }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.title} allowFontScaling={false}>
          {title}
        </Text>
        <Pressable onPress={onPress} hitSlop={8} style={styles.cta}>
          <Text style={styles.ctaText}>{ctaLabel}</Text>
          <Text style={styles.arrow}> ▶</Text>
        </Pressable>
      </View>

      <Image
        source={require("@/assets/images/character.jpg")}
        style={styles.img}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 22,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  left: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "800",
    color: "#000",
    marginBottom: 8,
    flexShrink: 1,
  },
  cta: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 },
  ctaText: { color: "#1E90FF", fontWeight: "700", fontSize: 16 },
  arrow: { color: "#1E90FF", fontSize: 18, marginTop: 1 },
  img: {
    width: 96,
    height: 96,
    resizeMode: "contain",
    marginLeft: 8,
    alignSelf: "flex-end",
  },
});
