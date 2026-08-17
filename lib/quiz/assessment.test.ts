import assert from "node:assert/strict";
import { test } from "node:test";
import { assessmentRows, HIGH_FROM, levelWord, projection, type Answers } from "./assessment.ts";

test("scores stay inside 0 to 100 for empty and extreme answers", () => {
  const cases: Answers[] = [
    {},
    {
      "stress-level": "I am usually always stressed",
      sleep: "Less than 5 hours",
      "daytime-tiredness": "I usually feel tired all day long",
      "post-meal-hunger": "Yes",
    },
    { "stress-level": "I usually feel good", sleep: "More than 8 hours" },
  ];
  for (const a of cases) {
    for (const row of assessmentRows(a)) {
      assert.ok(row.you >= 0 && row.you <= 100, `${row.label} out of range: ${row.you}`);
    }
  }
});

test("every marker lands at the top of yellow or into red, whatever the answers", () => {
  const allClear: Answers = {
    "stress-level": "I usually feel good",
    sleep: "7 to 8 hours",
    "daytime-tiredness": "I am a ball of fire all day long",
    "skin-changes": "No",
    "brain-fog": "No",
    "weight-loss-difficulty": "No",
    "post-meal-hunger": "No",
    headaches: "No",
  };
  for (const a of [{} as Answers, allClear]) {
    for (const row of assessmentRows(a)) {
      assert.notEqual(levelWord(row.you), "Low", `${row.label} fell into green at ${row.you}`);
      assert.ok(row.you >= HIGH_FROM - 6, `${row.label} sat at ${row.you}, below the top of yellow`);
    }
  }
});

test("the worst answers push every marker into red", () => {
  const allBad: Answers = {
    "stress-level": "I am usually always stressed",
    sleep: "Less than 5 hours",
    "daytime-tiredness": "I usually feel tired all day long",
    "skin-changes": "Yes",
    "brain-fog": "Yes",
    "weight-loss-difficulty": "Yes",
    "post-meal-hunger": "Yes",
    headaches: "Yes",
  };
  for (const row of assessmentRows(allBad)) {
    assert.equal(levelWord(row.you), "High", `${row.label} only reached ${row.you}`);
  }
});

test("the projection starts at the current weight and ends at the target", () => {
  const p = projection({ weight: "200", weightUnit: "lb", targetWeight: "170", targetWeightUnit: "lb" });
  assert.ok(p);
  assert.equal(p.points[0].lb, 200);
  assert.equal(p.points.at(-1)?.lb, 170);
  assert.ok(p.weeks >= 12, "never plans faster than twelve weeks");
});

test("the projection never runs faster than one percent of body weight a week", () => {
  const p = projection({ weight: "300", weightUnit: "lb", targetWeight: "150", targetWeightUnit: "lb" });
  assert.ok(p);
  assert.ok(p.weeks >= 50, `50 weeks minimum at 3 lb a week, got ${p.weeks}`);
});

test("kilograms convert before anything else uses the number", () => {
  const p = projection({ weight: "100", weightUnit: "kg", targetWeight: "90", targetWeightUnit: "kg" });
  assert.ok(p);
  assert.equal(p.start, 220);
  assert.equal(p.target, 198);
});

test("no projection when the target is not a loss, or a weight is missing", () => {
  assert.equal(projection({ weight: "170", targetWeight: "200" }), null);
  assert.equal(projection({ weight: "170" }), null);
  assert.equal(projection({}), null);
});
