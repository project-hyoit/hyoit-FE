import { StyleSheet, View } from "react-native";

import HomeFeatureCard from "./HomeFeatureCard";

type WeatherCardData = {
  temperature: string;
  sky: string;
  maxTemperature: string;
  minTemperature: string;
};

type HomeCardGridProps = {
  onPressWeather: () => void;
  onPressRecentGreeting: () => void;
  onPressGame: () => void;
  onPressHelp: () => void;
  weather?: WeatherCardData;
  recentGreetingCount?: number;
};

export default function HomeCardGrid({
  onPressWeather,
  onPressRecentGreeting,
  onPressGame,
  onPressHelp,
  weather,
  recentGreetingCount = 0,
}: HomeCardGridProps) {
  return (
    <View style={s.container}>
      <View style={s.row}>
        <View style={s.col}>
          <HomeFeatureCard
            eyebrow="오늘의 날씨"
            title={weather?.temperature ?? "날씨"}
            description={
              weather
                ? `${weather.sky}\n최고 ${weather.maxTemperature} / 최저 ${weather.minTemperature}`
                : "날씨를 불러오는 중이에요."
            }
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
            description={
              recentGreetingCount > 0
                ? `새 안부 ${recentGreetingCount}개를\n확인해요.`
                : "최근에 받은 안부를\n확인해요."
            }
            ctaLabel="확인하기"
            backgroundColor="#F3EEFF"
            ctaColor="#6D45C7"
            visual="💌"
            badgeCount={recentGreetingCount}
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
