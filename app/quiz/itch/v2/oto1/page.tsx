import type { Metadata } from "next";
import { FzOto } from "@/components/itch-quiz/FzOto";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Salmon funnel OTO1: go to 3 months by adding two bottles for $45 (regular $100). Isolated: not linked
   from the funnel, not wired to Stripe or Shopify. */
export default function Oto1() {
  return (
    <FzOto
      step={1}
      headline="For best results, buy 3 months"
      subhead="Add two more bottles and save $55. You only see this offer once."
      intro="Skin needs about 90 days of steady omega-3s to settle. Two extra bottles today covers the full 3 months, so you never run out partway through."
      offerTitle="Add on: 2 more bottles, 3 months total"
      was={100}
      price={45}
      offerBody="Two additional bottles of Pure Omega Salmon Oil, which with the bottle in your order makes a full 3 month supply. This is a one-time payment."
      cta="Add 2 bottles and save $55 · $45"
      next={[
        "The two extra bottles ship with your first bottle, so you have 3 months on hand from day one.",
        "Click the button above to add them for $45. This price is only available on this page.",
      ]}
      acceptHref="/quiz/itch/thanks?product=oil"
      declineHref="/quiz/itch/v2/oto1-downsell"
    />
  );
}
