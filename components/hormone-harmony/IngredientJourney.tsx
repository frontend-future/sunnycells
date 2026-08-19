import Image from "next/image";
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
  ["Start", "Choose an existing morning cue and place the pouch where you will see it."],
  ["Build the ritual", "Mix one scoop with water or juice while the rest of the morning is already happening."],
  ["Find your rhythm", "Keep the format consistent and adjust the moment to suit your schedule."],
  ["Make it your morning", "Let the ritual feel ordinary. That is what makes it easier to repeat."],
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
          <h2 id="ingredients-title">Eight ingredients, brought into one morning.</h2>
          <p>The formula combines paired inositols, amino acids, standardized sunflower extract, and botanical roots. Each item below comes directly from the product label.</p>
          <CampaignLink>Choose your supply</CampaignLink>
        </div>
      </section>

      <section className={styles.ingredients} aria-label="Metabolic Morning Blend ingredients">
        <div className={styles.ingredientTrack}>
          {ingredients.map((ingredient, index) => (
            <article className={styles.ingredient} key={ingredient.name}>
              <div className={styles.ingredientImage}><Image src={ingredient.image} alt={`${ingredient.name} ingredient`} fill sizes="(max-width: 767px) 78vw, 29vw" /></div>
              <span>0{index + 1}</span>
              <h3>{ingredient.name}</h3>
              <p>{ingredient.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="routine" className={styles.progression} aria-labelledby="routine-title">
        <div className={styles.progressionHead}>
          <span>One month. Your pace.</span>
          <h2 id="routine-title">What happens when a ritual stays simple?</h2>
          <p>There is no guaranteed timeline here. The progression is about making a small daily habit easier to keep.</p>
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
        <CampaignLink>Start your supply</CampaignLink>
      </section>

      <section className={`${styles.section} ${styles.lifestyle}`} aria-labelledby="lifestyle-title">
        <div className={styles.lifestyleIntro}>
          <h2 id="lifestyle-title">One blend. Several kinds of morning.</h2>
          <p>At home, at a desk, or already on the move, the format stays compact and predictable.</p>
        </div>
        <div className={styles.lifestylePrimary}>
          <Image src="/photos/hormone-morning-fal.webp" alt="Woman enjoying a simple morning routine at home" fill sizes="(max-width: 767px) 100vw, 56vw" />
          <div><span>At home</span><h3>Mix it while breakfast is happening.</h3></div>
        </div>
        <div className={styles.lifestyleSecondary}>
          <Image src="/photos/social-2.jpg" alt="A portable SUNNYCELLS morning routine" fill sizes="(max-width: 767px) 100vw, 34vw" />
          <div><span>On the move</span><h3>Keep the pouch where the routine happens.</h3></div>
        </div>
        <div className={styles.lifestyleText}>
          <strong>Orange flavor. No sugar. No calories.</strong>
          <p>A measured scoop and a glass are all the setup it needs.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.quality}`} aria-labelledby="quality-title">
        <div className={styles.qualityIntro}>
          <h2 id="quality-title">Made carefully. Checked independently.</h2>
          <p>Manufactured in the USA in a facility that follows current Good Manufacturing Practice, with third-party and heavy-metal testing represented by the supplied SUNNYCELLS assets.</p>
        </div>
        <div className={styles.qualityMarks}>
          <figure><Image src="/badges/made-in-usa.png" alt="Made in the USA" width={260} height={260} /><figcaption>Made in the USA</figcaption></figure>
          <figure><Image src="/badges/third-party-tested.webp" alt="Third-party tested" width={260} height={260} /><figcaption>Third-party tested</figcaption></figure>
          <figure><Image src="/badges/heavy-metal-tested.webp" alt="Heavy-metal tested" width={260} height={260} /><figcaption>Heavy-metal tested</figcaption></figure>
        </div>
      </section>
    </>
  );
}
