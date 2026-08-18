import assert from "node:assert/strict";
import { test } from "node:test";
import { brandOf, cvcOk, expiryOk, formatCardNumber, formatExpiry, luhnOk } from "./card.ts";

test("brand comes off the leading digits", () => {
  for (const [num, brand] of [
    ["4242424242424242", "visa"],
    ["5555555555554444", "mastercard"],
    ["2223003122003222", "mastercard"],
    ["378282246310005", "amex"],
    ["371449635398431", "amex"],
    ["6011111111111117", "discover"],
    ["30569309025904", "diners"],
    ["3530111333300000", "jcb"],
    ["9999999999999999", null],
    ["", null],
  ] as const) {
    assert.equal(brandOf(num), brand, num || "(empty)");
  }
});

test("grouping follows the brand and stops at its length", () => {
  assert.equal(formatCardNumber("4242424242424242"), "4242 4242 4242 4242");
  assert.equal(formatCardNumber("378282246310005"), "3782 822463 10005");
  assert.equal(formatCardNumber("30569309025904"), "3056 930902 5904");
  assert.equal(formatCardNumber("4242 4242"), "4242 4242");
  // an Amex cannot be typed past fifteen digits
  assert.equal(formatCardNumber("37828224631000599999"), "3782 822463 10005");
});

test("luhn passes real test numbers and fails a transposed digit", () => {
  for (const n of ["4242424242424242", "5555555555554444", "378282246310005", "6011111111111117"]) {
    assert.ok(luhnOk(n), n);
  }
  assert.ok(!luhnOk("4242424242424243"));
  assert.ok(!luhnOk("4242 4242 4242 4224"));
  assert.ok(!luhnOk("424242"));
});

test("a card is good through the whole of its printed month", () => {
  const now = new Date(2026, 7, 18); // 18 August 2026
  assert.ok(expiryOk("08 / 26", now), "expires this month, still valid");
  assert.ok(expiryOk("12 / 30", now));
  assert.ok(!expiryOk("07 / 26", now), "last month");
  assert.ok(!expiryOk("13 / 30", now), "no thirteenth month");
  assert.ok(!expiryOk("00 / 30", now));
  assert.ok(!expiryOk("1 / 3", now), "incomplete");
});

test("expiry formats as it is typed", () => {
  assert.equal(formatExpiry("1"), "1");
  assert.equal(formatExpiry("12"), "12");
  assert.equal(formatExpiry("1230"), "12 / 30");
  assert.equal(formatExpiry("12/3099"), "12 / 30");
});

test("cvc is four digits on Amex and three elsewhere", () => {
  assert.ok(cvcOk("1234", "amex"));
  assert.ok(!cvcOk("123", "amex"));
  assert.ok(cvcOk("123", "visa"));
  assert.ok(!cvcOk("1234", "visa"));
});
