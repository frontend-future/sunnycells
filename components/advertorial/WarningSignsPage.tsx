"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { OfferFlag } from "@/components/core/OfferFlag";
import { Wordmark } from "@/components/core/Wordmark";
import { writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { CART_ID } from "@/lib/products/creatine-collagen";
import type { Plan } from "@/lib/products/creatine-collagen";
import {
  ALSO, BUYER_BEWARE, BYLINE, CASE_STUDY, CLOSING_REVIEW, COMPARE, CRISIS_TITLE,
  DECLINE, DISCLAIMER, FINAL, GUARANTEE, HERO, HERO_PROOF, IMAGINE, INTRO,
  INTRODUCING, LONG_REVIEWS, NOT_JUST_AGE, OFFER, ONLY_WORKS, OPENERS, ORIGIN, PLANS,
  PRODUCT, RATING, REFERENCES, RESEARCH, SHORT_REVIEWS, SIGNS, TRUST, WHY_LONGER,
} from "@/lib/content/warningSigns";
import styles from "./warning-signs.module.css";

const CHECKOUT = "/quiz/aging/results/checkout";

function Stars() {
  return (
    <span className={styles.stars} aria-label="5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={15} fill="var(--sun)" strokeWidth={0} />
      ))}
    </span>
  );
}

function Tick() {
  return (
    <span className={styles.tick} aria-hidden="true">
      <Icon name="check" size={14} strokeWidth={3.5} />
    </span>
  );
}

/** Renders the **bold** lead-ins the buyer-beware paragraphs are written with. */
function Emphasised({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p))}
    </>
  );
}

function BeforeAfter({ before, after }: { before: string; after: string }) {
  return (
    <div className={styles.baGrid}>
      <figure className={styles.baFig}>
        <Image src={before} alt="" aria-hidden="true" width={800} height={1000} className={styles.baShot} />
        <figcaption className={styles.baCap}>Before</figcaption>
      </figure>
      <figure className={styles.baFig}>
        <Image src={after} alt="" aria-hidden="true" width={800} height={1000} className={styles.baShot} />
        <figcaption className={styles.baCap}>Week 12</figcaption>
      </figure>
    </div>
  );
}

