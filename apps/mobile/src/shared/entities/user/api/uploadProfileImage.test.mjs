import assert from "node:assert/strict";
import test from "node:test";
import { uploadProfileImage } from "./uploadProfileImage.ts";

class TestFormData {
  constructor() {
    this.entries = [];
  }

  append(name, value) {
    this.entries.push([name, value]);
  }
}

globalThis.FormData = TestFormData;

test("uploads the selected image under the backend image field", async () => {
  let request;
  const client = {
    async put(path, body, config) {
      request = { path, body, config };
      return {
        data: {
          success: true,
          data: {
            id: 1,
            nickname: "효돌이",
            profileImageUrl: "/uploads/profile-images/1.png",
            age: 25,
            phoneNumber: "010-1234-5678",
            role: "USER",
            firstLogin: false,
          },
        },
      };
    },
  };

  const result = await uploadProfileImage(
    {
      uri: "file:///profile.png",
      name: "profile.png",
      type: "image/png",
    },
    client,
  );

  assert.equal(result.profileImageUrl, "/uploads/profile-images/1.png");
  assert.equal(request.path, "/api/profile/image");
  assert.equal(request.config.headers["Content-Type"], "multipart/form-data");
  assert.equal(request.body.entries[0][0], "image");
  assert.deepEqual(request.body.entries[0][1], {
    uri: "file:///profile.png",
    name: "profile.png",
    type: "image/png",
  });
});
