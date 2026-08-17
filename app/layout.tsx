import type { Metadata } from "next";
import { Outfit, Figtree } from "next/font/google";
import "./globals.css";

/* SUBSTITUTION FLAG: no brand font files were supplied. Outfit (display) and
   Figtree (text and micro-labels) are the closest freely-licensed matches to the
   brief. Two faces only, no monospace. When licensed files arrive, swap these two
   loaders for next/font/local and keep the variable names. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUNNYCELLS",
  description:
    "Longevity beauty for women who are done being talked down to. Ingestibles, skincare, and hair care on subscription.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${figtree.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
