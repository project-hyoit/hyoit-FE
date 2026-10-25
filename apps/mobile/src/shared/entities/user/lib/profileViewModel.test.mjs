import assert from "node:assert/strict";
import test from "node:test";
import { toProfileViewModel } from "./profileViewModel.ts";

test("maps the backend profile to the existing profile UI model", () => {
  assert.deepEqual(
    toProfileViewModel({
      id: 1,
      nickname: "효돌이",
      profileImageUrl: "/uploads/profile-images/1.png",
      phoneNumber: "010-1234-5678",
      age: 65,
      role: "ADMIN",
      firstLogin: false,
    }),
    {
      name: "효돌이",
      age: "65",
      phone: "010-1234-5678",
      avatarUri: "/uploads/profile-images/1.png",
    },
  );
});

test("keeps optional profile fields safe for the UI", () => {
  assert.deepEqual(
    toProfileViewModel({
      id: 2,
      nickname: "자녀",
      role: "USER",
      firstLogin: false,
    }),
    {
      name: "자녀",
      age: "",
      phone: "",
      avatarUri: undefined,
    },
  );
});
