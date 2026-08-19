import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { CampaignLink } from "./CampaignLink";
import styles from "./hormone-harmony.module.css";

const pressMarks = [
  ["/press/womens-health.webp", "Women's Health"],
  ["/press/healthline.webp", "Healthline"],
  ["/press/business-insider.webp", "Business Insider"],
  ["/press/sports-illustrated.webp", "Sports Illustrated"],
] as const;

const reasons = [
  ["Eight label-listed ingredients", "Paired inositols, KSM-66 Ashwagandha, L-Theanine, Rhodiola, sunflower phosphatidylserine, turmeric, and black pepper."],
  ["A stimulant-free start", "No caffeine is added, so the blend does not become another source of morning stimulation."],
  ["One measured serving", "One scoop in water or juice gives the routine a clear beginning and end."],
  ["Thirty mornings per pouch", "The serving count and subscription cadence are visible before checkout."],
] as const;

export function CampaignStory() {
  return (
    <>
      <section className={styles.mediaBand} aria-labelledby="media-title">
        <h2 id="media-title">SUNNYCELLS IN THE WELLNESS CONVERSATION</h2>
        <div className={styles.mediaMarks}>
          {pressMarks.map(([src, label]) => (
            <figure key={label}><Image src={src} alt={label} width={220} height={80} /></figure>
          ))}
        </div>
      </section>

      <section id="why-it-fits" className={`${styles.section} ${styles.reasonSection}`} aria-labelledby="reason-title">
        <div className={styles.centeredHeading}>
          <p className={styles.kicker}>Why women make room for it</p>
          <h2 id="reason-title">A MORNING FORMULA WITH A SHORTER TO-DO LIST.</h2>
          <p>Metabolic Morning Blend combines a clear label, a measured serving, and a format that fits beside breakfast instead of taking it over.</p>
        </div>
        <div className={styles.reasonGrid}>
          {reasons.map(([title, copy], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
        <CampaignLink>TRY METABOLIC MORNING BLEND</CampaignLink>
        <p className={styles.linkReassurance}>50% off the first order. 60-day returns.</p>
      </section>

      <section className={styles.problemSection} aria-labelledby="problem-title">
        <div className={styles.problemCopy}>
          <p className={styles.kicker}>When the routine becomes the problem</p>
          <h2 id="problem-title">MORNINGS DO NOT NEED ANOTHER COMPLICATED WELLNESS PLAN.</h2>
          <p>Breakfast is late. Coffee goes cold. A calendar alert appears before you have had a quiet minute.</p>
          <div className={styles.problemVisual}>
            <Image src="/illustrations/reduced-stress-female.png" alt="Illustration of a woman moving through her day" width={620} height={620} sizes="(max-width: 767px) 82vw, 420px" />
          </div>
          <p>That is exactly when a shelf of capsules, powders, and separate instructions stops being realistic.</p>
          <p>One bottle lives beside the coffee. Another needs food. A third is meant for later, which means it is often forgotten.</p>
          <div className={styles.problemList}>
            <p><Icon name="x" size={22} />Too many bottles to remember</p>
            <p><Icon name="x" size={22} />Another stimulant when coffee is already enough</p>
            <p><Icon name="x" size={22} />A routine with no clear serving rhythm</p>
          </div>
          <p>Adding more instructions does not make a morning more consistent. It gives the routine more places to fall apart.</p>
          <p className={styles.problemEmphasis}>The useful habit is the one that still fits on a busy Tuesday.</p>
          <CampaignLink>TRY METABOLIC MORNING BLEND</CampaignLink>
          <p className={styles.linkReassurance}>50% off the first order. 60-day returns.</p>
        </div>
      </section>

      <section className={styles.solutionSection} aria-labelledby="solution-title">
        <div className={styles.solutionVisual}>
          <Image src="/product/metabolic-morning-blend.webp" alt="SUNNYCELLS Metabolic Morning Blend pouch" width={900} height={900} sizes="(max-width: 900px) 86vw, 44vw" />
          <Image className={styles.solutionDrink} src="/illustrations/step-drink.png" alt="Prepared orange morning drink" width={620} height={620} sizes="(max-width: 900px) 46vw, 24vw" />
        </div>
        <div className={styles.solutionCopy}>
          <p className={styles.kicker}>A smaller morning ritual</p>
          <h2 id="solution-title">ONE SCOOP BRINGS THE WHOLE FORMULA TOGETHER.</h2>
          <p>Metabolic Morning Blend puts eight label-listed ingredients into one orange-flavored drink. It contains no sugar, calories, caffeine, or other stimulants.</p>
          <div className={styles.ritualSteps}>
            <div><Icon name="leaf" size={24} /><strong>SCOOP</strong><span>Use one measured serving.</span></div>
            <div><Icon name="droplet" size={24} /><strong>MIX</strong><span>Add water or juice.</span></div>
            <div><Icon name="arrow-right" size={24} /><strong>CONTINUE</strong><span>Get back to your morning.</span></div>
          </div>
          <CampaignLink>SEE YOUR SUPPLY OPTIONS</CampaignLink>
          <p className={styles.linkReassurance}>Free shipping. Skip or cancel anytime.</p>
        </div>
      </section>

      <section className={styles.productFactsSection} aria-labelledby="facts-title">
        <div>
          <p className={styles.kicker}>Facts about Metabolic Morning Blend</p>
          <h2 id="facts-title">WHAT THE POUCH TELLS YOU UP FRONT.</h2>
        </div>
        <div className={styles.productFactGrid}>
          <article><strong>8</strong><span>label-listed ingredients</span></article>
          <article><strong>30</strong><span>servings in each pouch</span></article>
          <article><strong>0</strong><span>sugar, calories, or stimulants</span></article>
          <article><strong>1</strong><span>scoop each morning</span></article>
        </div>
      </section>

      <section className={`${styles.section} ${styles.formulaSummary}`} aria-labelledby="formula-title">
        <div className={styles.formulaSummaryCopy}>
          <p className={styles.kicker}>A daily metabolic wellness blend</p>
          <h2 id="formula-title">A CLEAR FORMULA FOR THE MORNING YOU ALREADY HAVE.</h2>
          <p>The blend brings together paired inositols, an amino acid, a standardized sunflower extract, and four botanical ingredients in one pouch.</p>
        </div>
        <div className={styles.formulaPoints}>
          <p><Icon name="check" size={22} />Plant-based formula</p>
          <p><Icon name="check" size={22} />Stimulant-free orange flavor</p>
          <p><Icon name="check" size={22} />Sunflower-derived phosphatidylserine</p>
          <p><Icon name="check" size={22} />Third-party and heavy-metal tested</p>
          <p><Icon name="check" size={22} />Made in the USA</p>
        </div>
      </section>
    </>
  );
}
