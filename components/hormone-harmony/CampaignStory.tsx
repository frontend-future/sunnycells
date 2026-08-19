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
          <p className={styles.kicker}>Some mornings start before you do</p>
          <h2 id="story-title">WHEN YOUR ROUTINE FEELS LIKE ANOTHER JOB, SOMETHING HAS TO CHANGE.</h2>
          <p>Coffee. Breakfast. Work. Family. Another bottle. Another capsule. Another thing you were supposed to remember.</p>
          <p>Wellness routines tend to grow until they become the first thing we stop doing.</p>
          <p><strong>The better routine is the one you can repeat:</strong> one scoop, one drink, once each morning.</p>
          <CampaignLink>SEE THE FORMULA</CampaignLink>
        </div>
      </section>

      <section className={`${styles.section} ${styles.outcomes}`} aria-labelledby="outcomes-title">
        <div className={styles.outcomesHeading}>
          <h2 id="outcomes-title">ONE MORNING HABIT. MORE ROOM FOR EVERYTHING ELSE.</h2>
          <p>A practical format for mornings that already have enough going on.</p>
        </div>
        <div className={styles.outcomeGrid}>
          <article><span>Calmer format</span><h3>Start without another stimulant.</h3><p>KSM-66 Ashwagandha and L-Theanine sit inside a caffeine-free morning blend.</p></article>
          <article><span>Steadier routine</span><h3>Give the habit somewhere predictable to live.</h3><p>One measured scoop. One drink. Once each morning.</p></article>
          <article><span>Metabolic wellness</span><h3>Bring paired inositols into one daily formula.</h3><p>Myo-inositol and D-chiro inositol are included with six other label-listed ingredients.</p></article>
          <article><span>Less clutter</span><h3>Eight ingredients. One pouch.</h3><p>A compact alternative to turning breakfast into a row of bottles.</p></article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.reveal}`} aria-labelledby="reveal-title">
        <div className={styles.revealCopy}>
          <p className={styles.kicker}>Meet the blend</p>
          <h2 id="reveal-title">THE MORNING BLEND BUILT TO KEEP THINGS SMALL.</h2>
          <p>Metabolic Morning Blend brings eight label-listed ingredients into one bright orange drink. No caffeine. No sugar. No calories. No complicated schedule.</p>
          <div className={styles.ritualSteps}>
            <div><Icon name="leaf" size={24} /><strong>SCOOP</strong><span>One measured serving.</span></div>
            <div><Icon name="droplet" size={24} /><strong>MIX</strong><span>Water or juice.</span></div>
            <div><Icon name="arrow-right" size={24} /><strong>GO</strong><span>Get on with your morning.</span></div>
          </div>
          <CampaignLink>CHOOSE YOUR SUPPLY</CampaignLink>
        </div>
        <div className={styles.revealVisual}>
          <Image className={styles.revealDrink} src="/illustrations/step-drink.png" alt="Prepared orange Metabolic Morning Blend in a glass" width={720} height={720} sizes="(max-width: 767px) 66vw, 28vw" />
          <Image className={styles.revealPouch} src="/product/metabolic-morning-blend.webp" alt="Metabolic Morning Blend pouch" width={760} height={760} sizes="(max-width: 767px) 65vw, 29vw" />
          <span className={styles.revealLabel}>One scoop<br />in the morning</span>
        </div>
      </section>

      <section className={styles.longStory} aria-labelledby="long-story-title">
        <div className={styles.longStoryInner}>
          <h2 id="long-story-title">THE PROBLEM WITH MOST WELLNESS ROUTINES IS NOT MOTIVATION.</h2>
          <p className={styles.storyStatement}>They are too hard to keep doing.</p>
          <div className={styles.storyColumns}>
            <div>
              <p>The morning starts normally enough.</p>
              <p>You reach for your phone. Someone needs something. Coffee gets cold. Breakfast becomes whatever is fastest.</p>
            </div>
            <div>
              <p>The elaborate routine from last night stops looking realistic.</p>
              <p><strong>That is why we made the format smaller.</strong> No row of bottles. No new stimulant. No complicated schedule.</p>
            </div>
          </div>
          <p className={styles.ritualStatement}>ONE SCOOP. ONE DRINK. ONCE A DAY.</p>
          <p className={styles.repeatableLine}>Real life first. The ritual follows.</p>
          <CampaignLink>START YOUR SUPPLY</CampaignLink>
        </div>
      </section>
    </>
  );
}
