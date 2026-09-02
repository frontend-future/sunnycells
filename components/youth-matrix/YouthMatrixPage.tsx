"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { Wordmark } from "@/components/core/Wordmark";
import {
  ADVERTORIAL, CHECKOUT_HREF, COMPARE, DISCLAIMER, GALLERY, PLANS, PRODUCT,
  PROOF_BANNER, REVIEWS, STACK, TRUST, type Plan,
} from "@/lib/products/youth-matrix-chews";
import styles from "./youth-matrix.module.css";

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
      <Icon name="check" size={11} strokeWidth={3.5} />
    </span>
  );
}

export function YouthMatrixPage() {
  const router = useRouter();
  const [shot, setShot] = useState(0);
  const [planId, setPlanId] = useState<Plan["id"]>("sub");
  const chosen = PLANS.find((p) => p.id === planId) ?? PLANS[0];

  return (
    <div className={styles.page}>
      <header className={styles.masthead}>
        <div className={`${styles.wrap} ${styles.mastheadInner}`}>
          <Link href="/" aria-label="SUNNYCELLS home">
            <Wordmark size={22} />
          </Link>
          <Link href={ADVERTORIAL.href} className={`${styles.mastheadLink} ${styles.meta}`}>
            The science
          </Link>
        </div>
      </header>

      <main>
        {/* ---------- above the fold ---------- */}
        <section className={`${styles.wrap} ${styles.section}`} id="buy">
          <div className={styles.buyGrid}>
            <div className={styles.gallery}>
              <Image
                src={GALLERY[shot].src}
                alt={GALLERY[shot].alt}
                width={1200}
                height={1200}
                priority
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
                  >
                    <Image src={g.src} alt="" aria-hidden="true" width={200} height={200} />
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.buyCard}>
              <span className={styles.badge}>{PRODUCT.badge}</span>
              <h1 className={styles.h1}>{PRODUCT.title}</h1>
              <p className={styles.subhead}>{PRODUCT.subhead}</p>

              <div className={styles.ratingRow}>
                <Stars />
                <span className={styles.ratingScore}>{PRODUCT.rating.score}</span>
                <span className={styles.meta}>({PRODUCT.rating.count})</span>
              </div>

              {/* The advertorial cross-link, directly above the pricing. */}
              <Link href={ADVERTORIAL.href} className={styles.crossLink}>
                <span className={styles.label}>As seen in {ADVERTORIAL.eyebrow}</span>
                <p className={styles.crossQuote}>&ldquo;{ADVERTORIAL.quote}&rdquo;</p>
                <span className={styles.crossCta}>{ADVERTORIAL.cta}</span>
              </Link>

              <div className={styles.plans} role="radiogroup" aria-label="Choose a purchase type">
                {PLANS.map((p) => {
                  const on = p.id === planId;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => setPlanId(p.id)}
                      className={`${styles.plan} ${on ? styles.planOn : ""}`}
                    >
                      <span className={styles.radio} aria-hidden="true">{on && <span />}</span>
                      <span>
                        <span className={styles.planName}>
                          {p.name}
                          {p.best && <span className={styles.planTag}>Most popular</span>}
                        </span>
                        <span className={styles.priceRow}>
                          <span className={styles.priceNow}>{p.price}</span>
                          {p.cadence && <span className={styles.meta}>{p.cadence}</span>}
                          {p.compareAt && <span className={styles.priceWas}>{p.compareAt}</span>}
                          {p.save && <span className={styles.savePill}>{p.save}</span>}
                        </span>
                        {p.points && (
                          <ul className={styles.points}>
                            {p.points.map((pt) => <li key={pt}><Tick />{pt}</li>)}
                          </ul>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              <Button fullWidth variant="accent" size="lg" onClick={() => router.push(CHECKOUT_HREF)}>
                Check availability and order
              </Button>

              <ul className={styles.trust}>
                {TRUST.map((t) => <li key={t}><Tick />{t}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- the clinical stack ---------- */}
        <section className={styles.sunk}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <h2 className={`${styles.h2} ${styles.centre}`}>{STACK.title}</h2>
            <p className={`${styles.lede} ${styles.centre}`} style={{ maxWidth: "40rem", margin: "0.75rem auto 2.5rem" }}>
              {STACK.lede}
            </p>
            <div className={`${styles.cols} ${styles.cols4}`}>
              {STACK.items.map((x) => (
                <div key={x.name} className={styles.card}>
                  <p className={styles.dose}>{x.dose}</p>
                  <h3 className={styles.h3}>{x.name}</h3>
                  <p className={styles.body}>{x.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- comparison ---------- */}
        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={`${styles.h2} ${styles.centre}`}>{COMPARE.title}</h2>

          {/* Table above 768, stacked below: four columns of prose will not fit a phone. */}
          <div className={styles.compare} style={{ marginTop: "2rem" }}>
            <div className={styles.compareHead}>
              <span className={styles.compareCol}>Feature</span>
              <span className={styles.compareCol}>{COMPARE.usLabel}</span>
              <span className={styles.compareCol}>{COMPARE.themLabel}</span>
            </div>
            {COMPARE.rows.map((r) => (
              <div key={r.feature} className={styles.compareRow}>
                <span className={styles.h3}>{r.feature}</span>
                <span className={`${styles.body} ${styles.compareUs}`}>{r.us}</span>
                <span className={`${styles.body} ${styles.no}`}>{r.them}</span>
              </div>
            ))}
          </div>

          <div className={styles.compareStack} style={{ marginTop: "2rem" }}>
            {COMPARE.rows.map((r) => (
              <div key={r.feature} className={styles.compareCard}>
                <p className={styles.label}>{r.feature}</p>
                <p className={styles.compareLine}>
                  <Tick />
                  <span className={styles.body}>
                    <span className="sr-only">{COMPARE.usLabel}: </span>{r.us}
                  </span>
                </p>
                <p className={styles.compareLine}>
                  <span aria-hidden="true" style={{ color: "var(--ink-60)" }}>
                    <Icon name="x" size={16} strokeWidth={3} />
                  </span>
                  <span className={`${styles.body} ${styles.no}`}>
                    <span className="sr-only">{COMPARE.themLabel}: </span>{r.them}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- advertorial bridge ---------- */}
        <section className={styles.bridge}>
          <div className={`${styles.wrap} ${styles.section}`}>
            <div className={styles.bridgeGrid}>
              <div>
                <h2 className={styles.h2}>{PROOF_BANNER.heading}</h2>
                <p className={styles.lede} style={{ margin: "1.25rem 0 1.75rem" }}>
                  {PROOF_BANNER.body}
                </p>
                <Button variant="accent" size="lg" onClick={() => router.push(PROOF_BANNER.href)}>
                  Read the deep dive
                </Button>
              </div>
              <Image
                src={PROOF_BANNER.image}
                alt={PROOF_BANNER.alt}
                width={800}
                height={800}
                className={styles.bridgeShot}
              />
            </div>
          </div>
        </section>

        {/* ---------- reviews ---------- */}
        <section className={`${styles.wrap} ${styles.narrow} ${styles.section}`} id="reviews">
          <h2 className={styles.h2}>What people are saying</h2>
          <div className={styles.ratingRow} style={{ margin: "1rem 0 0.5rem" }}>
            <Stars size={20} />
            <span className={styles.ratingScore}>{PRODUCT.rating.score}</span>
            <span className={styles.meta}>({PRODUCT.rating.count})</span>
          </div>
          {REVIEWS.map((r) => (
            <article key={r.name} className={styles.review}>
              <div className={styles.reviewTop}>
                <span className={styles.ratingScore}>{r.name}</span>
                <span className={styles.verified}>Verified buyer</span>
                <span className={styles.meta}>{r.when}</span>
              </div>
              <h3 className={styles.h3}>{r.title}</h3>
              <p className={styles.body} style={{ marginTop: "0.375rem" }}>{r.body}</p>
            </article>
          ))}
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.section}`}>
          <p className={styles.legal}>{DISCLAIMER}</p>
          <nav className={styles.footNav}>
            <Link href="/">Home</Link>
            <Link href={ADVERTORIAL.href}>The clinical case study</Link>
            <Link href="/products/revitalize">Revitalize</Link>
          </nav>
          <p className={styles.centre} style={{ margin: 0 }}>&copy; 2026 SUNNYCELLS</p>
        </div>
      </footer>

      <div className={styles.sticky}>
        <div className={`${styles.wrap} ${styles.stickyInner}`}>
          <Image
            src={GALLERY[0].src}
            alt=""
            aria-hidden="true"
            width={120}
            height={120}
            className={styles.stickyShot}
          />
          <span className={styles.stickyText}>
            <span className={styles.stickyPrice}>
              {chosen.price}
              {chosen.cadence ? ` ${chosen.cadence}` : ""}
            </span>
            <span className={styles.meta}>30 day money back</span>
          </span>
          <Button variant="accent" size="md" onClick={() => router.push(CHECKOUT_HREF)}>
            Check availability
          </Button>
        </div>
      </div>
    </div>
  );
}
