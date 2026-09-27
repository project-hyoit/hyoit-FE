# Common HTTP API Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a frontend-only, reusable Axios layer that prepares the mobile app for backend integration without replacing the existing mock APIs.

**Architecture:** Create a new `@hyoit/api` workspace package. Keep the Axios factory pure and injectable for tests, put error normalization in a separate module, and expose one storage-backed `apiClient` singleton for the app. Domain API modules remain unchanged until real endpoint contracts are introduced.

**Tech Stack:** TypeScript, Axios 1.x, Node built-in test runner, pnpm workspace, Expo React Native.

**Spec:** `docs/superpowers/specs/2026-09-27-common-http-api-design.md`

## Global Constraints

- Modify only the `hyoit-rn` frontend repository; do not modify or commit anything in the backend repository.
- Keep `packages/auth/api/*` mock implementations unchanged.
- Read the base URL from `EXPO_PUBLIC_API_BASE_URL`; do not hard-code a production URL.
- Use a default HTTP timeout of `10_000` milliseconds, overridable through the client factory.
- Normalize errors into exactly `HTTP`, `TIMEOUT`, `NETWORK`, or `UNKNOWN` kinds.
- Do not implement token refresh, automatic logout, navigation, or React Query policy changes.
- Do not automatically unwrap successful response envelopes; return the Axios response to domain callers.
- Every behavior change follows RED → GREEN and is committed as a focused change.

## Review Focus

1. An existing `Authorization` header must not be overwritten by token injection; covered by Task 3 request-interceptor tests.
2. A backend error with no `message`/`code` envelope must still retain the raw response data; covered by Task 2 malformed-payload test.
3. A timeout must not be classified as a generic network error; covered by Task 2 timeout test.
4. An Axios error with no response must not be mistaken for an HTTP status error; covered by Task 2 network-error test.
5. A non-Axios thrown value must remain inspectable through `ApiError.cause`; covered by Task 2 unknown-error test.

---

### Task 1: Scaffold the API workspace package

**Files:**
- Create: `packages/api/package.json`
- Modify: `apps/mobile/package.json`
- Modify: `tsconfig.base.json`
- Modify: `apps/mobile/tsconfig.json`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Produces the `@hyoit/api` workspace package and TypeScript alias used by later tasks.

- [ ] **Step 1: Add the package metadata and test script**

  Create `@hyoit/api` with `main`/`types` pointing to `index.ts`, dependencies on `@hyoit/storage`, `@hyoit/types`, and `axios`, plus a package-local Node test command for `http/*.test.mjs`.

- [ ] **Step 2: Move workspace ownership of Axios and register aliases**

  Add `@hyoit/api: workspace:*` to the mobile app, remove the direct `axios` dependency from the mobile app, and add `@hyoit/api`/`@hyoit/api/*` mappings to both TypeScript path configurations.

- [ ] **Step 3: Refresh the lockfile**

  Run `corepack pnpm install --lockfile-only` from the repository root. Expected: the lockfile contains the new workspace package and its dependencies without changing unrelated package versions.

- [ ] **Step 4: Verify the scaffold**

  Run `corepack pnpm --filter @hyoit/api list --depth -1`. Expected: the workspace package resolves `axios`, `@hyoit/storage`, and `@hyoit/types`.

- [ ] **Step 5: Commit the scaffold**

  ```bash
  git add packages/api/package.json apps/mobile/package.json tsconfig.base.json apps/mobile/tsconfig.json pnpm-lock.yaml
  git commit -m "chore: scaffold shared api package"
  ```

### Task 2: Implement typed API error normalization

**Files:**
- Create: `packages/api/http/apiError.test.mjs`
- Create: `packages/api/http/apiError.ts`

**Interfaces:**
- Produces `ApiErrorKind`, `ApiError`, and `normalizeApiError(error: unknown): ApiError` for Task 3.

- [ ] **Step 1: Write failing tests for each error class**

  Add Node tests named `normalizes backend http errors`, `falls back for malformed http payloads`, `classifies timeout errors`, `classifies response-less errors as network errors`, and `wraps unknown values as unknown errors`. Assert `kind`, `status`, `code`, `message`, `data`, and `cause` where applicable.

- [ ] **Step 2: Run the tests and verify the expected RED state**

  Run `node --experimental-strip-types --test packages/api/http/apiError.test.mjs`.
  Expected: FAIL because `apiError.ts` and its exported interface do not exist yet.

- [ ] **Step 3: Implement `ApiError` and `normalizeApiError`**

  In `packages/api/http/apiError.ts`, define the four literal kinds, an `ApiError` class with readonly `kind`, `status`, `code`, `data`, and `cause` fields, and a normalizer that uses `axios.isAxiosError`. Prefer backend payload `message`/`code`/`data`, distinguish `ECONNABORTED`/`ETIMEDOUT` from response-less network errors, and preserve the original value as `cause`.

- [ ] **Step 4: Run the tests and verify GREEN**

  Run the same Node test command. Expected: all error-normalization tests PASS.

