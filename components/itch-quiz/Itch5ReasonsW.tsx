"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/core/Icon";
import { FZ_PLANS_CONTENT_V2 } from "@/lib/quiz/fridayzoomiesOfferV2";
import { BANNER, HERO, LEGAL, OFFER, PILLS, REASONS, WHY } from "@/lib/content/itch-5-reasons-w";
import styles from "./itch-5-reasons-w.module.css";

/* Hours, minutes and seconds left until local midnight, ticking every second. Null until mounted, so the
   server and the first client render match. */
function useCountdown() {
  const [left, setLeft] = useState<[string, string, string] | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(24, 0, 0, 0);
      const s = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
      const two = (n: number) => String(n).padStart(2, "0");
      setLeft([two(Math.floor(s / 3600)), two(Math.floor((s % 3600) / 60)), two(s % 60)]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

function Loop({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  return (
    <div className={styles.media}>
      <video className={styles.mediaFill} autoPlay loop muted playsInline preload="metadata" poster={poster} aria-label={alt}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

function Star() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6L2.5 9.5l6.6-.8L12 2.5z" fill="var(--sun)" stroke="var(--midnight)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function Verified() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" role="img" aria-label="Verified customer">
      <circle cx="12" cy="12" r="10" fill="var(--sun)" stroke="var(--midnight)" strokeWidth="1.5" />
      <path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="var(--midnight)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Heading({ n, children, id }: { n?: number; children: string; id: string }) {
  return (
    <h2 id={id} className={n ? `${styles.h2} ${styles.numbered}` : styles.h2}>
      {n ? <span className={styles.num}>{n}</span> : null}
      <span>{children}</span>
    </h2>
  );
}

export function Itch5ReasonsW() {
  const clock = useCountdown();
  const offerRef = useRef<HTMLElement | null>(null);
  const reviewsRef = useRef<HTMLUListElement | null>(null);
  const reviews = FZ_PLANS_CONTENT_V2.reviews;

  const slide = (dir: 1 | -1) => {
    const el = reviewsRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.84, behavior: "smooth" });
  };

  return (
    <div className={styles.page}>
      <div className={styles.topbar} role="region" aria-label="Offer">
        <p className={styles.topCopy}>
          <span className={styles.topHead}>{BANNER.headline}</span>
          <span className={styles.topSub}>{BANNER.subline}</span>
        </p>
        <p className={styles.clock} aria-live="off">
          {(["HRS", "MIN", "SEC"] as const).map((label, i) => (
            <span key={label} className={styles.clockGroup}>
              {i > 0 ? <span className={styles.clockSep} aria-hidden="true">:</span> : null}
              <span className={styles.clockUnit}>
                <span className={styles.clockDigits}>{clock ? clock[i] : "--"}</span>
                <span className={styles.clockLabel}>{label}</span>
              </span>
            </span>
          ))}
        </p>
      </div>

      <section className={styles.band}>
        <div className={`${styles.wrap} ${styles.hero}`}>
          <div className={styles.heroMedia}>
            <Image src={HERO.image} alt={HERO.alt} width={1000} height={1000} priority className={styles.heroImg} />
          </div>
          <div className={styles.heroCopy}>
            <h1 id="hero-title" className={styles.h1}>{HERO.title}</h1>
            <p className={styles.byline}><strong>{HERO.byline}</strong> &middot; {HERO.updated}</p>
            <p className={styles.body}>{HERO.intro}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.alt}`} aria-labelledby="why">
        <div className={`${styles.wrap} ${styles.reason}`}>
          <Heading id="why">{WHY.title}</Heading>
          <Loop src={WHY.video} poster={WHY.poster} alt={WHY.alt} />
          <div className={styles.copy}>
            {WHY.paragraphs.map((p) => <p key={p} className={styles.body}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className={styles.band} aria-labelledby="r1">
        <div className={`${styles.wrap} ${styles.reason}`}>
          <Heading id="r1" n={1}>{REASONS.one.title}</Heading>
          <Loop src={REASONS.one.video} poster={REASONS.one.poster} alt={REASONS.one.alt} />
          <div className={styles.copy}>
            <p className={styles.body}>{REASONS.one.body}</p>
            <ul className={styles.pills} aria-label="Benefits">
              {PILLS.map((p) => <li key={p} className={styles.pill}>{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.alt}`} aria-labelledby="r2">
        <div className={`${styles.wrap} ${styles.reason}`}>
          <Heading id="r2" n={2}>{REASONS.two.title}</Heading>
          <div className={styles.media}>
            <div className={styles.carousel}>
              <ul className={styles.slides} ref={reviewsRef} aria-label="What Friday Zoomies customers say" tabIndex={0}>
                {reviews.map((r) => (
                  <li key={r.name} className={styles.slide}>
                    <Image src={r.photo} alt="" width={208} height={208} className={styles.avatar} />
                    <p className={styles.stars} role="img" aria-label="Rated 5 out of 5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} />)}</p>
                    <p className={styles.quote}>{r.body}</p>
                    <p className={styles.who}>{r.name}<Verified /></p>
                  </li>
                ))}
              </ul>
              <div className={styles.nav}>
                <button type="button" className={styles.arrow} aria-label="Previous review" onClick={() => slide(-1)}>
                  <Icon name="arrow-left" size={26} strokeWidth={2.5} />
                </button>
                <button type="button" className={styles.arrow} aria-label="Next review" onClick={() => slide(1)}>
                  <Icon name="arrow-right" size={26} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.copy}>
            {REASONS.two.body.map((p) => <p key={p} className={styles.body}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className={styles.band} aria-labelledby="r3">
        <div className={`${styles.wrap} ${styles.reason} ${styles.stack}`}>
          <Heading id="r3" n={3}>{REASONS.three.title}</Heading>
          <div className={styles.copy}>
            <p className={styles.body}>{REASONS.three.body}</p>
          </div>
          <div className={styles.ings}>
            {FZ_PLANS_CONTENT_V2.ingredients.map((ing) => (
              <details key={ing.slug} className={styles.ing} name="ingredients">
                <summary className={styles.ingSummary}>
                  {ing.image ? <Image src={ing.image} alt="" width={84} height={84} className={styles.ingThumb} /> : null}
                  <span className={styles.ingName}>{ing.title}</span>
                  <Icon name="plus" size={18} strokeWidth={2.5} />
                </summary>
                <div className={styles.ingBody}>
                  {ing.points.map(([lead, body]) => (
                    <p key={lead}><strong>{lead}.</strong> {body}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.band} ${styles.alt}`} aria-labelledby="r4">
        <div className={`${styles.wrap} ${styles.reason}`}>
          <Heading id="r4" n={4}>{REASONS.four.title}</Heading>
          <div className={styles.media}>
            <ol className={styles.steps}>
              {REASONS.four.steps.map((s) => (
                <li key={s.title} className={styles.step}>
                  <span className={styles.dot} aria-hidden="true" />
                  <div className={styles.stepBody}>
                    <h3 className={styles.h3}>{s.title}</h3>
                    <p className={styles.body}>{s.body}</p>
                    <p className={styles.note}>{s.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className={styles.copy}>
            <p className={styles.body}>{REASONS.four.body}</p>
            <Image src={REASONS.four.photo} alt={REASONS.four.photoAlt} width={1080} height={1080} className={styles.beforeAfter} />
          </div>
        </div>
      </section>

      <section className={styles.band} aria-labelledby="r5">
        <div className={`${styles.wrap} ${styles.reason} ${styles.mediaFirst}`}>
          <Heading id="r5" n={5}>{REASONS.five.title}</Heading>
          <div className={`${styles.media} ${styles.factPanel}`}>
            <ul className={styles.facts}>
              {REASONS.five.facts.map((f) => (
                <li key={f.label} className={styles.fact}>
                  <span className={styles.factBadge} aria-hidden="true">
                    <Icon name={f.icon} size={26} strokeWidth={2} />
                    <span className={styles.factCheck}><Icon name="check" size={12} strokeWidth={3.5} /></span>
                  </span>
                  <span className={styles.factLabel}>{f.label}</span>
                </li>
              ))}
            </ul>
            <div className={styles.bottle}>
              <Image src={REASONS.five.image} alt={REASONS.five.alt} width={600} height={600} className={styles.bottleImg} />
            </div>
          </div>
          <div className={styles.copy}>
            <p className={styles.body}>{REASONS.five.body}</p>
          </div>
        </div>
      </section>

      <section ref={offerRef} className={`${styles.band} ${styles.dark}`} aria-labelledby="offer-title" id="offer">
        <div className={styles.wrap}>
          <article className={styles.offer}>
            <p className={styles.offerTag}>{OFFER.tag}</p>
            <div className={styles.offerBody}>
              <Image src={OFFER.image} alt={OFFER.alt} width={600} height={600} className={styles.offerImg} />
              <div className={styles.offerCopy}>
                <h2 id="offer-title" className={styles.offerTitle}>{OFFER.title}</h2>
                <ul className={styles.bullets}>
                  {OFFER.bullets.map((b) => (
                    <li key={b}>
                      <span className={styles.tick} aria-hidden="true"><Icon name="check" size={13} strokeWidth={3.5} /></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href={OFFER.href} className={styles.cta}>{OFFER.cta}</Link>
                <ul className={styles.trust}>
                  {OFFER.trust.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className={`${styles.band} ${styles.dark} ${styles.foot}`}>
        <div className={styles.wrap}>
          <p className={styles.legal}>{LEGAL}</p>
        </div>
      </footer>

      <div className={styles.sticky}>
        <p className={styles.stickyCopy}>
          <span className={styles.stickyHead}>{OFFER.stickyHead}</span>
          <span className={styles.stickySub}>{OFFER.stickySub}</span>
        </p>
        <Link href={OFFER.href} className={styles.stickyCta}>{OFFER.stickyCta}</Link>
      </div>
    </div>
  );
}
