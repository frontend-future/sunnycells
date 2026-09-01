"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import {
  DISCLAIMER, HERO, OFFER, REASONS, REVIEWS, REVIEWS_TITLE,
} from "@/lib/content/revitalize-ten";
import { CAROUSEL as GALLERY, CART_ID, FACTS, PLANS, PRODUCT, SUPPORT_EMAIL, type Plan } from "@/lib/products/revitalize";
import styles from "./revitalize-ten.module.css";

const CHECKOUT = "/products/revitalize/checkout";
const LABEL_SLIDE = "/product/revitalize/carousel/03-inside.webp";
const LABEL_ALT =
  "The Revitalize supplement facts panel with every ingredient and the job it does";

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
  /* The advertorial sells one thing at one price. The ladder lives on the product
     page, where choosing a supply is the job. */
  const chosen: Plan = PLANS[0];
  const [open, setOpen] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);
  const [shot, setShot] = useState(0);
  const [labelOpen, setLabelOpen] = useState(false);
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

  useEffect(() => {
    if (!labelOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLabelOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [labelOpen]);

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

      <main>
        {/* ---------- hero ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.ratingLine}>
            <Stars size={15} />
            <strong>{HERO.rating}</strong> {HERO.count}
          </p>
          <h1 className={styles.h1}>
            {HERO.titleLead}
            <span className={styles.underline}>{HERO.titleUnderline}</span>
            {HERO.titleRest}
          </h1>
          <p className={styles.sub}>{HERO.sub}</p>
          <Image src={HERO.photo} alt={HERO.alt} width={900} height={1200} priority className={styles.heroShot} />
        </section>

        {/* ---------- the ten ---------- */}
        <section className={styles.wrap} ref={startRef}>
          {REASONS.map((r) => (
            <article key={r.n} className={styles.reason}>
              <Image src={r.photo} alt={r.alt} width={720} height={960}
                className={`${styles.reasonShot} ${r.fit === "contain" ? styles.reasonFit : ""}`} />
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
        </section>

        {/* ---------- offer ---------- */}
        <div className={styles.rule} aria-hidden="true" />
        <section className={`${styles.wrap} ${styles.section}`} id="offer" ref={offerRef}>
          <div className={styles.offerGrid}>
            <div className={styles.offerGallery}>
              <Image
                src={GALLERY[shot].src}
                alt={GALLERY[shot].alt}
                width={1200}
                height={1200}
                className={styles.offerShot}
              />
              <button type="button" className={`${styles.gBtn} ${styles.gPrev}`} aria-label="Previous image"
                onClick={() => setShot((i) => (i - 1 + GALLERY.length) % GALLERY.length)}>
                <Icon name="chevron-left" size={26} strokeWidth={2.5} />
              </button>
              <button type="button" className={`${styles.gBtn} ${styles.gNext}`} aria-label="Next image"
                onClick={() => setShot((i) => (i + 1) % GALLERY.length)}>
                <Icon name="chevron-right" size={26} strokeWidth={2.5} />
              </button>
              <div className={styles.gThumbs}>
                {GALLERY.map((g, i) => (
                  <button key={g.src} type="button" onClick={() => setShot(i)}
                    aria-label={g.alt} aria-current={i === shot}
                    className={`${styles.gThumb} ${i === shot ? styles.gThumbOn : ""}`}>
                    <Image src={g.src} alt="" aria-hidden="true" width={160} height={160} />
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.offerCard}>
              <h2 className={styles.offerTitle}>{OFFER.title}</h2>

              <div className={styles.priceRow}>
                <span className={styles.priceNow}>${chosen.price * chosen.months}</span>
                <span className={styles.priceWas}>${chosen.compareAt * chosen.months}</span>
                <span className={styles.offPill}>50% OFF TODAY</span>
              </div>

              <ul className={styles.bullets}>
                {OFFER.bullets.map((b) => (
                  <li key={b.lead}>
                    <span className={styles.tick} aria-hidden="true">
                      <Icon name="check" size={13} strokeWidth={3.5} />
                    </span>
                    <span>
                      <strong className={styles.bulletLead}>{b.lead}</strong>
                      {b.rest}
                    </span>
                  </li>
                ))}
              </ul>

              <p className={styles.servings}>{OFFER.servings}</p>


              <Button fullWidth variant="accent" size="lg" onClick={buy}>{OFFER.cta}</Button>

              <p className={styles.autoApplied}>
                <span className={styles.autoTick} aria-hidden="true">
                  <Icon name="check" size={13} strokeWidth={3.5} />
                </span>
                50% Off Auto-Applied Today!
              </p>
              <p className={styles.terms}>
                Free Shipping | {chosen.sub} | Cancel Anytime
              </p>

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
                    {on && (
                      <div className={styles.accBody}>
                        <p style={{ margin: 0 }}>{a.body}</p>
                        {"table" in a && a.table && (
                          <dl className={styles.ingTable}>
                            {FACTS.rows.map((r) => (
                              <div key={r.name} className={styles.ingRow}>
                                <dt style={{ paddingLeft: "indent" in r ? `${r.indent * 0.75}rem` : undefined }}>{r.name}</dt>
                                <dd>{r.amount}</dd>
                                <dd className={styles.ingDv}>{r.dv}</dd>
                              </div>
                            ))}
                          </dl>
                        )}
                      </div>
                    )}
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

      {/* The label, full size. Escape and the backdrop both close it. */}
      {labelOpen && (
        <div className={styles.modalWrap} role="dialog" aria-modal="true" aria-label="Full ingredient list"
          onClick={() => setLabelOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.modalClose} onClick={() => setLabelOpen(false)} aria-label="Close">
              <Icon name="x" size={22} strokeWidth={2.5} />
            </button>
            <Image src={LABEL_SLIDE} alt={LABEL_ALT} width={1080} height={1080} className={styles.modalShot} />
          </div>
        </div>
      )}

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
