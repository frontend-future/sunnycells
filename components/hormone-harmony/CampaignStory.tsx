import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { CampaignLink } from "./CampaignLink";
import styles from "./hormone-harmony.module.css";

export function CampaignStory() {
  return (
    <>
      <section id="why-it-fits" className={`${styles.section} ${styles.story}`} aria-labelledby="story-title">
        <div className={styles.storyImage}>
          <Image src="/photos/social-1.jpg" alt="Woman making space for a simple morning wellness ritual" fill sizes="(max-width: 900px) 100vw, 50vw" />
          <p>Real life first.<br />The ritual follows.</p>
        </div>
        <div className={styles.storyCopy}>
          <h2 id="story-title">Wellness gets harder when the routine gets bigger.</h2>
          <p>Extra steps sound manageable until the day starts moving. The useful routine is the one that can survive breakfast, work, family, travel, and the mornings that go sideways.</p>
          <p><strong>Metabolic Morning Blend keeps its place small:</strong> one scoop, one drink, once each morning.</p>
        </div>
      </section>

      <section className={styles.editorialBand} aria-labelledby="cue-title">
        <div className={styles.editorialNumber}>01</div>
        <div>
          <h2 id="cue-title">Start with a cue you already trust.</h2>
          <p>Morning light. The kettle. Breakfast. Your first glass of water. Pairing a new habit with an existing one gives it somewhere practical to live.</p>
        </div>
        <p className={styles.editorialAside}>Not a perfect routine.<br /><strong>A repeatable one.</strong></p>
      </section>

      <section className={`${styles.section} ${styles.reveal}`} aria-labelledby="reveal-title">
        <div className={styles.revealCopy}>
          <p className={styles.kicker}>Meet the blend</p>
          <h2 id="reveal-title">A bright start, without another stimulant.</h2>
          <p>Metabolic Morning Blend brings eight label-listed ingredients into a light orange drink with no sugar and no calories. It is designed to sit beside coffee, breakfast, or a shake, not compete with them.</p>
          <ul>
            <li><Icon name="zap-off" size={22} />No caffeine or stimulants</li>
            <li><Icon name="leaf" size={22} />Plant-based ingredients</li>
            <li><Icon name="droplet" size={22} />Mix with water or juice</li>
          </ul>
          <CampaignLink>See supply options</CampaignLink>
        </div>
        <div className={styles.revealVisual}>
          <Image className={styles.revealDrink} src="/illustrations/step-drink.png" alt="Prepared orange Metabolic Morning Blend in a glass" width={720} height={720} sizes="(max-width: 767px) 66vw, 28vw" />
          <Image className={styles.revealPouch} src="/product/metabolic-morning-blend.webp" alt="Metabolic Morning Blend pouch" width={760} height={760} sizes="(max-width: 767px) 65vw, 29vw" />
          <span className={styles.revealLabel}>One scoop<br />in the morning</span>
        </div>
      </section>

      <section className={`${styles.section} ${styles.benefitStory}`} aria-labelledby="benefits-title">
        <div className={styles.benefitHeading}>
          <h2 id="benefits-title">Built around the day you actually have.</h2>
          <p>The value is a formula and format made easier to repeat. No overnight promises required.</p>
        </div>
        <div className={styles.benefitRows}>
          <article>
            <span>Morning 01</span>
            <h3>Keep the coffee.</h3>
            <p>The blend is stimulant-free, so it can fit next to the drink you already enjoy.</p>
          </article>
          <article>
            <span>Morning 02</span>
            <h3>Skip the cabinet full of bottles.</h3>
            <p>Eight label-listed ingredients arrive together in one measured scoop.</p>
          </article>
          <article>
            <span>Morning 03</span>
            <h3>Know when to reorder.</h3>
            <p>Thirty servings make one pouch a clear one-month rhythm.</p>
          </article>
        </div>
      </section>
    </>
  );
}
