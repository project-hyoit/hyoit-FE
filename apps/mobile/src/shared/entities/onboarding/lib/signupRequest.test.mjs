import assert from "node:assert/strict";
import test from "node:test";
import { buildSignupRequest } from "./signupRequest.ts";

test("builds the complete backend signup payload for either frontend role", () => {
  assert.deepEqual(
    buildSignupRequest({
      name: "  김효돌 ",
      age: "65",
      phone: " 010-1234-5678 ",
      role: "parent",
    }),
    {
      nickname: "김효돌",
      age: 65,
      phoneNumber: "010-1234-5678",
      role: "ADMIN",
    },
  );

  assert.equal(
    buildSignupRequest({
      name: "자녀",
      age: "25",
      phone: "010-1111-2222",
      role: "child",
    }).role,
    "USER",
  );
});

test("rejects signup when a backend-required field is missing", () => {
  assert.throws(
    () =>
      buildSignupRequest({
        name: "자녀",
        age: "",
        phone: "010-1111-2222",
        role: "child",
      }),
    /이름, 나이, 전화번호를 모두 입력해주세요\./,
  );
});
