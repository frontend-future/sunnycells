"use client";

import type { CSSProperties } from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildOrder, CART_ID, PRODUCT } from "@/lib/products/brain-memory";

/* The shared checkout defaults to even-energy's green; this SKU's own photography
   runs blue, so the action tokens are retinted here to match rather than leaving
   the checkout in a different color family than the page that led to it. */
const THEME = {
  "--action-primary-bg": "linear-gradient(135deg, var(--sky) 0%, var(--sky-press) 100%)",
  "--action-primary-bg-press": "linear-gradient(135deg, var(--sky-press) 0%, #4E7AB0 100%)",
  "--action-accent-bg": "var(--action-primary-bg)",
  "--action-accent-bg-press": "var(--action-primary-bg-press)",
  "--sprout": "var(--sky)",
  "--sprout-press": "var(--sky-press)",
  "--sprout-tint": "var(--sky-tint)",
  "--summary-a": "#EEF3FB",
  "--summary-b": "#CFDEF5",
} as CSSProperties;

export function BrainMemoryCheckout() {
  return (
    <EvenCheckout
      backHref="/products/brain-memory"
      backLabel={`Back to ${PRODUCT.name}`}
      product={{ name: PRODUCT.name, cartId: CART_ID, buildOrder, guaranteeDays: 30 }}
      theme={THEME}
    />
  );
}
