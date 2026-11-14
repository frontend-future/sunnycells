import type { Metadata } from "next";
import { FzOto } from "@/components/itch-quiz/FzOto";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Salmon funnel OTO1 downsell, shown after OTO1 is declined or its timer runs out: one more bottle at 50% off
   ($30, regular $60). Isolated, same rules as OTO1. */
export default function Oto1Downsell() {
  return (
    <FzOto
      step={2}
      timerLabel="Half price on one more bottle, held for"
      headline="Keep going for 4 more weeks at half price"
      subhead="One extra bottle for $30 instead of $60."
      intro="A second bottle means another 4 weeks of daily salmon oil, so the first month of relief carries straight into the second."
      gets={[
        "4 more weeks of daily Pure Omega Salmon Oil",
        "Free shipping with your first bottle",
        "Half price, only on this page",
      ]}
      offerTitle="1 more bottle at 50% off"
      was={60}
      price={30}
      offerBody="One more bottle of Pure Omega Salmon Oil. One-time payment."
      cta="Yes, add 1 bottle for $30 (save $30)"
      next={[
        "Tap the button above and the extra bottle joins your order. Nothing to re-enter.",
        "This is the last time this price shows, and it ends when the timer does.",
      ]}
      acceptHref="/quiz/itch/thanks?product=oil"
      declineHref="/quiz/itch/thanks?product=oil"
    />
  );
}
