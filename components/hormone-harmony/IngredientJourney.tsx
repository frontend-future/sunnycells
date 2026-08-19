import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { CampaignLink } from "./CampaignLink";
import styles from "./hormone-harmony.module.css";

const ingredients = [
  { name: "KSM-66 Ashwagandha", detail: "A root-only ashwagandha extract included in the daily blend.", image: "/ingredients/ashwagandha.jpg" },
  { name: "L-Theanine", detail: "An amino acid commonly found in tea, without adding a stimulant.", image: "/ingredients/l-theanine.jpg" },
  { name: "Myo-Inositol", detail: "One half of the paired inositol combination in the formula.", image: "/ingredients/myo-inositol.jpg" },
  { name: "D-Chiro Inositol", detail: "Paired with myo-inositol as part of the eight-ingredient blend.", image: "/ingredients/d-chiro-inositol.jpg" },
  { name: "Sunflower Phosphatidylserine", detail: "SunPS sunflower seed extract standardized to 20% phosphatidylserine.", image: "/ingredients/phosphatidylserine.jpg" },
  { name: "Rhodiola Rosea", detail: "A botanical root extract selected for the morning formula.", image: "/ingredients/rhodiola-rosea.jpg" },
  { name: "Organic Turmeric", detail: "Organic turmeric root paired with black pepper fruit extract.", image: "/ingredients/turmeric.jpg" },
  { name: "Black Pepper Extract", detail: "The final botanical in the label-listed ingredient blend.", image: "/ingredients/black-pepper.jpg" },
] as const;

const stages = [
  ["First", "Put the pouch beside something you already reach for: coffee, a water glass, a blender, or breakfast."],
  ["Then", "One measured scoop starts to sit inside something you were already doing."],
  ["Next", "Thirty servings make the monthly rhythm visible, without counting several bottles."],
  ["Finally", "The routine becomes familiar enough that it takes less negotiation on a busy morning."],
] as const;

const everydayOutcomes = [
  ["A calmer format", "A stimulant-free drink for mornings when another source of caffeine does not make sense."],
  ["A clearer label", "Eight ingredients are named directly, with no mystery blend language."],
  ["Less counter clutter", "One pouch replaces the need to organize the same formula across several containers."],
  ["A predictable supply", "Each pouch contains thirty measured servings, and each plan shows its renewal cadence."],
  ["A flexible subscription", "Shipping is free, and deliveries can be skipped or canceled according to the subscription terms."],
] as const;

