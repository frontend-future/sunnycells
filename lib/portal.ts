/* Pure helpers for the /membership portal. No Stripe, no React, so they can be tested alone. */

/** A Stripe price interval as whole weeks: "week" x2 is 2, "month" x1 is 4, "day" x28 is 4. */
export function weeksOf(interval: string | undefined, count: number | undefined): number {
  const n = Math.max(1, count ?? 1);
  if (interval === "day") return Math.max(1, Math.round(n / 7));
  if (interval === "week") return n;
  if (interval === "month") return n * 4;
  if (interval === "year") return n * 52;
  return 4;
}

export const STAGES = [
  { key: "building", title: "Building", range: "Days 1 to 30", from: 1, to: 30 },
  { key: "settling", title: "Settling in", range: "Days 31 to 60", from: 31, to: 60 },
  { key: "nearly", title: "Nearly there", range: "Days 61 to 90", from: 61, to: 90 },
  { key: "maintenance", title: "Maintenance", range: "Day 90 and after", from: 91, to: Infinity },
] as const;

/** Results build over the first 90 days, then it is maintenance. Day 1 is the day of the first order. */
export function dayOf(sinceSec: number, nowSec: number): number {
  return Math.max(1, Math.floor((nowSec - sinceSec) / 86_400) + 1);
}
export function stageIndex(day: number): number {
  return STAGES.findIndex((s) => day >= s.from && day <= s.to);
}

/** Whole-dollar display. Prices are integers everywhere. */
export const dollars = (cents: number) => "$" + Math.round(cents / 100).toLocaleString("en-US");
