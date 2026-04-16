import type { FruitKey } from "@/src/parent/shared/assets/fruits";
import type { Deck } from "../model/types";

export function createDeck(base: readonly FruitKey[], seed: number): Deck {
  const pairs = [...base, ...base];
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  return pairs.map((fruit, idx) => ({ id: `${fruit}_${idx}_${seed}`, fruit }));
}
