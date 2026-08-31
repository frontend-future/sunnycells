import test from "node:test";
import assert from "node:assert/strict";
import { buildOrder, orderLine, planById, PLANS } from "./steady-burn.ts";

test("every plan is exactly half of its own list price", () => {
  for (const p of PLANS) {
    const o = buildOrder(p.id);
    assert.equal(o.total * 2, o.listTotal, `${p.id} is not half of list`);
    assert.equal(o.discount, o.total, `${p.id} saving should equal the price paid at 50%`);
  }
});

test("an unknown plan falls back to the one marked best", () => {
  assert.equal(planById(undefined).id, "s3");
  assert.equal(planById("nope").id, "s3");
});

test("shipping is on the order at zero rather than left unsaid", () => {
  const ship = buildOrder("s1").lines.find((l) => l.id === "shipping");
  assert.equal(ship?.now, 0);
});

/* 11th to 13th are the ones a naive ordinal rule gets wrong. */
test("orderLine dates the offer with an ordinal", () => {
  assert.equal(orderLine(new Date(2026, 7, 31)), "Order by August 31st for 50% Off With Free Shipping");
  assert.match(orderLine(new Date(2026, 3, 11)), /April 11th/);
  assert.match(orderLine(new Date(2026, 4, 12)), /May 12th/);
  assert.match(orderLine(new Date(2026, 5, 13)), /June 13th/);
  assert.match(orderLine(new Date(2026, 1, 2)), /February 2nd/);
  assert.match(orderLine(new Date(2026, 2, 3)), /March 3rd/);
});
