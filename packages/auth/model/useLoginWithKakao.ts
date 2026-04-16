import { useState } from "react";
import { loginWithKakao } from "../api/loginWithKakao";
import { saveToken } from "@hyoit/storage";
import { useAuthStore } from "./authStore";

interface UseLoginWithKakaoOptions {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export function useLoginWithKakao(options?: UseLoginWithKakaoOptions) {
  const setSignedIn = useAuthStore((state) => state.setSignedIn);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const login = async () => {
    try {
      setIsPending(true);
      setError(null);

      const result = await loginWithKakao();

      await saveToken({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      setSignedIn(true);
      options?.onSuccess?.();
    } catch (err) {
      setError(err);
      options?.onError?.(err);
    } finally {
      setIsPending(false);
    }
  };

  return {
    login,
    isPending,
    error,
  };
}
