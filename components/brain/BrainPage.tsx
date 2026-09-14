import type { CSSProperties } from "react";
import { Accordion } from "@/components/navigation/Accordion";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import {
  BENEFITS, COMPARISON, EXPECT, FAQ, IS, IS_NOT, PILLARS, PRODUCT, QUOTES, RATING,
} from "@/lib/products/brain";
import { BrainCta } from "./BrainCta";
import { BrainOffer } from "./BrainOffer";
import { BrainReviews } from "./BrainReviews";
import { BrainStickyBar } from "./BrainStickyBar";
import styles from "./brain.module.css";

const TRUST = [
  { icon: "shield-check", label: "Third party tested" },
  { icon: "leaf", label: "Vegan friendly" },
  { icon: "truck", label: "Fulfilled in the USA" },
  { icon: "repeat", label: "Skip or cancel anytime" },
] as const;

const FOOTER = [
  { head: "Shop", links: ["Clear Mind", "Even Energy", "Take the quiz"] },
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

/** A flat colour block standing in for a photo. See the PHOTOGRAPHY FLAG in
    lib/products/brain.ts. */
function Placeholder({ label, className, style }: { label: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`${className ?? ""} ${styles.placeholder}`} style={style}>
      {label}
    </div>
  );
}

export function BrainPage() {
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
          <BrainCta size="sm">Try it now</BrainCta>
        </div>
      </header>

      {/* ---------- hero ---------- */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.wrap}>
          <div className={styles.heroGrid}>
            <div>
              <h1 className={styles.heroTitle} id="hero-title">
                The Focus Industry
                <br />
                <span>Has Been Selling</span>
                <br />
                <span>You a Jolt.</span>
              </h1>
              <p className={styles.heroBody}>
                You&rsquo;re not distracted because you lack discipline. Most focus products load
                you with caffeine, wire you for an hour, and call it &ldquo;focus.&rdquo; That&rsquo;s
                not focus. That&rsquo;s a loan you pay back with an afternoon crash.
              </p>

              <div className={styles.heroActions}>
                <BrainCta>Try now and save 50%</BrainCta>
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
                  the raw materials your brain spends to signal and recall in the first place.
                </em>
              </p>
            </div>

            <Placeholder
              label={`${PRODUCT.name}, a bottle of ${PRODUCT.servings} capsules`}
              className={styles.heroShot}
              style={{ aspectRatio: "4 / 3" }}
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
            Most focus products do one thing to you. This one supports three things your brain is
            already trying to do, at the amounts the research used.
          </p>
        </div>

        <div className={styles.pillars}>
          {PILLARS.map((p) => (
            <article className={styles.pillar} key={p.key}>
              <Placeholder label={p.name} className={styles.pillarShot} />
              <div className={styles.pillarBody}>
                <div className={styles.pillarHead}>
                  <h3 className={styles.pillarName}>{p.name}</h3>
                  <span className={styles.pillarDose}>{p.dose}</span>
                </div>
                <p className={styles.pillarCopy}>{p.copy}</p>
                <p className={styles.pillarTicksLabel}>{p.ticksLabel}</p>
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
                Daily focus support that works with your brain
              </h2>
              <p className={styles.lede}>
                No artificial stimulants. No jitters. No crash. Just clinically studied actives at
                the dosages the research actually used.
              </p>

              <div style={{ marginTop: "var(--space-8)" }}>
                <div className={styles.mechBlock}>
                  <h3 className={styles.mechName}>Cognizin&reg; Citicoline</h3>
                  <p className={styles.pillarCopy}>
                    A patented, clinically studied form of citicoline that supports the brain
                    chemistry behind attention and mental energy, without stimulating the nervous
                    system to get there.
                  </p>
                </div>
                <div className={styles.mechBlock}>
                  <h3 className={styles.mechName}>Bacopa monnieri</h3>
                  <p className={styles.pillarCopy}>
                    An Ayurvedic herb studied for its role in memory and recall. Human trials
                    associate consistent intake with improved working memory over weeks of use,
                    not minutes.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "var(--space-8)" }}>
                <BrainCta>Try it now</BrainCta>
              </div>
            </div>

            <Placeholder
              label="Capsules and a glass of water on a desk"
              className={styles.splitShot}
              style={{ aspectRatio: "1 / 1" }}
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
            Energy drinks and study aids help some people, but they come with tradeoffs most
            brands do not talk about.
          </p>
        </div>

        <div className={styles.compare}>
          <div className={styles.compareUs}>
            <div className={styles.compareHead}>
              <Placeholder label="" className={styles.compareShot} style={{ height: 72, fontSize: 10, padding: 0 }} />
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
              <Placeholder label="" className={styles.compareShot} style={{ height: 72, fontSize: 10, padding: 0 }} />
              <h3 className={styles.compareTitle}>Other focus products</h3>
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
              What clear actually feels like
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

      <BrainOffer />
      <BrainStickyBar />

      {/* ---------- why trust ---------- */}
      <section className={styles.sectionTight} aria-labelledby="trust-title">
        <div className={`${styles.wrap} ${styles.centered}`}>
          <h2 className={styles.h2} id="trust-title">
            Why trust {PRODUCT.name}?
          </h2>
        </div>
        <div className={`${styles.wrap} ${styles.benefits}`}>
          {TRUST.map((t) => (
            <div key={t.label} style={{ textAlign: "center" }}>
              <span className={styles.benefitIcon}>
                <Icon name={t.icon} size={24} strokeWidth={2} />
              </span>
              <h3 className={styles.benefitName}>{t.label}</h3>
            </div>
          ))}
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

          <Placeholder
            label="A woman working with clear focus at her desk"
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
          <Placeholder
            label="Two women reviewing notes together, smiling"
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
        <Placeholder label="" className={styles.bannerShot} />
        <span className={styles.bannerScrim} aria-hidden="true" />
        <div className={styles.wrap}>
          <h2 className={styles.bannerTitle} id="banner-title">
            Focus. Recall. Stay calm.
          </h2>
          <p className={styles.bannerBody}>
            Two capsules with breakfast, every morning. Skip or cancel whenever you like.
          </p>
          <div style={{ marginTop: "var(--space-8)" }}>
            <BrainCta tone="accent">Try it now</BrainCta>
          </div>
        </div>
      </section>

      <BrainReviews />

      {/* ---------- FAQ ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="faq-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="faq-title">
            Frequently asked questions
          </h2>
        </div>
        <div style={{ maxWidth: 720, margin: "var(--space-8) auto 0" }}>
          <Accordion items={FAQ.map((f) => ({ title: f.title, body: f.body }))} />
        </div>
      </section>

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
