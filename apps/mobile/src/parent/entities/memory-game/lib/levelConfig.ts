export type Level = "easy" | "normal" | "hard" | undefined;

export const levelLabel = (lv?: string) =>
  lv === "easy" ? "쉬움" : lv === "hard" ? "어려움" : "보통";

export const levelCardCount = (lv?: string) =>
  lv === "easy" ? 4 : lv === "hard" ? 8 : 6;

export const levelMaxHp = (lv?: string) =>
  lv === "easy" ? 8 : lv === "hard" ? 5 : 6;
