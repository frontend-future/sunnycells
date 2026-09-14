"use client";

import type React from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildBrainOrder, CART_ID, PRODUCT } from "@/lib/products/brain";

/* The shared checkout, pointed at SC-27's cart and ladder. No fork.
   --sprout is used directly for several checkout backgrounds, not only through
   --action-*, so it needs its own override too, the same way Revitalize and
   Anytime Calm re-theme this same shared sheet. */
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
  "--summary-a": "#EEF3FB",
  "--summary-b": "var(--sky-tint)",
} as React.CSSProperties;

export function BrainCheckout() {
  return (
    <EvenCheckout
      backHref="/products/brain"
      backLabel={`Back to ${PRODUCT.name}`}
      product={{ name: PRODUCT.name, cartId: CART_ID, buildOrder: buildBrainOrder, guaranteeDays: 30 }}
      theme={THEME}
    />
  );
}
