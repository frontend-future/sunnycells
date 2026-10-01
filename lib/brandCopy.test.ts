import assert from "node:assert/strict";
import test from "node:test";
import { renameProduct } from "./brandCopy.ts";

const N = "Inside-Out Itch Bundle";
const r = (s: string) => renameProduct(s, N);

test("a singular name gets its article and verb fixed", () => {
  assert.equal(r("SC-01 Daily Chews are made to calm"), `The ${N} is made to calm`);
  assert.equal(r("fish oil, SC-01 Daily Chews support {name}'s skin"), `fish oil, the ${N} supports {name}'s skin`);
  assert.equal(r("probiotics in SC-01 Daily Chews support digestion"), `probiotics in the ${N} support digestion`);
  assert.equal(r("SC-01 Daily Chews helped"), `The ${N} helped`);
  assert.equal(r("How do I give SC-01 Daily Chews?"), `How do I give the ${N}?`);
  assert.equal(r("SC-01 Daily Chews"), `the ${N}`);
});

test("the default name passes through untouched", () => {
  assert.equal(renameProduct("SC-01 Daily Chews are", "SC-01 Daily Chews"), "SC-01 Daily Chews are");
});
