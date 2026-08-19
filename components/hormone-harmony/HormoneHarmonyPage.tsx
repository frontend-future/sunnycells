import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { firstOrderPrice } from "@/lib/price";
import { PLANS } from "@/lib/quiz/plans";
import { CampaignFaq } from "./CampaignFaq";
import { CampaignFooter } from "./CampaignFooter";
import { CampaignHeader } from "./CampaignHeader";
import { CampaignLink } from "./CampaignLink";
import { CampaignStory } from "./CampaignStory";
import { IngredientJourney } from "./IngredientJourney";
import { MobilePurchaseBar } from "./MobilePurchaseBar";
import { OfferSection } from "./OfferSection";
import { SunnycellsStandard } from "./SunnycellsStandard";
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

const lowestPlan = PLANS.reduce((lowest, plan) => plan.price < lowest.price ? plan : lowest);
const lowestFirstPrice = firstOrderPrice(lowestPlan.price);

export function HormoneHarmonyPage() {
  return (
    <main className={styles.page}>
      <CampaignHeader />

      <section id="top" className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <div className={styles.heroLead}>
            <p className={styles.kicker}>Daily metabolic wellness</p>
            <h1 id="hero-title">FEEL MORE LIKE YOURSELF BEFORE THE DAY GETS GOING.</h1>
            <p className={styles.heroBody}>Eight label-listed ingredients, including paired inositols, KSM-66 Ashwagandha, L-Theanine, and Rhodiola. One orange scoop. No stimulants.</p>
          </div>
          <div className={styles.heroDetails}>
            <ul className={styles.heroBenefits}>
              {heroBenefits.map((benefit) => <li key={benefit}><Icon name="check" size={20} />{benefit}</li>)}
            </ul>
            <div className={styles.heroAction}>
              <CampaignLink>START YOUR MORNING ROUTINE</CampaignLink>
              <p>50% off your first order. From ${lowestFirstPrice} first month, then ${lowestPlan.price} per month. Free shipping, 60-day returns, skip or cancel anytime.</p>
            </div>
          </div>
        </div>

        <div className={styles.heroArt} aria-label="Metabolic Morning Blend product display">
          <div className={styles.heroScene}>
            <Image src="/photos/hormone-hero-woman-v2.webp" alt="Woman holding the SUNNYCELLS orange flavor pouch beside an orange morning drink" fill priority sizes="(max-width: 900px) 100vw, 48vw" />
          </div>
          <p className={styles.heroArtNote}><strong>Orange flavor</strong><span>30 servings per pouch</span></p>
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
      <SunnycellsStandard />
      <OfferSection />
      <CampaignFaq />

      <section className={styles.finalCta} aria-labelledby="final-title">
        <div className={styles.finalVisual}>
          <div className={styles.finalSun} aria-hidden="true" />
          <Image src="/product/pouch-3.webp" alt="Three-month supply of Metabolic Morning Blend" width={1200} height={900} sizes="(max-width: 767px) 92vw, 48vw" />
        </div>
        <div className={styles.finalCopy}>
          <p className={styles.kicker}>Metabolic Morning Blend</p>
          <h2 id="final-title">Start with one scoop.</h2>
          <p>A bright orange blend for the morning you already have. Eight label-listed ingredients, no stimulants, and one measured scoop.</p>
          <CampaignLink>CHOOSE YOUR SUPPLY</CampaignLink>
          <p className={styles.finalReassurance}>50% off your first order. From ${lowestFirstPrice} first month, then ${lowestPlan.price} per month, with free shipping and 60-day returns.</p>
        </div>
      </section>

      <CampaignFooter />
      <MobilePurchaseBar />
    </main>
  );
}
