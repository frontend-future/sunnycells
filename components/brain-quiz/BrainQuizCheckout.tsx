"use client";

import type React from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildOrder, CART_ID, PRODUCT } from "@/lib/products/brain-memory";

/* The shared checkout, pointed at SC-31's cart and single free-trial plan. No fork,
   same pattern RevitalizeCheckout uses. Sky blue rather than a bespoke hex, since it is
   an existing design token and this product's page already runs on it. */
const THEME = {
  "--action-primary-bg": "var(--sky)",
  "--action-primary-bg-press": "var(--sky-press)",
  "--action-primary-fg": "var(--ink)",
  "--action-accent-bg": "var(--sky)",
  "--action-accent-bg-press": "var(--sky-press)",
  "--action-accent-fg": "var(--ink)",
  "--sprout": "var(--sky)",
  "--sprout-press": "var(--sky-press)",
  "--sprout-tint": "var(--sky-tint)",
} as React.CSSProperties;

export function BrainQuizCheckout() {
  return (
    <EvenCheckout
      backHref="/quiz/brain/results/story"
      backLabel={`Back to ${PRODUCT.name}`}
      product={{ name: PRODUCT.name, cartId: CART_ID, buildOrder, guaranteeDays: 30 }}
      theme={THEME}
    />
  );
}
