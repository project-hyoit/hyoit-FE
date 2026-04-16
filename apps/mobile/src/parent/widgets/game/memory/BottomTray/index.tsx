import { fruitSrc, type FruitKey } from "@/shared/assets/fruits";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  fruits: readonly FruitKey[];
  matched?: ReadonlySet<FruitKey>;
  style?: StyleProp<ViewStyle>;
};

export default function BottomTray({ fruits, matched, style }: Props) {
  const animRef = useRef<Map<FruitKey, Animated.Value>>(new Map());
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  if (animRef.current.size !== fruits.length) {
    fruits.forEach((k) => {
      if (!animRef.current.has(k))
        animRef.current.set(k, new Animated.Value(0));
    });
  }

  useEffect(() => {
    fruits.forEach((k) => {
      const v = animRef.current.get(k)!;
      const to = matched?.has(k) ? 1 : 0;

      Animated.spring(v, {
        toValue: to,
        useNativeDriver: true,
        tension: 220,
        friction: 18,
      }).start();
    });
  }, [fruits, matched]);

  return (
    <View style={[s.wrap, style]}>
      <Text style={s.title} allowFontScaling={false}>
        남은 모양
      </Text>
      <View style={s.row}>
        {fruits.map((k) => {
          const v = animRef.current.get(k)!;

          const iconOpacity = v.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.3],
          });

          const checkScale = v.interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          });
          const checkOpacity = v; // 0→1

          return (
            <View key={k} style={s.iconWrap}>
              <Animated.Image
                source={fruitSrc[k]}
                style={[s.icon, { opacity: iconOpacity }]}
                resizeMode="contain"
              />
              <Animated.View
                pointerEvents="none"
                style={[
                  s.badge,
                  {
                    transform: [{ scale: checkScale }],
                    opacity: checkOpacity,
                  },
                ]}
              >
                <Text style={s.badgeMark}>✓</Text>
              </Animated.View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 20,
    paddingBottom: 80,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 6,
    marginTop: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "800",
    color: "#111",
  },
  row: {
    marginTop: 28,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
  },
  iconWrap: { width: 28, height: 28 },
  icon: { width: 28, height: 28 },
  badge: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeMark: {
    fontSize: 28,
    fontWeight: "900",
    color: "#22c55e",
  },
});
