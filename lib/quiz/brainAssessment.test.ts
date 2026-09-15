import assert from "node:assert/strict";
import { test } from "node:test";
import { brainRows, CLARITY_PAD_BELOW, clarityProjection, withoutCurve } from "./brainAssessment.ts";
import { ageFromAnswers } from "./types.ts";
import type { Answers } from "./assessment.ts";

test("scores stay inside 0 to 100 for empty and extreme answers", () => {
  const cases: Answers[] = [
    {},
    {
      "word-finding": "Yes, often",
      "focus-difficulty": "Yes",
      rereading: "Yes, often",
      "following-conversations": "Yes",
      "fog-timing": "It's constant",
      "mood-irritability": "Yes, noticeably",
    },
    { "word-finding": "Rarely", "focus-difficulty": "No", rereading: "Rarely" },
  ];
  for (const a of cases) {
    for (const row of brainRows(a)) {
      assert.ok(row.you >= 0 && row.you <= 100, `${row.label} out of range: ${row.you}`);
    }
  }
});

test("the clarity projection always climbs from now to the 90 day target", () => {
  const cases: Answers[] = [
    {},
    { "word-finding": "Yes, often", "focus-difficulty": "Yes", "fog-timing": "It's constant" },
    { "word-finding": "Rarely", "focus-difficulty": "No", "fog-timing": "Morning" },
  ];
  for (const a of cases) {
    const p = clarityProjection(a);
    assert.ok(p.target > p.start, "the plan line must climb, not fall");
    assert.equal(p.points[0].lb, p.start);
    assert.equal(p.points.at(-1)?.lb, p.target);
  }
});

test("the without curve drifts down rather than climbing", () => {
  assert.equal(withoutCurve(0), -0);
  assert.ok(withoutCurve(1) < 0, "a full 90 days without a change should read as a decline");
});

test("the without curve never runs off the bottom of the chart", () => {
  /* BrainProjection passes CLARITY_PAD_BELOW as ProjectionChart's padBelow, so a
     compare curve steeper than -CLARITY_PAD_BELOW at t=1 draws below the axis
     whatever clarityNow() returns. This mirrors that formula directly rather than
     picking one start/target pair, so it still catches a regression if NOW_BAND or
     CLARITY_PAD_BELOW changes later. */
  assert.ok(
    withoutCurve(1) > -CLARITY_PAD_BELOW,
    `withoutCurve(1) = ${withoutCurve(1)}, past the chart's -${CLARITY_PAD_BELOW} floor`,
  );
});

test("age is computed from a complete date of birth and null otherwise", () => {
  assert.equal(ageFromAnswers({}), null);
  assert.equal(ageFromAnswers({ dobMonth: "6", dobDay: "15" }), null);

  const today = new Date();
  const y = today.getFullYear();
  assert.equal(ageFromAnswers({ dobMonth: "1", dobDay: "1", dobYear: String(y - 61) }), 61);

  /* A 61st birthday that falls tomorrow has not happened yet, so today's age is still
     60. Built off tomorrow's own year, not today's, so this holds even when tomorrow
     rolls into January of the next calendar year. */
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  assert.equal(
    ageFromAnswers({
      dobMonth: String(tomorrow.getMonth() + 1),
      dobDay: String(tomorrow.getDate()),
      dobYear: String(tomorrow.getFullYear() - 61),
    }),
    60,
  );
});
