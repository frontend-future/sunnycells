import type { Metadata } from "next";
import { FzOto } from "@/components/itch-quiz/FzOto";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Salmon funnel OTO1. Isolated: not linked from the funnel, not wired to Stripe or Shopify.
   The $35 price is a placeholder. */
export default function Oto1() {
  return (
    <FzOto
      step={1}
      headline="One more thing before your order ships"
      subhead="We recommend a backup bottle."
      intro="Relief builds over the first 90 days of daily use. Add a second bottle now so the routine never has a gap."
      price={35}
      acceptHref="/quiz/itch/thanks?product=oil"
      declineHref="/quiz/itch/oto1-downsell"
      whatsNext={[
        "Your backup bottle is a one-time purchase and ships with your first order, with the same free shipping.",
        "Your subscription carries on as before, with a new bottle every 4 weeks.",
      ]}
    />
  );
}
