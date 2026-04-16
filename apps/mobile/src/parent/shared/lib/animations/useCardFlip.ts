import { MEMORY_GAME } from "@/shared/config/constants";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

export const useCardFlip = (
  itemCount: number,
  initialRevealed: boolean = false
) => {
  const [bulkFlipping, setBulkFlipping] = useState(false);
  const flipsRef = useRef<Animated.Value[]>([]);

  const initialRef = useRef(initialRevealed);

  useEffect(() => {
    if (flipsRef.current.length !== itemCount) {
      flipsRef.current = Array.from(
        { length: itemCount },
        () => new Animated.Value(initialRef.current ? 1 : 0)
      );
    }
  }, [itemCount]);

  // 개별 카드 뒤집기 함수
  const flipCard = (index: number, toValue: 0 | 1) => {
    if (index < 0 || index >= flipsRef.current.length) {
      const initial = new Animated.Value(0);
      return Animated.timing(initial, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      });
    }

    const animatedValue = flipsRef.current[index]; // index(배열의 위치,슬롯) 즉, 이건 그 슬롯의 애니메이션 상태를 가리킴
    animatedValue.stopAnimation(); // 기존 애니메이션 중단

    return Animated.timing(animatedValue, {
      toValue,
      duration: MEMORY_GAME.FLIP_DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
  };

  // 모든 카드 일괄 뒤집기 (stagger 애니메이션)
  const flipAllCards = (toValue: 0 | 1, staggerDelay: number = 8) => {
    setBulkFlipping(true);

    return Animated.stagger(
      staggerDelay,
      flipsRef.current.map((animatedValue) =>
        Animated.timing(animatedValue, {
          toValue,
          duration: MEMORY_GAME.FLIP_DURATION,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        })
      )
    ).start(() => setBulkFlipping(false));
  };

  // 애니메이션 interpolation 값들 생성
  const getCardTransforms = (index: number) => {
    if (index < 0 || index >= flipsRef.current.length) {
      return {
        frontRotateY: "0deg",
        backRotateY: "0deg",
        frontOpacity: 0,
        backOpacity: 1,
      };
    }

    const progress = flipsRef.current[index];

    return {
      frontRotateY: progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["180deg", "0deg"],
      }),
      backRotateY: progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-180deg"],
      }),
      frontOpacity: progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.2, 1],
        extrapolate: "clamp",
      }),
      backOpacity: progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 0.8, 0],
        extrapolate: "clamp",
      }),
    };
  };

  return {
    flipsRef: flipsRef.current,
    bulkFlipping,
    flipCard,
    flipAllCards,
    getCardTransforms,
  };
};
