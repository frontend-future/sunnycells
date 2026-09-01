import assert from "node:assert/strict";
import test from "node:test";
import { funnelForPath, PIXEL_IDS } from "./meta-funnels.ts";

test("energy paths report to the energy dataset", () => {
  for (const p of [
    "/products/even-energy",
    "/products/even-energy/checkout",
    "/quiz/energy",
    "/quiz/energy/caffeine-familiarity",
    "/quiz/energy/results/plans",
    "/quiz/energy/results/checkout",
  ]) assert.equal(funnelForPath(p), "energy", p);
});

test("aging paths report to the aging dataset", () => {
  for (const p of [
    "/quiz/aging",
    "/quiz/aging/skin-feel",
    "/quiz/aging/results/checkout",
    /* The advertorials live off /aging rather than under the quiz, and they are the
       top of the same funnel, so they report to the same dataset. */
    "/aging",
    "/aging/7-warning-signs",
  ]) assert.equal(funnelForPath(p), "aging", p);
});

test("daily reds reports to its own dataset", () => {
  for (const p of ["/products/daily-reds", "/products/daily-reds/checkout"])
    assert.equal(funnelForPath(p), "reds", p);
});

test("everything else stays on the original dataset", () => {
  for (const p of [
    "/",
    "/quiz/diet",
    "/quiz/diet/results/checkout",
    "/hormone-harmony",
    "/quiz/energydrinks",
    "/quiz/agingskin",
    "/aging-something-else",
    "/products/even-energy-clone",
    "/products/daily-reds-clone",
  ]) assert.equal(funnelForPath(p), "default", p);
});

/* SC-25 shares the original cortisol dataset with the diet quiz on purpose. If someone
   later gives it a pixel of its own, this is the test that should fail first. */
test("the revitalize funnel reports into the original cortisol dataset", () => {
  assert.equal(funnelForPath("/products/revitalize"), "revitalize");
  assert.equal(funnelForPath("/products/revitalize/checkout"), "revitalize");
  assert.equal(funnelForPath("/revitalize/10-reasons"), "revitalize");
  assert.equal(funnelForPath("/revitalize/3pm-crash"), "revitalize");
  assert.equal(PIXEL_IDS.revitalize, PIXEL_IDS.default);
});
