import assert from "node:assert/strict";
import { test } from "node:test";
import { perDayLabel, planBullets, PLANS } from "./plans.ts";

test("the per-day line reads whole dollars on the honest side of the real figure", () => {
  // 79 / 30 = 2.63, 54 / 30 = 1.80, 39 / 30 = 1.30
  assert.equal(perDayLabel(79), "Less than $3 / day");
  assert.equal(perDayLabel(54), "Less than $2 / day");
  assert.equal(perDayLabel(39), "Just over $1 / day");
});

test("no per-day line ever prints a decimal", () => {
  for (let price = 1; price <= 300; price++) {
    assert.ok(!/\d\.\d/.test(perDayLabel(price)), `${price} produced ${perDayLabel(price)}`);
  }
});

test("the claim is true at every price: under, over, or exact", () => {
  for (let price = 1; price <= 300; price++) {
    const label = perDayLabel(price);
    const bound = Number(label.match(/\$(\d+)/)![1]);
    const perDay = price / 30;
    if (label.startsWith("Less than")) assert.ok(perDay < bound, `${price}: ${label} but per day is ${perDay}`);
    else if (label.startsWith("Just over")) assert.ok(perDay > bound, `${price}: ${label} but per day is ${perDay}`);
    else assert.equal(perDay, bound, `${price}: ${label} claims exactness it does not have`);
  }
});

test("a price that divides exactly is stated exactly, not as an approximation", () => {
  assert.equal(perDayLabel(30), "$1 / day");
  assert.equal(perDayLabel(60), "$2 / day");
});

test("bullets count servings and pouches from the plan itself", () => {
  const [one, three, six] = PLANS.map(planBullets);
  assert.deepEqual(one, ["30 servings", "Less than $1 / day", "1 pouch delivered"]);
  assert.deepEqual(three, ["90 servings", "Less than $1 / day", "3 pouches delivered"]);
  assert.deepEqual(six, ["180 servings", "Less than $1 / day", "6 pouches delivered"]);
});
