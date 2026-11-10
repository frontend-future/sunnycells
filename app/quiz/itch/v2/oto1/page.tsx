import type { Metadata } from "next";
import { FzOto } from "@/components/itch-quiz/FzOto";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Salmon funnel OTO1. Isolated: not linked from the funnel, not wired to Stripe or Shopify.
   The $30 price is a placeholder. */
export default function Oto1() {
  return (
    <FzOto
      step={1}
      headline="For faster results, start with a loading phase"
      subhead="We recommend a 30-day loading phase."
      intro="For the first month, you can give double the daily amount of Pure Omega Salmon Oil to help your dog feel the benefits sooner, then switch back to the regular daily amount for maintenance."
      price={30}
      acceptHref="/quiz/itch/thanks?product=oil"
      declineHref="/quiz/itch/v2/oto1-downsell"
      nextLast="Click the button above to take $20 off your extra bottle and have enough for the full 30-day loading phase."
    />
  );
}
