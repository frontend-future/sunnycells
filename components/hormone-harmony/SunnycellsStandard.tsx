import Image from "next/image";
import { CampaignLink } from "./CampaignLink";
import styles from "./hormone-harmony.module.css";

const standards = [
  ["Clear formula", "Eight label-listed ingredients, all printed on the pouch."],
  ["Independent testing", "Third-party and heavy-metal testing are part of the product standard."],
  ["Simple format", "Thirty measured servings in every pouch."],
  ["Lower-risk first order", "Free shipping, 60-day returns, and the flexibility to skip or cancel."],
] as const;

export function SunnycellsStandard() {
  return (
    <section className={styles.standard} aria-labelledby="standard-title">
      <div className={styles.standardVisual}>
        <Image
          src="/product/metabolic-morning-blend.webp"
          alt="SUNNYCELLS Metabolic Morning Blend pouch"
          width={1080}
          height={1080}
          sizes="(max-width: 900px) 88vw, 42vw"
        />
      </div>
      <div className={styles.standardCopy}>
        <h2 id="standard-title">NO MYSTERY FORMULA. NO BORROWED RESULTS.</h2>
        <p>Everything inside Metabolic Morning Blend is printed on the pouch. We would rather show you what you are buying than bury the decision under dramatic promises.</p>
        <div className={styles.standardList}>
          {standards.map(([title, copy]) => (
            <article key={title}><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
        <strong className={styles.standardClosing}>Wellness without being talked down to.</strong>
        <CampaignLink>SEE YOUR OPTIONS</CampaignLink>
      </div>
    </section>
  );
}
