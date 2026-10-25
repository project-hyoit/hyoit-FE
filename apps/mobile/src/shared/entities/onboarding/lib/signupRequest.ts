import type { SignupRequest } from "@hyoit/types";

export interface SignupFormInput {
  name: string;
  age: string;
  phone: string;
  role: "parent" | "child";
}

const backendRoleByFormRole = {
  parent: "ADMIN",
  child: "USER",
} as const;

export function buildSignupRequest(input: SignupFormInput): SignupRequest {
  const nickname = input.name.trim();
  const phoneNumber = input.phone.trim();
  const age = Number(input.age);

  if (!nickname || !Number.isInteger(age) || age < 1 || !phoneNumber) {
    throw new Error("이름, 나이, 전화번호를 모두 입력해주세요.");
  }

  return {
    nickname,
    age,
    phoneNumber,
    role: backendRoleByFormRole[input.role],
  };
}
