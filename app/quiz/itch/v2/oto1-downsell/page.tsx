import type { Metadata } from "next";
import { FzOto } from "@/components/itch-quiz/FzOto";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Salmon funnel OTO1 downsell, shown after OTO1 is declined: one more bottle at 50% off ($30, regular $60).
   Isolated, same rules as OTO1. */
export default function Oto1Downsell() {
  return (
    <FzOto
      step={2}
      headline="One more offer"
      subhead="Add one more bottle at 50% off."
      intro="If 3 months is more than you want right now, one extra bottle is half price and takes you to 2 months of Pure Omega Salmon Oil."
      offerTitle="Add on: 1 more bottle at 50% off"
      was={60}
      price={30}
      offerBody="One additional bottle of Pure Omega Salmon Oil. This is a one-time payment."
      cta="Add 1 bottle for 50% off · $30"
      next={[
        "The extra bottle ships with your first bottle.",
        "Click the button above to add it for $30. This price is only available on this page.",
      ]}
      acceptHref="/quiz/itch/thanks?product=oil"
      declineHref="/quiz/itch/thanks?product=oil"
    />
  );
}
