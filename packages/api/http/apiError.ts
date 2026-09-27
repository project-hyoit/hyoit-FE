import axios from "axios";

export const API_ERROR_KINDS = ["HTTP", "TIMEOUT", "NETWORK", "UNKNOWN"] as const;

export type ApiErrorKind = (typeof API_ERROR_KINDS)[number];

export interface ApiErrorOptions {
  kind: ApiErrorKind;
  message: string;
  status?: number;
  code?: number | string;
  data?: unknown;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly code?: number | string;
  readonly data?: unknown;
  readonly cause?: unknown;

  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.name = "ApiError";
    this.kind = options.kind;
    this.status = options.status;
    this.code = options.code;
    this.data = options.data;
    this.cause = options.cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTimeoutError(error: { code?: string }): boolean {
  return error.code === "ECONNABORTED" || error.code === "ETIMEDOUT";
}

function getUnknownErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error) {
    return error;
  }

  return "Unknown API error";
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (!axios.isAxiosError(error)) {
    return new ApiError({
      kind: "UNKNOWN",
      message: getUnknownErrorMessage(error),
      cause: error,
    });
  }

  const responseData = error.response?.data;
  const payload = isRecord(responseData) ? responseData : undefined;
  const hasResponse = Boolean(error.response);
  const kind: ApiErrorKind = hasResponse
    ? "HTTP"
    : isTimeoutError(error)
      ? "TIMEOUT"
      : "NETWORK";

  return new ApiError({
    kind,
    status: error.response?.status,
    code:
      typeof payload?.code === "number" || typeof payload?.code === "string"
        ? payload.code
        : error.code,
    message:
      typeof payload?.message === "string" && payload.message
        ? payload.message
        : error.message || "Request failed",
    data: payload && "data" in payload ? payload.data : responseData,
    cause: error,
  });
}
