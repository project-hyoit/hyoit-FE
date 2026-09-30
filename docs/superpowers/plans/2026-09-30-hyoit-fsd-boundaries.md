# Hyoit FSD Boundaries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the existing Hyoit role-scoped FSD structure with Washer's validated public-entry and dependency-direction patterns without changing the app's screen behavior or introducing the data-fetching layer yet.

**Architecture:** Keep `app`, `entry`, `parent`, `child`, and `shared` in place. Make routes consume page public entries, make `memory-game` expose a domain public entry, and move memory-session presentation that currently lives under `pages` into its feature. Add an executable boundary test so these rules remain enforceable.

**Tech Stack:** Expo Router, React Native, TypeScript, Node built-in test runner, pnpm workspace.

**Spec:** `docs/superpowers/specs/2026-09-30-hyoit-fsd-boundaries-design.md`

## Global Constraints

- Preserve the existing role namespaces: `src/entry`, `src/parent`, `src/child`, and `src/shared`.
- Do not add or wire real backend endpoints, TanStack Query providers, query keys, stale times, or invalidation in this change.
- Do not change screen copy, visual behavior, navigation destinations, or existing package APIs.
- Keep `packages/api` transport-only.
- Consumers outside an entity may use only that entity's public `index.ts`; entity-internal relative imports remain allowed.

## Review Focus

- A route importing a page child file instead of its public entry must fail the architecture test; covered by Task 1 and fixed in Task 2.
- A feature importing a page file must fail the architecture test; covered by Task 1 and fixed in Task 3.
- A non-entity consumer importing `memory-game/lib/*` or `memory-game/model/*` must fail the architecture test; covered by Task 1 and fixed in Task 2.
- Moving feature UI must preserve all current memory-game route exports and behavior; covered by Task 3 TypeScript and existing mobile checks.
- The guard must run from the mobile package in a clean checkout without a third-party test dependency; covered by Task 1 and Task 4 verification.

---

### Task 1: Add the FSD boundary regression test

**Files:**
- Create: `scripts/mobile-fsd-boundaries.test.mjs`
- Modify: `apps/mobile/package.json` (`test:architecture` script)

**Interfaces:**
- Consumes the repository-relative `apps/mobile/app` and `apps/mobile/src` trees.
- Produces three Node tests named `routes use page public entries`, `features do not import pages`, and `external consumers use entity public entries`.

- [ ] **Step 1: Write the failing tests**

  Implement filesystem-based checks with Node's `node:test`, `node:assert/strict`, and `node:fs`. Resolve the repository root from `import.meta.url`; do not add a package dependency. The route check should resolve every `@/src/*/pages/*` import and require the target to expose an `index.ts` or `index.tsx`. The feature check should scan `apps/mobile/src/**/features/**/*.{ts,tsx}` and reject imports containing `/pages/`. The entity check should scan consumers outside `src/parent/entities/memory-game` and reject imports containing `@/src/parent/entities/memory-game/` followed by an internal path segment.

- [ ] **Step 2: Run the tests to verify they fail on the current tree**

  Run: `corepack pnpm --filter hyoit-rn test:architecture`

  Expected: FAIL because the current tree has route imports into onboarding/page internals, `PlayContainer` imports page UI, and consumers import `memory-game` internals.

- [ ] **Step 3: Add the package script**

  Add `"test:architecture": "node --test ../../scripts/mobile-fsd-boundaries.test.mjs"` to `apps/mobile/package.json`.

- [ ] **Step 4: Commit after the following boundary fixes make the new test green**

  The test is intentionally written before production refactors. Commit it together with the boundary implementation in Task 2 using:

  ```bash
  git add scripts/mobile-fsd-boundaries.test.mjs apps/mobile/package.json apps/mobile/src apps/mobile/app
  git commit -m "refactor: align mobile fsd boundaries"
  ```

### Task 2: Normalize page and entity public entries

**Files:**
- Create: `apps/mobile/src/child/pages/profile-settings-page/index.ts`
- Create: `apps/mobile/src/parent/entities/memory-game/index.ts`
- Modify: `apps/mobile/app/(child)/onboarding/verify-loading.tsx`
- Modify: `apps/mobile/app/(parent)/onboarding/verify-loading.tsx`
- Modify: `apps/mobile/app/(child)/(tabs)/profile/help.tsx`
- Modify: `apps/mobile/app/(child)/(tabs)/profile/notification.tsx`
- Modify: external `memory-game` imports under `apps/mobile/src/parent/pages` and `apps/mobile/src/parent/features`

**Interfaces:**
- `profile-settings-page/index.ts` exports the existing help and notification page components without changing their component signatures.
- `memory-game/index.ts` exports the existing domain types, constants, pure helpers, and hooks consumed outside the entity: `Card`, `Deck`, `FruitKey`, `MatchedState`, `MatchedIndexSet`, `Level`, `FRUITS`, `fruitSrc`, `MEMORY_GAME`, `createDeck`, `levelLabel`, `levelCardCount`, `levelMaxHp`, `useCountdown`, `useGridLayout`, `useMemoryCardAnimation`, and `useMemoryGameState`.

- [ ] **Step 1: Add public page/entity exports and change consumers**

  Create the profile settings barrel and update the four affected route files to import from page roots. Create the memory-game barrel and replace external deep imports with `@/src/parent/entities/memory-game`. Keep entity-internal imports relative or unchanged where they do not cross the boundary.

