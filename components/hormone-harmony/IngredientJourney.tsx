import Image from "next/image";
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

export function IngredientJourney() {
  return (
    <>
      <section className={`${styles.section} ${styles.ingredients}`} aria-labelledby="ingredients-title">
        <div className={styles.narrowHeading}>
          <p className={styles.kicker}>Inside every scoop</p><h2 id="ingredients-title">Eight ingredients. One morning blend.</h2>
          <p>Explore the complete label-listed blend. Swipe on touch screens to see each ingredient.</p>
        </div>
        <div className={styles.ingredientTrack}>
          {ingredients.map((ingredient) => (
            <article className={styles.ingredient} key={ingredient.name}>
              <div className={styles.ingredientImage}><Image src={ingredient.image} alt={`${ingredient.name} ingredient`} fill sizes="(max-width: 767px) 78vw, 30vw" /></div>
              <h3>{ingredient.name}</h3><p>{ingredient.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.routine}`} aria-labelledby="routine-title">
        <div className={styles.narrowHeading}><p className={styles.kicker}>Make it automatic</p><h2 id="routine-title">A routine that stays small.</h2></div>
        <div className={styles.routineFlow}>
          <article><strong>Mix</strong><p>Add one scoop to about 250 ml of water or juice.</p></article>
          <article><strong>Stir</strong><p>Ten seconds is enough to make the light orange drink.</p></article>
          <article><strong>Pair</strong><p>Have it beside breakfast, coffee, or your existing shake.</p></article>
          <article><strong>Repeat</strong><p>Use it each morning. One pouch covers 30 days.</p></article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.realMornings}`} aria-labelledby="real-title">
        <div className={styles.realCopy}>
          <p className={styles.kicker}>Made for real mornings</p><h2 id="real-title">No perfect routine required.</h2>
          <p>A kitchen counter, a patio, or the cup holder. Consistency can start wherever your day does.</p>
        </div>
        <div className={styles.photoOne}><Image src="/photos/story-female.jpg" alt="Woman holding a SUNNYCELLS pouch on her patio" fill sizes="(max-width: 767px) 100vw, 38vw" /></div>
        <div className={styles.photoTwo}><Image src="/photos/social-2.jpg" alt="Customer holding a SUNNYCELLS pouch during her morning" fill sizes="(max-width: 767px) 100vw, 28vw" /></div>
        <div className={styles.photoThree}><Image src="/photos/social-3.jpg" alt="Customer with a SUNNYCELLS pouch while out for the day" fill sizes="(max-width: 767px) 100vw, 26vw" /></div>
      </section>

      <section className={`${styles.section} ${styles.quality}`} aria-labelledby="quality-title">
        <div className={styles.qualityIntro}>
          <p className={styles.kicker}>Quality you can see</p><h2 id="quality-title">Made carefully. Checked independently.</h2>
          <p>Manufactured in the USA in a facility that follows current Good Manufacturing Practice.</p>
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
