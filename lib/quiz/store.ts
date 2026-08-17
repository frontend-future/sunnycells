"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Answers } from "./assessment";

export type { Answers };

/* Answers live in sessionStorage under the quiz's own id, so two funnels never read
   each other's, a refresh keeps them, and closing the tab drops them. Nothing here
   leaves the browser until a step chooses to send it.
   ponytail: sessionStorage, not a store library. Swap for a server session only when
   answers need to survive a device change. */
const key = (quizId: string) => `sunnycells.quiz.${quizId}`;

const EMPTY: Answers = Object.freeze({});

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

/* useSyncExternalStore compares snapshots by identity, so parsing on every call would
   loop forever. Cache the parsed object against the raw string it came from. */
const cache = new Map<string, { raw: string | null; value: Answers }>();

export function readAnswers(quizId: string): Answers {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.sessionStorage.getItem(key(quizId));
  const hit = cache.get(quizId);
  if (hit && hit.raw === raw) return hit.value;

  let value: Answers = EMPTY;
  try {
    if (raw) value = JSON.parse(raw) as Answers;
  } catch {
    value = EMPTY;
  }
  cache.set(quizId, { raw, value });
  return value;
}

export function writeAnswer(quizId: string, field: string, value: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(key(quizId), JSON.stringify({ ...readAnswers(quizId), [field]: value }));
  for (const l of listeners) l();
}

/**
 * Reads sessionStorage through React's own external-store API rather than an effect,
 * so the server render and the hydrating client render agree and no cascading render
 * is needed to correct them. `ready` is false on the server and during hydration:
 * hold personalised copy behind it or the first paint will flash the wrong text.
 */
export function useAnswers(quizId: string) {
  const answers = useSyncExternalStore(
    subscribe,
    () => readAnswers(quizId),
    () => EMPTY,
  );
  const ready = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const set = useCallback(
    (field: string, value: string) => writeAnswer(quizId, field, value),
    [quizId],
  );

  return { answers, set, ready };
}
