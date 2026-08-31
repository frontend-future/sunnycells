import test from "node:test";
import assert from "node:assert/strict";
import { PLANS, buildOrder } from "./calm-cortisol-chews.ts";

/* The only arithmetic in the file. Every plan must be exactly the 50% the flag claims,
   which is what went wrong on SC-24 before its ladder was rebuilt. */
test("every plan is half its own list price, in integers", () => {
  for (const p of PLANS) {
    assert.equal(p.price * 2, p.compareAt, `${p.id} is not half of ${p.compareAt}`);
    assert.equal(p.price, Math.round(p.price));
  }
});

test("the order totals the whole supply, not one bag", () => {
  const o = buildOrder("c3");
  assert.equal(o.total, 23 * 3);
  assert.equal(o.listTotal, 46 * 3);
  assert.equal(o.discount, o.listTotal - o.total);
  assert.equal(o.lines.at(-1)?.now, 0);
});

test("an unknown plan falls back to the one most people pick", () => {
  assert.equal(buildOrder(undefined).plan.id, "c3");
});
