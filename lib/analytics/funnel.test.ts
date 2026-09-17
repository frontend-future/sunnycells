import assert from "node:assert/strict";
import test from "node:test";
import { funnelStepFor } from "./funnel.ts";
import { dietQuiz } from "../quiz/diet.ts";
import { cortisolQuiz } from "../quiz/cortisol.ts";
import { brainQuiz } from "../quiz/brain.ts";
import { brainV2Quiz } from "../quiz/brainV2.ts";
import { brainV3Quiz } from "../quiz/brainV3.ts";
import { itchQuiz } from "../quiz/itch.ts";

test("the landing page is step 0, because gender is answered there", async () => {
  const s = await funnelStepFor("/quiz/diet");
  assert.deepEqual(s, { quiz: "diet", index: 0, slug: "landing", stage: "landing" });
});

test("a trailing slash is the same step", async () => {
  assert.deepEqual(await funnelStepFor("/quiz/diet/"), await funnelStepFor("/quiz/diet"));
});

test("questions run 1..n in config order", async () => {
  for (const [i, step] of dietQuiz.steps.entries()) {
    const s = await funnelStepFor(`/quiz/diet/${step.slug}`);
    assert.equal(s?.index, i + 1, step.slug);
    assert.equal(s?.stage, "question");
  }
});

test("results screens continue the numbering and never collide with questions", async () => {
  const first = await funnelStepFor("/quiz/diet/results/analyzing");
  assert.equal(first?.index, dietQuiz.steps.length + 1);
  assert.equal(first?.stage, "results");
  const last = await funnelStepFor("/quiz/diet/results/checkout");
  assert.equal(last?.index, dietQuiz.steps.length + 8);
});

test("every index in a funnel is unique and contiguous", async () => {
  const seen = [];
  for (const p of ["", ...dietQuiz.steps.map((s) => `/${s.slug}`),
    ...["analyzing","summary","projection","metabolism","benefits","story","plans","checkout"].map((r) => `/results/${r}`)]) {
    const s = await funnelStepFor(`/quiz/diet${p}`);
    assert.ok(s, p);
    seen.push(s.index);
  }
  assert.deepEqual(seen, seen.map((_, i) => i));
});

test("each funnel is numbered independently", async () => {
  const c = await funnelStepFor(`/quiz/cortisol/${cortisolQuiz.steps[0].slug}`);
  assert.deepEqual(c, { quiz: "cortisol", index: 1, slug: cortisolQuiz.steps[0].slug, stage: "question" });
});

test("cortisol has no story screen, so plans sits one place earlier", async () => {
  assert.equal(await funnelStepFor("/quiz/cortisol/results/story"), null);
  const plans = await funnelStepFor("/quiz/cortisol/results/plans");
  assert.equal(plans?.index, cortisolQuiz.steps.length + 5);
});

test("the brain funnel is numbered independently and ends at its story screen", async () => {
  const first = await funnelStepFor(`/quiz/brain/${brainQuiz.steps[0].slug}`);
  assert.deepEqual(first, { quiz: "brain", index: 1, slug: brainQuiz.steps[0].slug, stage: "question" });

  /* Story hands off to /products/brain-memory, outside /quiz/brain entirely, so
     there is no plans or checkout screen in this funnel to number. */
  const story = await funnelStepFor("/quiz/brain/results/story");
  assert.equal(story?.index, brainQuiz.steps.length + 5);
  assert.equal(await funnelStepFor("/quiz/brain/results/plans"), null);
  assert.equal(await funnelStepFor("/quiz/brain/results/checkout"), null);
});

test("the v2 clone is the same steps as v1, but ends at its own plans and checkout", async () => {
  assert.deepEqual(brainV2Quiz.steps.map((s) => s.slug), brainQuiz.steps.map((s) => s.slug));

  const first = await funnelStepFor(`/quiz/brain/v2/${brainV2Quiz.steps[0].slug}`);
  assert.deepEqual(first, { quiz: "brain/v2", index: 1, slug: brainV2Quiz.steps[0].slug, stage: "question" });

  const story = await funnelStepFor("/quiz/brain/v2/results/story");
  assert.equal(story?.index, brainV2Quiz.steps.length + 5);
  const plans = await funnelStepFor("/quiz/brain/v2/results/plans");
  assert.equal(plans?.index, brainV2Quiz.steps.length + 6);
  const checkout = await funnelStepFor("/quiz/brain/v2/results/checkout");
  assert.equal(checkout?.index, brainV2Quiz.steps.length + 7);
});

test("a quiz can live under a /v<N> segment, numbered independently of the unversioned one", async () => {
  const landing = await funnelStepFor("/quiz/brain/v3");
  assert.deepEqual(landing, { quiz: "brain/v3", index: 0, slug: "landing", stage: "landing" });

  const first = await funnelStepFor(`/quiz/brain/v3/${brainV3Quiz.steps[0].slug}`);
  assert.deepEqual(first, { quiz: "brain/v3", index: 1, slug: brainV3Quiz.steps[0].slug, stage: "question" });

  const plans = await funnelStepFor("/quiz/brain/v3/results/plans");
  assert.equal(plans?.index, brainV3Quiz.steps.length + 9);
  const checkout = await funnelStepFor("/quiz/brain/v3/results/checkout");
  assert.equal(checkout?.index, brainV3Quiz.steps.length + 10);

  /* /quiz/brain (v1) and /quiz/brain/v3 are numbered independently, not sharing
     one sequence: v1's own first question is still index 1 in its own funnel. */
  const v1First = await funnelStepFor(`/quiz/brain/${brainQuiz.steps[0].slug}`);
  assert.equal(v1First?.quiz, "brain");
  assert.equal(v1First?.index, 1);
});

test("the itch quiz is numbered independently and ends at its own plans and checkout", async () => {
  const first = await funnelStepFor(`/quiz/itch/${itchQuiz.steps[0].slug}`);
  assert.deepEqual(first, { quiz: "itch", index: 1, slug: itchQuiz.steps[0].slug, stage: "question" });

  const story = await funnelStepFor("/quiz/itch/results/story");
  assert.equal(story?.index, itchQuiz.steps.length + 6);
  const plans = await funnelStepFor("/quiz/itch/results/plans");
  assert.equal(plans?.index, itchQuiz.steps.length + 7);
  const checkout = await funnelStepFor("/quiz/itch/results/checkout");
  assert.equal(checkout?.index, itchQuiz.steps.length + 8);
});

test("pages outside a funnel are not steps", async () => {
  for (const p of ["/", "/products/daily-reds", "/lander/beetroot", "/quiz", "/quiz/nope/x",
    "/quiz/diet/results/nope", "/quiz/diet/results/cart"  /* removed route */]) {
    assert.equal(await funnelStepFor(p), null, p);
  }
});
