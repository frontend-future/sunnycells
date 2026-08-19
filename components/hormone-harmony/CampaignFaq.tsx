import Image from "next/image";
import { Accordion } from "@/components/navigation/Accordion";
import styles from "./hormone-harmony.module.css";

const faqItems = [
  { title: "How do I use Metabolic Morning Blend?", body: "Mix one scoop into about 250 ml of water or juice once a day in the morning. Stir for ten seconds and enjoy." },
  { title: "How long does one pouch last?", body: "Each pouch contains 30 servings, which is a one-month supply when used once per day." },
  { title: "Does it contain sugar or stimulants?", body: "No. The orange-flavored blend contains no sugar and no stimulants, so it can sit alongside coffee or a protein shake." },
  { title: "Is the formula plant based?", body: "Yes. The formula is plant based, and its phosphatidylserine comes from sunflower rather than soy." },
  { title: "Where is it produced?", body: "Metabolic Morning Blend is made in the USA in a facility that follows current Good Manufacturing Practice." },
  { title: "How does the subscription work?", body: "Your selected supply renews on its delivery schedule. Shipping is free, and you can skip or cancel anytime." },
  { title: "What is the guarantee?", body: "Your order is covered by the SUNNYCELLS 30-day money-back guarantee." },
  { title: "Who should speak with a doctor first?", body: "The formula is for adults. If you are pregnant, breastfeeding, taking prescription medication, or managing a health condition, speak with your doctor before use." },
] as const;

export function CampaignFaq() {
  return (
    <>
      <section className={`${styles.section} ${styles.guarantee}`} aria-labelledby="guarantee-title">
        <Image src="/badges/money-back.png" alt="30-day money-back guarantee" width={300} height={300} sizes="180px" />
        <div><p className={styles.kicker}>Try it with less risk</p><h2 id="guarantee-title">Covered for 30 days.</h2><p>Your order is protected by the SUNNYCELLS 30-day money-back guarantee. Shipping is free, and subscriptions can be skipped or canceled anytime.</p></div>
      </section>
      <section className={`${styles.section} ${styles.faq}`} aria-labelledby="faq-title">
        <div className={styles.faqHeading}>
          <p className={styles.kicker}>Questions, answered</p><h2 id="faq-title">Before your first scoop.</h2>
          <p>Everything you need to know about the formula, routine, subscription, and guarantee.</p>
        </div>
        <Accordion items={[...faqItems]} defaultOpen={0} className={styles.faqAccordion} />
      </section>
    </>
  );
}
