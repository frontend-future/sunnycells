import Image from "next/image";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import {
  BENEFITS, COMPARISON, EXPECT, IS, IS_NOT, PILLARS, PRODUCT, QUOTES, RATING,
} from "@/lib/products/even-energy";
import { EvenCta } from "./EvenCta";
import { EvenOffer } from "./EvenOffer";
import { EvenReviews } from "./EvenReviews";
import { EvenStickyBar } from "./EvenStickyBar";
import styles from "./even-energy.module.css";

const UGC = [
  "/photos/even-ugc-1.webp",
  "/photos/even-ugc-2.webp",
  "/photos/even-ugc-3.webp",
  "/photos/even-ugc-4.webp",
  "/photos/even-ugc-5.webp",
  "/photos/even-holding.webp",
];

const FOOTER = [
  { head: "Shop", links: ["Even Energy", "Metabolic Morning Blend", "Take the quiz"] },
  { head: "About", links: ["Our standard", "Ingredients", "Science"] },
  { head: "Help", links: ["Contact", "Shipping", "Returns", "FAQ"] },
];

function Tick() {
  return (
    <span className={styles.tick} aria-hidden="true">
      <Icon name="check" size={13} strokeWidth={3.5} />
    </span>
  );
}

function Cross() {
  return (
    <span className={styles.cross} aria-hidden="true">
      <Icon name="x" size={13} strokeWidth={3.5} />
    </span>
  );
}

function Stars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={16} fill="var(--sun)" strokeWidth={0} />
      ))}
    </span>
  );
}

