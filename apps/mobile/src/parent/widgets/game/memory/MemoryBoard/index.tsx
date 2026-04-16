import { useMemoryCardAnimation } from "@/entities/memory-game/lib/useMemoryCardAnimation";
import { Card } from "@/entities/memory-game/model/types";
import { useMemoryGameState } from "@/entities/memory-game/useMemoryGameState";
import type { FruitKey } from "@/shared/assets/fruits";
import { fruitSrc } from "@/shared/assets/fruits";
import { MEMORY_GAME } from "@/shared/config/constants";
import { useGridLayout } from "@/shared/lib/hooks/useGridLayout";
import React from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";
import MemoryTile from "../MemoryTile";
type Props = {
  items: Card[];
  cols?: number;
  disabled?: boolean;
  onPairMatched?: (fruit: FruitKey) => void;
  onMismatch?: () => void;
  onComplete?: () => void;
  revealAll?: boolean;
};

export default function MemoryBoard({
  items,
  cols = 4,
  disabled,
  onPairMatched,
  onMismatch,
  onComplete,
  revealAll = false,
}: Props) {
  const { tileSize, getItemMargins } = useGridLayout(cols);
  const gameState = useMemoryGameState(items, onMismatch, onComplete);
  const cardAnimation = useMemoryCardAnimation({
    itemCount: items.length,
    revealAll,
    matchedCards: gameState.matched,
  });

  const handlePress = (i: number) => {
    if (disabled || gameState.lock || cardAnimation.bulkFlipping || revealAll)
      return;
    if (gameState.matched.has(i)) return;
    if (gameState.open.includes(i)) return;

    if (gameState.open.length === 0) {
      gameState.setOpen([i]);
      cardAnimation.flipCardSafe(i, 1).start();
      return;
    }

    if (gameState.open.length === 1) {
      const first = gameState.open[0];
      const second = i;

      // 페어 판정 완료 전까지 입력 금지
      gameState.setLock(true);

      cardAnimation.flipCardSafe(second, 1).start(() => {
        const same = items[first].fruit === items[second].fruit;

        if (same) {
          gameState.setMatched((prev) => {
            const nx = new Set(prev);
            nx.add(first);
            nx.add(second);
            return nx;
          });
          gameState.setOpen([]);
          gameState.setLock(false);
          onPairMatched?.(items[first].fruit);
        } else {
          // mismatch시 순차적으로 뒤집기
          cardAnimation.flipCardsSequentially(first, second, 0);
          gameState.setOpen([]);
          gameState.setLock(false);
          onMismatch?.();
        }
      });
      return;
    }
  };

  return (
    <View style={{ paddingHorizontal: MEMORY_GAME.HPAD, paddingTop: 6 }}>
      <View style={styles.wrap}>
        {items.map((card, i) => {
          const margins = getItemMargins(i, items.length);
          const transforms = cardAnimation.getCardTransforms(i);

          return (
            <Pressable
              key={card.id}
              disabled={
                disabled ||
                gameState.lock ||
                cardAnimation.bulkFlipping ||
                revealAll
              }
              onPress={() => handlePress(i)}
              style={margins}
            >
              <View
                style={[
                  styles.card,
                  { width: tileSize, height: tileSize, borderRadius: 12 },
                ]}
              >
                {/* back */}
                <Animated.View
                  renderToHardwareTextureAndroid
                  style={[
                    styles.face,
                    {
                      opacity: transforms.backOpacity,
                      transform: [
                        { perspective: 800 },
                        { rotateY: transforms.backRotateY },
                      ],
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.backInner,
                      { width: tileSize * 0.8, height: tileSize * 0.8 },
                    ]}
                  />
                </Animated.View>

                {/* front */}
                <Animated.View
                  renderToHardwareTextureAndroid
                  style={[
                    styles.face,
                    {
                      opacity: transforms.frontOpacity,
                      transform: [
                        { perspective: 800 },
                        { rotateY: transforms.frontRotateY },
                      ],
                    },
                  ]}
                >
                  <MemoryTile size={tileSize} source={fruitSrc[card.fruit]} />
                </Animated.View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", flexWrap: "wrap" },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
    overflow: "hidden",
  },
  face: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  backInner: {
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
});
