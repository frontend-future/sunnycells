import assert from "node:assert/strict";
import test from "node:test";
import { funnelForPath } from "./meta-funnels.ts";

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
  for (const p of ["/quiz/aging", "/quiz/aging/skin-feel", "/quiz/aging/results/checkout"])
    assert.equal(funnelForPath(p), "aging", p);
});

test("everything else stays on the original dataset", () => {
  for (const p of [
    "/",
    "/quiz/diet",
    "/quiz/diet/results/checkout",
    "/hormone-harmony",
    "/quiz/energydrinks",
    "/quiz/agingskin",
    "/products/even-energy-clone",
  ]) assert.equal(funnelForPath(p), "default", p);
});
