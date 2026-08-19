import Image from "next/image";
import { Accordion } from "@/components/navigation/Accordion";
import { CampaignLink } from "./CampaignLink";
import { SunnycellsStandard } from "./SunnycellsStandard";
import styles from "./hormone-harmony.module.css";

const faqItems = [
  { title: "How do I use Metabolic Morning Blend?", body: "Mix one scoop into about 250 ml of water or juice once a day in the morning. Stir for about ten seconds and enjoy." },
  { title: "When should I take it?", body: "The formula is intended for the morning. Pair it with an existing cue such as breakfast, your first glass of water, coffee, or a morning shake." },
  { title: "How long does one pouch last?", body: "Each pouch contains 30 servings, which is a one-month supply when used once per day." },
  { title: "What does it taste like?", body: "Metabolic Morning Blend is orange flavored and can be mixed with water or juice." },
  { title: "Does it contain caffeine or stimulants?", body: "No. Metabolic Morning Blend is stimulant free, so it can sit alongside coffee if you choose." },
  { title: "Does it contain sugar or calories?", body: "No. The product label states zero sugar and zero calories per serving." },
  { title: "Is the formula plant based?", body: "Yes. The formula is plant based, and its phosphatidylserine comes from sunflower rather than soy." },
  { title: "Which ingredients are included?", body: "The formula includes inositol, KSM-66 Ashwagandha root extract, SunPS sunflower seed extract, L-theanine, D-chiro inositol, rhodiola root extract, organic turmeric root, and black pepper fruit extract." },
  { title: "Where is it produced?", body: "Metabolic Morning Blend is made in the USA in a facility that follows current Good Manufacturing Practice." },
  { title: "Is it independently tested?", body: "Yes. SUNNYCELLS identifies the product as third-party tested and heavy-metal tested." },
  { title: "How does the subscription work?", body: "Your selected supply renews on its delivery schedule. Shipping is free, and you can skip or cancel anytime." },
  { title: "Can I skip or cancel a delivery?", body: "Yes. You can skip a delivery or cancel the subscription according to the subscription terms." },
  { title: "What is the return policy?", body: "Your order is covered by SUNNYCELLS 60-day returns." },
  { title: "Who should speak with a doctor first?", body: "The formula is for adults. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, speak with your doctor before use." },
  { title: "What if I am pregnant or breastfeeding?", body: "Speak with your healthcare professional before using this or any dietary supplement while pregnant or breastfeeding." },
] as const;

export function CampaignFaq() {
  return (
    <>
      <section id="guarantee" className={`${styles.section} ${styles.guarantee}`} aria-labelledby="guarantee-title">
        <div className={styles.guaranteeSeal}>
          <Image src="/badges/money-back.png" alt="60-day returns" width={300} height={300} sizes="220px" />
        </div>
        <div>
          <p className={styles.kicker}>Give it a morning. Or sixty.</p>
          <h2 id="guarantee-title">YOUR FIRST 60 DAYS ARE COVERED.</h2>
          <p>Try Metabolic Morning Blend as part of your morning routine. If it is not for you, your purchase is protected by SUNNYCELLS 60-day returns.</p>
          <CampaignLink>START YOUR ROUTINE</CampaignLink>
        </div>
      </section>

      <section className={styles.verificationSection} aria-labelledby="verification-title">
        <div className={styles.verificationHeading}>
          <p className={styles.kicker}>Results start with what can be verified</p>
          <h2 id="verification-title">NO BORROWED REVIEWS. NO MADE-UP NUMBERS.</h2>
          <p>SUNNYCELLS keeps this page anchored to the product label, supplied testing standards, plan prices, and subscription terms. Individual experiences vary.</p>
        </div>
        <div className={styles.verificationGrid}>
          <article><strong>Label</strong><p>Eight ingredients are named on the pouch and explained below.</p></article>
          <article><strong>Testing</strong><p>Third-party and heavy-metal testing are part of the supplied product standard.</p></article>
          <article><strong>Serving</strong><p>One pouch contains thirty measured morning servings.</p></article>
          <article><strong>Terms</strong><p>First-order pricing, renewal pricing, and cadence appear before checkout.</p></article>
        </div>
      </section>

      <SunnycellsStandard />

      <section className={`${styles.section} ${styles.mission}`} aria-labelledby="mission-title">
        <div>
          <span>SUNNYCELLS</span>
          <h2 id="mission-title">WHY SUNNYCELLS KEEPS THINGS CLEAR.</h2>
        </div>
        <p>The supplement aisle does not need more mystery. SUNNYCELLS focuses on clear formulas, useful formats, and enough information for customers to make their own decisions.</p>
      </section>

      <section id="faq" className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-title">
        <div className={styles.faqHeading}>
          <p className={styles.kicker}>Still deciding?</p>
          <h2 id="faq-title">FIFTEEN QUESTIONS BEFORE YOUR FIRST SCOOP.</h2>
          <p>Formula, timing, subscription, safety, and guarantee details in one place.</p>
        </div>
        <Accordion items={[...faqItems]} defaultOpen={0} className={styles.faqAccordion} />
      </section>
    </>
  );
}
