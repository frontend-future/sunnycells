import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { CampaignFaq } from "./CampaignFaq";
import { CampaignFooter } from "./CampaignFooter";
import { CampaignHeader } from "./CampaignHeader";
import { CampaignLink } from "./CampaignLink";
import { CampaignStory } from "./CampaignStory";
import { IngredientJourney } from "./IngredientJourney";
import { MobilePurchaseBar } from "./MobilePurchaseBar";
import { OfferSection } from "./OfferSection";
import styles from "./hormone-harmony.module.css";

const productFacts = [
  { value: "8", label: "label-listed active ingredients" },
  { value: "30", label: "servings in every pouch" },
  { value: "0", label: "sugar, calories, or stimulants" },
  { value: "1", label: "easy scoop each morning" },
] as const;

const heroBenefits = [
  "Stimulant-free orange blend",
  "Plant-based formula",
  "One pouch lasts 30 mornings",
] as const;

export function HormoneHarmonyPage() {
  return (
    <main className={styles.page}>
      <CampaignHeader />

      <section id="top" className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <div className={styles.heroLead}>
            <p className={styles.kicker}>Metabolic Morning Blend</p>
            <h1 id="hero-title">Make your morning do more.</h1>
            <p className={styles.heroBody}>Eight thoughtfully selected ingredients in one bright, stimulant-free scoop made to fit the morning you already have.</p>
          </div>
          <div className={styles.heroDetails}>
            <ul className={styles.heroBenefits}>
              {heroBenefits.map((benefit) => <li key={benefit}><Icon name="check" size={20} />{benefit}</li>)}
            </ul>
            <div className={styles.heroAction}>
              <CampaignLink>Shop the blend</CampaignLink>
              <p>Free shipping. 30-day guarantee. Skip or cancel anytime.</p>
            </div>
          </div>
        </div>

        <div className={styles.heroArt} aria-label="Metabolic Morning Blend product display">
          <div className={styles.heroScene}>
            <Image src="/photos/hormone-hero-woman-v2.webp" alt="Woman holding the SUNNYCELLS orange flavor pouch beside an orange morning drink" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
          </div>
          <p className={styles.heroArtNote}><strong>Orange flavor</strong><span>30 daily servings</span></p>
        </div>
      </section>

      <section className={styles.factBand} aria-label="Verified product facts">
        {productFacts.map((fact) => (
          <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>
        ))}
      </section>

      <section className={styles.confidenceStrip} aria-label="SUNNYCELLS product confidence">
        <p>Made in the USA</p><p>Third-party tested</p><p>Heavy-metal tested</p><p>Free shipping</p>
      </section>

      <CampaignStory />
      <IngredientJourney />
      <OfferSection />
      <CampaignFaq />

      <section className={styles.finalCta} aria-labelledby="final-title">
        <div className={styles.finalVisual}>
          <div className={styles.finalSun} aria-hidden="true" />
          <Image src="/product/pouch-3.webp" alt="Three-month supply of Metabolic Morning Blend" width={1200} height={900} sizes="(max-width: 767px) 92vw, 48vw" />
        </div>
        <div className={styles.finalCopy}>
          <p className={styles.kicker}>Tomorrow morning is close</p>
          <h2 id="final-title">Start with one scoop.</h2>
          <p>No complicated reset. No new stimulant. Just a bright orange blend that belongs beside the morning you already know.</p>
          <CampaignLink>Choose your supply</CampaignLink>
          <p className={styles.finalReassurance}>From $39 per month with free shipping and a 30-day guarantee.</p>
        </div>
      </section>

      <CampaignFooter />
      <MobilePurchaseBar />
    </main>
  );
}
