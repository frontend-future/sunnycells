import test from "node:test";
import assert from "node:assert/strict";
import { buildEvenOrder, evenPlanById, PLANS } from "./even-energy.ts";

test("an unknown plan falls back to the one marked best", () => {
  assert.equal(evenPlanById(undefined).id, "e3");
  assert.equal(evenPlanById("nope").id, "e3");
});

test("the charge is per pouch times the pouches that arrive", () => {
  for (const p of PLANS) {
    const o = buildEvenOrder(p.id);
    assert.equal(o.total, p.price * p.months, `${p.id}: total`);
    assert.equal(o.listTotal, p.compareAt * p.months, `${p.id}: struck total`);
    assert.equal(o.discount, o.listTotal - o.total, `${p.id}: discount does not reconcile`);
    assert.ok(Number.isInteger(o.total), `${p.id}: total is not an integer`);
    assert.ok(o.total < o.listTotal, `${p.id}: nothing was saved`);
  }
});

test("shipping is on the order at zero rather than left unsaid", () => {
  const shipping = buildEvenOrder("e3").lines.find((l) => l.id === "shipping");
  assert.equal(shipping?.now, 0);
});
