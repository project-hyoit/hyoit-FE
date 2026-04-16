import type { FruitKey } from "@/shared/assets/fruits";

export type Card = {
  id: string;
  fruit: FruitKey;
};

export type Deck = Card[];

export type MatchedState = ReadonlySet<FruitKey>; // 과일 단위 표시용
export type MatchedIndexSet = ReadonlySet<number>; // 보드 인덱스 단위 매칭 (보드 내부용)
