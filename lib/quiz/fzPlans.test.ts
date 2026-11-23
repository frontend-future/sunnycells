import test from "node:test";
import assert from "node:assert/strict";
import { OIL_PLANS } from "./fzPlans.ts";

test("the v4 plans are $30, $55 and $80 today, then $50 every 4 weeks, $99 every 8 and $149 every 12", () => {
  const got = (["m1", "m2", "m3"] as const).map((k) => { const p = OIL_PLANS[k]; return [p.entry, p.recur, p.weeks, p.days, p.bottles]; });
  assert.deepEqual(got, [[30, 50, 4, 28, 1], [55, 99, 8, 56, 2], [80, 149, 12, 84, 3]]);
});
