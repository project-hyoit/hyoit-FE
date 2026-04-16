import { useCardFlip } from "@/shared/lib/animations/useCardFlip";
import React, { useEffect } from "react";
import { Animated } from "react-native";

interface UseMemoryCardAnimationProps {
  itemCount: number;
  revealAll: boolean;
  matchedCards: Set<number>;
}

export const useMemoryCardAnimation = ({
  itemCount,
  revealAll,
  matchedCards,
}: UseMemoryCardAnimationProps) => {
  const cardAnimation = useCardFlip(itemCount, revealAll);

  const didMount = React.useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    cardAnimation.flipAllCards(revealAll ? 1 : 0, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealAll]);

  // 매칭된 카드는 뒤집지 않는 flipTo 함수
  const flipCardSafe = (index: number, toValue: 0 | 1) => {
    if (matchedCards.has(index)) {
      return Animated.timing(new Animated.Value(0), {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      });
    }
    return cardAnimation.flipCard(index, toValue);
  };

  const flipCardsSequentially = (
    firstIndex: number,
    secondIndex: number,
    toValue: 0 | 1,
    delay: number = 600
  ) => {
    setTimeout(() => {
      const animations: Animated.CompositeAnimation[] = [];

      if (!matchedCards.has(firstIndex)) {
        animations.push(flipCardSafe(firstIndex, toValue));
      }
      if (!matchedCards.has(secondIndex)) {
        animations.push(flipCardSafe(secondIndex, toValue));
      }

      if (animations.length > 0) {
        Animated.parallel(animations).start();
      }
    }, delay);
  };

  return {
    ...cardAnimation,
    flipCardSafe,
    flipCardsSequentially,
  };
};
