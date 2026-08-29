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
import {
  CART_ID, COMPARE, DISCLAIMER, FAQ, FINISH, GALLERY, GAP, HERO, INCLUDED, INSIDE,
  MISSING, PLANS, PRODUCT, QUOTE, RATING, REVIEWS, TRUST, type Plan,
} from "@/lib/products/daily-reds";
import { NutritionLabel } from "./NutritionLabel";
import styles from "./daily-reds.module.css";

const CHECKOUT = "/products/daily-reds/checkout";

function Stars({ size = 17 }: { size?: number }) {
  return (
    <span className={styles.stars} aria-label={`${RATING.score} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} fill="var(--sun)" strokeWidth={0} />
      ))}
    </span>
  );
}

function Tick() {
  return (
    <span className={styles.tick} aria-hidden="true">
      <Icon name="check" size={13} strokeWidth={3.5} />
    </span>
  );
}

export function DailyRedsPage() {
  const router = useRouter();
  const [chosen, setChosen] = useState<Plan>(PLANS.find((p) => p.best) ?? PLANS[0]);
  const [shot, setShot] = useState(0);
  const [factsOpen, setFactsOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const buyRef = useRef<HTMLDivElement | null>(null);

  /* The bar appears once the buy block has scrolled past and hides again whenever it is
     back on screen, so it never covers the thing it points at. */
  useEffect(() => {
    const onScroll = () => {
      const box = buyRef.current?.getBoundingClientRect();
      if (!box) return;
      setStuck(box.bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toBuy = () => buyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

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

  const saving = (chosen.compareAt - chosen.price) * chosen.months;

  return (
    <div className={styles.page}>
      {/* No countdown and no code. It is a standing term, so there is nothing to expire. */}
      <div className={styles.announce}>
        <div className={`${styles.wrap} ${styles.announceInner}`}>
          <span>50% off your first order</span>
          <span aria-hidden="true">·</span>
          <span>No code needed</span>
          <span aria-hidden="true">·</span>
          <span>Free shipping</span>
        </div>
      </div>

      <header className={styles.masthead}>
        <div className={`${styles.wrap} ${styles.mastheadInner}`}>
          <Wordmark size={22} />
          <Button variant="accent" size="sm" onClick={toBuy}>Get 50% off</Button>
        </div>
      </header>

      <main>
        {/* ---------- buy block ---------- */}
        <section className={`${styles.wrap} ${styles.section}`} id="buy">
          <div className={styles.buyGrid} ref={buyRef}>
            <div className={styles.gallery}>
              <Image
                src={GALLERY[shot].src}
                alt={GALLERY[shot].alt}
                width={1200}
                height={1200}
                className={styles.galleryMain}
                priority
              />
              <div className={styles.thumbs}>
                {GALLERY.map((g, i) => (
                  <button
                    key={g.src}
                    type="button"
                    onClick={() => setShot(i)}
                    aria-label={g.alt}
                    aria-current={i === shot}
                    className={`${styles.thumb} ${i === shot ? styles.thumbOn : ""}`}
                    style={{ backgroundImage: `url(${g.src})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  />
                ))}
              </div>
            </div>

            <div className={styles.buyCard}>
              <div>
                <p className={styles.eyebrow}>{HERO.eyebrow}</p>
                <h1 className={styles.h1}>
                  {HERO.title} <span className={styles.accent}>{HERO.titleAccent}</span>
                </h1>
              </div>

              <div className={styles.ratingRow}>
                <Stars />
                <span className={styles.ratingScore}>{RATING.score}/5</span>
                <span className={styles.meta}>{RATING.count.toLocaleString("en-US")} reviews</span>
              </div>

              <p className={styles.lede}>{HERO.lede}</p>

              <ul className={styles.points}>
                {HERO.points.map((p) => <li key={p}><Tick />{p}</li>)}
              </ul>

              <button type="button" className={styles.factsLink} onClick={() => setFactsOpen(true)}>
                View nutrition label
                <Icon name="chevron-right" size={18} strokeWidth={2.5} />
              </button>

              <div>
                <OfferFlag size="sm" />
              </div>

              <div className={styles.priceRow}>
                <span className={styles.priceNow}>${chosen.price}</span>
                {chosen.months > 1 && <span className={styles.meta}>/box</span>}
                <span className={styles.priceWas}>${chosen.compareAt * chosen.months}</span>
                <span className={styles.savePill}>Save ${saving}</span>
              </div>

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
                        <span className={styles.planWas}>was ${p.compareAt * p.months}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <Button fullWidth variant="accent" size="lg" onClick={buy}>Start with half off</Button>
              <p className={styles.termsLine}>
                {chosen.sub}. Free shipping, skip or cancel in two clicks, and a 30 day money
                back guarantee either way.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- trust strip. Verifiable facts, not press logos we do not have. ---------- */}
        <div className={styles.trust}>
          <div className={`${styles.wrap} ${styles.trustInner}`}>
            {TRUST.map((t) => (
              <span key={t} className={styles.trustItem}>
                <Icon name="check" size={16} strokeWidth={3} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ---------- what you are short on ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>{MISSING.title}</h2>
          <div className={`${styles.cols} ${styles.cols3}`}>
            {MISSING.items.map((m) => (
              <div key={m.name} className={styles.card}>
                <h3 className={styles.h3}>{m.name}</h3>
                <p className={styles.body}>{m.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- the gap ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={`${styles.cols} ${styles.cols2}`}>
              <div>
                <p className={styles.eyebrow}>{GAP.eyebrow}</p>
                <p className={styles.figure}>{GAP.figure}</p>
                <h2 className={styles.h2}>{GAP.title}</h2>
                <p className={styles.body}>{GAP.body}</p>
                <div className={styles.statRow} style={{ marginTop: "1.5rem" }}>
                  {GAP.stats.map((s) => (
                    <div key={s.label} className={styles.statCard}>
                      <span className={styles.statN}>{s.n}</span>
                      <span className={styles.statLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Image src={GAP.image} alt={GAP.alt} width={1200} height={900} className={styles.shot} />
                <p className={styles.meta} style={{ marginTop: "1rem" }}>{GAP.source}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- why this one gets finished ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>{FINISH.title}</h2>
          <p className={`${styles.lede} ${styles.centre}`} style={{ marginBottom: "2rem" }}>{FINISH.lede}</p>
          <div className={`${styles.cols} ${styles.cols3}`}>
            {FINISH.steps.map((s, i) => (
              <div key={s.title}>
                <Image src={s.image} alt={s.alt} width={1200} height={900} className={styles.shot} />
                <h3 className={styles.h3} style={{ marginTop: "1rem" }}>
                  <span className={styles.accent}>{i + 1}.</span> {s.title}
                </h3>
                <p className={styles.body}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- what is in it ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <h2 className={`${styles.h2} ${styles.centre}`}>{INSIDE.title}</h2>
            <div className={`${styles.cols} ${styles.cols2}`}>
              {INSIDE.groups.map((g) => (
                <div key={g.title} className={styles.card}>
                  <h3 className={styles.h3}>{g.title}</h3>
                  <p className={styles.body}>{g.body}</p>
                </div>
              ))}
            </div>
            <div className={styles.centre} style={{ marginTop: "1.75rem" }}>
              <button type="button" className={styles.factsLink} onClick={() => setFactsOpen(true)}>
                View the full nutrition label
                <Icon name="chevron-right" size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </section>

        {/* ---------- comparison ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>{COMPARE.title}</h2>
          <div className={styles.compare}>
            <div className={styles.compareHead}>
              <span />
              <span className={styles.compareCol}>{COMPARE.usLabel}</span>
              <span className={styles.compareCol} style={{ color: "var(--ink-60)" }}>{COMPARE.themLabel}</span>
            </div>
            {COMPARE.rows.map((r, i) => (
              <div key={r.label} className={`${styles.compareRow} ${i % 2 ? styles.compareAlt : ""}`}>
                <span>
                  <span className={styles.reviewWho}>{r.label}</span>
                  <span className={styles.statLabel}>{r.sub}</span>
                </span>
                <span className={styles.cell}>
                  <span className={styles.yes} aria-label="Yes"><Icon name="check" size={15} strokeWidth={3.5} /></span>
                </span>
                <span className={styles.cell}>
                  <span className={styles.no} aria-label="No"><Icon name="x" size={15} strokeWidth={3} /></span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- quote ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <figure className={styles.quoteCard}>
            <Image src={QUOTE.photo} alt="" aria-hidden="true" width={200} height={200} className={styles.quoteShot} />
            <div>
              <Stars />
              <blockquote className={styles.body} style={{ margin: "0.5rem 0" }}>
                &ldquo;{QUOTE.text}&rdquo;
              </blockquote>
              <figcaption className={styles.meta} style={{ color: "var(--ink-20)" }}>
                {QUOTE.name}, {QUOTE.meta}
              </figcaption>
            </div>
          </figure>
          <p className={`${styles.meta} ${styles.centre}`} style={{ marginTop: "1rem" }}>
            Customer results have not been independently verified. Individual results vary.
          </p>
        </section>

        {/* ---------- what turns up ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <h2 className={`${styles.h2} ${styles.centre}`}>What turns up</h2>
            <div className={`${styles.cols} ${styles.cols2}`}>
              {INCLUDED.map((i) => (
                <div key={i.label} className={styles.card}>
                  <h3 className={styles.h3}>
                    <span className={styles.accent}>{i.n}</span> {i.label}
                  </h3>
                  <p className={styles.body}>{i.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className={`${styles.wrap} ${styles.narrow} ${styles.section}`}>
          <h2 className={styles.h2}>Any last questions?</h2>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.acc}>
              <summary>
                {f.q}
                <Icon name="chevron-down" size={20} strokeWidth={2.5} />
              </summary>
              <div className={styles.accBody}>
                <p className={styles.body}>{f.a}</p>
              </div>
            </details>
          ))}
        </section>

        {/* ---------- reviews ---------- */}
        <section className={`${styles.wrap} ${styles.narrow} ${styles.section}`} id="reviews">
          <h2 className={styles.h2}>What people are saying</h2>
          <div className={styles.ratingRow} style={{ marginBottom: "1.5rem" }}>
            <Stars size={20} />
            <span className={styles.ratingScore}>{RATING.score} out of 5</span>
            <span className={styles.meta}>{RATING.count.toLocaleString("en-US")} reviews</span>
          </div>
          {REVIEWS.map((r) => (
            <article key={r.name} className={styles.reviewCard}>
              <div className={styles.reviewHead}>
                <Stars size={15} />
                <span className={styles.reviewWho}>{r.name}</span>
                <span className={styles.verified}>Verified buyer</span>
                <span className={styles.meta}>{r.when}</span>
              </div>
              <h3 className={styles.h3}>{r.title}</h3>
              <p className={styles.body}>{r.body}</p>
            </article>
          ))}
          <p className={styles.meta} style={{ marginTop: "1.5rem" }}>
            Customer results have not been independently verified. Individual results vary.
          </p>
        </section>

        {/* ---------- closing cta ---------- */}
        <section className={`${styles.wrap} ${styles.narrow} ${styles.section} ${styles.centre}`}>
          <h2 className={styles.h2}>Four gummies. Once a day. That is the whole thing.</h2>
          <p className={styles.lede} style={{ marginBottom: "1.5rem" }}>
            Half off your first box, free shipping, and you can stop whenever you like.
          </p>
          <Button fullWidth variant="accent" size="lg" onClick={toBuy}>Start with half off</Button>
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
          <p className={styles.footerMark} aria-hidden="true">Daily Reds</p>
        </div>
      </footer>

      <div className={`${styles.sticky} ${stuck ? styles.stickyOn : ""}`}>
        <div className={`${styles.wrap} ${styles.stickyInner}`}>
          <Image src={PRODUCT.image} alt="" aria-hidden="true" width={120} height={120} className={styles.stickyShot} />
          <span className={styles.stickyText}>
            <span className={styles.stickyTitle}>50% off first box</span>
            <span className={styles.stickyTerms}>then from ${PLANS[PLANS.length - 1].price}</span>
          </span>
          <Button variant="accent" size="md" onClick={toBuy}>Buy now</Button>
        </div>
      </div>

      {factsOpen && <NutritionLabel onClose={() => setFactsOpen(false)} />}
    </div>
  );
}
