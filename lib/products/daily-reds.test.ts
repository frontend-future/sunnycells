import test from "node:test";
import assert from "node:assert/strict";
import { orderLine } from "./daily-reds.ts";

/* The only date arithmetic on the page. Fixed date in, fixed string out, so the
   ordinal cannot drift: 11th to 13th are the ones a naive rule gets wrong. */
test("orderLine dates the offer with an ordinal", () => {
  assert.equal(orderLine(new Date(2026, 7, 28)), "Order by August 28th for 50% Off With Free Shipping");
  assert.match(orderLine(new Date(2026, 0, 1)), /January 1st/);
  assert.match(orderLine(new Date(2026, 1, 2)), /February 2nd/);
  assert.match(orderLine(new Date(2026, 2, 3)), /March 3rd/);
  assert.match(orderLine(new Date(2026, 3, 11)), /April 11th/);
  assert.match(orderLine(new Date(2026, 4, 12)), /May 12th/);
  assert.match(orderLine(new Date(2026, 5, 13)), /June 13th/);
  assert.match(orderLine(new Date(2026, 6, 21)), /July 21st/);
  assert.match(orderLine(new Date(2026, 10, 22)), /November 22nd/);
  assert.match(orderLine(new Date(2026, 11, 31)), /December 31st/);
});
