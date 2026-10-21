import styles from "./membership.module.css";

/* The card every membership screen sits in: optional back link, eyebrow, title, then content. */
export default function Shell({ eyebrow, title, onBack, children, done, oneLine }: { oneLine?: boolean; eyebrow?: string; title: string; onBack?: () => void; children: React.ReactNode; done?: boolean }) {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        {onBack && <button type="button" className={styles.back} onClick={onBack}>Back</button>}
        {done && <div className={styles.tick} aria-hidden />}
        <div className={styles.head}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={`${styles.title} ${oneLine ? styles.oneLine : ""}`}>{title}</h1>
        </div>
        {children}
      </section>
    </main>
  );
}
