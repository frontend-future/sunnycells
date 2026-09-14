"use client";

import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildBrainOrder, CART_ID, PRODUCT } from "@/lib/products/brain";

/* The shared checkout, pointed at SC-27's cart and ladder. No theme override
   needed: Clear Mind runs the same green as Even Energy, which is what the
   shared sheet already renders by default. */
export function BrainCheckout() {
  return (
    <EvenCheckout
      backHref="/products/brain"
      backLabel={`Back to ${PRODUCT.name}`}
      product={{ name: PRODUCT.name, cartId: CART_ID, buildOrder: buildBrainOrder, guaranteeDays: 30 }}
    />
  );
}