- [ ] **Step 2: Run the boundary tests to verify they pass**

  Run: `corepack pnpm --filter hyoit-rn test:architecture`

  Expected: PASS for route public entries and external entity public entries; the feature/page test may remain red until Task 3 removes the memory session reverse import.

- [ ] **Step 3: Run type checking**

  Run: `apps/mobile/node_modules/.bin/tsc.CMD --noEmit -p apps/mobile/tsconfig.json`

  Expected: PASS with no new diagnostics.

### Task 3: Move memory-session presentation into its feature

**Files:**
- Move: `apps/mobile/src/parent/pages/game-page/memory/ui/BottomTray.tsx` → `apps/mobile/src/parent/features/game/memory/play-session/ui/BottomTray.tsx`
- Move: `apps/mobile/src/parent/pages/game-page/memory/ui/MemoryBoard.tsx` → `apps/mobile/src/parent/features/game/memory/play-session/ui/MemoryBoard.tsx`
- Move: `apps/mobile/src/parent/pages/game-page/memory/ui/PlayHeader.tsx` → `apps/mobile/src/parent/features/game/memory/play-session/ui/PlayHeader.tsx`
- Move: `apps/mobile/src/parent/pages/game-page/memory/ui/ResultOverlay.tsx` → `apps/mobile/src/parent/features/game/memory/play-session/ui/ResultOverlay.tsx`
- Create: `apps/mobile/src/parent/features/game/memory/play-session/index.ts`
- Create: `apps/mobile/src/parent/features/game/memory/play-session/ui/index.ts`
- Modify: `apps/mobile/src/parent/features/game/memory/play-session/ui/PlayContainer.tsx`
- Modify: `apps/mobile/src/parent/pages/game-page/memory/ui/PlayScreen.tsx`
- Modify: `apps/mobile/src/parent/pages/game-page/memory/ui/index.ts`

**Interfaces:**
- `features/game/memory/play-session/index.ts` exports `PlayContainer` as the feature's public entry.
- `features/game/memory/play-session/ui/index.ts` exports the four moved UI components and `PlayContainer` for local composition.
- `pages/game-page/memory/ui/index.ts` continues to export `DifficultyCard`, `GameEntryCard`, `IntroScreen`, and `PlayScreen`; it no longer exports feature-owned session UI.

- [ ] **Step 1: Move the four session-owned UI files without changing their props or rendering code**

  Preserve file contents except for import paths. Update entity imports to use the public memory-game entry from Task 2. Update `PlayContainer` to import the moved components from its own feature UI directory.

- [ ] **Step 2: Add feature barrels and update `PlayScreen`**

  Export `PlayContainer` from the feature root and make `PlayScreen` consume that feature root. Keep the route-facing page barrel unchanged for `IntroScreen` and `PlayScreen`.

- [ ] **Step 3: Remove moved exports from the page UI barrel**

  Leave page-owned exports intact and delete only the four moved export lines.

- [ ] **Step 4: Run the boundary tests and existing tests**

  Run:

  ```bash
  corepack pnpm --filter hyoit-rn test:architecture
  corepack pnpm --filter hyoit-rn test:check-in
  corepack pnpm --filter hyoit-rn test:dday
  ```

  Expected: all suites PASS, including `features do not import pages`.

- [ ] **Step 5: Run TypeScript and scoped lint**

  Run: `apps/mobile/node_modules/.bin/tsc.CMD --noEmit -p apps/mobile/tsconfig.json`

  Run the repository's existing scoped ESLint command against changed TypeScript/TSX files.

  Expected: no TypeScript errors or lint errors attributable to the refactor.

- [ ] **Step 6: Commit the memory-session refactor**

  ```bash
  git add apps/mobile/src/parent/pages/game-page/memory apps/mobile/src/parent/features/game/memory/play-session
  git commit -m "refactor: move memory session ui into feature"
  ```

### Task 4: Document the enforceable mobile structure and finish verification

**Files:**
- Create: `docs/architecture/frontend-structure.md`

**Interfaces:**
- Documentation describes the actual Hyoit tree, allowed dependency direction, public-entry rules, and the future location of domain API/query code.

- [ ] **Step 1: Write the concise structure guide**

  Document the current role-scoped FSD map, route/page/entity public entry rules, the memory-session example, and the explicit separation between the current transport package and future entity API/query hooks. Do not duplicate the full design spec or add rules not enforced by the test.

- [ ] **Step 2: Run the complete verification set**

  Run:

  ```bash
  corepack pnpm --filter @hyoit/api test
  corepack pnpm --filter hyoit-rn test:architecture
  corepack pnpm --filter hyoit-rn test:check-in
  corepack pnpm --filter hyoit-rn test:dday
  apps/mobile/node_modules/.bin/tsc.CMD --noEmit -p apps/mobile/tsconfig.json
  git diff --check
  git status --short
  ```

  Expected: all tests and type checking pass, diff check is empty, and only intended files are changed.

- [ ] **Step 3: Commit the structure guide**

  ```bash
  git add docs/architecture/frontend-structure.md
  git commit -m "docs: document mobile fsd structure"
  ```

- [ ] **Step 4: Push all commits to the existing PR**

  ```bash
  git push origin HEAD:feat/common-http-api
  ```

  Update PR #25's body with the new structure scope and final verification results while preserving the existing HTTP-layer context.

