import assert from "node:assert/strict";
import test from "node:test";
import { queryClient } from "./queryClient.ts";

test("uses the documented default query data policy", () => {
  const defaults = queryClient.getDefaultOptions();

  assert.equal(defaults.queries.staleTime, 60_000);
  assert.equal(defaults.queries.gcTime, 30 * 60_000);
  assert.equal(defaults.queries.retry, 1);
  assert.equal(defaults.queries.refetchOnWindowFocus, false);
  assert.equal(defaults.queries.refetchOnReconnect, true);
  assert.equal(defaults.queries.refetchOnMount, false);
  assert.equal(defaults.mutations.retry, 0);
});
