"use client";

import type React from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { PRODUCT } from "@/lib/products/dog-itch";
import { ITCH_CART_ID, buildItchOrder } from "@/lib/quiz/itchLadder";

/* Sprout green, the jar's own colour, same pattern BrainLadderCheckout uses
   with its product's sky blue. */
const THEME = {
  "--action-primary-bg": "var(--sprout)",
  "--action-primary-bg-press": "var(--sprout-press)",
  "--action-primary-fg": "var(--ink)",
  "--action-accent-bg": "var(--sprout)",
  "--action-accent-bg-press": "var(--sprout-press)",
  "--action-accent-fg": "var(--ink)",
} as React.CSSProperties;

/**
 * Checkout for the itch quiz's paid 1/3/6 month ladder. Kept on its own cart
 * (ITCH_CART_ID), same reasoning as BrainLadderCheckout: separate from any
 * other product's own checkout, which would show the wrong total for
 * whichever plan was actually picked here.
 */
export function ItchCheckout({
  backHref = "/quiz/itch/results/plans",
}: { backHref?: string } = {}) {
  return (
    <EvenCheckout
      backHref={backHref}
      backLabel={`Back to ${PRODUCT.name}`}
      product={{ name: PRODUCT.name, cartId: ITCH_CART_ID, buildOrder: buildItchOrder, guaranteeDays: 30 }}
      theme={THEME}
    />
  );
}
