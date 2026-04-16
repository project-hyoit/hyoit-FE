import { useCallback, useState } from "react";

/**
 * 메시지 입력 드래프트 관리 + (옵션) 음성 텍스트 주입
 */
export function useTranscribe() {
  const [value, setValue] = useState("");

  const clear = useCallback(() => setValue(""), []);
  const inject = useCallback(
    (t: string) => setValue((v) => (v ? `${v} ${t}` : t)),
    []
  );

  return { value, setValue, clear, inject };
}
