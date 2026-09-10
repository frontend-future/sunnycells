import test from "node:test";
import assert from "node:assert/strict";
import { landerTag } from "./notify-lander.ts";

test("known landers get a bracketed, capitalized label", () => {
  assert.equal(landerTag("quiz"), " [Quiz]");
  assert.equal(landerTag("postpartum"), " [Postpartum]");
  assert.equal(landerTag("melatonin"), " [Melatonin]");
});

test("a missing lander adds nothing to the subject", () => {
  assert.equal(landerTag(undefined), "");
});

test("an unrecognised lander still shows up rather than getting dropped", () => {
  assert.equal(landerTag("some-new-page"), " [some-new-page]");
});
