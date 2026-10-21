import Photo from "./Photo";
import styles from "./membership.module.css";

/* The card every membership screen sits in: optional back link, eyebrow, title, then content. */
export default function Shell({ eyebrow, title, onBack, children, done, oneLine, photo }: { photo?: string; oneLine?: boolean; eyebrow?: string; title: string; onBack?: () => void; children: React.ReactNode; done?: boolean }) {
  return (
    <main className={styles.main}>
      <section className={styles.card}>
        {onBack && <button type="button" className={styles.back} onClick={onBack}>Back</button>}
        {done && !photo && <div className={styles.tick} aria-hidden />}
        <div className={styles.head}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          <h1 className={`${styles.title} ${oneLine ? styles.oneLine : ""}`} style={oneLine ? ({ "--n": title.length } as React.CSSProperties) : undefined}>{title}</h1>
        </div>
        {photo && <Photo k={photo} />}
        {children}
      </section>
    </main>
  );
}
