import assert from "node:assert/strict";
import { test } from "node:test";
import { firstOrderPrice, formatPrice } from "./price.ts";

test("the first-order figure rounds down, never against the customer", () => {
  assert.equal(firstOrderPrice(39), 19);
  assert.equal(firstOrderPrice(49), 24);
  assert.equal(firstOrderPrice(45), 22);
  assert.equal(firstOrderPrice(40), 20);
});

test("prices are integers, never decimals", () => {
  assert.equal(formatPrice(49), "$49");
  assert.equal(formatPrice(48.6), "$49");
  assert.equal(formatPrice(1200), "$1,200");
});
