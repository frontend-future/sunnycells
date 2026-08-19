import Image from "next/image";
import { CampaignLink } from "./CampaignLink";
import styles from "./hormone-harmony.module.css";

export function CampaignStory() {
  return (
    <>
      <section className={`${styles.section} ${styles.story}`} aria-labelledby="story-title">
        <div className={styles.storyImage}>
          <Image src="/photos/social-1.jpg" alt="Woman holding Metabolic Morning Blend in her kitchen" fill sizes="(max-width: 767px) 100vw, 48vw" />
        </div>
        <div className={styles.storyCopy}>
          <p className={styles.kicker}>A better place to begin</p>
          <h2 id="story-title">Your morning should work with you.</h2>
          <p>Most routines ask for more time, more tracking, and another thing to remember. This one starts with a scoop and a glass.</p>
          <p>Metabolic Morning Blend is designed to fit beside the breakfast, coffee, or school run already in your day.</p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.reveal}`} aria-labelledby="reveal-title">
        <div className={styles.revealCopy}>
          <p className={styles.kicker}>The simple part</p>
          <h2 id="reveal-title">One scoop. Ten seconds. Done.</h2>
          <p>Mix it with water or juice in the morning. The orange flavor has no sugar, no calories, and no stimulants.</p>
          <CampaignLink>See supply options</CampaignLink>
        </div>
        <div className={styles.revealVisual}>
          <Image src="/illustrations/step-drink.png" alt="Glass of prepared orange Metabolic Morning Blend" width={720} height={720} sizes="(max-width: 767px) 70vw, 34vw" />
          <Image className={styles.revealPouch} src="/product/metabolic-morning-blend.webp" alt="Metabolic Morning Blend pouch" width={760} height={760} sizes="(max-width: 767px) 62vw, 28vw" />
        </div>
      </section>

      <section className={`${styles.section} ${styles.benefits}`} aria-labelledby="benefits-title">
        <div className={styles.benefitIntro}>
          <p className={styles.kicker}>Built for repeatable mornings</p>
          <h2 id="benefits-title">Less ritual. More consistency.</h2>
          <p>A practical format matters when the goal is to use it every day.</p>
        </div>
        <article className={styles.benefitLarge}>
          <span>01</span><h3>Stimulant-free by design</h3><p>Keep your coffee if you want it. The formula does not add caffeine or another stimulant.</p>
        </article>
        <article className={styles.benefitTall}>
          <span>02</span><h3>A full month in one pouch</h3><p>Thirty servings keep the routine compact and easy to store.</p>
          <Image src="/product/metabolic-morning-blend.webp" alt="One 30-serving pouch of Metabolic Morning Blend" width={540} height={540} sizes="(max-width: 767px) 65vw, 24vw" />
        </article>
        <article className={styles.benefitWide}>
          <span>03</span><h3>Plant-based ingredient blend</h3><p>Eight label-listed actives, including sunflower-derived phosphatidylserine and botanical extracts.</p>
        </article>
      </section>

      <section className={`${styles.section} ${styles.education}`} aria-labelledby="education-title">
        <div className={styles.educationWord} aria-hidden="true">AM</div>
        <div className={styles.educationCopy}>
          <p className={styles.kicker}>Why the morning</p>
          <h2 id="education-title">Work with the rhythm you already have.</h2>
          <p>Cortisol naturally peaks shortly after waking. That is why Metabolic Morning Blend belongs in the first part of your day.</p>
          <p>It is not another complicated protocol. It is one consistent cue that can live beside an existing habit.</p>
        </div>
      </section>
    </>
  );
}
