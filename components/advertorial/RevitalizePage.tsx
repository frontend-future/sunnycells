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
  BUYER_BEWARE, BYLINE, CLOSING, CRISIS_TITLE, DISCLAIMER, HERO, INTRO, INTRODUCING,
  NOT_JUST_AGE, OPENERS, REFERENCES, REVIEWS, SIGNS, THREE, TRUST,
} from "@/lib/content/revitalize";
import { AGING_ROW_COUNT, CART_ID, PLANS, PRODUCT, SUPPORT_EMAIL, type Plan } from "@/lib/products/revitalize";
import { CortisolCurve, DoseBars, EffectGrid, FixList, StudyCards, Timeline } from "@/components/revitalize/Visuals";
import { BEFORE_AFTER, TIMELINE as TL } from "@/lib/content/revitalize";
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

export function RevitalizeAdvertorial() {
  const router = useRouter();
  const [chosen, setChosen] = useState<Plan>(PLANS.find((p) => p.best) ?? PLANS[0]);
  const [stuck, setStuck] = useState(false);
  const bewareRef = useRef<HTMLDivElement | null>(null);
  const offerRef = useRef<HTMLDivElement | null>(null);

  /* The bar waits for the label-check section. Before that the reader has not been
     told what to look for, so an offer is just an interruption. It hides again while
     the offer itself is on screen. */
  useEffect(() => {
    const onScroll = () => {
      const beware = bewareRef.current?.getBoundingClientRect();
      const offer = offerRef.current?.getBoundingClientRect();
      const reached = !!beware && beware.top < window.innerHeight * 0.6;
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
        <div className={`${styles.wrap} ${styles.wide} ${styles.mastheadInner}`}>
          <Link href="/" aria-label="SUNNYCELLS home">
            <Wordmark size={20} tone="inverse" />
          </Link>
          <span className={styles.mastheadTag}>Advertisement</span>
        </div>
      </header>

      <main>
        <section className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.eyebrow}>{HERO.eyebrow}</p>
          <h1 className={styles.h1}>{HERO.title}</h1>
          <p className={styles.heroSub}>{HERO.sub}</p>

          <div className={styles.byline}>
            <span className={styles.bylineMark} aria-hidden="true">
              <Icon name="file-text" size={20} strokeWidth={2.2} />
            </span>
            <div>
              <p className={styles.bylineName}>{BYLINE.name}</p>
              <p className={styles.bylineRole}>{BYLINE.role} &middot; {BYLINE.date}</p>
            </div>
          </div>

          <div className={styles.prose}>
            {OPENERS.map((p) => <p key={p} className={styles.lead}>{p}</p>)}
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.sectionTight}`}>
          <h2 className={styles.h2}>{CRISIS_TITLE}</h2>
          <div className={styles.prose}>
            {INTRO.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.wide} ${styles.sectionTight}`}>
          <CortisolCurve />
        </section>

        {/* ---------- the five signs ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          {SIGNS.map((s) => (
            <article key={s.n} className={styles.sign}>
              <div className={styles.signHead}>
                <span className={styles.signNum} aria-hidden="true">{s.n}</span>
                <h3 className={styles.signTitle}>{s.title}</h3>
              </div>
              {s.image && s.alt && (
                <Image src={s.image} alt={s.alt} width={1000} height={1000} className={styles.signShot} />
              )}
              <div className={styles.prose}>
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </article>
          ))}
        </section>

        <section className={`${styles.wrap} ${styles.sectionTight}`}>
          <h2 className={styles.h2}>{NOT_JUST_AGE.title}</h2>
          <div className={styles.prose}>
            {NOT_JUST_AGE.body.map((p) => <p key={p}>{p}</p>)}
          </div>
        </section>

        {/* ---------- every visible effect, and what meets it ---------- */}
        <section className={`${styles.wrap} ${styles.wide} ${styles.section}`}>
          <h2 className={styles.h2Centre}>{AGING_ROW_COUNT} ways it shows up on you</h2>
          <p className={styles.lead} style={{ textAlign: "center", maxWidth: "40rem", margin: "0 auto 2.5rem" }}>
            None of them announces itself. All of them are the same hormone.
          </p>
          <EffectGrid />
        </section>

        {/* ---------- what meets each one ---------- */}
        <section className={`${styles.wrap} ${styles.wide} ${styles.section}`}>
          <h2 className={styles.h2Centre}>What in the pack meets each one</h2>
          <FixList />
        </section>

        {/* ---------- future pacing ---------- */}
        <section className={styles.sunkSection}>
          <div className={`${styles.wrap} ${styles.wide} ${styles.section}`}>
            <p className={styles.eyebrow} style={{ textAlign: "center" }}>{TL.eyebrow}</p>
            <h2 className={styles.h2Centre}>{TL.title}</h2>
            <Timeline />
            <p className={styles.smallPrint} style={{ maxWidth: "42rem", margin: "1.75rem auto 0", textAlign: "center" }}>
              {TL.foot}
            </p>
          </div>
        </section>

        {/* ---------- the evidence ---------- */}
        <section className={styles.sunkSection}>
          <div className={`${styles.wrap} ${styles.wide} ${styles.section}`}>
            <h2 className={styles.h2Centre}>The research, with its sample size on the front</h2>
            <StudyCards />
          </div>
        </section>

        {/* ---------- before and after. A slot, not a picture. ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>{BEFORE_AFTER.title}</h2>
          <p className={styles.lead}>{BEFORE_AFTER.body}</p>
          <div className={styles.baPair}>
            {BEFORE_AFTER.slots.map((sl) => (
              <div key={sl} className={styles.baEmpty} role="img" aria-label={`Placeholder: ${sl}`}>{sl}</div>
            ))}
          </div>
        </section>

        {/* ---------- the three levers ---------- */}
        <section className={styles.sunkSection}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <h2 className={styles.h2}>{THREE.title}</h2>
            <p className={styles.lead}>{THREE.lede}</p>
            <div className={styles.levers}>
              {THREE.items.map((i) => (
                <div key={i.title} className={styles.lever}>
                  <h3 className={styles.leverTitle}>{i.title}</h3>
                  <p>{i.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- the label check. The sticky bar waits for this. ---------- */}
        <section className={`${styles.wrap} ${styles.section}`} ref={bewareRef}>
          <h2 className={styles.h2}>{BUYER_BEWARE.title}</h2>
          <div className={styles.prose}>
            {BUYER_BEWARE.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className={styles.checks}>
            {BUYER_BEWARE.checks.map((c) => (
              <div key={c.title} className={styles.check}>
                <h3 className={styles.checkTitle}>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- what we made ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.eyebrow}>{INTRODUCING.eyebrow}</p>
          <h2 className={styles.h2}>{INTRODUCING.title}</h2>
          <Image src={INTRODUCING.image} alt={INTRODUCING.alt} width={1200} height={1200} className={styles.introShot} />
          <div className={styles.prose}>
            {INTRODUCING.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div style={{ margin: "2rem 0" }}>
            <DoseBars />
          </div>
          <div className={styles.doses}>
            {INTRODUCING.doses.map((d) => (
              <div key={d.name} className={styles.dose}>
                <span className={styles.doseName}>{d.name}</span>
                <span className={styles.doseAmount}>{d.amount}</span>
                <p className={styles.doseNote}>{d.note}</p>
              </div>
            ))}
          </div>
        </section>

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

        {/* ---------- reviews ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>What people say</h2>
          <div className={styles.reviewGrid}>
            {REVIEWS.map((r) => (
              <article key={r.name} className={styles.reviewCard}>
                <Stars size={16} />
                <p className={styles.reviewBody}>&ldquo;{r.body}&rdquo;</p>
                <p className={styles.reviewWho}>{r.name}, {r.place}</p>
              </article>
            ))}
          </div>
          <p className={styles.smallPrint}>
            Customer results have not been independently verified. Individual results vary.
          </p>
        </section>

        {/* ---------- the offer ---------- */}
        <section className={styles.offer} id="offer" ref={offerRef}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.offerFlagRow}>
              <OfferFlag size="sm" />
              <span className={styles.offerTerms}>Free shipping &middot; Cancel anytime</span>
            </div>
            <h2 className={styles.h2}>{CLOSING.title}</h2>
            <div className={styles.prose}>
              {CLOSING.body.map((p) => <p key={p}>{p}</p>)}
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
                    <span>
                      <span className={styles.planPrice}>${p.price * p.months}</span>
                      <span className={styles.planWas}>was ${p.compareAt * p.months}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <Button fullWidth variant="accent" size="lg" onClick={buy}>
              Try now and save ${saving}
            </Button>
            <p className={styles.offerTerms} style={{ textAlign: "center", marginTop: "0.75rem" }}>
              Free shipping &nbsp;|&nbsp; {chosen.sub} &nbsp;|&nbsp; 60 day money back guarantee
            </p>
            <p className={styles.smallPrint} style={{ textAlign: "center" }}>
              Questions before you buy? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
          </div>
        </section>

        {/* ---------- references ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.h2}>References</h2>
          <ol className={styles.refList}>
            {REFERENCES.map((r) => <li key={r}>{r}</li>)}
          </ol>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.wide} ${styles.section}`}>
          <p className={styles.disclosure}>
            This page is an advertisement for a SUNNYCELLS product and we are paid when
            you buy. Everything factual on it is cited above.
          </p>
          <p className={styles.smallPrint}>{DISCLAIMER}</p>
          <nav className={styles.footerLinks}>
            <Link href="/">Home</Link>
            <Link href="/products/revitalize">Revitalize</Link>
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </nav>
          <p className={styles.footerMark} aria-hidden="true">SUNNYCELLS</p>
        </div>
      </footer>

      <div className={`${styles.sticky} ${stuck ? styles.stickyOn : ""}`}>
        <div className={`${styles.wrap} ${styles.wide} ${styles.stickyInner}`}>
          <Image src={PRODUCT.image} alt="" aria-hidden="true" width={120} height={120} className={styles.stickyShot} />
          <span className={styles.stickyText}>
            <span className={styles.stickyOffer}>50% off first pouch</span>
            <span className={styles.stickyTerms}>Free shipping &middot; Cancel anytime</span>
          </span>
          <Button variant="accent" size="md" onClick={toOffer}>Try now</Button>
        </div>
      </div>
    </div>
  );
}
