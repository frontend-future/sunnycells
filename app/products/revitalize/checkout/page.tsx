import type { Metadata } from "next";
import { RevitalizeCheckout } from "@/components/revitalize/RevitalizeCheckout";

export const metadata: Metadata = {
  title: "Checkout | Revitalize Gummies",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <RevitalizeCheckout />;
}
