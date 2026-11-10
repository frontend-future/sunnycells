import type { Metadata } from "next";
import { FzOto } from "@/components/itch-quiz/FzOto";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Salmon funnel OTO1 downsell, shown after OTO1 is declined. Isolated, same rules as OTO1.
   The $25 price is a placeholder. */
export default function Oto1Downsell() {
  return (
    <FzOto
      step={2}
      headline="One final offer!"
      subhead="Add now and save $25."
      intro="We genuinely recommend it: double up for the first 30 days to help your dog feel the benefits sooner, then go back to the regular daily amount."
      price={25}
      acceptHref="/quiz/itch/thanks?product=oil"
      declineHref="/quiz/itch/thanks?product=oil"
      nextLast="Click the button above to unlock your one-time $25 off and add a single extra bottle to your order."
    />
  );
}
