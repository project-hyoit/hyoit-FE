import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mobileRoot = join(repositoryRoot, "apps", "mobile");
const mobileSourceRoot = join(mobileRoot, "src");

function listFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) return listFiles(entryPath);
    return /\.(?:ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

function importSources(filePath) {
  const contents = readFileSync(filePath, "utf8");
  const sources = [];
  const importPattern = /^\s*(?:import|export).*?from\s+["']([^"']+)["']/gm;

  for (const match of contents.matchAll(importPattern)) {
    sources.push(match[1]);
  }

  return sources;
}

function formatViolations(violations) {
  return violations
    .map(({ filePath, source }) => `- ${relative(repositoryRoot, filePath)} → ${source}`)
    .join("\n");
}

function hasPublicEntry(targetPath) {
  return ["index.ts", "index.tsx"].some((fileName) =>
    existsSync(join(targetPath, fileName)),
  );
}

test("routes use page public entries", () => {
  const routeRoot = join(mobileRoot, "app");
  const violations = [];

  for (const filePath of listFiles(routeRoot)) {
    for (const source of importSources(filePath)) {
      if (!source.startsWith("@/src/") || !source.includes("/pages/")) {
        continue;
      }

      const sourcePath = source.slice("@/src/".length);
      const targetPath = join(mobileSourceRoot, sourcePath);

      if (!hasPublicEntry(targetPath)) {
        violations.push({ filePath, source });
      }
    }
  }

  assert.equal(
    violations.length,
    0,
    `Routes must import page public entries:\n${formatViolations(violations)}`,
  );
});

test("features do not import pages", () => {
  const violations = [];

  for (const filePath of listFiles(mobileSourceRoot)) {
    if (!filePath.split(/[\\/]/).includes("features")) continue;

    for (const source of importSources(filePath)) {
      if (source.includes("/pages/")) {
        violations.push({ filePath, source });
      }
    }
  }

  assert.equal(
    violations.length,
    0,
    `Features must not import pages:\n${formatViolations(violations)}`,
  );
});

test("external consumers use entity public entries", () => {
  const entityRoot = join(mobileSourceRoot, "parent", "entities", "memory-game");
  const violations = [];

  for (const filePath of listFiles(mobileSourceRoot)) {
    if (
      filePath === entityRoot ||
      filePath.startsWith(`${entityRoot}\\`) ||
      filePath.startsWith(`${entityRoot}/`)
    ) {
      continue;
    }

    for (const source of importSources(filePath)) {
      if (source.startsWith("@/src/parent/entities/memory-game/")) {
        violations.push({ filePath, source });
      }
    }
  }

  assert.equal(
    violations.length,
    0,
    `External consumers must use the memory-game public entry:\n${formatViolations(violations)}`,
  );
});
