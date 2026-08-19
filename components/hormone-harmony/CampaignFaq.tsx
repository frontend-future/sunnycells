import Image from "next/image";
import { Accordion } from "@/components/navigation/Accordion";
import { CampaignLink } from "./CampaignLink";
import styles from "./hormone-harmony.module.css";

const faqItems = [
  { title: "How do I use Metabolic Morning Blend?", body: "Mix one scoop into about 250 ml of water or juice once a day in the morning. Stir for about ten seconds and enjoy." },
  { title: "When should I take it?", body: "The formula is intended for the morning. Pair it with an existing cue such as breakfast, your first glass of water, coffee, or a morning shake." },
  { title: "How long does one pouch last?", body: "Each pouch contains 30 servings, which is a one-month supply when used once per day." },
  { title: "What does it taste like?", body: "Metabolic Morning Blend is orange flavored and can be mixed with water or juice." },
  { title: "Does it contain sugar, calories, or stimulants?", body: "No. The label states zero sugar, zero calories, and no stimulants, so it can sit alongside coffee if you choose." },
  { title: "Is the formula plant based?", body: "Yes. The formula is plant based, and its phosphatidylserine comes from sunflower rather than soy." },
  { title: "Where is it produced?", body: "Metabolic Morning Blend is made in the USA in a facility that follows current Good Manufacturing Practice." },
  { title: "How does the subscription work?", body: "Your selected supply renews on its delivery schedule. Shipping is free, and you can skip or cancel anytime." },
  { title: "What is the return policy?", body: "Your order is covered by SUNNYCELLS 60-day returns." },
  { title: "Who should speak with a doctor first?", body: "The formula is for adults. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, speak with your doctor before use." },
] as const;

export function CampaignFaq() {
  return (
    <>
      <section id="guarantee" className={`${styles.section} ${styles.guarantee}`} aria-labelledby="guarantee-title">
        <div className={styles.guaranteeSeal}>
          <Image src="/badges/money-back.png" alt="60-day returns" width={300} height={300} sizes="220px" />
        </div>
        <div>
          <p className={styles.kicker}>Try it with less risk</p>
          <h2 id="guarantee-title">Your first 60 days are covered.</h2>
          <p>Your order is covered by SUNNYCELLS 60-day returns. Shipping is free, and subscriptions can be skipped or canceled anytime.</p>
          <CampaignLink>CHOOSE YOUR SUPPLY</CampaignLink>
        </div>
      </section>

      <section className={styles.inside} aria-labelledby="inside-title">
        <div className={styles.insideVisual}>
          <Image src="/product/metabolic-morning-blend.webp" alt="Metabolic Morning Blend package and scoop" width={1080} height={1080} sizes="(max-width: 767px) 92vw, 50vw" />
        </div>
        <div className={styles.insideCopy}>
          <span>30 servings · 6.25 oz · Orange flavor</span>
          <h2 id="inside-title">Everything inside is printed on the pouch.</h2>
          <p>Inositol, KSM-66 Ashwagandha root extract, SunPS sunflower seed extract, L-theanine, D-chiro inositol, rhodiola root extract, organic turmeric root, and black pepper fruit extract.</p>
          <p className={styles.honestyLine}>Straight product facts. No invented customer statistics, borrowed reviews, or guaranteed outcomes.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.mission}`} aria-labelledby="mission-title">
        <div>
          <span>SUNNYCELLS</span>
          <h2 id="mission-title">Wellness without being talked down to.</h2>
        </div>
        <p>Our approach is direct: clear labels, useful formats, strong visual design, and enough information to make your own decision. Metabolic Morning Blend follows that philosophy with a simple morning format and the full formula visible on the pouch.</p>
      </section>

      <section id="faq" className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-title">
        <div className={styles.faqHeading}>
          <h2 id="faq-title">Questions before your first scoop.</h2>
          <p>Formula, timing, subscription, safety, and guarantee details in one place.</p>
        </div>
        <Accordion items={[...faqItems]} defaultOpen={0} className={styles.faqAccordion} />
      </section>
    </>
  );
}
