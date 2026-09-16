"use client";

import type React from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { PRODUCT } from "@/lib/products/brain-memory";
import { BRAIN_LADDER_CART_ID, buildBrainLadderOrder } from "@/lib/quiz/brainLadder";

/* Sky blue, same token this product's own page runs on, same pattern
   RevitalizeCheckout and BrainQuizCheckout use. */
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

/**
 * Checkout for the paid 1/3/6 month ladder, shared by both /quiz/brain/v2 and
 * /quiz/brain/v3's plans pages. Kept on its own cart (BRAIN_LADDER_CART_ID),
 * separate from the real product's own checkout, which only ever knows how to
 * build the free-trial order and would show the wrong total for whichever plan
 * was actually picked here.
 */
export function BrainLadderCheckout({
  backHref = "/quiz/brain/v2/results/plans",
}: { backHref?: string } = {}) {
  return (
    <EvenCheckout
      backHref={backHref}
      backLabel={`Back to ${PRODUCT.name}`}
      product={{ name: PRODUCT.name, cartId: BRAIN_LADDER_CART_ID, buildOrder: buildBrainLadderOrder, guaranteeDays: 30 }}
      theme={THEME}
    />
  );
}
