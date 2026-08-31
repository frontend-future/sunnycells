"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/core/Icon";
import { INSIDE, REVIEWS } from "@/lib/products/outty";
import {
  ANNOUNCE, BOTH, CLOSING, CTA, CTA_NOTE, FAQ, FORMULA_TITLE, GUARANTEE, HERO,
  PDP, PULL_QUOTE, REVIEWS_TITLE, STRIP, TIMELINE, TWO, WAYS,
} from "@/lib/products/outty-pre";
import styles from "./outty-pre.module.css";

function Ph({ label, ratio = "1" }: { label: string; ratio?: string }) {
  return (
    <div className={styles.ph} style={{ aspectRatio: ratio }} role="img" aria-label={`Placeholder: ${label}`}>
      <span>{label}</span>
    </div>
  );
}

function Stars({ size = 15 }: { size?: number }) {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

/** **bold** in the content files, because these paragraphs are half emphasis. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
      )}
    </>
  );
}

function CtaBlock() {
  return (
    <div className={styles.ctaBlock}>
      <Link href={PDP} className={styles.cta}>
        {CTA}
        <Icon name="arrow-right" size={24} strokeWidth={2.6} />
      </Link>
      <p className={styles.ctaNote}>
        <Icon name="check" size={18} strokeWidth={2.6} />
        {CTA_NOTE}
      </p>
    </div>
  );
}

export function OuttyPrePage() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.announce}>{ANNOUNCE}</div>

      <main>
        {/* ---------- hero ---------- */}
        <section className={`${styles.wrap} ${styles.hero}`}>
          <Ph label={HERO.photo} ratio="1" />
          <div>
            <div className={styles.ratingRow}>
              <Stars size={17} />
              <span>{HERO.rating}</span>
            </div>
            <h1 className={`${styles.display} ${styles.h1}`}>
              {HERO.titleTop}
              <br />
              <span className={styles.accent}>{HERO.titleAccent}</span>
            </h1>
            <p className={styles.lede} style={{ margin: "18px 0 0" }}>{HERO.lede}</p>
            <div className={styles.ctaBlock} style={{ justifyItems: "start" }}>
              <Link href={PDP} className={styles.cta}>
                {CTA}
                <Icon name="arrow-right" size={24} strokeWidth={2.6} />
              </Link>
              <p className={styles.ctaNote}>
                <Icon name="check" size={18} strokeWidth={2.6} />
                {CTA_NOTE}
              </p>
            </div>
          </div>
        </section>

        {/* ---------- benefit strip ---------- */}
        <div className={styles.strip}>
          <div className={`${styles.wrap} ${styles.stripInner}`}>
            {STRIP.map((s) => (
              <span key={s.text} className={styles.stripItem}>
                <span aria-hidden="true">{s.emoji}</span>
                <span>{s.text}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ---------- the five ways ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.waysHead}>
            <h2 className={`${styles.display} ${styles.h2}`}>
              {WAYS.titleA}<span className={styles.accent}>{WAYS.titleAccentA}</span>
              {WAYS.titleB}<span className={styles.accent}>{WAYS.titleAccentB}</span>
              {WAYS.titleC}
            </h2>
            <p className={styles.waysEyebrow}>
              {WAYS.eyebrow} <u>{WAYS.eyebrowLink}</u>
            </p>
            <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "44rem", margin: "0 auto" }}>
              {WAYS.lede} <strong>{WAYS.ledeStrong}</strong>
            </p>
          </div>

          {WAYS.items.map((w) => (
            <div key={w.n} className={`${styles.way} ${w.n % 2 ? "" : styles.wayFlip}`}>
              <Ph label={w.photo} ratio="0.86" />
              <div className={styles.wayBody}>
                <h3 className={`${styles.display} ${styles.h3}`}>
                  <span className={styles.wayNum}>{w.n}.</span> {w.title}
                  <span className={styles.accent}>{w.titleAccent}</span>
                  {"titleAfter" in w ? w.titleAfter : null}
                </h3>
                {w.paras.map((p) => <p key={p}><Rich text={p} /></p>)}
                {"highlight" in w && w.highlight && (
                  <p><span className={styles.hl}>{w.highlight}</span></p>
                )}
                {"after" in w && w.after && <p><Rich text={w.after} /></p>}
                {"bullets" in w && w.bullets && (
                  <ul className={styles.wayList}>
                    {w.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </div>
            </div>
          ))}

          <CtaBlock />
        </section>

        {/* ---------- pull quote ---------- */}
        <div className={styles.quoteBand}>
          <div className={`${styles.wrap} ${styles.quoteInner}`}>
            <Ph label={PULL_QUOTE} ratio="2.2" />
          </div>
        </div>

        {/* ---------- two problems ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.display} ${styles.h2}`}>
            {TWO.titleA}<span className={styles.accent}>{TWO.titleAccent}</span>
          </h2>
          <div style={{ maxWidth: "50rem", margin: "20px auto 0", display: "grid", gap: 14 }}>
            <p className={`${styles.lede} ${styles.centre}`}>{TWO.lede}</p>
            <p className={styles.centre}><span className={styles.hl}>{TWO.highlight}</span></p>
            <p className={`${styles.lede} ${styles.centre}`}>{TWO.after}</p>
          </div>

          {TWO.problems.map((p, i) => (
            <div key={p.eyebrow} className={styles.problem}>
              <p className={styles.problemEyebrow}>{p.eyebrow}</p>
              <h3 className={`${styles.display} ${styles.h3} ${styles.centre}`}>
                {p.titleA}<span className={styles.accent}>{p.titleAccent}</span>
              </h3>
              <div className={`${styles.problemGrid} ${i ? styles.problemFlip : ""}`}>
                <div className={styles.problemArt}>
                  <Ph label={p.photo} ratio="1" />
                  <p className={styles.problemCaption} style={{ color: p.tone === "red" ? "var(--red)" : "var(--purple)" }}>
                    {p.caption}
                  </p>
                </div>
                <div>
                  <p className={styles.lede}>{p.lede}</p>
                  <ul className={`${styles.dotList} ${p.tone === "red" ? styles.toneRed : styles.tonePurple}`}>
                    {p.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ---------- down and up ---------- */}
        <section className={`${styles.wrap} ${styles.narrow}`} style={{ paddingBottom: 60 }}>
          <h2 className={`${styles.display} ${styles.h2}`}>
            {BOTH.titleA}<span className={styles.accent}>{BOTH.titleAccentA}</span>
            {BOTH.titleB}<span className={styles.accent}>{BOTH.titleAccentB}</span>.
          </h2>
          <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
            {BOTH.paras.map((p) => <p key={p} className={`${styles.lede} ${styles.centre}`}>{p}</p>)}
            <p className={styles.centre}><span className={styles.hl}>{BOTH.highlight}</span></p>
            <p className={`${styles.lede} ${styles.centre}`}><Rich text={BOTH.after} /></p>
          </div>
          <CtaBlock />
        </section>

        {/* ---------- the formula ---------- */}
        <div className={styles.formulaBand}>
          <div className={styles.wrap}>
            <h2 className={`${styles.display} ${styles.h2}`}>{FORMULA_TITLE}</h2>
            <div className={styles.formulaPanel}>
              <div className={styles.formulaInner}>
                <p className={styles.insideTitle}>{INSIDE.title}</p>
                <div className={styles.insideGrid}>
                  <div className={styles.insideCol}>
                    {INSIDE.left.map((i) => (
                      <p key={i.name} className={styles.insideName}>
                        {i.name}:<span className={styles.insideClaim}>{i.claim}</span>
                      </p>
                    ))}
                  </div>
                  <div className={styles.facts}>
                    <p className={styles.factsTitle}>Supplement Facts</p>
                    <p style={{ margin: 0 }}>{INSIDE.facts.servings}</p>
                    <p style={{ margin: 0 }}>{INSIDE.facts.servingSize}</p>
                    <div className={styles.factsRule} />
                    <div className={styles.factsHead}>
                      <span>Amount per<br />serving</span>
                      <span>% Daily<br />Value</span>
                    </div>
                    <div className={styles.factsThin} />
                    {INSIDE.facts.rows.map((r) => (
                      <div key={r.name} className={styles.factsRow}>
                        <span>
                          {r.name}
                          {"sub" in r ? <span className={styles.factsSub}>{r.sub}</span> : null}
                        </span>
                        <span>{r.amount}</span>
                        <span style={{ textAlign: "center" }}>*</span>
                      </div>
                    ))}
                    <div className={styles.factsRule} />
                    <p className={styles.factsFoot}>{INSIDE.facts.footnote}</p>
                    <p className={styles.factsOther}>{INSIDE.facts.other}</p>
                  </div>
                  <div className={`${styles.insideCol} ${styles.insideColR}`}>
                    {INSIDE.right.map((i) => (
                      <p key={i.name} className={styles.insideName}>
                        {i.name}:<span className={styles.insideClaim}>{i.claim}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.bands} aria-hidden="true">
                <div style={{ background: "#9C6FD4" }} />
                <div style={{ background: "#7B4BC4" }} />
                <div style={{ background: "#3B2364" }} />
              </div>
            </div>
            <CtaBlock />
          </div>
        </div>

        {/* ---------- transformation timeline ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.eyebrow}>{TIMELINE.eyebrow}</p>
          <h2 className={`${styles.display} ${styles.h2}`}>{TIMELINE.title}</h2>
          <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "40rem", margin: "18px auto 0" }}>
            {TIMELINE.lede} <span className={styles.hl}>{TIMELINE.ledeHighlight}</span>
          </p>

          <div className={styles.tl}>
            <span className={styles.tlLine} aria-hidden="true" />
            {TIMELINE.stages.map((s) => (
              <div key={s.when} className={styles.tlStage}>
                <span className={styles.tlNode} aria-hidden="true">{s.icon}</span>
                <div className={styles.tlCard}>
                  <p className={styles.tlWhen}>{s.when}</p>
                  <h3 className={styles.tlTitle}>{s.title}</h3>
                  <p className={styles.tlMech}><Rich text={s.mechanism} /></p>
                  <ul className={styles.tickList}>
                    {s.ticks.map((t) => (
                      <li key={t}>
                        <Icon name="check" size={18} strokeWidth={3} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.tlProof}>
                  <Ph label={s.proof} ratio="4.2" />
                </div>
              </div>
            ))}
          </div>
          <CtaBlock />
        </section>

        {/* ---------- reviews ---------- */}
        <div className={styles.reviewBand}>
          <div className={styles.wrap}>
            <h2 className={`${styles.display} ${styles.h2}`}>{REVIEWS_TITLE}</h2>
            <div className={styles.reviewGrid}>
              {REVIEWS.cards.map((c) => (
                <article key={c.name} className={styles.reviewCard}>
                  <Ph label={c.photo} ratio="1.05" />
                  <div className={styles.reviewStars}><Stars size={17} /></div>
                  <h3 className={styles.reviewHead}>&ldquo;{c.headline}&rdquo;</h3>
                  <p className={styles.reviewBody}>&ldquo;{c.body}&rdquo;</p>
                  <div className={styles.reviewRule} />
                  <p className={styles.reviewWho}>{c.name}</p>
                  <p className={styles.reviewPlace}>{c.place}</p>
                </article>
              ))}
            </div>
            <CtaBlock />
          </div>
        </div>

        {/* ---------- guarantee ---------- */}
        <div className={styles.guaranteeBand}>
          <div className={styles.wrap}>
            <div className={styles.guaranteeCard}>
              <div className={styles.badge}>
                <span className={styles.badgeN}>{GUARANTEE.badgeN}</span>
                <span className={styles.badgeUnit}>{GUARANTEE.badgeUnit}</span>
                <span className={styles.badgeRibbon}>{GUARANTEE.badgeRibbon}</span>
              </div>
              <div>
                <h2 className={`${styles.display} ${styles.h3} ${styles.accent}`} style={{ textAlign: "left" }}>
                  {GUARANTEE.title}
                </h2>
                <p className={styles.lede} style={{ marginTop: 14 }}>
                  {GUARANTEE.body} <span className={styles.hl}>{GUARANTEE.bodyHighlight}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- faq ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.eyebrow}>{FAQ.eyebrow}</p>
          <h2 className={`${styles.display} ${styles.h2}`}>{FAQ.title}</h2>
          <div className={styles.faqList}>
            {FAQ.items.map((f) => {
              const on = faqOpen === f.q;
              return (
                <div key={f.q} className={`${styles.faqItem} ${on ? styles.faqItemOpen : ""}`}>
                  <button type="button" className={styles.faqHead} aria-expanded={on}
                    onClick={() => setFaqOpen(on ? null : f.q)}>
                    {f.q}
                    <span className={styles.faqPlus} aria-hidden="true">
                      <Icon name={on ? "minus" : "plus"} size={22} strokeWidth={2.6} />
                    </span>
                  </button>
                  {on && <p className={styles.faqBody}>{f.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- closing ---------- */}
        <div className={styles.closing}>
          <div className={`${styles.wrap} ${styles.narrow}`}>
            <h2 className={`${styles.display} ${styles.h2}`}>{CLOSING.title}</h2>
            <p className={`${styles.lede} ${styles.centre}`} style={{ marginTop: 14 }}>{CLOSING.body}</p>
            <CtaBlock />
          </div>
        </div>
      </main>

      <p className={styles.foot}>Layout mockup of The Outgoing Co. Not for publication.</p>
    </div>
  );
}
