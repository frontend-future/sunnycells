import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import styles from "@/components/membership/membership.module.css";

const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], weight: ["700", "800"], display: "swap" });
const figtree = Figtree({ variable: "--font-figtree", subsets: ["latin"], weight: ["500", "600"], display: "swap" });

export const metadata: Metadata = { title: "Manage your membership | Friday Zoomies", robots: { index: false } };

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${styles.page} ${bricolage.variable} ${figtree.variable}`}>{children}</div>;
}
