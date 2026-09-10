"use client";

import type React from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildOrder, CART_ID, PRODUCT } from "@/lib/products/anytime-calm";
import { useAnswers } from "@/lib/quiz/store";

/* Every lander that writes into this cart's own back link. Anything not listed here
   (postpartum, the quiz funnel, a cart with no lander recorded yet) falls back to the
   product page, which was this link's only destination before landers existed. */
const BACK_HREF: Record<string, string> = {
  melatonin: "/products/anytime-calm/melatonin",
};

/* The shared checkout defaults to Even Energy's green. Anytime Calm's own page never
   rebinds the house tokens at all, it just uses the plain SUNNYCELLS sun yellow, so
   this theme un-rebinds the same tokens the green product sets rather than inventing a
   new palette: --sprout is used directly for several checkout backgrounds, not only
   through --action-*, so it needs its own override too. */
const THEME = {
  "--action-primary-bg": "var(--ink)",
  "--action-primary-bg-press": "var(--ink-80)",
  "--action-primary-fg": "var(--white)",
  "--action-accent-bg": "var(--sun)",
  "--action-accent-bg-press": "var(--sun-press)",
  "--action-accent-fg": "var(--ink)",
  "--sprout": "var(--sun)",
  "--sprout-press": "var(--sun-press)",
  "--sprout-tint": "var(--sun-tint)",
  "--summary-a": "#FFFDF5",
  "--summary-b": "var(--sun-tint)",
} as React.CSSProperties;

/* The product bundle carries a function, and a function cannot be handed from a server
   component to a client one. Building it inside the client boundary is what keeps the
   route file a one-liner. */
export function CalmCheckout() {
  const { answers } = useAnswers(CART_ID);
  const backHref = BACK_HREF[answers.lander ?? ""] ?? "/products/anytime-calm";
  return (
    <EvenCheckout
      product={{ name: PRODUCT.title, cartId: CART_ID, buildOrder }}
      backHref={backHref}
      backLabel="Back to Anytime Calm"
      theme={THEME}
    />
  );
}
