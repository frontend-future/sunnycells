"use client";

import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildOrder, CART_ID, PRODUCT } from "@/lib/products/steady-burn";

/* The shared checkout, pointed at SC-25's cart and ladder. No fork. */
export function SteadyBurnCheckout() {
  return (
    <EvenCheckout
      backHref="/products/steady-burn"
      backLabel={`Back to ${PRODUCT.shortName}`}
      product={{ name: PRODUCT.name, cartId: CART_ID, buildOrder }}
    />
  );
}
