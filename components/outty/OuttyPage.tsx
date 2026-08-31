"use client";

import { useState } from "react";
import { Icon } from "@/components/core/Icon";
import {
  ACCORDIONS, ANNOUNCE, BRAND, FAQ, FOOTER, FOUNDER, GALLERY, HERO, HOW,
  INSIDE, NAV, REVIEWS, TIMELINE,
} from "@/lib/products/outty";
import styles from "./outty.module.css";

/** Every image on this page is a labelled box until real art exists. */
function Ph({ label, ratio = "1", className = "" }: { label: string; ratio?: string; className?: string }) {
  return (
    <div className={`${styles.ph} ${className}`} style={{ aspectRatio: ratio }} role="img" aria-label={`Placeholder: ${label}`}>
      <span>{label}</span>
    </div>
  );
}

function Stars({ size = 18 }: { size?: number }) {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

function Cta({ label, className = "" }: { label: string; className?: string }) {
  return (
    <a href="#buy" className={`${styles.cta} ${className}`} style={{ textAlign: "center", textDecoration: "none" }}>
      {label}
    </a>
  );
}

export function OuttyPage() {
  const [shot, setShot] = useState(0);
  const [open, setOpen] = useState<string | null>("How to use");
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.announce}>
        {ANNOUNCE.lead} <a href="#buy">{ANNOUNCE.link}</a>
      </div>

      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <button type="button" className={styles.burger} aria-label="Menu">
            <Icon name="menu" size={24} strokeWidth={2.2} />
          </button>
          <span className={styles.wordmark}>
            <small>THE </small>OUTGOING<small> CO.</small>
          </span>
          <div className={styles.headerRight}>
            <a href="#buy">{NAV.signIn}</a>
            <a href="#buy">
              {NAV.bag} <span className={styles.bagCount}>{NAV.bagCount}</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* ---------- hero ---------- */}
        <section className={`${styles.wrap} ${styles.hero}`} id="buy">
          <div>
            <div className={styles.galleryMain}>
              <Ph label={GALLERY[shot]} ratio="1" />
              <button type="button" className={`${styles.arrow} ${styles.arrowL}`} aria-label="Previous image"
                onClick={() => setShot((s) => (s - 1 + GALLERY.length) % GALLERY.length)}>
                <Icon name="chevron-left" size={30} strokeWidth={2} />
              </button>
              <button type="button" className={`${styles.arrow} ${styles.arrowR}`} aria-label="Next image"
                onClick={() => setShot((s) => (s + 1) % GALLERY.length)}>
                <Icon name="chevron-right" size={30} strokeWidth={2} />
              </button>
            </div>
            <div className={styles.thumbs}>
              {GALLERY.map((g, i) => (
                <button key={g} type="button" aria-label={g} aria-current={i === shot}
                  className={`${styles.thumb} ${i === shot ? styles.thumbOn : ""}`} onClick={() => setShot(i)}>
                  <span className={`${styles.ph} ${styles.phThumb}`} aria-hidden="true">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className={styles.ratingRow}>
              <Stars size={20} />
              <span>{HERO.rating}</span>
            </div>
            <h1 className={styles.h1}>{HERO.title}</h1>
            <div className={styles.priceRow}>
              <span className={styles.was}>{HERO.compareAt}</span>
              <span className={styles.now}>{HERO.price}</span>
            </div>
            <ul className={styles.bullets}>
              {HERO.bullets.map((b) => (
                <li key={b.text}><span aria-hidden="true">{b.emoji}</span>{b.text}</li>
              ))}
            </ul>

            <div className={styles.planCard}>
              <strong className={styles.planName}>{HERO.planLabel}</strong>
              <span className={styles.planPrice}>
                <span className={styles.was}>{HERO.compareAt}</span> {HERO.price}
              </span>
            </div>
            <p className={styles.servings}>{HERO.servings}</p>
            <p className={styles.cadence}>{HERO.cadence}</p>

            <Cta label={HERO.cta} />

            <div className={styles.trustRow}>
              {HERO.trust.map((t) => (
                <span key={t.text}>
                  <Icon name={t.icon as "truck"} size={20} strokeWidth={2} />
                  {t.text}
                </span>
              ))}
            </div>
            <button type="button" className={styles.oneTime}>{HERO.oneTime}</button>

            <div className={styles.benefits}>
              <h2 className={styles.benefitsTitle}>{HERO.benefitsTitle}</h2>
              <ul>
                {HERO.benefits.map((b) => (
                  <li key={b}>
                    <span className={styles.benefitTick} aria-hidden="true">
                      <Icon name="check" size={13} strokeWidth={3.5} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {ACCORDIONS.map((a) => {
              const on = open === a.title;
              return (
                <div key={a.title} className={styles.acc}>
                  <button type="button" className={styles.accHead} aria-expanded={on}
                    onClick={() => setOpen(on ? null : a.title)}>
                    {a.title}
                    <Icon name={on ? "minus" : "plus"} size={20} strokeWidth={2.2} />
                  </button>
                  {on && (
                    <div className={styles.accBody}>
                      {a.bullets ? (
                        <ul>{a.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                      ) : (
                        <p style={{ margin: 0 }}>{a.body}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- whats inside ---------- */}
        <div className={styles.wrap}>
          <section className={styles.insidePanel}>
            <div className={styles.insideInner}>
              <h2 className={styles.insideTitle}>{INSIDE.title}</h2>
              <div className={styles.insideGrid}>
                <div className={styles.insideCol}>
                  {INSIDE.left.map((i) => (
                    <p key={i.name} className={styles.insideName} style={{ margin: 0 }}>
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
                    <p key={i.name} className={styles.insideName} style={{ margin: 0 }}>
                      {i.name}:<span className={styles.insideClaim}>{i.claim}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.insideBands} aria-hidden="true">
              <div style={{ background: "var(--purple-mid)" }} />
              <div style={{ background: "var(--purple)" }} />
              <div style={{ background: "var(--purple-dark)" }} />
            </div>
          </section>
        </div>

        {/* ---------- timeline ---------- */}
        <section className={styles.wrap}>
          <h2 className={styles.sectionTitle}>{TIMELINE.title}</h2>
          <div className={styles.timeline}>
            <span className={styles.tlLine} aria-hidden="true" />
            {TIMELINE.steps.map((s, i) => (
              <div key={s.when} className={`${styles.tlStep} ${i % 2 ? styles.tlRight : styles.tlLeft}`}>
                <span className={styles.tlNode} aria-hidden="true">
                  <Icon name="check" size={13} strokeWidth={3.5} />
                </span>
                <span className={styles.tlWhen}>
                  <span aria-hidden="true">🗒️</span>{s.when}
                </span>
                <div className={styles.tlCard}>
                  <p className={styles.tlCardTitle}>
                    <span aria-hidden="true">{s.emoji} </span>{s.title}
                  </p>
                  <p className={styles.tlCardBody}>{s.body}</p>
                </div>
                <div className={styles.tlArt}>
                  <Ph label={s.art} ratio="1" />
                </div>
              </div>
            ))}
          </div>
          <Cta label={TIMELINE.cta} className={styles.ctaWide} />
        </section>

        {/* ---------- reviews ---------- */}
        <div className={styles.wrap}>
          <section className={styles.reviewPanel}>
            <h2 className={styles.reviewTitle}>{REVIEWS.title}</h2>
            <div className={styles.reviewGrid}>
              {REVIEWS.cards.map((c) => (
                <article key={c.name} className={styles.reviewCard}>
                  <Ph label={c.photo} ratio="1" />
                  <div style={{ textAlign: "center" }}><Stars size={17} /></div>
                  <p className={styles.reviewHead}>&ldquo;{c.headline}&rdquo;</p>
                  <p className={styles.reviewBody}>&ldquo;{c.body}&rdquo;</p>
                  <p className={styles.reviewWho}>{c.name}</p>
                  <p className={styles.reviewPlace}>{c.place}</p>
                </article>
              ))}
            </div>

            <h3 className={styles.moreTitle}>{REVIEWS.moreTitle}</h3>
            <div className={styles.moreGrid}>
              {REVIEWS.more.map((m) => <Ph key={m} label={m} ratio="0.78" />)}
            </div>
            <Cta label={REVIEWS.cta} className={styles.ctaWide} />
          </section>
        </div>

        {/* ---------- how it works ---------- */}
        <div className={styles.wrap}>
          <section className={styles.howPanel}>
            <Ph label={HOW.photo} ratio="0.8" />
            <div>
              <h2 className={styles.howTitle}>{HOW.title}</h2>
              <div className={styles.howSteps}>
                {HOW.steps.map((s) => (
                  <div key={s.n} className={styles.howStep}>
                    <span className={styles.howNum} aria-hidden="true">{s.n}</span>
                    <div>
                      <p className={styles.howStepTitle}>{s.title}</p>
                      <p className={styles.howStepBody}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ---------- founder ---------- */}
        <section className={`${styles.wrap} ${styles.founder}`}>
          <Ph label={FOUNDER.photo} ratio="0.86" />
          <div>
            <h2 className={styles.founderTitle}>{FOUNDER.title}</h2>
            <div className={styles.founderBody}>
              {FOUNDER.paragraphs.map((p) => <p key={p}>{p}</p>)}
              <p>{FOUNDER.attribution}</p>
            </div>
            <Cta label={FOUNDER.cta} className={styles.ctaInline} />
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className={styles.wrap}>
          <h2 className={styles.faqTitle}>{FAQ.title}</h2>
          <div className={styles.faqList}>
            {FAQ.items.map((f) => {
              const on = faqOpen === f.q;
              return (
                <div key={f.q} className={`${styles.faqItem} ${on ? styles.faqItemOpen : ""}`}>
                  <button type="button" className={styles.faqHead} aria-expanded={on}
                    onClick={() => setFaqOpen(on ? null : f.q)}>
                    {f.q}
                    <span className={styles.faqPlus} aria-hidden="true">
                      <Icon name={on ? "minus" : "plus"} size={18} strokeWidth={3} />
                    </span>
                  </button>
                  {on && <p className={styles.faqBody}>{f.a}</p>}
                </div>
              );
            })}
          </div>
          <Cta label={FAQ.cta} className={styles.ctaWide} />
        </section>
      </main>

      <div className={styles.bands} aria-hidden="true" style={{ marginTop: 44 }}>
        <div style={{ background: "var(--purple-mid)" }} />
        <div style={{ background: "var(--purple)" }} />
        <div style={{ background: "var(--purple-dark)" }} />
      </div>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerGrid}`}>
          <div>
            <div className={styles.signup}>
              <label htmlFor="outty-email" className={styles.ph} style={{ display: "none" }}>Email</label>
              <input id="outty-email" type="email" placeholder={FOOTER.emailPlaceholder} />
              <Icon name="arrow-right" size={20} strokeWidth={2} />
            </div>
            <div className={styles.socials}>
              <a href="#buy" aria-label="Instagram"><Icon name="user" size={22} strokeWidth={2} /></a>
              <a href="#buy" aria-label="Twitter"><Icon name="zap-off" size={22} strokeWidth={2} /></a>
              <a href="#buy" aria-label="TikTok"><Icon name="star" size={22} strokeWidth={2} /></a>
            </div>
          </div>
          {FOOTER.columns.map((c) => (
            <div key={c.title} className={styles.footCol}>
              <h3>{c.title}</h3>
              <ul>
                {c.links.map((l) => <li key={l}><a href="#buy">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <p className={styles.powered}>{FOOTER.powered}</p>
        <p className={styles.powered} style={{ fontWeight: 400, opacity: 0.6 }}>
          Layout mockup of {BRAND}. Not for publication.
        </p>
      </footer>
    </div>
  );
}
