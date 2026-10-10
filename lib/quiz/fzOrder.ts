import { firstOrderPrice, formatPrice } from "@/lib/price";
import { FZ_JAR, FZ_PRODUCT_NAME } from "./fridayzoomiesOffer";

/* What a Friday Zoomies order contains, shared by the checkout summary and the thank you
   page. Mirrors the Shopify cart (lib/shopify/fridayzoomies.ts): the bundle on its
   subscription plus four $0 gifts, with FIRST50 on the first order. */
export const PRICE = 50;
export const FIRST = firstOrderPrice(PRICE);
export const IMG = "/quiz/fridayzoomies";

export const LINES: { name: string; sub?: string; image: string; price?: string; now?: string }[] = [
  { name: FZ_PRODUCT_NAME, sub: "Deliver every 4 weeks", image: FZ_JAR, price: formatPrice(PRICE), now: formatPrice(FIRST) },
  { name: "Itch Spray", image: `${IMG}/gift-spray.webp` },
  { name: "USA Doggie Bandana", image: `${IMG}/gift-bandana.webp` },
  { name: "Mystery Gift", image: `${IMG}/gift-mystery.webp` },
  { name: "Fast USA Shipping", image: `${IMG}/gift-shipping.webp` },
];
