import { useOnboardingStore } from "@/src/parent/entities/auth/model/onboarding.store";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProgressBar from "../../../../ui/ProgressBar";

const MIN_AGE = 1;
const MAX_AGE = 100;
const ITEM_HEIGHT = 72;
const VISIBLE_COUNT = 3;
const DEFAULT_AGE = 21;

export default function AgeInfoScreen() {
  const { age, set } = useOnboardingStore();
  const initialAge = useMemo(
    () => (age && Number(age) >= MIN_AGE && Number(age) <= MAX_AGE ? Number(age) : DEFAULT_AGE),
    [age]
  );
  const [selectedAge, setSelectedAge] = useState(initialAge);
  const initialAgeRef = useRef(initialAge);
  const scrollRef = useRef<ScrollView>(null);
  const ages = useMemo(
    () => Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, index) => MIN_AGE + index),
    []
  );

  useEffect(() => {
    if (!age) {
      set({ age: String(DEFAULT_AGE) });
    }
  }, [age, set]);

  useEffect(() => {
    set({ step: 2 });
  }, [set]);

  useEffect(() => {
    set({ age: String(selectedAge) });
  }, [selectedAge, set]);

  useEffect(() => {
    const index = Math.min(
      Math.max(initialAgeRef.current - MIN_AGE, 0),
      ages.length - 1
    );
    const timer = setTimeout(() => {
      scrollRef.current?.scrollTo({ y: index * ITEM_HEIGHT, animated: false });
    }, 50);

    return () => clearTimeout(timer);
  }, [ages.length]);

  const handleScrollEnd = (offsetY: number) => {
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const nextAge = Math.min(Math.max(MIN_AGE + index, MIN_AGE), MAX_AGE);
    setSelectedAge(nextAge);
  };

  return (
    <View style={s.wrap}>
      <ProgressBar current={2} total={4} />
      <Text style={s.title} allowFontScaling={false}>
        이번에는{"\n"}연세를 알려주세요!
      </Text>
      <Text style={s.subtitle} allowFontScaling={false}>
        가족이 부모님을 더 잘 이해할 수 있도록{"\n"}연세를 입력해주세요.
      </Text>

      <View style={s.pickerWrap}>
        <View style={s.pickerContent} pointerEvents="none">
          <View style={s.pickerOverlay} />
        </View>

        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onMomentumScrollEnd={(event) => {
            handleScrollEnd(event.nativeEvent.contentOffset.y);
          }}
          onScrollEndDrag={(event) => {
            handleScrollEnd(event.nativeEvent.contentOffset.y);
          }}
          contentContainerStyle={s.scrollContainer}
        >
          {ages.map((item) => (
            <View key={item} style={s.ageItem}>
              <Text
                style={item === selectedAge ? s.ageTextActive : s.ageText}
                allowFontScaling={false}
              >
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={s.nextRow}>
        <Pressable
          style={({ pressed }) => [
            s.next,
            pressed && { opacity: 0.9 },
          ]}
          onPress={() => router.push("/(parent)/onboarding/verify-code")}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="다음"
        >
          <Text style={s.nextText} allowFontScaling={false}>
            다음
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const COLORS = {
  border: "#E6E7F0",
  label: "#454545",
  text: "#000000",
  inactiveText: "rgba(0, 0, 0, 0.35)",
  activeText: "#1E90FF",
  primary: "#1E90FF",
  bg: "#FFFFFF",
  panel: "#F8F9FF",
};

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
    paddingTop: 110,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    marginTop: 46,
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    color: "rgba(0, 0, 0, 0.6)",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 25,
  },
  pickerWrap: {
    marginTop: 40,
    height: ITEM_HEIGHT * VISIBLE_COUNT,
    justifyContent: "center",
  },
  pickerContent: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  pickerOverlay: {
    position: "absolute",
    top: ITEM_HEIGHT,
    width: "40%",
    height: ITEM_HEIGHT,
    borderRadius: 18,
    backgroundColor: "#1E90FF",
  },
  scrollContainer: {
    paddingTop: ITEM_HEIGHT,
    paddingBottom: ITEM_HEIGHT,
  },
  ageItem: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  ageText: {
    fontSize: 20,
    color: COLORS.inactiveText,
    fontWeight: "500",
  },
  ageTextActive: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  nextRow: {
    marginTop: "auto",
    alignItems: "flex-end",
    marginBottom: 64,
  },
  next: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 15,
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
    }),
  },
  nextText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "500",
  },
});
