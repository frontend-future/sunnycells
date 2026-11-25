import assert from "node:assert/strict";
import { test } from "node:test";
import { dayOf, dollars, stageIndex, weeksOf } from "./portal.ts";

test("price intervals become whole weeks", () => {
  assert.equal(weeksOf("week", 2), 2);
  assert.equal(weeksOf("month", 1), 4);
  assert.equal(weeksOf("day", 28), 4);
  assert.equal(weeksOf(undefined, undefined), 4);
});

test("day 1 is the day of the first order, and the 90 day stages split cleanly", () => {
  assert.equal(dayOf(1000, 1000), 1);
  assert.equal(dayOf(0, 62 * 86_400), 63);
  assert.equal(stageIndex(30), 0);
  assert.equal(stageIndex(31), 1);
  assert.equal(stageIndex(90), 2);
  assert.equal(stageIndex(91), 3);
  assert.equal(stageIndex(400), 3);
});

test("money is whole dollars", () => {
  assert.equal(dollars(3900), "$39");
  assert.equal(dollars(3950), "$40");
});