export function EvenEnergyPage() {
  return (
    <div className={styles.page}>
      <AnnouncementMarquee
        terms={[
          { strong: "Free shipping", rest: "on all orders" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <Wordmark size={22} />
          <EvenCta size="sm">Try it now</EvenCta>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div>
              {/* Three stacked lines with the weight dropping after the first, which is
                  the shape this hero pattern uses. The argument is the category's, the
                  sentences are ours. */}
              <h1 className={styles.heroTitle} id="hero-title">
                The Energy Industry
                <br />
                <span>Has Been Selling</span>
                <br />
                <span>You a Crash.</span>
              </h1>
              {/* One paragraph, not two. Two pushed the CTA past the fold on a 640px
                  phone, and the second one was restating the first. */}
              <p className={styles.heroBody}>
                You&rsquo;re not tired because you&rsquo;re weak. You&rsquo;re not exhausted because you lack
                motivation. Most energy products load you with caffeine, crash you an hour later,
                and call it &ldquo;energy.&rdquo; That&rsquo;s not energy. That&rsquo;s a loan you pay back with interest.
              </p>

              <div className={styles.heroActions}>
                <EvenCta>Try it now</EvenCta>
                <span className={styles.heroRating}>
                  <Stars />
                  <span style={{ fontSize: "var(--size-meta)", fontWeight: 600 }}>
                    {RATING.score} from {RATING.count.toLocaleString("en-US")} reviews
                  </span>
                </span>
              </div>

              <p className={styles.heroNote}>
                <em>
                  <strong>{PRODUCT.name}</strong> works the other end of the problem:
                  the raw material your cells spend to make ATP in the first place.
                </em>
              </p>
            </div>

            <Image
              src="/product/even-energy.webp"
              alt={`${PRODUCT.name}, a light green pouch of ${PRODUCT.servings} watermelon stick packs`}
              width={1024}
              height={768}
              priority
              className={styles.heroShot}
            />
          </div>
        </div>

        <div className={styles.wrap}>
          <div className={styles.chips}>
            {PILLARS.map((p) => (
              <span className={styles.chip} key={p.key}>
                <b>{p.name}</b> {p.dose}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- three pillars ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="pillars-title">
        <div className={styles.centered}>
          <p className={styles.eyebrow}>The formula</p>
          <h2 className={styles.h2} id="pillars-title">
            Three jobs, three doses
          </h2>
          <p className={styles.lede}>
            Most energy products do one thing to you. This one supports three things your cells are
            already trying to do, at the amounts the research used.
          </p>
        </div>

        <div className={styles.pillars}>
          {PILLARS.map((p) => (
            <article className={styles.pillar} key={p.key}>
              <Image src={p.photo} alt={p.alt} width={1024} height={1024} className={styles.pillarShot} />
              <div className={styles.pillarBody}>
                <h3 className={styles.pillarName}>{p.name}</h3>
                <span className={styles.pillarDose}>{p.dose}</span>
                <p className={styles.pillarCopy}>{p.copy}</p>
                <ul className={styles.ticks}>
                  {p.ticks.map((t) => (
                    <li key={t}>
                      <Tick />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- mechanism ---------- */}
      <section className={styles.mechanism} aria-labelledby="mech-title">
        <div className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.split}>
            <div>
              <h2 className={styles.h2} id="mech-title">
                Energy your body makes, not energy it borrows
              </h2>
              <p className={styles.lede}>
                A stimulant blocks the signal that tells you you are tired. It does not give you
                anything. These do the opposite: they are raw material, not a message.
              </p>

              <div style={{ marginTop: "var(--space-8)" }}>
                <div className={styles.mechBlock}>
                  <h3 className={styles.mechName}>Taurine 1000 mg</h3>
                  <p className={styles.pillarCopy}>
                    One of the most abundant amino acids in muscle tissue, and a molecule the body
                    uses in mitochondrial function. It is not a stimulant and it does not act like
                    one, which is why nothing spikes and nothing drops.
                  </p>
                </div>
                <div className={styles.mechBlock}>
                  <h3 className={styles.mechName}>CoQ10 150 mg</h3>
                  <p className={styles.pillarCopy}>
                    Sits in the electron transport chain, the last step before your cells produce
                    ATP. The body makes less of it with age, and 150 mg is the upper end of what
                    studies of daily supplementation have used.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "var(--space-8)" }}>
                <EvenCta>Try it now</EvenCta>
              </div>
            </div>

            <Image
              src="/photos/even-sticks-fan.webp"
              alt="A hand holding a fan of Even Energy stick packs in a bright kitchen"
              width={1024}
              height={1024}
              className={styles.splitShot}
            />
          </div>
        </div>
      </section>

      {/* ---------- comparison ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="compare-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="compare-title">
            Why people are switching to a smarter, stimulant free option
          </h2>
          <p className={styles.lede}>
            Energy drinks and NAD boosters help some people, but they come with tradeoffs most
            brands do not talk about.
          </p>
        </div>

        <div className={styles.compare}>
          <div className={styles.compareUs}>
            <div className={styles.compareHead}>
              <Image
                src="/product/even-energy.webp"
                alt=""
                aria-hidden="true"
                width={1024}
                height={768}
                className={styles.compareShot}
              />
              <h3 className={styles.compareTitle}>{PRODUCT.name}</h3>
            </div>
            <ul className={styles.ticks}>
              {COMPARISON.us.map((t) => (
                <li key={t}>
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.compareThem}>
            <div className={styles.compareHead}>
              <Image
                src="/product/generic-tub.png"
                alt=""
                aria-hidden="true"
                width={600}
                height={600}
                className={styles.compareShot}
              />
              <h3 className={styles.compareTitle}>Other energy products</h3>
            </div>
            <ul className={styles.ticks}>
              {COMPARISON.them.map((t) => (
                <li key={t}>
                  <Cross />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- quotes ---------- */}
      <section className={styles.mechanism} aria-labelledby="quotes-title">
        <div className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.centered}>
            <h2 className={styles.h2} id="quotes-title">
              What steady actually feels like
            </h2>
          </div>
          <div className={styles.quotes}>
            {QUOTES.map((q) => (
              <figure className={styles.quote} key={q.name}>
                <Stars />
                <blockquote className={styles.quoteText}>{q.text}</blockquote>
                <figcaption className={styles.quoteWho}>
                  {q.name} <span className={styles.verified}>Verified buyer</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <EvenOffer />
      <EvenStickyBar />

      {/* ---------- ugc strip ---------- */}
      <section className={styles.sectionTight} aria-labelledby="ugc-title">
        <div className={`${styles.wrap} ${styles.centered}`}>
          <p className={styles.eyebrow}>@sunnycells</p>
          <h2 className={styles.h2} id="ugc-title">
            Evidently, women love it
          </h2>
        </div>
        {/* Rendered twice so the track can loop on itself. The second pass is
            decorative, and the first is already unlabelled, so neither is read out. */}
        <div className={styles.ugc} aria-hidden="true">
          <div className={styles.ugcTrack}>
            {[0, 1].map((pass) =>
              UGC.map((src) => (
                <Image
                  key={`${pass}-${src}`}
                  src={src}
                  alt=""
                  width={1184}
                  height={864}
                  /* The track scrolls sideways inside overflow:hidden, so the tiles past
                     the right edge never intersect the viewport and lazy loading never
                     fires for them. They have to be fetched up front. */
                  loading="eager"
                  className={styles.ugcShot}
                />
              )),
            )}
          </div>
        </div>
      </section>

      {/* ---------- is / is not ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="is-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="is-title">
            What this is, and what it is not
          </h2>
        </div>

        <div className={styles.isGrid}>
          <div className={styles.isCard}>
            <h3 className={styles.isTitle}>{PRODUCT.name} is</h3>
            <ul className={styles.ticks}>
              {IS.map((t) => (
                <li key={t}>
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <Image
            src="/photos/even-holding.webp"
            alt="A woman in a bright kitchen holding a pouch of Even Energy"
            width={1184}
            height={864}
            className={styles.isShot}
          />

          <div className={styles.isCard}>
            <h3 className={styles.isTitle}>{PRODUCT.name} is not</h3>
            <ul className={styles.ticks}>
              {IS_NOT.map((t) => (
                <li key={t}>
                  <Cross />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- what to expect ---------- */}
      <section className={`${styles.wrap} ${styles.sectionTight}`} aria-labelledby="expect-title">
        <div className={styles.expect}>
          <div className={styles.expectBody}>
            <h2 className={styles.h2} id="expect-title">
              What to expect with consistent use
            </h2>
            <ul className={styles.ticks} style={{ marginTop: "var(--space-6)" }}>
              {EXPECT.map((t) => (
                <li key={t}>
                  <Tick />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Image
            src="/photos/even-expect.webp"
            alt="Two women stretching outdoors in a park in the morning"
            width={1024}
            height={768}
            className={styles.expectShot}
          />
        </div>
      </section>

      {/* ---------- three benefits ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-label="Product standards">
        <div className={styles.benefits}>
          {BENEFITS.map((b) => (
            <div key={b.name}>
              <span className={styles.benefitIcon}>
                <Icon name={b.icon} size={24} strokeWidth={2} />
              </span>
              <h3 className={styles.benefitName}>{b.name}</h3>
              <p className={styles.pillarCopy}>{b.copy}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- closing banner ---------- */}
      <section className={styles.banner} aria-labelledby="banner-title">
        <Image
          src="/photos/even-wide.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className={styles.bannerShot}
        />
        <span className={styles.bannerScrim} aria-hidden="true" />
        <div className={styles.wrap}>
          <h2 className={styles.bannerTitle} id="banner-title">
            Fuel. Sustain. Restore.
          </h2>
          <p className={styles.bannerBody}>
            One stick in cold water, every morning. Skip or cancel whenever you like.
          </p>
          <div style={{ marginTop: "var(--space-8)" }}>
            <EvenCta tone="accent">Try it now</EvenCta>
          </div>
        </div>
      </section>

      <EvenReviews />

      {/* ---------- footer ---------- */}
      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerGrid}>
            <div className={styles.footerCol}>
              <Wordmark size={22} />
              <p className={styles.pillarCopy} style={{ marginTop: "var(--space-4)", maxWidth: "28ch" }}>
                The daily use supplement system, backed by science and designed for women.
              </p>
            </div>
            {FOOTER.map((c) => (
              <div className={styles.footerCol} key={c.head}>
                <h3>{c.head}</h3>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <span className={styles.footerMark} aria-hidden="true">
          SUNNYCELLS
        </span>

        <div className={styles.wrap}>
          <p className={styles.legal}>
            These statements have not been evaluated by the Food and Drug Administration. This
            product is not intended to diagnose, treat, cure, or prevent any disease. Copyright ©
            2026 SUNNYCELLS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
