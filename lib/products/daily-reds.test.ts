import test from "node:test";
import assert from "node:assert/strict";
import { orderLine, planById, PLANS } from "./daily-reds.ts";

/* The line is the only place on the page that does date arithmetic, and it does it
   against whatever plan is selected, so both halves need pinning. Fixed date in,
   fixed string out: no Date.now anywhere in the assertion. */
test("orderLine dates the next box by the selected plan", () => {
  const aug28 = new Date(2026, 7, 28);

  assert.match(orderLine(aug28, planById("r1")), /^Order today, Friday August 28\./);
  assert.match(orderLine(aug28, planById("r1")), /then \$22 on September 28\.$/);
  assert.match(orderLine(aug28, planById("r3")), /then \$60 on November 28\.$/);
  assert.match(orderLine(aug28, planById("r6")), /then \$108 on February 28\.$/);
});

test("orderLine charges the whole supply, not one box of it", () => {
  for (const p of PLANS) {
    assert.ok(orderLine(new Date(2026, 0, 15), p).includes(`$${p.price * p.months}`));
  }
});
