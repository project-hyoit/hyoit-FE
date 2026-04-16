// 카드 수, HP, 카운트 다운 등 난이도별 설정과 상태 타입
import type { Deck } from "@/entities/memory-game/model/types";
import type { FruitKey } from "@/shared/assets/fruits";

export type Phase = "countdown" | "playing" | "done";
export type DoneType = null | "success" | "fail";

export type SessionState = {
  phase: Phase;
  hearts: number;
  doneType: DoneType;
  deck: Deck;
};

export type BoardProps = {
  items: Deck;
  disabled: boolean;
  revealAll: boolean;
  onMismatch: () => void;
  onPairMatched: (fruit: FruitKey) => void; // FruitKey 문자열
};

export type TrayProps = {
  fruits: readonly FruitKey[];
  matched: ReadonlySet<FruitKey>;
};

export type OverlayProps = {
  visible: boolean;
  success: boolean;
  onRetry: () => void;
  onBack: () => void;
};

// 훅 반환 형태를 UI 묶음으로
export type PlaySessionReturn = {
  headerProps: { title: string; hearts: number }; // PlayHeader용
  boardProps: BoardProps;
  trayProps: TrayProps;
  overlayProps: OverlayProps;
  layoutProps: { revealAll: boolean; disabled: boolean }; // 필요 시
};
