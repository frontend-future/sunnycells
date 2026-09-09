"use client";

import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildOrder, CART_ID, PRODUCT } from "@/lib/products/anytime-calm";

/* The product bundle carries a function, and a function cannot be handed from a server
   component to a client one. Building it inside the client boundary is what keeps the
   route file a one-liner. */
export function CalmCheckout() {
  return (
    <EvenCheckout
      product={{ name: PRODUCT.title, cartId: CART_ID, buildOrder }}
      backHref="/quiz/calm/results/plans"
      backLabel="Back to your match"
    />
  );
}
