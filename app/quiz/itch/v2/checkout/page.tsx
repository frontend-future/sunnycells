import type { Metadata } from "next";
import { FzCheckoutPageV2 } from "@/components/itch-quiz/FzCheckoutPageV2";

/* Standalone: nothing links here yet. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function ItchCheckoutV2Page() {
  return <FzCheckoutPageV2 />;
}
