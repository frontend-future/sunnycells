import test from "node:test";
import assert from "node:assert/strict";
import { landerLabel, landerTag } from "./notify-lander.ts";

test("known landers get a bracketed, capitalized label", () => {
  assert.equal(landerTag("quiz"), " [Quiz]");
  assert.equal(landerTag("postpartum"), " [Postpartum]");
  assert.equal(landerTag("melatonin"), " [Melatonin]");
});

test("itch v1, v2, and v3 share one cart, so the lander is what tells them apart", () => {
  assert.equal(landerTag("itch-v1"), " [Itch v1]");
  assert.equal(landerTag("itch-v2"), " [Itch v2]");
  assert.equal(landerTag("itch-v3"), " [Itch v3]");
  assert.equal(landerLabel("itch-v1"), "Itch v1");
  assert.equal(landerLabel("itch-v2"), "Itch v2");
  assert.equal(landerLabel("itch-v3"), "Itch v3");
});

test("a missing lander adds nothing to the subject, and resolves to null for the body", () => {
  assert.equal(landerTag(undefined), "");
  assert.equal(landerLabel(undefined), null);
});

test("an unrecognised lander still shows up rather than getting dropped", () => {
  assert.equal(landerTag("some-new-page"), " [some-new-page]");
  assert.equal(landerLabel("some-new-page"), "some-new-page");
});
