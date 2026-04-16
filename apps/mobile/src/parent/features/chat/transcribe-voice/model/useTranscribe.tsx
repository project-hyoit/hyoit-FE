import { useState } from "react";

/**
 * 퍼블리싱용 더미 음성 전사 훅
 * 실제 붙일 땐 Expo AV/Audio + 서버 전사 API로 교체
 */
export function useTranscribe() {
  const [recording, setRecording] = useState(false);
  const [text, setText] = useState<string | null>(null);

  const start = async () => {
    setRecording(true);
  };
  const stop = async () => {
    setRecording(false);
    // 데모용 예시 텍스트
    setText("가까운 공원 추천해줘");
  };

  return { recording, text, start, stop, setText };
}
