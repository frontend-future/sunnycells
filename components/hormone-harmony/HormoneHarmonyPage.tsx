import Image from "next/image";
import { Wordmark } from "@/components/core/Wordmark";
import { CampaignFaq } from "./CampaignFaq";
import { CampaignLink } from "./CampaignLink";
import { CampaignStory } from "./CampaignStory";
import { IngredientJourney } from "./IngredientJourney";
import { MobilePurchaseBar } from "./MobilePurchaseBar";
import { OfferSection } from "./OfferSection";
import styles from "./hormone-harmony.module.css";

const productFacts = [
  { value: "8", label: "active ingredients" },
  { value: "30", label: "servings per pouch" },
  { value: "0", label: "sugar and calories" },
  { value: "1", label: "scoop each morning" },
] as const;

export function HormoneHarmonyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="#top" aria-label="SUNNYCELLS campaign home">
          <Wordmark size="clamp(22px, 2.2vw, 30px)" />
        </a>
        <a className={styles.headerLink} href="#plans">Choose your plan</a>
      </header>

      <section id="top" className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Metabolic Morning Blend</p>
          <h1 id="hero-title">Daily stress support, mixed into your morning.</h1>
          <p className={styles.heroBody}>A stimulant-free orange blend with eight active ingredients, made for one easy scoop each morning.</p>
          <div className={styles.heroAction}>
            <CampaignLink>Choose your plan</CampaignLink>
            <p>Free shipping. Skip or cancel anytime.</p>
          </div>
        </div>

        <div className={styles.heroArt} aria-label="Metabolic Morning Blend product display">
          <div className={styles.heroPhoto}>
            <Image src="/photos/story-female.jpg" alt="Woman holding a SUNNYCELLS Metabolic Morning Blend pouch in the morning" fill priority sizes="(max-width: 767px) 42vw, 22vw" />
          </div>
          <Image className={styles.heroProduct} src="/product/metabolic-morning-blend.webp" alt="SUNNYCELLS Metabolic Morning Blend orange-flavor pouch with scoop" width={1080} height={1080} priority sizes="(max-width: 767px) 88vw, 48vw" />
          <p className={styles.heroArtNote}>Orange flavor<br />30 servings</p>
        </div>
      </section>

      <section className={styles.factBand} aria-label="Product facts">
        {productFacts.map((fact) => (
          <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>
        ))}
      </section>

      <CampaignStory />
      <IngredientJourney />
      <OfferSection />
      <CampaignFaq />

      <section className={styles.finalCta} aria-labelledby="final-title">
        <div>
          <p className={styles.kicker}>Start with tomorrow morning</p>
          <h2 id="final-title">One scoop is an easy first move.</h2>
          <CampaignLink>Choose your supply</CampaignLink>
          <p className={styles.finalReassurance}>Free shipping. 30-day guarantee. Skip or cancel anytime.</p>
        </div>
        <Image src="/product/pouch-3.webp" alt="Three-month supply of Metabolic Morning Blend" width={1200} height={900} sizes="(max-width: 767px) 92vw, 48vw" />
      </section>

      <footer className={styles.footer}>
        <Wordmark size={24} />
        <p>These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Results vary from person to person.</p>
        <p>© {new Date().getFullYear()} SUNNYCELLS</p>
      </footer>

      <MobilePurchaseBar />
    </main>
  );
}
