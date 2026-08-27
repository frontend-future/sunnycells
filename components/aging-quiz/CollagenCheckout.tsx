"use client";

import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildCollagenOrder, CART_ID, PRODUCT } from "@/lib/products/complete-collagen";

/* The product bundle carries a function, and a function cannot be handed from a server
   component to a client one. Building it inside the client boundary is what keeps the
   route file a one-liner. */
export function CollagenCheckout() {
  return (
    <EvenCheckout
      product={{ name: PRODUCT.name, cartId: CART_ID, buildOrder: buildCollagenOrder }}
      backHref="/quiz/aging/results/plans"
      backLabel="Back to your match"
    />
  );
}
