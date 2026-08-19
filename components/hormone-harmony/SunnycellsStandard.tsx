import Image from "next/image";
import { CampaignLink } from "./CampaignLink";
import styles from "./hormone-harmony.module.css";

const standards = [
  ["Paired inositols", "Myo-inositol and D-chiro inositol appear together in the formula."],
  ["Calm-format ingredients", "KSM-66 Ashwagandha and L-Theanine are included without caffeine."],
  ["Botanical roots", "Rhodiola, organic turmeric, and black pepper complete the botanical side of the blend."],
  ["Sunflower source", "SunPS sunflower seed extract supplies the label-listed phosphatidylserine."],
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
        <h2 id="standard-title">WHAT IS INSIDE METABOLIC MORNING BLEND?</h2>
        <p>Nothing hidden behind a proprietary blend. Eight ingredients are printed on the pouch, with thirty measured servings in every package.</p>
        <div className={styles.standardList}>
          {standards.map(([title, copy]) => (
            <article key={title}><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
        <strong className={styles.standardClosing}>A clear label for a clear morning decision.</strong>
        <CampaignLink>SEE YOUR OPTIONS</CampaignLink>
      </div>
    </section>
  );
}
