import test from "node:test";
import assert from "node:assert/strict";
import { STAGE, stageFor } from "./notify-stage.ts";

test("each stage has its own subject and note", () => {
  assert.equal(STAGE.payment.subject, "Reached payment");
  assert.equal(STAGE.purchase.subject, "Purchase attempt");
  assert.notEqual(STAGE.payment.note, STAGE.purchase.note);
  assert.match(STAGE.payment.note, /No card was entered/);
});

/* An older caller that sends no stage must keep reading as the stronger signal rather
   than silently becoming the weaker one. */
test("an omitted stage falls back to purchase", () => {
  assert.equal(stageFor().subject, "Purchase attempt");
  assert.equal(stageFor("payment").subject, "Reached payment");
  assert.equal(stageFor("purchase").subject, "Purchase attempt");
});
