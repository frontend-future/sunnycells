"use client";

import { useState } from "react";
import { Icon } from "@/components/core/Icon";
import { RATING, REVIEWS, REVIEW_TAGS } from "@/lib/products/even-energy";
import styles from "./even-energy.module.css";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <Icon key={i} name="star" size={16} fill="var(--sun)" strokeWidth={0} />
      ))}
    </span>
  );
}

export function EvenReviews() {
  const [tag, setTag] = useState<string>("All");
  const shown = tag === "All" ? REVIEWS : REVIEWS.filter((r) => r.tag === tag);

  return (
    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="reviews-title">
      <h2 className={styles.h2} id="reviews-title">
        What people say
      </h2>

      <div className={styles.reviewHead} style={{ marginTop: "var(--space-6)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <span className={styles.scoreBig}>{RATING.score}</span>
          <span>
            <Stars />
            <span style={{ display: "block", fontSize: "var(--size-meta)", fontWeight: 500, color: "var(--ink-60)" }}>
              {RATING.count.toLocaleString("en-US")} reviews
            </span>
          </span>
        </div>
      </div>

      <div className={styles.filters} role="group" aria-label="Filter reviews by topic">
        {REVIEW_TAGS.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={t === tag}
            onClick={() => setTag(t)}
            className={`${styles.filter} ${t === tag ? styles.filterOn : ""}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={styles.reviewList}>
        {shown.map((r) => (
          <article className={styles.review} key={r.name + r.title}>
            <div className={styles.reviewWho}>
              <span className={styles.reviewName}>{r.name}</span>
              Verified buyer
              <span style={{ display: "block", color: "var(--ink-60)" }}>{r.when}</span>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <Stars />
              <h3 className={styles.reviewTitle}>{r.title}</h3>
              <p className={styles.quoteText}>{r.body}</p>
            </div>
          </article>
        ))}
      </div>

      {shown.length === 0 && (
        <p className={styles.lede}>No reviews tagged {tag} yet.</p>
      )}
    </section>
  );
}
