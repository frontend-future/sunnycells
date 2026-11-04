import type { Metadata } from "next";
import { FzCheckoutPageV2 } from "@/components/itch-quiz/FzCheckoutPageV2";

/* Checkout for Pure Omega Salmon Oil. The plans page at /quiz/itch/results/plans/v2 sends buyers here. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ItchOilCheckoutPage() {
  return <FzCheckoutPageV2 oil />;
}
