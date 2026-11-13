import type { Metadata } from "next";
import { FzCheckoutPageV2 } from "@/components/itch-quiz/FzCheckoutPageV2";
import { isOilPlan } from "@/lib/quiz/fzPlans";

/* Checkout for the v3 plans page: ?plan=1 (1 month trial), 3 (3 month supply) or once. Anything
   else is the trial. Nothing in the live funnel links here yet. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ItchV3CheckoutPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  return <FzCheckoutPageV2 oil plan={isOilPlan(plan) ? plan : "1"} />;
}
