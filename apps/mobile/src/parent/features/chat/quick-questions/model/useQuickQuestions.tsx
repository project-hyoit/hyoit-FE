import { useMemo } from "react";

export function useQuickQuestions() {
  // 퍼블리싱 단계엔 고정 더미 데이터
  return useMemo(
    () => [
      "가족이랑 어디로 놀러갈까?",
      "무릎이 찌르는 것처럼 아파",
      "여기에서 가장 가까운 병원 알려줘",
    ],
    []
  );
}
