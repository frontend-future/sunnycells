import type { Metadata } from "next";
import { OuttyPage } from "@/components/outty/OuttyPage";

/* noindex: this is a layout clone of a live competitor page, built for review. It must
   not turn up in search under our domain. */
export const metadata: Metadata = {
  title: "Outty | The Outgoing Co.",
  description: "Rewire your brain to crave socializing.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OuttyPage />;
}
