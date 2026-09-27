import assert from "node:assert/strict";
import test from "node:test";
import { AxiosError } from "axios";
import { ApiError } from "./apiError.ts";
import { createHttpClient } from "./createHttpClient.ts";

function createSuccessAdapter(onRequest) {
  return async (config) => {
    onRequest(config);

    return {
      data: { ok: true },
      status: 200,
      statusText: "OK",
      headers: {},
      config,
    };
  };
}

function getAuthorizationHeader(headers) {
  return typeof headers?.get === "function"
    ? headers.get("Authorization")
    : headers?.Authorization;
}

test("injects a bearer token", async () => {
  let requestConfig;
  const client = createHttpClient({
    baseURL: "https://api.example.com",
    getAccessToken: async () => "access-token",
  });
  client.defaults.adapter = createSuccessAdapter((config) => {
    requestConfig = config;
  });

  await client.get("/me");

  assert.equal(getAuthorizationHeader(requestConfig.headers), "Bearer access-token");
});

test("does not replace an explicit authorization header", async () => {
  let requestConfig;
  const client = createHttpClient({
    getAccessToken: async () => "access-token",
  });
  client.defaults.adapter = createSuccessAdapter((config) => {
    requestConfig = config;
  });

  await client.get("/me", { headers: { Authorization: "Basic credentials" } });

  assert.equal(getAuthorizationHeader(requestConfig.headers), "Basic credentials");
});

test("leaves authorization absent without a token", async () => {
  let requestConfig;
  const client = createHttpClient({ getAccessToken: async () => null });
  client.defaults.adapter = createSuccessAdapter((config) => {
    requestConfig = config;
  });

  await client.get("/public");

  assert.equal(getAuthorizationHeader(requestConfig.headers), undefined);
});

test("preserves successful responses", async () => {
  const client = createHttpClient();
  client.defaults.adapter = createSuccessAdapter(() => {});

  const response = await client.get("/health");

  assert.deepEqual(response.data, { ok: true });
  assert.equal(response.status, 200);
});

test("normalizes rejected axios responses", async () => {
  const response = {
    status: 401,
    statusText: "Unauthorized",
    headers: {},
    config: { headers: {} },
    data: { code: 4010, message: "인증이 필요합니다.", data: null },
  };
  const axiosError = new AxiosError(
    "Request failed",
    "ERR_BAD_REQUEST",
    { headers: {} },
    undefined,
    response,
  );
  const client = createHttpClient();
  client.defaults.adapter = async () => Promise.reject(axiosError);

  await assert.rejects(
    () => client.get("/private"),
    (error) => {
      assert.ok(error instanceof ApiError);
      assert.equal(error.kind, "HTTP");
      assert.equal(error.status, 401);
      assert.equal(error.code, 4010);
      assert.equal(error.message, "인증이 필요합니다.");
      return true;
    },
  );
});
