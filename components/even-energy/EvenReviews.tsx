import { Icon } from "@/components/core/Icon";
import { REVIEWS } from "@/lib/products/even-energy";
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
  return (
    <section className={`${styles.wrap} ${styles.section}`} aria-labelledby="reviews-title">
      <h2 className={`${styles.h2} ${styles.centered}`} id="reviews-title">
        What people are saying
      </h2>

      <div className={styles.reviewList}>
        {REVIEWS.map((r) => (
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
    </section>
  );
}
