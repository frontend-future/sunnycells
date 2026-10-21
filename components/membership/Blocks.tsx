import styles from "./membership.module.css";

/* Small visual blocks so no screen is a wall of text. Each item stays under a sentence. */

/* Ticked list. An item can be [bold lead, rest]. */
export function Points({ items }: { items: (string | [string, string])[] }) {
  return (
    <ul className={styles.points}>
      {items.map((i) => {
        const [lead, rest] = typeof i === "string" ? [i, ""] : i;
        return <li key={lead}><span>{rest ? <><strong>{lead}</strong> {rest}</> : lead}</span></li>;
      })}
    </ul>
  );
}

/* Numbered steps. */
export function Steps({ items }: { items: string[] }) {
  return <ol className={styles.steps}>{items.map((i) => <li key={i}><span>{i}</span></li>)}</ol>;
}

/* The one number or term that matters, big. */
export function Deal({ big, line, small }: { big: string; line: string; small?: string }) {
  return (
    <div className={styles.deal}>
      <span className={styles.dealBig}>{big}</span>
      <span className={styles.dealLine}>{line}</span>
      {small && <span className={styles.dealSmall}>{small}</span>}
    </div>
  );
}

/* A short vertical diagram: dot, label, optional detail, joined by a line. */
export function Timeline({ items }: { items: [string, string?][] }) {
  return (
    <ol className={styles.timeline}>
      {items.map(([label, sub]) => <li key={label}><strong>{label}</strong>{sub && <span>{sub}</span>}</li>)}
    </ol>
  );
}

/* The 90 day badge beside the guarantee in one line. */
export function Guarantee({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.guarantee}>
      <img src="/quiz/fridayzoomies/checkout/badge-90.webp" alt="90 day guarantee" width={104} height={104} />
      <div><strong>90 day guarantee</strong><span>{children}</span></div>
    </div>
  );
}

/* What is at stake: a warm red card with crossed items. */
export function Risks({ title, items }: { title: string; items: string[] }) {
  return (
    <div className={styles.risks}>
      <strong>{title}</strong>
      <ul>{items.map((i) => <li key={i}><span>{i}</span></li>)}</ul>
    </div>
  );
}
