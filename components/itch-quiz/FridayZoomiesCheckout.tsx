"use client";

import type React from "react";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { FZ_CART_ID, FZ_PRODUCT_NAME, buildFzOrder } from "@/lib/quiz/fridayzoomiesOffer";

/* Cobalt buttons with white type, sunshine for the accent. Same pattern ItchCheckout
   uses with the jar's own green, here with Friday Zoomies' blue. */
const THEME = {
  "--action-primary-bg": "var(--cobalt)",
  "--action-primary-bg-press": "var(--cobalt-press)",
  "--action-primary-fg": "#FFFFFF",
  "--action-accent-bg": "var(--sun)",
  "--action-accent-bg-press": "var(--sun-press)",
  "--action-accent-fg": "var(--midnight)",
} as React.CSSProperties;

/** ItchCheckout with Friday Zoomies' product name, order lines and colours. Shares
    the itch cart (FZ_CART_ID), so the plan picked on the plans page carries over. */
export function FridayZoomiesCheckout({ backHref }: { backHref: string }) {
  return (
    <EvenCheckout
      backHref={backHref}
      backLabel={`Back to ${FZ_PRODUCT_NAME}`}
      product={{ name: FZ_PRODUCT_NAME, cartId: FZ_CART_ID, buildOrder: buildFzOrder, guaranteeDays: 30 }}
      theme={THEME}
    />
  );
}
