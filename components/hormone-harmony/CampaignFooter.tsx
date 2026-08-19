import { Wordmark } from "@/components/core/Wordmark";
import Link from "next/link";
import styles from "./hormone-harmony.module.css";

const footerGroups = [
  {
    title: "Shop",
    links: [
      ["Metabolic Morning Blend", "#top"],
      ["Choose your supply", "#plans"],
      ["View cart", "/hormone-harmony/cart"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["Why it fits", "#why-it-fits"],
      ["Ingredients", "#ingredients"],
      ["How to use", "#routine"],
      ["Take the diet quiz", "/quiz/diet"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Frequently asked questions", "#faq"],
      ["30-day guarantee", "#guarantee"],
      ["Subscription details", "#plans"],
    ],
  },
] as const;

export function CampaignFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <Wordmark size={30} />
          <p>Longevity beauty and everyday wellness for people who are done being talked down to.</p>
          <a href="#plans">Shop Metabolic Morning Blend</a>
        </div>
        <div className={styles.footerLinks}>
          {footerGroups.map((group) => (
            <details key={group.title} open>
              <summary>{group.title}</summary>
              <div>
                {group.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
              </div>
            </details>
          ))}
        </div>
      </div>
      <div className={styles.footerLegal}>
        <p>These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Individual results vary.</p>
        <p>© {new Date().getFullYear()} SUNNYCELLS</p>
      </div>
    </footer>
  );
}
