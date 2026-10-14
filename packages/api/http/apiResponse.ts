import type { ApiResponse } from "@hyoit/types";
import { ApiError } from "./apiError.ts";

export function unwrapApiResponse<T>(
  payload: ApiResponse<T>,
): T | undefined {
  if (!payload.success) {
    throw new ApiError({
      kind: "HTTP",
      code: payload.code,
      message: payload.message ?? "API 요청에 실패했습니다.",
      data: payload.data,
    });
  }

  return payload.data;
}
