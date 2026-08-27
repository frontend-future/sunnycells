import type { Metadata } from "next";
import { EvenCheckout } from "@/components/even-energy/EvenCheckout";

export const metadata: Metadata = { title: "Shipping details | SUNNYCELLS" };

/* The product's own checkout, pointed back at the quiz. Forking it would have given
   the funnel a second checkout to keep in step with the first. */
export default function CheckoutPage() {
  return <EvenCheckout backHref="/quiz/energy/results/plans" backLabel="Back to your plan" />;
}
