import assert from "node:assert/strict";
import test from "node:test";
import { ApiError } from "./apiError.ts";
import { unwrapApiResponse } from "./apiResponse.ts";

test("unwraps successful backend response data", () => {
  const result = unwrapApiResponse({
    success: true,
    data: { id: 1 },
  });

  assert.deepEqual(result, { id: 1 });
});

test("allows successful responses without data", () => {
  const result = unwrapApiResponse({
    success: true,
    message: "로그아웃 되었습니다.",
  });

  assert.equal(result, undefined);
});

test("turns an unsuccessful backend envelope into an ApiError", () => {
  assert.throws(
    () =>
      unwrapApiResponse({
        success: false,
        code: "UNAUTHORIZED",
        message: "인증이 필요합니다.",
      }),
    (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.kind, "HTTP");
      assert.equal(error.code, "UNAUTHORIZED");
      assert.equal(error.message, "인증이 필요합니다.");
      return true;
    },
  );
});
