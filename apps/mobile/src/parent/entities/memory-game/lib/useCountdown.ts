import { useEffect, useState } from "react";

export function useCountdown(initial = 3) {
  const [count, setCount] = useState(initial);
  useEffect(() => {
    if (count <= 0) return;
    const t = setTimeout(() => setCount((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [count]);
  const reset = () => setCount(initial);
  return { count, reset };
}
