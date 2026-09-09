"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { writeAnswer } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { DISCLAIMER, HERO, OFFER, OPENERS, REASONS } from "@/lib/content/calm-6-reasons";
import { CART_ID, discountPct, FACTS, GALLERY, PRODUCT, supplyPlanById } from "@/lib/products/anytime-calm";
import styles from "./calm-6-reasons.module.css";

/* Same checkout the /quiz/calm funnel already uses for this product: one cart id, one
   checkout route, no second one built for this page. */
const CHECKOUT = "/quiz/calm/results/checkout";

export function CalmSixReasonsPage() {
  const router = useRouter();
  /* The advertorial sells one thing at one price; choosing a supply is the plans
     page's job. */
  const chosen = supplyPlanById(undefined);
  const [open, setOpen] = useState<string | null>(null);
  const [shot, setShot] = useState(0);

  const buy = () => {
    writeAnswer(CART_ID, "plan", chosen.id);
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
          <h1 className={styles.h1}>{HERO.title}</h1>
          <p className={styles.sub}>{HERO.sub}</p>
          <div className={styles.openers}>
            {OPENERS.map((p) => <p key={p} className={styles.body}>{p}</p>)}
          </div>
        </section>

        {/* ---------- the seven ---------- */}
        <section className={styles.wrap}>
          {REASONS.map((r) => (
            <article key={r.n} className={styles.reason}>
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
        <section className={`${styles.wrap} ${styles.section}`} id="offer">
          <div className={styles.offerGrid}>
            <div className={styles.offerGallery}>
              <Image src={GALLERY[shot].src} alt={GALLERY[shot].alt} width={1200} height={1200} className={styles.offerShot} />
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

              <p className={styles.terms}>{OFFER.servingsLabel}</p>

              <Button fullWidth variant="accent" size="lg" onClick={buy}>{OFFER.cta}</Button>

              <p className={styles.autoApplied}>
                <span className={styles.autoTick} aria-hidden="true"><Icon name="check" size={13} strokeWidth={3.5} /></span>
                {discountPct(chosen)}% off, auto-applied at checkout
              </p>
              <p className={styles.terms}>Free shipping &nbsp;|&nbsp; {chosen.cadence} &nbsp;|&nbsp; 90 day money back guarantee</p>

              <div className={styles.benefits}>
                <h3 className={styles.benefitsTitle}>{OFFER.benefitsTitle}</h3>
                <ul>
                  {OFFER.benefits.map((b) => (
                    <li key={b}>
                      <span className={styles.benefitTick} aria-hidden="true"><Icon name="check" size={13} strokeWidth={3.5} /></span>
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
    </div>
  );
}
