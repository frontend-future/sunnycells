import type { CSSProperties } from "react";
import { Accordion } from "@/components/navigation/Accordion";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import {
  COMPARISON, FAQ, INTRO_BADGES, PILLARS, PRODUCT, REASONS, RESTORE,
} from "@/lib/products/brain";
import { BrainCta } from "./BrainCta";
import { BrainOffer } from "./BrainOffer";
import { BrainReviews } from "./BrainReviews";
import { BrainStickyBar } from "./BrainStickyBar";
import styles from "./brain.module.css";

const TRUST = [
  { icon: "leaf", label: "Herbalist inspired" },
  { icon: "wheat-off", label: "Vegan friendly" },
  { icon: "shield-check", label: "30 day guarantee" },
  { icon: "truck", label: "Fulfilled in the USA" },
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

      {/* ---------- icon badge row ---------- */}
      <div className={styles.wrap} style={{ paddingTop: "var(--space-6)" }}>
        <div className={styles.trustRow} style={{ borderTop: 0, marginTop: 0, paddingTop: 0 }}>
          {INTRO_BADGES.map((b) => (
            <span className={styles.trustItem} key={b.label}>
              <Icon name={b.icon} size={18} strokeWidth={2} />
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- gallery + buy box ---------- */}
      <BrainOffer />
      <BrainStickyBar />

      {/* ---------- the natural way to restore balance ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="restore-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="restore-title">
            The natural way to restore focus
          </h2>
        </div>
        <div className={styles.benefits} style={{ marginTop: "var(--space-10)" }}>
          {RESTORE.map((r) => (
            <div key={r.name}>
              <span className={styles.benefitIcon}>
                <Icon name={r.icon} size={24} strokeWidth={2} />
              </span>
              <h3 className={styles.benefitName}>{r.name}</h3>
              <p className={styles.pillarCopy}>{r.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <BrainReviews />

      {/* ---------- why trust ---------- */}
      <section className={`${styles.sectionTight} ${styles.darkBand}`} aria-labelledby="trust-title">
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

      {/* ---------- ingredients ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="ingredients-title">
        <div className={styles.split}>
          <div>
            <h2 className={styles.h2} id="ingredients-title">
              Made with clean, clinically studied actives
            </h2>
            <p className={styles.lede}>Simple ingredients, at the doses the research used.</p>

            <div className={styles.ingredientList}>
              {PILLARS.map((p) => (
                <div className={styles.ingredientItem} key={p.key}>
                  <span className={styles.ingredientDot} aria-hidden="true">
                    <Icon name="dna" size={22} strokeWidth={2} />
                  </span>
                  <span>
                    <span className={styles.ingredientName}>{p.name}</span>
                    <span className={styles.ingredientDose}>{p.dose}</span>
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "var(--space-8)" }}>
              <BrainCta>Try {PRODUCT.name} risk free</BrainCta>
            </div>
          </div>

          <Placeholder
            label={`${PRODUCT.name}, a bottle of ${PRODUCT.servings} capsules`}
            className={styles.splitShot}
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>
      </section>

      {/* ---------- 5 reasons ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="reasons-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="reasons-title">
            5 reasons why thousands choose {PRODUCT.name}
          </h2>
          <p className={styles.lede}>Real results. Clean ingredients. Zero stimulants.</p>
        </div>

        <div className={styles.pillars}>
          {REASONS.map((r, i) => (
            <article className={styles.pillar} key={r.name}>
              <Placeholder label={`Reason ${i + 1}`} className={styles.pillarShot} />
              <div className={styles.pillarBody}>
                <h3 className={styles.pillarName}>{r.name}</h3>
                <p className={styles.pillarCopy}>{r.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- comparison ---------- */}
      <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="compare-title">
        <div className={styles.centered}>
          <h2 className={styles.h2} id="compare-title">
            See the difference for yourself
          </h2>
        </div>

        <div className={styles.split} style={{ marginTop: "var(--space-10)" }}>
          <Placeholder
            label={`${PRODUCT.name}, a bottle of ${PRODUCT.servings} capsules`}
            className={styles.splitShot}
            style={{ aspectRatio: "1 / 1" }}
          />
          <div className={styles.compareTable}>
            <div className={styles.compareTableHead}>
              <span />
              <span>{PRODUCT.name}</span>
              <span>Other brands</span>
            </div>
            {COMPARISON.map((t) => (
              <div className={styles.compareTableRow} key={t}>
                <span>{t}</span>
                <span><Tick /></span>
                <span><Cross /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={`${styles.wrap} ${styles.section} ${styles.darkBand}`} aria-labelledby="faq-title">
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
