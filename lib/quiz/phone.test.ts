import assert from "node:assert/strict";
import { test } from "node:test";
import { formatPhone, nationalDigits, phoneOk } from "./phone.ts";

test("the number takes shape as it is typed", () => {
  const steps: [string, string][] = [
    ["", ""],
    ["+1", "+1"],
    ["+15", "+1 (5"],
    ["+1503", "+1 (503"],
    ["+15035", "+1 (503) 5"],
    ["+1503555", "+1 (503) 555"],
    ["+15035550", "+1 (503) 555-0"],
    ["+15035550142", "+1 (503) 555-0142"],
  ];
  for (const [raw, want] of steps) assert.equal(formatPhone(raw), want, raw || "(empty)");
});

test("a pasted number lands the same however it was written", () => {
  for (const raw of ["+1 (503) 555-0142", "503-555-0142", "1 503 555 0142", "5035550142", "+1.503.555.0142"]) {
    assert.equal(formatPhone(raw), "+1 (503) 555-0142", raw);
  }
});

test("extra digits are dropped rather than accepted", () => {
  assert.equal(formatPhone("+150355501429999"), "+1 (503) 555-0142");
  assert.equal(nationalDigits("+150355501429999").length, 10);
});

test("only a complete number passes", () => {
  assert.ok(phoneOk("+1 (503) 555-0142"));
  assert.ok(phoneOk("5035550142"));
  assert.ok(!phoneOk("+1"), "the prefix on its own is not a number");
  assert.ok(!phoneOk(""));
  assert.ok(!phoneOk("+1 (503) 555-014"));
});
