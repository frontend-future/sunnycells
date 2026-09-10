"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { DISCLAIMER, GALLERY, HERO, OFFER, OPENERS, REASONS, TRUST } from "@/lib/content/calm-melatonin-7-reasons";
import { CART_ID, discountPct, FACTS, PRODUCT, supplyPlanById } from "@/lib/products/anytime-calm";
import styles from "./calm-6-reasons.module.css";

/* Cloned from CalmSixReasonsPage. Same layout, same styles module, same checkout the
   /quiz/calm funnel already uses for this product: one cart id, one checkout route, no
   second one built for this page. Only the content import differs. */
const CHECKOUT = "/quiz/calm/results/checkout";

export function CalmMelatoninReasonsPage() {
  const router = useRouter();
  /* The advertorial sells one thing at one price, the 1 month supply: $25, $50
     struck through. Choosing a longer supply is the plans page's job. */
  const chosen = supplyPlanById("c1");
  const [open, setOpen] = useState<string | null>(null);
  const [shot, setShot] = useState(0);
  const [pastReason3, setPastReason3] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);
  const thirdReasonRef = useRef<HTMLElement | null>(null);
  const offerRef = useRef<HTMLElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  /* Sticky bar appears once reason 3 has scrolled into view, and stays eligible: a
     one-way reveal, not a toggle that hides again further down the page. */
  useEffect(() => {
    const el = thirdReasonRef.current;
    if (!el) return;
    const watch = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPastReason3(true); watch.disconnect(); } },
      { threshold: 0 },
    );
    watch.observe(el);
    return () => watch.disconnect();
  }, []);

  /* But it steps aside whenever the offer section itself is on screen: the sticky
     bar's whole job is to carry someone down to that section, so once they're there
     it would only sit on top of the real buy button. This one does toggle both ways. */
  useEffect(() => {
    const el = offerRef.current;
    if (!el) return;
    const watch = new IntersectionObserver(
      ([entry]) => setOfferVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    watch.observe(el);
    return () => watch.disconnect();
  }, []);

  const stickyOn = pastReason3 && !offerVisible;

  /* The sticky bar's own CTA does not jump straight to checkout: it carries the
     reader down to the offer section, where the real buy button and the plan details
     they're about to pay for both sit. */
  const scrollToOffer = () => {
    document.getElementById("offer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buy = () => {
    writeAnswer(CART_ID, "plan", chosen.id);
    /* So the purchase-attempt notification can say which listicle sent them. */
    writeAnswer(CART_ID, "lander", "melatonin");
    trackMetaEvent("InitiateCheckout", {
      currency: "USD",
      value: chosen.price * chosen.months,
      content_ids: [chosen.id],
      content_type: "product",
      content_name: `${PRODUCT.title} ${chosen.name}`,
    });
    router.push(CHECKOUT);
  };

  return (
    <div className={styles.page}>
      <AnnouncementMarquee
        terms={[
          { strong: "Free shipping", rest: "on all orders" },
          { strong: "50%", rest: "off your first order" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      <main>
        {/* ---------- hero ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h1 className={styles.h1}>
            {HERO.title.split(HERO.emphasis).map((part, i) => (
              <span key={i}>
                {part}
                {i === 0 && <span className={styles.circle}>{HERO.emphasis}</span>}
              </span>
            ))}
          </h1>
          <p className={styles.sub}>{HERO.sub}</p>
          <div className={styles.heroShot}>
            <Image src={HERO.image} alt={HERO.imageAlt} width={1920} height={1080} className={styles.reasonShot} />
          </div>
          <div className={styles.heroRule} aria-hidden="true" />
          <div className={styles.openers}>
            {OPENERS.map((p, i) => (
              <p key={p} className={i === OPENERS.length - 1 ? styles.bodyStrong : styles.body}>{p}</p>
            ))}
          </div>
        </section>

        {/* ---------- the seven ---------- */}
        <section className={styles.wrap}>
          {REASONS.map((r) => (
            <article key={r.n} ref={r.n === 3 ? thirdReasonRef : undefined} className={styles.reason}>
              <div className={styles.reasonFrame}>
                <Image src={r.photo} alt={r.alt} width={720} height={960} className={styles.reasonShot} />
              </div>
              <div className={styles.reasonBody}>
                <h2 className={styles.h2}>{r.n}. {r.title}</h2>
                <p className={styles.body}>{r.body}</p>
              </div>
            </article>
          ))}
        </section>

        {/* ---------- offer ---------- */}
        <div className={styles.rule} aria-hidden="true" />
        <section ref={offerRef} className={`${styles.wrap} ${styles.section}`} id="offer">
          <div className={styles.offerGrid}>
            <div className={styles.offerGallery}>
              <div className={styles.gStage}>
                <Image src={GALLERY[shot].src} alt={GALLERY[shot].alt} width={1200} height={1200} className={styles.offerShot} />
                <button type="button" className={`${styles.gBtn} ${styles.gPrev}`} aria-label="Previous image"
                  onClick={() => setShot((i) => (i - 1 + GALLERY.length) % GALLERY.length)}>
                  <Icon name="chevron-left" size={26} strokeWidth={2.5} />
                </button>
                <button type="button" className={`${styles.gBtn} ${styles.gNext}`} aria-label="Next image"
                  onClick={() => setShot((i) => (i + 1) % GALLERY.length)}>
                  <Icon name="chevron-right" size={26} strokeWidth={2.5} />
                </button>
              </div>
              <div className={styles.gThumbRow}>
                <button type="button" className={styles.gThumbNav} aria-label="Scroll thumbnails left"
                  onClick={() => thumbsRef.current?.scrollBy({ left: -thumbsRef.current.clientWidth * 0.8, behavior: "smooth" })}>
                  <Icon name="chevron-left" size={20} strokeWidth={2.5} />
                </button>
                <div className={styles.gThumbs} ref={thumbsRef}>
                  {GALLERY.map((g, i) => (
                    <button key={g.src} type="button" onClick={() => setShot(i)}
                      aria-label={g.alt} aria-current={i === shot}
                      className={`${styles.gThumb} ${i === shot ? styles.gThumbOn : ""}`}>
                      <Image src={g.src} alt="" aria-hidden="true" width={160} height={160} />
                    </button>
                  ))}
                </div>
                <button type="button" className={styles.gThumbNav} aria-label="Scroll thumbnails right"
                  onClick={() => thumbsRef.current?.scrollBy({ left: thumbsRef.current.clientWidth * 0.8, behavior: "smooth" })}>
                  <Icon name="chevron-right" size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className={styles.offerCard}>
              <h2 className={styles.offerTitle}>{OFFER.title}</h2>

              <div className={styles.priceRow}>
                <span className={styles.priceNow}>${chosen.price}</span>
                <span className={styles.priceWas}>${chosen.compareAt}</span>
                <span className={styles.offPill}>{discountPct(chosen)}% off today</span>
              </div>

              <ul className={styles.bullets}>
                {OFFER.bullets.map((b) => (
                  <li key={b.lead}>
                    <span className={styles.tick} aria-hidden="true"><Icon name="check" size={13} strokeWidth={3.5} /></span>
                    <span><strong className={styles.bulletLead}>{b.lead}</strong>{b.rest}</span>
                  </li>
                ))}
              </ul>

              <Button fullWidth variant="accent" size="lg" onClick={buy}>{OFFER.cta}</Button>

              <p className={styles.autoApplied}>
                <span className={styles.autoTick} aria-hidden="true"><Icon name="check" size={13} strokeWidth={3.5} /></span>
                {discountPct(chosen)}% off, auto-applied at checkout
              </p>
              <p className={styles.terms}>Free shipping &nbsp;|&nbsp; {OFFER.cadence}</p>

              <div className={styles.guaranteeBanner}>
                <Icon name="shield-check" size={32} strokeWidth={2} className={styles.guaranteeIcon} />
                <div>
                  <p className={styles.guaranteeTitle}>{TRUST.guaranteeTitle}</p>
                  <p className={styles.guaranteeSub}>{TRUST.guaranteeSub}</p>
                </div>
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
                            {FACTS.rows.map(([name, amount, dv]) => (
                              <div key={name} className={styles.ingRow}>
                                <dt>{name}</dt>
                                <dd>{amount}</dd>
                                <dd className={styles.ingDv}>{dv}</dd>
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

      <div className={`${styles.wrap} ${styles.legal}`}>
        <p>This page is an advertisement for a SUNNYCELLS product and we are paid when you buy.</p>
        <p>{DISCLAIMER}</p>
      </div>

      <div className={`${styles.stickyBar} ${stickyOn ? styles.stickyOn : ""}`} aria-hidden={!stickyOn}>
        <Image src={GALLERY[0].src} alt="" aria-hidden="true" width={96} height={96} className={styles.stickyShot} />
        <span className={styles.stickyNameCol}>
          <span className={styles.stickyName}>{PRODUCT.title}</span>
          <span className={styles.stickySave}>{OFFER.stickySave}</span>
        </span>
        <Button variant="accent" size="lg" tabIndex={stickyOn ? 0 : -1} onClick={scrollToOffer} className={styles.stickyCta}>
          {OFFER.cta}
        </Button>
      </div>
    </div>
  );
}