export function IngredientJourney() {
  return (
    <>
      <section id="ingredients" className={`${styles.section} ${styles.ingredientLead}`} aria-labelledby="ingredients-title">
        <div className={styles.ingredientCollage}>
          <div className={styles.ingredientHeroImage}>
            <Image src="/photos/hormone-ingredients-fal.webp" alt="Editorial arrangement inspired by the blend's botanical ingredients and orange flavor" fill sizes="(max-width: 900px) 100vw, 52vw" />
          </div>
          <Image className={styles.ingredientProduct} src="/product/metabolic-morning-blend.webp" alt="Metabolic Morning Blend pouch in front of botanical ingredients" width={760} height={760} sizes="(max-width: 767px) 58vw, 27vw" />
        </div>
        <div className={styles.ingredientLeadCopy}>
          <p className={styles.kicker}>Inside every scoop</p>
          <h2 id="ingredients-title">EIGHT INGREDIENTS. CHOSEN FOR A REASON.</h2>
          <p>The formula combines paired inositols, an amino acid, standardized sunflower extract, and botanical roots in one practical morning ritual. Each item below comes directly from the product label.</p>
          <CampaignLink>START YOUR SUPPLY</CampaignLink>
        </div>
      </section>

      <section className={styles.ingredients} aria-label="Metabolic Morning Blend ingredients">
        <div className={styles.ingredientTrack}>
          {ingredients.map((ingredient, index) => (
            <article className={styles.ingredient} key={ingredient.name}>
              <div className={styles.ingredientImage}><Image src={ingredient.image} alt={`${ingredient.name} ingredient`} fill sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1120px) 45vw, 22vw" /></div>
              <span>0{index + 1}</span>
              <h3>{ingredient.name}</h3>
              <p>{ingredient.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="routine" className={styles.progression} aria-labelledby="routine-title">
        <div className={styles.progressionHead}>
          <div>
            <span>What happens when you start</span>
            <h2 id="routine-title">A FOUR-PART RHYTHM FOR YOUR FIRST POUCH.</h2>
            <p>This is a habit progression, not a promise of physiological results.</p>
          </div>
          <div className={styles.progressionPhoto}><Image src="/photos/social-1.jpg" alt="Woman holding her morning drink" fill sizes="(max-width: 767px) 86vw, 360px" /></div>
        </div>
        <div className={styles.progressionSteps}>
          {stages.map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <p className={styles.progressionDisclaimer}>Individual experiences vary. Supplements work best as part of an overall healthy lifestyle.</p>
        <CampaignLink>MAKE IT YOUR MORNING</CampaignLink>
      </section>

      <section className={`${styles.section} ${styles.lifestyle}`} aria-labelledby="lifestyle-title">
        <div className={styles.lifestyleCopy}>
          <p className={styles.kicker}>For different ages, schedules, and mornings</p>
          <h2 id="lifestyle-title">THE ROUTINE DOES NOT ASK THE REST OF YOUR DAY TO CHANGE.</h2>
          <div className={styles.lifestyleBenefits}>
            <article><Icon name="check" size={22} /><div><h3>Keep breakfast familiar</h3><p>Mix one scoop into water or juice while the rest of breakfast stays the same.</p></div></article>
            <article><Icon name="check" size={22} /><div><h3>Leave caffeine where you want it</h3><p>The blend is stimulant free, so it does not add another source of caffeine.</p></div></article>
            <article><Icon name="check" size={22} /><div><h3>See the monthly rhythm</h3><p>Thirty servings make each pouch a clear one-month supply at one scoop a day.</p></div></article>
            <article><Icon name="check" size={22} /><div><h3>Take control of deliveries</h3><p>Every plan includes free shipping and the option to skip or cancel.</p></div></article>
          </div>
        </div>
        <div className={styles.lifestyleVisual}><Image src="/photos/hormone-morning-routine-v2.webp" alt="Woman enjoying a simple morning routine at home" fill sizes="(max-width: 900px) 100vw, 46vw" /></div>
      </section>

      <section className={styles.everydayOutcomes} aria-labelledby="everyday-title">
        <div className={styles.everydayHeading}>
          <p className={styles.kicker}>Made for different kinds of mornings</p>
          <h2 id="everyday-title">THE FORMAT STAYS THE SAME, EVEN WHEN THE DAY DOES NOT.</h2>
          <p>Metabolic Morning Blend is built around a repeatable serving and transparent purchase terms rather than dramatic promises.</p>
        </div>
        <div className={styles.everydayGrid}>
          {everydayOutcomes.map(([title, copy], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <CampaignLink>TRY METABOLIC MORNING BLEND</CampaignLink>
        <p className={styles.linkReassurance}>50% off your first order. 60-day returns.</p>
      </section>

      <section className={`${styles.section} ${styles.quality}`} aria-labelledby="quality-title">
        <div className={styles.qualityIntro}>
          <h2 id="quality-title">WHAT GOES INTO YOUR MORNING MATTERS.</h2>
          <p>Manufactured in the USA in a facility that follows current Good Manufacturing Practice, with third-party and heavy-metal testing represented by the supplied SUNNYCELLS assets.</p>
        </div>
        <div className={styles.qualityMarks}>
          <figure><div className={styles.qualityIconCircle}><Icon name="leaf" size={38} /></div><figcaption>Plant-based formula</figcaption></figure>
          <figure><div className={styles.qualityIconCircle}><Icon name="zap-off" size={38} /></div><figcaption>No caffeine or stimulants</figcaption></figure>
          <figure><Image src="/badges/made-in-usa.png" alt="Made in the USA" width={260} height={260} /><figcaption>Made in the USA</figcaption></figure>
          <figure><Image src="/badges/third-party-tested.webp" alt="Third-party tested" width={260} height={260} /><figcaption>Third-party tested</figcaption></figure>
          <figure><Image src="/badges/heavy-metal-tested.webp" alt="Heavy-metal tested" width={260} height={260} /><figcaption>Heavy-metal tested</figcaption></figure>
        </div>
      </section>
    </>
  );
}
