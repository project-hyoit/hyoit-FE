import type { Deck } from "@/entities/memory-game/model/types";
import type { FruitKey } from "@/shared/assets/fruits";

export function createDeck(base: readonly FruitKey[], seed: number): Deck {
  const pairs = [...base, ...base];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((fruit, idx) => ({ id: `${fruit}_${idx}_${seed}`, fruit }));
}
