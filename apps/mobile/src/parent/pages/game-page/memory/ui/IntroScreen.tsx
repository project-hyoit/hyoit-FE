import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { fruitSrc } from "@/src/parent/entities/memory-game/lib/fruits";
import DifficultyCard from "./DifficultyCard";

const PRIMARY = "#1E90FF";

type Difficulty = "easy" | "normal" | "hard";

export default function IntroScreen() {
  const [selected, setSelected] = useState<Difficulty | null>(null);
  const insets = useSafeAreaInsets();

  const start = () => {
    if (!selected) return;
    router.push({ pathname: "/game/memory/play", params: { level: selected } });
  };

  return (
    <View style={s.page}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          s.content,
          { paddingBottom: 24 + (selected ? 112 : 0) },
        ]}
      >
        <Text style={s.title}>카드 맞추기</Text>
        <Text style={s.desc}>
          같은 모양의 카드끼리의 위치를 기억해서{"\n"}알맞은 카드끼리
          뒤집으세요!
        </Text>

        <View style={{ gap: 14, marginTop: 8 }}>
          <DifficultyCard
            label="쉬움"
            image={fruitSrc.apple}
            headline="8장의 카드로 시작해요"
            selected={selected === "easy"}
            onPress={() => setSelected("easy")}
          />
          <DifficultyCard
            label="보통"
            image={fruitSrc.banana}
            headline="12장의 카드로 시작해요"
            selected={selected === "normal"}
            onPress={() => setSelected("normal")}
          />
          <DifficultyCard
            label="어려움"
            image={fruitSrc.orange}
            headline="16장의 카드로 시작해요"
            selected={selected === "hard"}
            onPress={() => setSelected("hard")}
          />
        </View>
      </ScrollView>

      {selected && (
        <View
          style={[s.bottomBar, { paddingBottom: insets.bottom + 16 }]}
        >
          <Pressable
            onPress={start}
            style={s.cta}
            android_ripple={{ color: "#e9f2ff" }}
          >
            <Text style={s.ctaText}>시작하기</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F6F7F9",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 76,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#111",
    textAlign: "center",
  },
  desc: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: "#777777",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 36,
  },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: "transparent",
  },
  cta: {
    width: "100%",
    backgroundColor: PRIMARY,
    paddingVertical: 17,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  ctaText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
