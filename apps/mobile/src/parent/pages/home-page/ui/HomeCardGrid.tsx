import { StyleSheet, View } from "react-native";

import HomeFeatureCard from "./HomeFeatureCard";

type HomeCardGridProps = {
  onPressWeather: () => void;
  onPressRecentGreeting: () => void;
  onPressGame: () => void;
  onPressHelp: () => void;
};

export default function HomeCardGrid({
  onPressWeather,
  onPressRecentGreeting,
  onPressGame,
  onPressHelp,
}: HomeCardGridProps) {
  return (
    <View style={s.container}>
      <View style={s.row}>
        <View style={s.col}>
          <HomeFeatureCard
            eyebrow="오늘의 날씨"
            title="22°C"
            description={"맑음\n외출 전 날씨를\n확인해요."}
            ctaLabel="확인하기"
            backgroundColor="#FFF7DC"
            ctaColor="#7A5A00"
            visual="🌤️"
            onPress={onPressWeather}
          />
        </View>

        <View style={s.col}>
          <HomeFeatureCard
            eyebrow="최근 안부"
            title="받은 안부"
            description={"최근에 받은 안부를\n확인해요."}
            ctaLabel="확인하기"
            backgroundColor="#F3EEFF"
            ctaColor="#6D45C7"
            visual="💌"
            badgeCount={2}
            onPress={onPressRecentGreeting}
          />
        </View>
      </View>

      <View style={s.row}>
        <View style={s.col}>
          <HomeFeatureCard
            eyebrow="가벼운 놀이"
            title="카드 맞추기"
            description={"간단한 게임으로\n머리를 쉬어가요."}
            ctaLabel="시작하기"
            backgroundColor="#EFFFF4"
            ctaColor="#25874E"
            visual="🎴"
            onPress={onPressGame}
          />
        </View>

        <View style={s.col}>
          <HomeFeatureCard
            eyebrow="도움말"
            title="효잇 사용 방법"
            description={"궁금한 내용을\n확인할 수 있어요."}
            ctaLabel="바로가기"
            backgroundColor="#FFF0E8"
            ctaColor="#EF6A2E"
            visual="🎧"
            onPress={onPressHelp}
          />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    gap: 12,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  col: {
    flex: 1,
  },
});
