import { useState } from "react";
import { loginWithKakao } from "../api/loginWithKakao";
import { saveToken } from "@hyoit/storage";
import { createLoginSession } from "../lib/loginSession";
import { useAuthStore } from "./authStore";

interface UseLoginWithKakaoOptions {
  getKakaoAccessToken?: () => Promise<string>;
  onSuccess?: (result: Awaited<ReturnType<typeof loginWithKakao>>) => void;
  onError?: (error: unknown) => void;
}

export function useLoginWithKakao(options?: UseLoginWithKakaoOptions) {
  const setSignedIn = useAuthStore((state) => state.setSignedIn);
  const setFirstLogin = useAuthStore((state) => state.setFirstLogin);
  const setRole = useAuthStore((state) => state.setRole);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const login = async () => {
    try {
      setIsPending(true);
      setError(null);

      const kakaoAccessToken = await options?.getKakaoAccessToken?.();
      const result = await loginWithKakao(kakaoAccessToken);

      await saveToken({
        accessToken: result.accessToken,
      });

      const session = createLoginSession(result);
      setSignedIn(session.isSignedIn);
      setFirstLogin(session.firstLogin);
      setRole(session.role);
      options?.onSuccess?.(result);
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
