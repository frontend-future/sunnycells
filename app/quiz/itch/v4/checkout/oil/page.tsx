import type { Metadata } from "next";
import { FzCheckoutPageV2 } from "@/components/itch-quiz/FzCheckoutPageV2";
import { isOilPlan } from "@/lib/quiz/fzPlans";

/* Checkout for the v4 buy box: ?plan=m1, m2 or m3 (1, 2 or 3 month supply). Anything else is the 2 month supply,
   the plan the buy box starts on. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ItchOilCheckoutV4Page({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  return <FzCheckoutPageV2 oil plan={isOilPlan(plan) && plan.startsWith("m") ? plan : "m2"} />;
}
