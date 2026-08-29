"use client";

import { EvenCheckout } from "@/components/even-energy/EvenCheckout";
import { buildOrder, CART_ID, PRODUCT } from "@/lib/products/daily-reds";

/* buildOrder is a function, and a function cannot cross the server to client boundary,
   so the bundle is assembled inside the client component. */
export function DailyRedsCheckout() {
  return (
    <EvenCheckout
      product={{ name: PRODUCT.name, cartId: CART_ID, buildOrder }}
      backHref="/products/daily-reds"
      backLabel="Back to Daily Reds"
    />
  );
}
