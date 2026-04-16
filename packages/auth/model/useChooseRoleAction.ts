import type { ChooseRoleResult, UserRole } from "@hyoit/types";
import { useState } from "react";
import { chooseRole } from "../api/chooseRole";
import { useAuthStore } from "./authStore";
interface UseChooseRoleActionOptions {
  onSuccess?: (result: ChooseRoleResult) => void;
  onError?: (error: unknown) => void;
}

export function useChooseRoleAction(options?: UseChooseRoleActionOptions) {
  const setRole = useAuthStore((state) => state.setRole);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const submit = async (role: UserRole) => {
    try {
      setIsPending(true);
      setError(null);

      const result = await chooseRole(role);

      setRole(result.role);
      options?.onSuccess?.(result);
    } catch (err) {
      setError(err);
      options?.onError?.(err);
    } finally {
      setIsPending(false);
    }
  };

  return {
    submit,
    isPending,
    error,
  };
}