export function WarningSignsPage() {
  const router = useRouter();
  const [chosen, setChosen] = useState<Plan>(PLANS.find((p) => p.best) ?? PLANS[0]);
  const [stuck, setStuck] = useState(false);
  const offerRef = useRef<HTMLDivElement | null>(null);

  /* The bar arrives once the reader is past the fold and hides again while the offer
     block itself is on screen, so it never covers the thing it points at. */
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const box = offerRef.current?.getBoundingClientRect();
      const offerVisible = !!box && box.top < window.innerHeight && box.bottom > 0;
      setStuck(past && !offerVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toOffer = () => offerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const buy = () => {
    writeAnswer(CART_ID, "plan", chosen.id);
    trackMetaEvent("InitiateCheckout", {
      currency: "USD",
      value: chosen.price * chosen.months,
      content_ids: [chosen.id],
      content_type: "product",
      content_name: `${PRODUCT.name} ${chosen.name}`,
    });
    router.push(CHECKOUT);
  };

  const cheapest = PLANS.reduce((a, b) => (a.price < b.price ? a : b));

  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={`${styles.wrap} ${styles.mastheadInner}`}>
          <Wordmark size={22} tone="inverse" />
          <span className={styles.mastheadTag}>Health</span>
        </div>
      </header>

      <main>
        {/* ---------- hero ---------- */}
        <section className={`${styles.wrap} ${styles.hero}`}>
          <h1 className={styles.h1}>
            {HERO.headlineLead}
            <mark>{HERO.headlineMark1}</mark>
            {HERO.headlineMid}
            <mark>{HERO.headlineMark2}</mark>
            {HERO.headlineTail}
          </h1>
          <p className={styles.heroSub}>{HERO.sub}</p>
        </section>

        <section className={styles.wrap}>
          <BeforeAfter before={HERO_PROOF.before} after={HERO_PROOF.after} />
          <blockquote className={styles.pullQuote}>
            <p><em>&ldquo;{HERO_PROOF.quote}&rdquo;</em></p>
            <p className={styles.attrib}>{HERO_PROOF.attribution}</p>
          </blockquote>
          <p className={styles.smallPrint}>{HERO_PROOF.disclaimer}</p>
        </section>

        <div className={styles.wrap}>
          <div className={styles.byline}>
            <span className={styles.bylineMark} aria-hidden="true">S</span>
            <span>
              <p className={styles.bylineName}>{BYLINE.name}</p>
              <p className={styles.bylineRole}>{BYLINE.role}</p>
            </span>
          </div>
        </div>

        {/* ---------- openers ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          {OPENERS.map((q) => (
            <p key={q} className={styles.lead}>{q}</p>
          ))}
        </section>

        <section className={`${styles.wrap} ${styles.sectionTight}`}>
          <h2 className={`${styles.h2} ${styles.h2Centre}`}>{CRISIS_TITLE}</h2>
        </section>

        <section className={`${styles.wrap} ${styles.section} ${styles.prose}`}>
          {INTRO.map((p) => <p key={p}>{p}</p>)}
        </section>

        {/* ---------- the seven signs ---------- */}
        {SIGNS.map((s) => (
          <section key={s.n} className={`${styles.wrap} ${styles.sign}`} aria-labelledby={`sign-${s.n}`}>
            <div className={styles.signHead}>
              <span className={styles.signNum} aria-hidden="true">{s.n}.</span>
              <h2 className={styles.signTitle} id={`sign-${s.n}`}>{s.title}</h2>
            </div>
            <Image src={s.image} alt={s.alt} width={1200} height={900} className={styles.signShot} />
            <div className={styles.prose}>
              {s.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </section>
        ))}

        {/* ---------- not just age ---------- */}
        <section className={styles.sunkSection}>
          <div className={styles.wrap}>
            <h2 className={`${styles.h2} ${styles.h2Centre}`}>{NOT_JUST_AGE.title}</h2>
            <div className={styles.prose}><p>{NOT_JUST_AGE.body}</p></div>
          </div>
        </section>

        {/* ---------- decline chart ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <figure className={styles.chart}>
            <figcaption className={styles.chartTitle}>{DECLINE.title}</figcaption>
            <div className={styles.chartBody} role="img"
                 aria-label="Relative collagen production falls slowly from age 25 and drops sharply between 45 and 60.">
              {DECLINE.bars.map((b) => (
                <span key={b.age} className={styles.chartCol}>
                  <span
                    className={`${styles.chartBar} ${b.age >= 50 ? styles.chartBarDrop : ""}`}
                    style={{ height: `${b.pct}%` }}
                  />
                  <span className={styles.chartAge}>{b.age}</span>
                </span>
              ))}
            </div>
            <div className={styles.chartAxis}>
              <span>{DECLINE.axisLabel}</span>
              <span>{DECLINE.ageLabel}</span>
            </div>
            <p className={styles.chartNote}>{DECLINE.note}</p>
          </figure>
        </section>

        <section className={`${styles.wrap} ${styles.sectionTight} ${styles.prose}`}>
          {DECLINE.body.map((p) => <p key={p}>{p}</p>)}
        </section>

        {/* ---------- research ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>{RESEARCH.title}</h2>
          <Image src={RESEARCH.image} alt={RESEARCH.alt} width={1200} height={900} className={styles.signShot} />
          <ul className={styles.ticks}>
            {RESEARCH.bullets.map((b) => (
              <li key={b}><Tick />{b}</li>
            ))}
          </ul>
        </section>

        {/* ---------- case study ---------- */}
        <section className={styles.sunkSection}>
          <div className={styles.wrap}>
            <h2 className={`${styles.h2} ${styles.h2Centre}`}>{CASE_STUDY.title}</h2>
            <p className={styles.lead} style={{ textAlign: "center" }}>{CASE_STUDY.sub}</p>
            <BeforeAfter before={CASE_STUDY.before} after={CASE_STUDY.after} />
            <div className={styles.inkCard} style={{ marginTop: "1.5rem" }}>
              <p><em>&ldquo;{CASE_STUDY.quote}&rdquo;</em></p>
              <p className={styles.attrib}>{CASE_STUDY.attribution}</p>
            </div>
            <p className={styles.smallPrint}>{CASE_STUDY.disclaimer}</p>
          </div>
        </section>

        {/* ---------- what else ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>{ALSO.title}</h2>
          <Image src={ALSO.image} alt={ALSO.alt} width={1200} height={900} className={styles.signShot} />
          <ul className={styles.ticks}>
            {ALSO.items.map((b) => <li key={b}><Tick />{b}</li>)}
          </ul>
          <div className={styles.prose} style={{ marginTop: "1.75rem" }}>
            {ALSO.tail.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        {/* ---------- buyer beware ---------- */}
        <section className={styles.sunkSection}>
          <div className={styles.wrap}>
            <h2 className={styles.h2}>{BUYER_BEWARE.title}</h2>
            <Image src={BUYER_BEWARE.image} alt={BUYER_BEWARE.alt} width={1200} height={900} className={styles.signShot} />
            <div className={styles.prose}>
              {BUYER_BEWARE.body.map((p) => <p key={p}><Emphasised text={p} /></p>)}
            </div>
          </div>
        </section>

        {/* ---------- origin ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>{ORIGIN.title}</h2>
          <Image src={ORIGIN.image} alt={ORIGIN.alt} width={900} height={900} className={styles.offerShot} />
          <div className={styles.prose}>
            {ORIGIN.body.map((p) => <p key={p}>{p}</p>)}
            <p><strong>{ORIGIN.signoff}</strong></p>
          </div>
        </section>

        {/* ---------- introducing ---------- */}
        <section className={styles.sunkSection}>
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>{INTRODUCING.eyebrow}</p>
            <h2 className={styles.h2}>{INTRODUCING.title}</h2>
            <p className={styles.lead}>{INTRODUCING.strapline}</p>
            <Image src={INTRODUCING.image} alt={INTRODUCING.alt} width={900} height={900} className={styles.offerShot} />
            <ul className={styles.ticks}>
              {INTRODUCING.ticks.map((b) => <li key={b}><Tick />{b}</li>)}
            </ul>
          </div>
        </section>

        {/* ---------- trust strip ---------- */}
        <div className={styles.trust}>
          <div className={`${styles.wrap} ${styles.wide} ${styles.trustInner}`}>
            {TRUST.map((t) => (
              <span key={t} className={styles.trustItem}>
                <Icon name="check" size={16} strokeWidth={3} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- short reviews ---------- */}
        <section className={`${styles.wrap} ${styles.wide} ${styles.section}`}>
          <div className={styles.reviewGrid}>
            {SHORT_REVIEWS.map((r) => (
              <figure key={r.who} className={styles.reviewCard}>
                <Image src={r.photo} alt="" aria-hidden="true" width={200} height={200} className={styles.reviewShot} />
                <blockquote className={styles.reviewBody}>&ldquo;{r.body}&rdquo;</blockquote>
                <figcaption className={styles.reviewWho}>{r.who}<Stars /></figcaption>
              </figure>
            ))}
          </div>
          <p className={styles.smallPrint}>
            Customer results have not been independently verified. Individual results vary.
          </p>
        </section>

        {/* ---------- comparison ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>{COMPARE.title}</h2>

          {/* Phones get two stacked panels, desktop gets the table. Same rows, same
              source, so the two can never drift apart. */}
          <div className={styles.compareStack}>
            <div className={`${styles.comparePanel} ${styles.comparePanelUs}`}>
              <p className={styles.comparePanelHead}>{COMPARE.usLabel}</p>
              <ul className={styles.comparePanelList}>
                {COMPARE.rows.map((r) => (
                  <li key={r.label}>
                    <span className={styles.yes} aria-hidden="true">
                      <Icon name="check" size={16} strokeWidth={3.5} />
                    </span>
                    <span>
                      <p className={styles.compareLabel}>{r.label}</p>
                      <p className={styles.compareSub}>{r.sub}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.comparePanel}>
              <p className={styles.comparePanelHead}>{COMPARE.themLabel}</p>
              <ul className={styles.comparePanelList}>
                {COMPARE.rows.map((r) => (
                  <li key={r.label}>
                    <span className={styles.no} aria-hidden="true">
                      <Icon name="x" size={16} strokeWidth={3} />
                    </span>
                    <span>
                      <p className={styles.compareLabel}>{r.label}</p>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.compareTable}>
            <div className={styles.compareHead}>
              <span />
              <span className={styles.compareHeadUs}>{COMPARE.usLabel}</span>
              <span className={styles.compareHeadThem}>{COMPARE.themLabel}</span>
            </div>
            {COMPARE.rows.map((r, i) => (
              <div key={r.label} className={`${styles.compareRow} ${i % 2 ? styles.compareRowAlt : ""}`}>
                <span>
                  <p className={styles.compareLabel}>{r.label}</p>
                  <p className={styles.compareSub}>{r.sub}</p>
                </span>
                <span className={styles.compareCell}>
                  <span className={styles.yes} aria-label="Yes">
                    <Icon name="check" size={16} strokeWidth={3.5} />
                  </span>
                </span>
                <span className={styles.compareCell}>
                  <span className={styles.no} aria-label="No">
                    <Icon name="x" size={16} strokeWidth={3} />
                  </span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- long reviews ---------- */}
        <section className={styles.sunkSection}>
          <div className={`${styles.wrap} ${styles.wide}`}>
            <h2 className={`${styles.h2} ${styles.h2Centre}`}>
              {RATING.count.toLocaleString("en-US")} reviews, and the same few words keep coming up
            </h2>
            <div className={`${styles.reviewGrid} ${styles.reviewGridTwo}`}>
              {LONG_REVIEWS.map((r) => (
                <figure key={r.who} className={styles.reviewCard}>
                  <span className={styles.quoteGlyph} aria-hidden="true">&ldquo;</span>
                  <blockquote className={styles.reviewBody}>{r.body}</blockquote>
                  <figcaption className={styles.reviewWho}>{r.who}<Stars /></figcaption>
                </figure>
              ))}
            </div>
            <p className={styles.smallPrint}>
              Customer results have not been independently verified. Individual results vary.
            </p>
          </div>
        </section>

        {/* ---------- imagine ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>{IMAGINE.title}</h2>
          <BeforeAfter before={IMAGINE.before} after={IMAGINE.after} />
          <div className={styles.prose} style={{ marginTop: "1.75rem" }}>
            {IMAGINE.body.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        {/* ---------- why longer supplies ---------- */}
        <section className={styles.sunkSection}>
          <div className={styles.wrap}>
            <h2 className={styles.h2}>{WHY_LONGER.title}</h2>
            <div className={styles.prose}>
              {WHY_LONGER.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        </section>

        {/* ---------- only works if ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>{ONLY_WORKS.title}</h2>
          <ul className={styles.ticks}>
            {ONLY_WORKS.items.map((i) => (
              <li key={i.strong}>
                <Tick />
                <span><strong>{i.strong}</strong> {i.rest}</span>
              </li>
            ))}
          </ul>
          <div className={styles.prose} style={{ marginTop: "1.75rem" }}>
            <p>{ONLY_WORKS.tail}</p>
          </div>
        </section>

        {/* ---------- offer ---------- */}
        <section className={`${styles.wrap} ${styles.wide} ${styles.section}`} id="offer">
          <div className={styles.offer} ref={offerRef}>
            <div className={styles.offerFlagRow}>
              <OfferFlag />
            </div>
            <p className={styles.eyebrow}>{OFFER.eyebrow}</p>
            <h2 className={styles.h2}>{OFFER.title}</h2>
            <div className={styles.prose} style={{ marginBottom: "1.5rem" }}>
              <p>{OFFER.body}</p>
            </div>
            <Image src={INTRODUCING.image} alt={INTRODUCING.alt} width={900} height={900} className={styles.offerShot} />

            <div className={styles.plans} role="radiogroup" aria-label="Choose your supply">
              {PLANS.map((p) => {
                const on = p.id === chosen.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setChosen(p)}
                    className={`${styles.plan} ${on ? styles.planOn : ""}`}
                  >
                    <span className={styles.radio} aria-hidden="true">{on && <span />}</span>
                    <span>
                      <span className={styles.planName}>
                        {p.name}
                        {p.best && <span className={styles.planTag}>Most popular</span>}
                      </span>
                      <span className={styles.planSub}>{p.sub}</span>
                    </span>
                    <span>
                      <span className={styles.planPrice}>${p.price * p.months}</span>
                      <span className={styles.planWas}>${p.price} a jar · was ${p.compareAt * p.months}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <Button fullWidth variant="accent" size="lg" onClick={buy} price={chosen.price * chosen.months}>
              {OFFER.cta}
            </Button>
            <p className={styles.offerTerms}>{OFFER.terms}</p>
          </div>
        </section>

        {/* ---------- guarantee ---------- */}
        <section className={`${styles.wrap} ${styles.sectionTight}`}>
          <div className={styles.inkCard}>
            <h2 className={styles.h2} style={{ color: "var(--white)" }}>{GUARANTEE.title}</h2>
            <p>{GUARANTEE.body}</p>
          </div>
        </section>

        {/* ---------- closing review ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <figure className={styles.reviewCard}>
            <Image src={CLOSING_REVIEW.photo} alt="" aria-hidden="true" width={200} height={200} className={styles.reviewShot} />
            <blockquote className={styles.prose}>
              {CLOSING_REVIEW.body.map((p) => <p key={p}>{p}</p>)}
            </blockquote>
            <figcaption className={styles.reviewWho} style={{ marginTop: "1rem" }}>
              {CLOSING_REVIEW.who}<Stars />
            </figcaption>
          </figure>
          <p className={styles.smallPrint}>
            Customer results have not been independently verified. Individual results vary.
          </p>
        </section>

        {/* ---------- final ---------- */}
        <section className={styles.sunkSection}>
          <div className={styles.wrap}>
            <h2 className={styles.h2}>{FINAL.title}</h2>
            <div className={styles.prose}>
              {FINAL.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className={styles.ctaBlock}>
              <Button fullWidth variant="accent" size="lg" onClick={toOffer}>
                {FINAL.cta}
              </Button>
              <p className={styles.offerTerms}>{OFFER.terms}</p>
            </div>
          </div>
        </section>

        {/* ---------- disclosures ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <details className={styles.disclosure}>
            <summary>
              What is in it
              <Icon name="chevron-down" size={20} strokeWidth={2.5} />
            </summary>
            <ul className={styles.ticks} style={{ paddingBottom: "1.25rem" }}>
              {INTRODUCING.ticks.map((b) => <li key={b}><Tick />{b}</li>)}
            </ul>
          </details>
          <details className={styles.disclosure}>
            <summary>
              References
              <Icon name="chevron-down" size={20} strokeWidth={2.5} />
            </summary>
            <ol className={styles.refList}>
              {REFERENCES.map((r) => <li key={r}>{r}</li>)}
            </ol>
          </details>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <p>{DISCLAIMER}</p>
          <nav className={styles.footerLinks}>
            <Link href="/">Home</Link>
            <Link href="/quiz/aging">Take the quiz</Link>
            <Link href={CHECKOUT}>Order</Link>
          </nav>
          <p style={{ textAlign: "center" }}>&copy; 2026 SUNNYCELLS</p>
          <div className={styles.footerMark}>
            <Wordmark size={20} tone="inverse" />
          </div>
        </div>
      </footer>

      {/* ---------- sticky buy bar ---------- */}
      <div className={`${styles.sticky} ${stuck ? styles.stickyOn : ""}`}>
        <div className={`${styles.wrap} ${styles.wide} ${styles.stickyInner}`}>
          <Image src={PRODUCT.image} alt="" aria-hidden="true" width={120} height={120} className={styles.stickyShot} />
          <span className={styles.stickyText}>
            <span className={styles.stickyOffer}>50% off first jar</span>
            <span className={styles.stickyTerms}>then from ${cheapest.price}</span>
          </span>
          <span className={styles.stickyBtn}>
            <Button variant="accent" size="md" onClick={toOffer}>See plans</Button>
          </span>
        </div>
      </div>
    </div>
  );
}
