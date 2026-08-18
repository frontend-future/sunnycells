import assert from "node:assert/strict";
import { test } from "node:test";
import { buildOrder, BONUSES } from "./order.ts";

test("the order summary adds up for every plan", () => {
  for (const plan of ["m1", "m3", "m6"]) {
    const o = buildOrder({ plan });
    assert.equal(
      o.strikeTotal - o.discount - o.bonusTotal,
      o.total,
      `${plan}: ${o.strikeTotal} - ${o.discount} - ${o.bonusTotal} != ${o.total}`,
    );
    assert.ok(Number.isInteger(o.total), `${plan}: total is not an integer`);
    assert.ok(o.total < o.strikeTotal, `${plan}: nothing was actually saved`);
  }
});

test("bonuses are free and the product line carries the charge", () => {
  const o = buildOrder({ plan: "m3" });
  const product = o.lines.find((l) => l.id === "product");
  assert.equal(product?.now, 54 * 3);
  for (const b of BONUSES) {
    assert.equal(o.lines.find((l) => l.id === b.id)?.now, null, `${b.id} is not free`);
  }
});

test("an unknown plan falls back rather than producing an empty order", () => {
  const o = buildOrder({});
  assert.ok(o.total > 0);
  assert.equal(o.lines.length, 1 + BONUSES.length);
});
