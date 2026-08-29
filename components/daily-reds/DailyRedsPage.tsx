"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon, type IconName } from "@/components/core/Icon";
import { OfferFlag } from "@/components/core/OfferFlag";
import { Wordmark } from "@/components/core/Wordmark";
import { writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import {
  AVATARS, BUYBOX, CAROUSEL, CART_ID, COMPARE, DISCLAIMER, FAQ, FINISH, GALLERY, GAP,
  GAP_SECOND, HERO, INCLUDED, INSIDE, MISSING, PLANS, PRODUCT, QUOTE, RATING,
  orderLine, REVIEWS, TESTING, COST, TRUST, type Plan,
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
  const [slide, setSlide] = useState(0);
  const [stuck, setStuck] = useState(false);
  /* Set after mount, not during render. The server has no idea what day it is where
     the reader is, so rendering the date on both sides is a hydration mismatch. */
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const buyRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  /* The bar appears once the buy block has scrolled past and hides again whenever it is
     back on screen, so it never covers the thing it points at. */
  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current?.getBoundingClientRect();
      const buy = buyRef.current?.getBoundingClientRect();
      const pastHero = !!hero && hero.bottom < 0;
      const buyVisible = !!buy && buy.top < window.innerHeight && buy.bottom > 0;
      setStuck(pastHero && !buyVisible);
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
          <Button variant="accent" size="sm" onClick={toBuy}>Try now</Button>
        </div>
      </header>

      <main>
        {/* ---------- hero. Light: it introduces and points down, it does not sell. ---------- */}
        <section className={`${styles.wrap} ${styles.section}`} ref={heroRef}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 className={styles.h1}>
                {HERO.title} <span className={styles.accent}>{HERO.titleAccent}</span>
              </h1>

              <div className={styles.proofRow}>
                <span className={styles.avatars} aria-hidden="true">
                  {AVATARS.map((a) => (
                    <Image key={a} src={a} alt="" width={160} height={160} className={styles.avatar} />
                  ))}
                </span>
                <Stars />
                <span className={styles.ratingScore}>{RATING.score}/5</span>
                <span className={styles.meta}>{RATING.count.toLocaleString("en-US")} reviews</span>
              </div>

              <p className={styles.lede}>{HERO.lede}</p>

              <ul className={styles.points}>
                {HERO.points.map((p) => <li key={p}><Tick />{p}</li>)}
              </ul>

              <Button fullWidth variant="accent" size="lg" onClick={toBuy}>Try now and save 50%</Button>
              <p className={styles.termsLine}>
                Try it risk free for 30 days. Free shipping, and you can cancel in two clicks.
              </p>
            </div>

            <div>
              <Image
                src={PRODUCT.image}
                alt="The Daily Reds box with a single daily pack leaning against it"
                width={1200}
                height={1200}
                className={styles.heroShot}
                priority
              />
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

        {/* ---------- what the habit costs. High on the page, because a reader who does not
            eat fruit has not filed it as a problem yet. Symptoms here, the nutrients
            behind them a section later. ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>{COST.title}</h2>
          <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "40rem", margin: "0 auto 2.5rem" }}>
            {COST.lede}
          </p>
          <div className={styles.quadWrap}>
            <div className={styles.quadCol}>
              {COST.quadrants.slice(0, 2).map((q) => (
                <div key={q.title} className={styles.quad}>
                  <span className={styles.quadIcon} aria-hidden="true">
                    <Icon name={q.icon as IconName} size={22} strokeWidth={2.2} />
                  </span>
                  <h3 className={styles.h3}>{q.title}</h3>
                  <p className={styles.body}>{q.body}</p>
                </div>
              ))}
            </div>
            <Image src={COST.image} alt={COST.alt} width={900} height={900} className={styles.quadShot} />
            <div className={`${styles.quadCol} ${styles.quadColRight}`}>
              {COST.quadrants.slice(2).map((q) => (
                <div key={q.title} className={styles.quad}>
                  <span className={styles.quadIcon} aria-hidden="true">
                    <Icon name={q.icon as IconName} size={22} strokeWidth={2.2} />
                  </span>
                  <h3 className={styles.h3}>{q.title}</h3>
                  <p className={styles.body}>{q.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- testimonial carousel ---------- */}
        <section className={styles.carousel} aria-label="What customers say">
          <div className={`${styles.wrap} ${styles.carouselInner}`}>
            <blockquote className={styles.carouselQuote}>
              &ldquo;{CAROUSEL[slide].quote}&rdquo;
            </blockquote>
            <div className={styles.carouselWho}>
              <Image src={CAROUSEL[slide].photo} alt="" aria-hidden="true" width={160} height={160} className={styles.carouselShot} />
              <span>
                <Stars size={15} />
                <span className={styles.reviewWho} style={{ display: "block" }}>{CAROUSEL[slide].name}</span>
              </span>
            </div>
            <div className={styles.carouselNav}>
              <button type="button" className={styles.carouselBtn} aria-label="Previous review"
                onClick={() => setSlide((s) => (s - 1 + CAROUSEL.length) % CAROUSEL.length)}>
                <Icon name="chevron-left" size={22} strokeWidth={2.5} />
              </button>
              <span className={styles.dots}>
                {CAROUSEL.map((c, i) => (
                  <button key={c.name} type="button" onClick={() => setSlide(i)}
                    aria-label={`Review ${i + 1} of ${CAROUSEL.length}`} aria-current={i === slide}
                    className={`${styles.dot} ${i === slide ? styles.dotOn : ""}`} />
                ))}
              </span>
              <button type="button" className={styles.carouselBtn} aria-label="Next review"
                onClick={() => setSlide((s) => (s + 1) % CAROUSEL.length)}>
                <Icon name="chevron-right" size={22} strokeWidth={2.5} />
              </button>
            </div>
            <p className={styles.meta} style={{ marginTop: "0.75rem" }}>
              Customer results have not been independently verified. Individual results vary.
            </p>
          </div>
        </section>

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
                <div className={styles.statSplit}>
                  <div>
                    <p className={styles.figure} style={{ fontSize: "3.5rem" }}>{GAP_SECOND.figure}</p>
                    <h3 className={styles.h3}>{GAP_SECOND.title}</h3>
                  </div>
                  <div>
                    <p className={styles.body}>{GAP_SECOND.body}</p>
                    <p className={styles.meta} style={{ marginTop: "0.75rem" }}>{GAP_SECOND.source}</p>
                  </div>
                </div>
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

        {/* ---------- testing ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <h2 className={`${styles.h2} ${styles.centre}`}>{TESTING.title}</h2>
            <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "42rem", margin: "0 auto 2rem" }}>
              {TESTING.lede}
            </p>
            <div className={styles.testGrid}>
              {TESTING.items.map((t) => (
                <div key={t.title} className={styles.card}>
                  <h3 className={styles.h3}>{t.title}</h3>
                  <p className={styles.body}>{t.body}</p>
                </div>
              ))}
            </div>
            <p className={`${styles.meta} ${styles.centre}`} style={{ marginTop: "1.25rem" }}>{TESTING.note}</p>
          </div>
        </section>

        {/* ---------- buy box. Sits after the education, the way the reference does. ---------- */}
        <section className={`${styles.wrap} ${styles.section}`} id="buy">
          <div className={styles.buyGrid} ref={buyRef}>
            <div className={styles.gallery}>
              <Image
                src={GALLERY[shot].src}
                alt={GALLERY[shot].alt}
                width={1200}
                height={1200}
                className={styles.galleryMain}
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
              {/* Reserves its own height so the date landing after mount does not
                  shove the buy box down the page. */}
              <p className={styles.orderNote}>
                <Icon name="truck" size={19} strokeWidth={2.4} />
                <span>{now ? orderLine(now, chosen) : "\u00a0"}</span>
              </p>

              <div className={styles.ratingRow}>
                <Stars size={17} />
                <span className={styles.ratingScore}>{RATING.score}/5</span>
                <span className={styles.meta}>
                  {RATING.count.toLocaleString("en-US")} reviews
                </span>
              </div>

              <h2 className={styles.h2}>{PRODUCT.name}</h2>
              <p className={styles.lede}>{BUYBOX.lede}</p>

              <ul className={styles.points}>
                {BUYBOX.points.map((b) => <li key={b}><Tick />{b}</li>)}
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

              <Button fullWidth variant="accent" size="lg" onClick={buy}>Try now</Button>
              {/* The standing term restated at the point of decision. Cadence is read off
                  the selected plan, so this cannot say monthly under a 6 month supply. */}
              <p className={styles.autoApplied}>
                <span className={styles.autoTick} aria-hidden="true">
                  <Icon name="check" size={13} strokeWidth={3.5} />
                </span>
                50% off auto-applied today
              </p>
              <p className={`${styles.termsLine} ${styles.ctaTerms}`}>
                Free shipping &nbsp;|&nbsp; {chosen.sub} &nbsp;|&nbsp; Cancel anytime
              </p>
              <p className={`${styles.termsLine} ${styles.ctaTerms}`}>
                30 day money back guarantee, and you can skip or cancel in two clicks.
              </p>
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
          <Button fullWidth variant="accent" size="lg" onClick={toBuy}>Try now and save 50%</Button>
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
          <Button variant="accent" size="md" onClick={toBuy}>Try now</Button>
        </div>
      </div>

      {factsOpen && <NutritionLabel onClose={() => setFactsOpen(false)} />}
    </div>
  );
}
