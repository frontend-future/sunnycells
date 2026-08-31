import type { Metadata } from "next";
import { OuttyPrePage } from "@/components/outty/OuttyPrePage";

/* noindex, same as the PDP it feeds: a layout clone of a live competitor page. */
export const metadata: Metadata = {
  title: "I quit drinking and kept my social life | Outty",
  description: "Outty is an alcohol-free drink mix that calms your nerves and keeps your head clear.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OuttyPrePage />;
}