- [ ] **Step 5: Commit error normalization**

  ```bash
  git add packages/api/http/apiError.ts packages/api/http/apiError.test.mjs
  git commit -m "feat: normalize shared api errors"
  ```

### Task 3: Implement the injectable Axios client

**Files:**
- Create: `packages/api/http/createHttpClient.test.mjs`
- Create: `packages/api/http/createHttpClient.ts`

**Interfaces:**
- Consumes: `ApiError` and `normalizeApiError` from Task 2.
- Produces `CreateHttpClientOptions`, `DEFAULT_HTTP_TIMEOUT_MS`, and `createHttpClient(options?: CreateHttpClientOptions): AxiosInstance`.

- [ ] **Step 1: Write failing request/response interceptor tests**

  Add tests named `injects a bearer token`, `does not replace an explicit authorization header`, `leaves authorization absent without a token`, `preserves successful responses`, and `normalizes rejected axios responses`. Use Axios' injected adapter to observe request config and return deterministic responses without adding a mocking dependency.

- [ ] **Step 2: Run the tests and verify the expected RED state**

  Run `node --experimental-strip-types --test packages/api/http/createHttpClient.test.mjs`.
  Expected: FAIL because `createHttpClient.ts` and its exports do not exist yet.

- [ ] **Step 3: Implement `createHttpClient`**

  Create an Axios instance with `baseURL`, `timeout: 10_000`, and optional overrides. In the request interceptor, await `getAccessToken`, add `Bearer <token>` only when a token exists and no explicit Authorization header exists, then return the config. In the response interceptor, pass successes through and reject failures with `normalizeApiError`.

- [ ] **Step 4: Run the focused tests and then the API package tests**

  Run `node --experimental-strip-types --test packages/api/http/createHttpClient.test.mjs` and then `corepack pnpm --filter @hyoit/api test`.
  Expected: all client and error tests PASS.

- [ ] **Step 5: Commit the Axios client**

  ```bash
  git add packages/api/http/createHttpClient.ts packages/api/http/createHttpClient.test.mjs
  git commit -m "feat: add shared axios client"
  ```

### Task 4: Wire the app singleton and public exports

**Files:**
- Create: `packages/api/apiClient.ts`
- Create: `packages/api/index.ts`

**Interfaces:**
- Consumes: `createHttpClient` from Task 3 and `getToken` from `@hyoit/storage`.
- Produces `apiClient`, `ApiError`, `normalizeApiError`, `createHttpClient`, and the client option/type exports from `@hyoit/api`.

- [ ] **Step 1: Implement the storage-backed singleton**

  Create `apiClient` with `baseURL: process.env.EXPO_PUBLIC_API_BASE_URL` and a token provider that returns `(await getToken()).accessToken`.

- [ ] **Step 2: Add the package public entry point**

  Re-export the singleton, factory, error class, normalizer, and public types from `packages/api/index.ts`.

- [ ] **Step 3: Verify package integration**

  Run `corepack pnpm --filter hyoit-rn exec tsc --noEmit -p tsconfig.json`.
  Expected: TypeScript resolves `@hyoit/api` and reports no new errors.

- [ ] **Step 4: Commit the public client**

  ```bash
  git add packages/api/apiClient.ts packages/api/index.ts
  git commit -m "feat: expose configured api client"
  ```

### Task 5: Run full frontend verification

**Files:**
- Modify: none expected

**Interfaces:**
- Consumes the complete `@hyoit/api` package from Tasks 1–4.

- [ ] **Step 1: Run API package tests**

  Run `corepack pnpm --filter @hyoit/api test`. Expected: all API tests PASS.

- [ ] **Step 2: Run existing mobile tests**

  Run `corepack pnpm --filter hyoit-rn test:check-in` and `corepack pnpm --filter hyoit-rn test:dday`. Expected: existing tests PASS and mock API behavior remains unchanged.

- [ ] **Step 3: Run typecheck and lint**

  Run `corepack pnpm --filter hyoit-rn exec tsc --noEmit -p tsconfig.json` and `corepack pnpm --filter hyoit-rn lint`. Expected: exit code 0 with no new errors.

- [ ] **Step 4: Inspect the final diff and commit history**

  Run `git diff origin/develop...HEAD --check`, `git status --short`, and `git log --oneline origin/develop..HEAD`. Expected: only frontend files and the design/plan docs are present, no mock API or backend file changed, and each logical task has its own commit.

## Self-Review

- Spec coverage: package boundary, environment configuration, token injection, error normalization, mock preservation, test cases, and commit boundaries are each mapped to Tasks 1–5.
- Step scan: each implementation task has RED, focused GREEN, and a commit; Task 1 and Task 4 are configuration/wiring tasks without independent runtime behavior.
- Type consistency: Task 2 exports the normalizer consumed by Task 3; Task 3 exports the factory consumed by Task 4; Task 4 exports the public package surface.
- Review focus: all five identified edge conditions are pinned to named tests in Tasks 2–3.
- Proportion: the plan describes interfaces and verifiable commands without transcribing implementation bodies.
