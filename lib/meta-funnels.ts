/**
 * Which Meta dataset a page reports to.
 *
 * The two funnels sell different products to different audiences and each has its
 * own pixel. A page belongs to exactly one, so events never land in both datasets
 * and neither funnel's attribution is polluted by the other's traffic.
 */
export type Funnel = "energy" | "default";

/** Everything under the Even Energy product, including its checkout. */
export function funnelForPath(pathname: string): Funnel {
  return pathname.startsWith("/products/even-energy") ? "energy" : "default";
}

/* Both are read statically so Next can inline them into the client bundle. A
   NEXT_PUBLIC_* value reached through a computed key is not replaced at build
   time and arrives as undefined in the browser. */
export const PIXEL_IDS: Record<Funnel, string | undefined> = {
  energy: process.env.NEXT_PUBLIC_META_PIXEL_ID_ENERGY,
  default: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};
