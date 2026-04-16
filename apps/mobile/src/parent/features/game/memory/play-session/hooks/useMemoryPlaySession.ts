import { createDeck } from "@/entities/memory-game/lib/createDeck";
import {
  levelCardCount,
  levelLabel,
  levelMaxHp,
} from "@/entities/memory-game/lib/levelConfig";
import { FRUITS, type FruitKey } from "@/shared/assets/fruits";
import { useCountdown } from "@/shared/lib/hooks/useCountdown";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import type { PlaySessionReturn } from "../model/session";

export function useMemoryPlaySession(level?: string): PlaySessionReturn {
  const cardCount = levelCardCount(level);
  const maxHp = levelMaxHp(level);
  const label = levelLabel(level);

  const base = useMemo(() => FRUITS.slice(0, cardCount), [cardCount]);

  const [seed, setSeed] = useState(0);
  const deck = useMemo(() => createDeck(base, seed), [base, seed]);

  // phase: countdown → playing → done
  const { count, reset: resetCountdown } = useCountdown(3);
  const [phase, setPhase] = useState<"countdown" | "playing" | "done">(
    "countdown"
  );
  useEffect(() => {
    if (phase === "countdown" && count <= 0) setPhase("playing");
  }, [count, phase]);

  // hearts
  const [wrong, setWrong] = useState(0);
  const hearts = Math.max(0, maxHp - wrong);
  useEffect(() => {
    setWrong(0);
  }, [maxHp, cardCount]); // 난이도/덱 변경 시 리셋

  const [doneType, setDoneType] = useState<null | "success" | "fail">(null);
  useEffect(() => {
    if (phase === "playing" && hearts <= 0) {
      setPhase("done");
      setDoneType("fail");
    }
  }, [phase, hearts]);

  // 매치 추적(과일 단위)
  const [matchedFruits, setMatchedFruits] = useState<Set<FruitKey>>(new Set());
  useEffect(() => setMatchedFruits(new Set()), [cardCount]); // 새 라운드

  // 남은 페어(렌더링 비의존 ref)
  const pairLeftRef = React.useRef(cardCount);
  useEffect(() => {
    pairLeftRef.current = cardCount;
  }, [cardCount]);

  const revealAll = phase === "countdown";
  const disabled = phase !== "playing" || !!doneType;

  const onMismatch = () => setWrong((w) => w + 1);

  const onPairMatched = (fruit: FruitKey) => {
    setMatchedFruits((prev) => {
      const next = new Set(prev);
      next.add(fruit);
      return next;
    });
    const left = Math.max(0, pairLeftRef.current - 1);
    pairLeftRef.current = left;
    if (left === 0) {
      setPhase("done");
      setDoneType("success");
    }
  };

  const retry = () => {
    setDoneType(null);
    setWrong(0);
    setMatchedFruits(new Set());
    pairLeftRef.current = cardCount;
    setSeed((s) => s + 1);
    setPhase("countdown");
    resetCountdown();
  };

  return {
    headerProps: { title: `${label} 난이도`, hearts },
    boardProps: {
      items: deck,
      disabled,
      revealAll,
      onMismatch,
      onPairMatched: (fruit: string) => onPairMatched(fruit as FruitKey),
    },
    trayProps: { fruits: base, matched: matchedFruits },
    overlayProps: {
      visible: !!doneType,
      success: doneType === "success",
      onRetry: retry,
      onBack: () => router.back(),
    },
    layoutProps: { revealAll, disabled },
  };
}
