import type { Metadata } from "next";
import { FzOto } from "@/components/itch-quiz/FzOto";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Salmon funnel OTO1: add two bottles for $45 (regular $100) to make 3 months. Isolated: not linked from the
   funnel, not wired to Stripe or Shopify. The 3 minute hold is real: at zero the page moves to the downsell. */
export default function Oto1() {
  return (
    <FzOto
      step={1}
      timerLabel="Your $55 savings is held for"
      headline="Get the full 90 days of itch relief, $55 off"
      subhead="Add 2 more bottles for $45 instead of $100."
      intro="Relief builds over the first 90 days of steady omega-3s. This gives your dog every one of those days, delivered with your first bottle."
      gets={[
        "3 full months of daily Pure Omega Salmon Oil, no gaps",
        "Free shipping, and the extra bottles arrive with your first one",
        "No reordering to remember before the 90 days are up",
      ]}
      offerTitle="2 more bottles: your full 90 days"
      was={100}
      price={45}
      offerBody="Two more bottles of Pure Omega Salmon Oil. With the bottle already in your order, that is a 3 month supply. One-time payment."
      cta="Yes, add my 90 days for $45 (save $55)"
      next={[
        "Tap the button above and the 2 extra bottles join your order. Nothing to re-enter.",
        "You will not see this price anywhere else, and it ends when the timer does.",
      ]}
      acceptHref="/quiz/itch/thanks?product=oil"
      declineHref="/quiz/itch/v2/oto1-downsell"
    />
  );
}
