/**
 * Two moments in a checkout worth being told about, and they are not the same lead.
 *
 *   "payment"  they filled in shipping and reached the card step
 *   "purchase" they entered a card and pressed Submit secure payment
 *
 * Lives outside the route so it can be tested without pulling in next/server, and so
 * both checkouts read the same wording from one place.
 */
export type Stage = "payment" | "purchase";

export const STAGE = {
  payment: {
    title: "Reached payment",
    subject: "Reached payment",
    note: "They filled in shipping and reached the card step. No card was entered.",
  },
  purchase: {
    title: "Purchase attempt",
    subject: "Purchase attempt",
    note: "No payment was processed. This checkout does not run real transactions yet.",
  },
} as const;

/** Defaults to the stronger signal, so an older caller that sends no stage is unchanged. */
export const stageFor = (s?: Stage) => STAGE[s ?? "purchase"];
