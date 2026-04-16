import DifficultyCard from "@/widgets/game/memory/DifficultyCard";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
          { paddingBottom: 24 + (selected ? 72 : 0) },
        ]}
      >
        <Image
          source={require("@/assets/images/banana-cards_02.png")}
          style={s.hero}
        />
        <Text style={s.title}>카드 맞추기</Text>
        <Text style={s.desc}>
          같은 모양의 카드끼리의 위치를 기억해서{"\n"}알맞은 카드끼리
          뒤집으세요!
        </Text>

        <View style={{ gap: 14, marginTop: 8 }}>
          <DifficultyCard
            label="쉬움"
            headline="90초의 시간이 주어져요"
            subline="게임을 처음하시는 분에게 추천해요"
            selected={selected === "easy"}
            onPress={() => setSelected("easy")}
          />
          <DifficultyCard
            label="보통"
            headline="60초의 시간이 주어져요"
            subline="게임에 적응이 되신 분에게 추천해요"
            selected={selected === "normal"}
            onPress={() => setSelected("normal")}
          />
          <DifficultyCard
            label="어려움"
            headline="30초의 시간이 주어져요"
            subline="게임을 많이 하신 분에게 추천해요"
            selected={selected === "hard"}
            onPress={() => setSelected("hard")}
          />
        </View>
      </ScrollView>

      {selected && (
        <View
          pointerEvents="box-none"
          style={[s.fabWrap, { bottom: insets.bottom + 12 }]}
        >
          <Pressable
            onPress={start}
            style={s.cta}
            android_ripple={{ color: "#e9f2ff" }}
          >
            <Text style={s.ctaText}>시작하기 →</Text>
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
  hero: {
    alignSelf: "center",
    width: 160,
    height: 160,
    resizeMode: "contain",
    marginVertical: 8,
    backgroundColor: "#F6F7F9",
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
    color: "#333",
    textAlign: "center",
    marginBottom: 36,
  },

  fabWrap: { position: "absolute", right: 20 },
  cta: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "800" },
});
