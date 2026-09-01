"use client";

import type React from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildOrder, CART_ID, PRODUCT } from "@/lib/products/revitalize";

/* The shared checkout, pointed at SC-25's cart and ladder. No fork.
   The palette comes across from the product page so the two do not disagree at the
   moment somebody types a card number: the shared sheet binds SC-22's green. */
const THEME = {
  "--action-primary-bg": "#D6212B",
  "--action-primary-bg-press": "#A9161E",
  "--action-primary-fg": "#FFFFFF",
  "--action-accent-bg": "#D6212B",
  "--action-accent-bg-press": "#A9161E",
  "--action-accent-fg": "#FFFFFF",
  "--sprout": "#D6212B",
  "--sprout-press": "#A9161E",
  "--sprout-tint": "#FBEBEC",
  "--sun": "#A6DE1E",
  "--sun-tint": "#F4F1E6",
  "--summary-a": "#FEF7F7",
  "--summary-b": "#F6D7D9",
} as React.CSSProperties;

export function RevitalizeCheckout() {
  return (
    <EvenCheckout
      backHref="/products/revitalize"
      backLabel={`Back to ${PRODUCT.shortName}`}
      product={{ name: PRODUCT.name, cartId: CART_ID, buildOrder, guaranteeDays: 60 }}
      theme={THEME}
    />
  );
}
