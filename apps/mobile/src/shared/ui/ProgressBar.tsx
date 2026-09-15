import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, LayoutChangeEvent } from "react-native";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(1, total > 0 ? current / total : 0));
  const anim = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    Animated.timing(anim, {
      toValue: percent,
      duration: 450,
      useNativeDriver: false,
    }).start();
  }, [percent, anim]);

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, containerWidth || 0],
  });

  const onLayout = (e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width);

  return (
    <View style={s.fixedWrap} pointerEvents="none">
      <View style={s.container}>
        <View style={s.barBackground} onLayout={onLayout}>
          <Animated.View style={[s.barFill, { width }]} />
        </View>
        <Text style={s.fraction}>{`${current}/${total}`}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  fixedWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 70,
    zIndex: 50,
    paddingHorizontal: 24,
  },
  container: {
    width: "100%",
    paddingTop: 0,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    marginRight: 12,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    backgroundColor: "#1E90FF",
    borderRadius: 8,
  },
  fraction: {
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
    fontWeight: "600",
  },
});
