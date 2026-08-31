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
  CART_ID, COST, DISCLAIMER, FACTS, FAQ, FINISH, GALLERY, HERO, INCLUDED, INSIDE,
  orderLine, PILLARS, PLANS, PRODUCT, QUOTE, RATING, REVIEWS, STATS, SUPPORT_EMAIL,
  TESTING, TRUST, type Plan,
} from "@/lib/products/revitalize";
import { TIMELINE as TL } from "@/lib/content/revitalize";
import { NutritionLabel } from "./NutritionLabel";
import { CortisolCurve, DoseBars, EffectGrid, FixList, StudyCards, Timeline } from "./Visuals";
import styles from "./revitalize.module.css";

const CHECKOUT = "/products/revitalize/checkout";

function Stars({ size = 17 }: { size?: number }) {
  return (
    <span className={styles.stars} aria-hidden="true">
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

export function RevitalizePage() {
  const router = useRouter();
  const [chosen, setChosen] = useState<Plan>(PLANS.find((p) => p.best) ?? PLANS[0]);
  const [shot, setShot] = useState(0);
  const [factsOpen, setFactsOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  /* Set after mount. The server does not know what day it is where the reader is. */
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const heroRef = useRef<HTMLDivElement | null>(null);
  const buyRef = useRef<HTMLDivElement | null>(null);

  /* The sticky bar appears once the hero is gone and hides again while the buy box is
     on screen, so it never sits over the thing it is pointing at. */
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

  const toBuy = () => document.getElementById("buy")?.scrollIntoView({ behavior: "smooth" });

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
      {/* No countdown and no code. It is a standing term, so nothing here expires. */}
      <div className={styles.promo}>
        <div className={`${styles.wrap} ${styles.promoInner}`}>
          <span>50% off your first order</span>
          <span aria-hidden="true">&middot;</span>
          <span>No code needed</span>
          <span aria-hidden="true">&middot;</span>
          <span>Free shipping</span>
        </div>
      </div>

      <header className={styles.masthead}>
        <div className={`${styles.wrap} ${styles.mastheadInner}`}>
          <Link href="/" aria-label="SUNNYCELLS home">
            <Wordmark size={22} />
          </Link>
          <Button variant="accent" size="sm" onClick={toBuy}>Try now</Button>
        </div>
      </header>

      <main>
        {/* ---------- hero. Light: it introduces and points down, it does not sell. ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.heroGrid} ref={heroRef}>
            <div className={styles.heroCopy}>
              <h1 className={styles.h1}>
                {HERO.title} <span className={styles.accent}>{HERO.titleAccent}</span>
              </h1>

              <div className={styles.ratingRow}>
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
                src={HERO.photo}
                alt="A pouch of Revitalize on a marble counter beside a coffee brewer and a bowl of limes"
                width={1200} height={1200} priority className={styles.heroShot}
              />
            </div>
          </div>
        </section>

        {/* ---------- trust strip ---------- */}
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

        {/* ---------- the curve, drawn ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>This is the hormone doing it</h2>
          <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "42rem", margin: "0 auto 2rem" }}>
            Cortisol peaks half an hour after you wake and should fall all day. Chronic job
            strain raises the peak and flattens the fall, so you never come down.
          </p>
          <CortisolCurve />
        </section>

        {/* ---------- what it costs, and what meets it ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>{COST.title}</h2>
          <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "42rem", margin: "0 auto 2.5rem" }}>
            {COST.lede}
          </p>
          <EffectGrid />
        </section>

        {/* ---------- the fix, compact ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>What in the pack meets each one</h2>
          <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "42rem", margin: "0 auto 2.5rem" }}>
            The dose against the effect, and how good the evidence is, on one line each.
          </p>
          <FixList />
        </section>

        {/* ---------- future pacing ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <p className={styles.label} style={{ textAlign: "center" }}>{TL.eyebrow}</p>
            <h2 className={`${styles.h2} ${styles.centre}`}>{TL.title}</h2>
            <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "40rem", margin: "0 auto 2.5rem" }}>
              {TL.lede}
            </p>
            <Timeline />
            <p className={styles.source} style={{ maxWidth: "42rem", margin: "1.75rem auto 0", textAlign: "center" }}>
              {TL.foot}
            </p>
          </div>
        </section>

        {/* ---------- the evidence ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <h2 className={`${styles.h2} ${styles.centre}`}>The research this rests on</h2>
            <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "42rem", margin: "0 auto 2.5rem" }}>
              Design and sample size on the front of every card, so you can weigh them
              rather than take our word for it.
            </p>
            <StudyCards />
          </div>
        </section>

        {/* ---------- the three jobs ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>{PILLARS.title}</h2>
          <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "40rem", margin: "0 auto 2.5rem" }}>
            {PILLARS.lede}
          </p>
          {PILLARS.items.map((p, i) => (
            <div key={p.key} className={`${styles.pillar} ${i % 2 ? styles.pillarFlip : ""}`}>
              <Image src={p.photo} alt={p.alt} width={1000} height={1000} className={styles.pillarShot} />
              <div>
                <h3 className={styles.h3}>{p.name}</h3>
                <p className={styles.doseLine}>{p.dose}</p>
                <p className={styles.body}>{p.copy}</p>
                <p className={styles.label}>{p.ticksLabel}</p>
                <ul className={styles.points}>
                  {p.ticks.map((t) => <li key={t}><Tick />{t}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </section>

        {/* ---------- the two sourced figures ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={`${styles.cols} ${styles.cols2}`}>
              {STATS.map((s) => (
                <div key={s.figure}>
                  <p className={styles.figure}>{s.figure}</p>
                  <h3 className={styles.h3}>{s.title}</h3>
                  <p className={styles.body}>{s.body}</p>
                  <p className={styles.source}>{s.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- why this one gets finished ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>{FINISH.title}</h2>
          <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "42rem", margin: "0 auto 2.5rem" }}>
            {FINISH.lede}
          </p>
          <div className={`${styles.cols} ${styles.cols3}`}>
            {FINISH.steps.map((s, i) => (
              <div key={s.title}>
                <Image src={s.image} alt={s.alt} width={800} height={800} className={styles.stepShot} />
                <h3 className={styles.h3}>{i + 1}. {s.title}</h3>
                <p className={styles.body}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- what is in it ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>{INSIDE.title}</h2>
          <div className={`${styles.cols} ${styles.cols2}`}>
            {INSIDE.groups.map((g) => (
              <div key={g.title} className={styles.card}>
                <h3 className={styles.h3}>{g.title}</h3>
                <p className={styles.body}>{g.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "2.5rem" }}>
            <p className={styles.label}>One sachet, against the daily value</p>
            <DoseBars />
          </div>
          <p className={styles.centre} style={{ marginTop: "2rem" }}>
            <button type="button" className={styles.factsLink} onClick={() => setFactsOpen(true)}>
              View the full nutrition label
              <Icon name="chevron-right" size={18} strokeWidth={2.5} />
            </button>
          </p>
        </section>

        {/* ---------- testing ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <h2 className={styles.h2}>{TESTING.title}</h2>
            <p className={styles.lede} style={{ maxWidth: "42rem" }}>{TESTING.lede}</p>
            <div className={`${styles.cols} ${styles.cols4}`} style={{ marginTop: "2rem" }}>
              {TESTING.items.map((t) => (
                <div key={t.title}>
                  <h3 className={styles.h3}>{t.title}</h3>
                  <p className={styles.body}>{t.body}</p>
                </div>
              ))}
            </div>
            <p className={styles.source} style={{ marginTop: "1.5rem" }}>{TESTING.note}</p>
          </div>
        </section>

        {/* ---------- buy box. After the education, the way SC-24 does it. ---------- */}
        <section className={`${styles.wrap} ${styles.section}`} id="buy">
          <div className={styles.buyGrid} ref={buyRef}>
            <div className={styles.gallery}>
              <Image src={GALLERY[shot].src} alt={GALLERY[shot].alt} width={1200} height={1200} className={styles.galleryMain} />
              <div className={styles.thumbs}>
                {GALLERY.map((g, i) => (
                  <button key={g.src} type="button" onClick={() => setShot(i)} aria-label={g.alt} aria-current={i === shot}
                    className={`${styles.thumb} ${i === shot ? styles.thumbOn : ""}`}
                    style={{ backgroundImage: `url(${g.src})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                ))}
              </div>
            </div>

            <div className={styles.buyCard}>
              <p className={styles.orderNote}>
                <Icon name="truck" size={19} strokeWidth={2.4} />
                <span>{now ? orderLine(now) : " "}</span>
              </p>

              <a className={styles.ratingRow} href="#reviews">
                <Stars size={17} />
                <span className={styles.ratingScore}>
                  {RATING.score.toFixed(1)}/5.0 ({RATING.count.toLocaleString("en-US")})
                </span>
              </a>

              <h2 className={styles.h2}>{PRODUCT.name}</h2>
              <p className={styles.flavorLine}>
                {PRODUCT.flavor} &middot; {PRODUCT.servings} daily sachets &middot; {PRODUCT.perServing} a day
              </p>
              <p className={styles.lede}>
                One sachet a day for what cortisol burns through: vitamin C and magnesium
                for the stress response, 10 g of protein so 3pm is not a raid on the snack
                drawer, and the B vitamins your body runs energy metabolism on.
              </p>

              <ul className={styles.points}>
                <li><Tick />10 g of protein per sachet</li>
                <li><Tick />Magnesium glycinate and 100% DV vitamin C</li>
                <li><Tick />B1, B3 and B5 at 100% of the daily value</li>
                <li><Tick />65 calories, no added sugar, no stimulants</li>
              </ul>

              <p className={styles.freeFrom}>
                {FACTS.cleanChips.map((c) => <span key={c}>{c}</span>)}
              </p>

              <button type="button" className={styles.factsLink} onClick={() => setFactsOpen(true)}>
                View nutrition label
                <Icon name="chevron-right" size={18} strokeWidth={2.5} />
              </button>

              <div><OfferFlag size="sm" /></div>

              <div className={styles.priceRow}>
                <span className={styles.priceNow}>${chosen.price}</span>
                {chosen.months > 1 && <span className={styles.meta}>/pouch</span>}
                <span className={styles.priceWas}>${chosen.compareAt * chosen.months}</span>
                <span className={styles.savePill}>Save ${saving}</span>
              </div>

              <div className={styles.plans} role="radiogroup" aria-label="Choose your supply">
                {PLANS.map((p) => {
                  const on = p.id === chosen.id;
                  return (
                    <button key={p.id} type="button" role="radio" aria-checked={on}
                      onClick={() => setChosen(p)}
                      className={`${styles.plan} ${on ? styles.planOn : ""}`}>
                      <span className={styles.radio} aria-hidden="true">{on && <span />}</span>
                      <span>
                        <span className={styles.planName}>
                          {p.name}
                          {p.best && <span className={styles.planTag}>Most popular</span>}
                        </span>
                        <span className={styles.planSub}>{p.sub}</span>
                      </span>
                      <span className={styles.planPriceCol}>
                        <span className={styles.planPrice}>${p.price * p.months}</span>
                        <span className={styles.planWas}>was ${p.compareAt * p.months}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <Button fullWidth variant="accent" size="lg" onClick={buy}>Try now</Button>
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

        {/* ---------- quote ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <figure className={styles.quoteCard}>
              <Image src={QUOTE.photo} alt="" aria-hidden="true" width={400} height={400} className={styles.quoteShot} />
              <div>
                <Stars size={19} />
                <blockquote className={styles.quoteText}>&ldquo;{QUOTE.text}&rdquo;</blockquote>
                <figcaption className={styles.meta}>{QUOTE.name}, {QUOTE.meta}</figcaption>
              </div>
            </figure>
            <p className={styles.source} style={{ marginTop: "1rem" }}>
              Customer results have not been independently verified. Individual results vary.
            </p>
          </div>
        </section>

        {/* ---------- what turns up ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>What turns up</h2>
          <div className={`${styles.cols} ${styles.cols4}`}>
            {INCLUDED.map((i) => (
              <div key={i.label}>
                <p className={styles.statN}>{i.n}</p>
                <p className={styles.statLabel}>{i.label}</p>
                <p className={styles.body}>{i.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- faq ---------- */}
        <section className={`${styles.wrap} ${styles.narrow} ${styles.section}`}>
          <h2 className={styles.h2}>Any last questions?</h2>
          <div className={styles.faq}>
            {FAQ.map((f) => (
              <details key={f.q} className={styles.faqItem}>
                <summary className={styles.faqQ}>
                  {f.q}
                  <Icon name="chevron-down" size={22} strokeWidth={2.5} />
                </summary>
                <p className={styles.body}>{f.a}</p>
              </details>
            ))}
          </div>
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
            <article key={r.name} className={styles.review}>
              <div className={styles.reviewTop}>
                <span className={styles.reviewWho}>{r.name}</span>
                <span className={styles.verified}>Verified buyer</span>
                <span className={styles.meta}>{r.when}</span>
              </div>
              <h3 className={styles.h3}>{r.title}</h3>
              <p className={styles.body}>{r.body}</p>
            </article>
          ))}
          <p className={styles.source}>
            Customer results have not been independently verified. Individual results vary.
          </p>
        </section>

        {/* ---------- closing cta ---------- */}
        <section className={styles.closing}>
          <div className={`${styles.wrap} ${styles.narrow} ${styles.section}`}>
            <h2 className={styles.h2}>Your job spends it. Put it back.</h2>
            <p className={styles.lede}>
              Four gummies, once a day. Half off your first pouch, free shipping, and you
              can stop whenever you like.
            </p>
            <Button fullWidth variant="accent" size="lg" onClick={toBuy}>Try now and save 50%</Button>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.legal}>{DISCLAIMER}</p>
          <nav className={styles.footNav}>
            <Link href="/">Home</Link>
            <Link href="/products/daily-reds">Daily Reds</Link>
            <Link href={CHECKOUT}>Order</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </nav>
          <p style={{ textAlign: "center" }}>&copy; 2026 SUNNYCELLS</p>
          <p className={styles.footerMark} aria-hidden="true">Revitalize</p>
        </div>
      </footer>

      <div className={`${styles.sticky} ${stuck ? styles.stickyOn : ""}`}>
        <div className={`${styles.wrap} ${styles.stickyInner}`}>
          <Image src={PRODUCT.image} alt="" aria-hidden="true" width={120} height={120} className={styles.stickyShot} />
          <span className={styles.stickyText}>
            <span className={styles.stickyTitle}>50% off first pouch</span>
            <span className={styles.stickyTerms}>Free shipping &middot; Cancel anytime</span>
          </span>
          <Button variant="accent" size="md" onClick={toBuy}>Try now</Button>
        </div>
      </div>

      {factsOpen && <NutritionLabel onClose={() => setFactsOpen(false)} />}
    </div>
  );
}
