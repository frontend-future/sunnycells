import type { Metadata } from "next";
import { SteadyBurnCheckout } from "@/components/steady-burn/SteadyBurnCheckout";

export const metadata: Metadata = {
  title: "Checkout | Steady Burn Gummies",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SteadyBurnCheckout />;
}
