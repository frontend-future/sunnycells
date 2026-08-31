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
  DISCLAIMER, HERO, OFFER, REASONS, REVIEWS, REVIEWS_TITLE,
} from "@/lib/content/revitalize-ten";
import { CART_ID, PLANS, PRODUCT, SUPPORT_EMAIL, type Plan } from "@/lib/products/revitalize";
import styles from "./revitalize-ten.module.css";

const CHECKOUT = "/products/revitalize/checkout";

function Stars({ size = 16 }: { size?: number }) {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" size={size} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function RevitalizeTenPage() {
  const router = useRouter();
  const [chosen, setChosen] = useState<Plan>(PLANS.find((p) => p.best) ?? PLANS[0]);
  const [open, setOpen] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const startRef = useRef<HTMLDivElement | null>(null);
  const offerRef = useRef<HTMLDivElement | null>(null);

  /* The bar waits for reason three, so the reader has had a run at the argument before
     anything is asked of them, and hides again over the offer. */
  useEffect(() => {
    const onScroll = () => {
      const start = startRef.current?.getBoundingClientRect();
      const offer = offerRef.current?.getBoundingClientRect();
      const reached = !!start && start.top < window.innerHeight * 0.6;
      const offerVisible = !!offer && offer.top < window.innerHeight && offer.bottom > 0;
      setStuck(reached && !offerVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toOffer = () => document.getElementById("offer")?.scrollIntoView({ behavior: "smooth" });

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
      <header className={styles.masthead}>
        <div className={`${styles.wrap} ${styles.mastheadInner}`}>
          <Link href="/" aria-label="SUNNYCELLS home">
            <Wordmark size={20} tone="inverse" />
          </Link>
          <span className={styles.tag}>Advertisement</span>
        </div>
      </header>

      <main>
        {/* ---------- hero ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.ratingLine}>
            <Stars size={15} />
            <strong>{HERO.rating}</strong> {HERO.count}
          </p>
          <h1 className={styles.h1}>{HERO.title}</h1>
          <p className={styles.sub}>{HERO.sub}</p>
          <Image src={HERO.photo} alt={HERO.alt} width={1200} height={1200} priority className={styles.heroShot} />
        </section>

        {/* ---------- the ten ---------- */}
        <section className={styles.wrap} ref={startRef}>
          {REASONS.map((r) => (
            <article key={r.n} className={styles.reason}>
              <Image src={r.photo} alt={r.alt} width={720} height={960} className={styles.reasonShot} />
              <div className={styles.reasonBody}>
                <h2 className={styles.h2}>{r.n}. {r.title}</h2>
                <p className={styles.body}>{r.body}</p>
              </div>
            </article>
          ))}
        </section>

        {/* ---------- reviews ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2Centre}>{REVIEWS_TITLE}</h2>
          <div className={styles.reviewGrid}>
            {REVIEWS.map((r) => (
              <article key={r.name} className={styles.reviewCard}>
                <Image src={r.photo} alt="" aria-hidden="true" width={600} height={600} className={styles.reviewShot} />
                <div className={styles.reviewText}>
                  <Stars size={14} />
                  <p className={styles.reviewHead}>&ldquo;{r.headline}&rdquo;</p>
                  <p className={styles.reviewBody}>&ldquo;{r.body}&rdquo;</p>
                  <p className={styles.reviewWho}>{r.name}</p>
                  <p className={styles.reviewPlace}>{r.place}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.smallPrint}>
            Customer results have not been independently verified. Individual results vary.
          </p>
        </section>

        {/* ---------- offer ---------- */}
        <div className={styles.rule} aria-hidden="true" />
        <section className={`${styles.wrap} ${styles.section}`} id="offer" ref={offerRef}>
          <div className={styles.offerGrid}>
            <Image src={PRODUCT.image} alt="" aria-hidden="true" width={1200} height={1200} className={styles.offerShot} />
            <div className={styles.offerCard}>
              <p className={styles.ratingLine} style={{ textAlign: "left", marginBottom: "0.75rem" }}>
                <Stars size={15} />
                {OFFER.customers}
              </p>
              <h2 className={styles.offerTitle}>{OFFER.title}</h2>

              <div className={styles.priceRow}>
                <span className={styles.priceWas}>${chosen.compareAt * chosen.months}</span>
                <span className={styles.priceNow}>${chosen.price * chosen.months}</span>
                <span className={styles.savePill}>Save ${saving}</span>
              </div>

              <ul className={styles.bullets}>
                {OFFER.bullets.map((b) => (
                  <li key={b}>
                    <span className={styles.tick} aria-hidden="true">
                      <Icon name="check" size={13} strokeWidth={3.5} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className={styles.plans} role="radiogroup" aria-label="Choose your supply">
                {PLANS.map((p) => {
                  const on = p.id === chosen.id;
                  return (
                    <button key={p.id} type="button" role="radio" aria-checked={on}
                      onClick={() => setChosen(p)} className={`${styles.plan} ${on ? styles.planOn : ""}`}>
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

              <p className={styles.servings}>{OFFER.servings}</p>
              <p className={styles.cadence}>{chosen.sub}. Pause, skip, or cancel anytime.</p>

              <Button fullWidth variant="accent" size="lg" onClick={buy}>{OFFER.cta}</Button>

              <div className={styles.offerFlagRow}>
                <OfferFlag size="sm" />
                <span className={styles.terms}>Free shipping &middot; 30 day money back</span>
              </div>

              <div className={styles.benefits}>
                <h3 className={styles.benefitsTitle}>{OFFER.benefitsTitle}</h3>
                <ul>
                  {OFFER.benefits.map((b) => (
                    <li key={b}>
                      <span className={styles.benefitTick} aria-hidden="true">
                        <Icon name="check" size={13} strokeWidth={3.5} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {OFFER.accordions.map((a) => {
                const on = open === a.title;
                return (
                  <div key={a.title} className={styles.acc}>
                    <button type="button" className={styles.accHead} aria-expanded={on}
                      onClick={() => setOpen(on ? null : a.title)}>
                      {a.title}
                      <Icon name={on ? "minus" : "plus"} size={20} strokeWidth={2.4} />
                    </button>
                    {on && <p className={styles.accBody}>{a.body}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.disclosure}>
            This page is an advertisement for a SUNNYCELLS product and we are paid when
            you buy.
          </p>
          <p className={styles.smallPrint}>{DISCLAIMER}</p>
          <nav className={styles.footNav}>
            <Link href="/">Home</Link>
            <Link href="/products/revitalize">Revitalize</Link>
            <Link href="/revitalize/3pm-crash">The full story</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </nav>
          <p style={{ textAlign: "center" }}>&copy; 2026 SUNNYCELLS</p>
        </div>
      </footer>

      <div className={`${styles.sticky} ${stuck ? styles.stickyOn : ""}`}>
        <div className={`${styles.wrap} ${styles.stickyInner}`}>
          <Image src={PRODUCT.image} alt="" aria-hidden="true" width={120} height={120} className={styles.stickyShot} />
          <span className={styles.stickyText}>
            <span className={styles.stickyTitle}>50% off first pouch</span>
            <span className={styles.stickyTerms}>Free shipping &middot; Cancel anytime</span>
          </span>
          <Button variant="accent" size="md" onClick={toOffer}>Try now</Button>
        </div>
      </div>
    </div>
  );
}
