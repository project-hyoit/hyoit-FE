import assert from "node:assert/strict";
import test from "node:test";
import { AxiosError } from "axios";
import { normalizeApiError } from "./apiError.ts";

test("normalizes backend http errors", () => {
  const error = new AxiosError(
    "Request failed",
    "ERR_BAD_REQUEST",
    { headers: {} },
    undefined,
    {
      status: 422,
      statusText: "Unprocessable Entity",
      headers: {},
      config: { headers: {} },
      data: {
        status: "ERROR",
        code: 1001,
        message: "잘못된 요청입니다.",
        data: { field: "name" },
      },
    },
  );

  const normalized = normalizeApiError(error);

  assert.equal(normalized.kind, "HTTP");
  assert.equal(normalized.status, 422);
  assert.equal(normalized.code, 1001);
  assert.equal(normalized.message, "잘못된 요청입니다.");
  assert.deepEqual(normalized.data, { field: "name" });
  assert.equal(normalized.cause, error);
});

test("falls back for malformed http payloads", () => {
  const error = new AxiosError(
    "Request failed",
    "ERR_BAD_REQUEST",
    { headers: {} },
    undefined,
    {
      status: 400,
      statusText: "Bad Request",
      headers: {},
      config: { headers: {} },
      data: { raw: true },
    },
  );

  const normalized = normalizeApiError(error);

  assert.equal(normalized.kind, "HTTP");
  assert.equal(normalized.status, 400);
  assert.equal(normalized.code, "ERR_BAD_REQUEST");
  assert.equal(normalized.message, "Request failed");
  assert.deepEqual(normalized.data, { raw: true });
});

test("classifies timeout errors", () => {
  const normalized = normalizeApiError(new AxiosError("timeout", "ECONNABORTED"));

  assert.equal(normalized.kind, "TIMEOUT");
  assert.equal(normalized.status, undefined);
});

test("classifies response-less errors as network errors", () => {
  const normalized = normalizeApiError(new AxiosError("Network Error", "ERR_NETWORK"));

  assert.equal(normalized.kind, "NETWORK");
  assert.equal(normalized.status, undefined);
});

test("wraps unknown values as unknown errors", () => {
  const original = new Error("unexpected failure");
  const normalized = normalizeApiError(original);

  assert.equal(normalized.kind, "UNKNOWN");
  assert.equal(normalized.message, "unexpected failure");
  assert.equal(normalized.cause, original);
});
