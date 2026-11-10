import type { Metadata } from "next";
import { FzOto } from "@/components/itch-quiz/FzOto";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/* Salmon funnel OTO1 downsell, shown after OTO1 is declined. Isolated, same rules as OTO1.
   The $25 price is a placeholder. */
export default function Oto1Downsell() {
  return (
    <FzOto
      step={2}
      headline="One last offer"
      subhead="Add a backup bottle and save $25."
      intro="Same bottle, a lower price. A second bottle means a late delivery or a trip never breaks the routine."
      price={25}
      acceptHref="/quiz/itch/thanks?product=oil"
      declineHref="/quiz/itch/thanks?product=oil"
      whatsNext={[
        "Your backup bottle is a one-time purchase and ships with your first order, with the same free shipping.",
        "Your subscription carries on as before, with a new bottle every 4 weeks.",
      ]}
    />
  );
}
