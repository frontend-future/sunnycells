import { Fragment } from "react";

export type Term = { strong: string; rest: string };

/* Repeated so the group is wider than any viewport it has to fill. Two terms alone
   would leave a gap on a desktop before the duplicate group caught up. */
const REPEATS = 3;

/**
 * A scrolling terms bar. Note this is the one looping animation in the system: the
 * brand's motion rule is that motion confirms and never performs, and a marquee
 * performs. It runs slowly, pauses on hover, and stops dead under
 * prefers-reduced-motion, which is the most a loop can do to behave.
 * No JavaScript: the track is duplicated and translated by half its width.
 */
export function AnnouncementMarquee({ terms }: { terms: Term[] }) {
  const group = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} style={{ display: "flex", flex: "none" }}>
      {Array.from({ length: REPEATS }).flatMap((_, r) =>
        terms.map((t) => (
          <Fragment key={`${r}-${t.strong}`}>
            <span style={{ paddingRight: "var(--space-8)", whiteSpace: "nowrap" }}>
              <strong style={{ fontWeight: 800 }}>{t.strong}</strong>{" "}
              <span style={{ fontWeight: 500 }}>{t.rest}</span>
            </span>
            <span aria-hidden="true" style={{ paddingRight: "var(--space-8)", color: "var(--ink-40)" }}>
              ·
            </span>
          </Fragment>
        )),
      )}
    </div>
  );

  return (
    <div
      className="sc-marquee"
      style={{
        background: "var(--ink)",
        color: "var(--white)",
        padding: "10px 0",
        fontSize: "var(--size-meta)",
        letterSpacing: "var(--tracking-caps)",
        textTransform: "uppercase",
      }}
    >
      <div className="sc-marquee-track">
        {group(false)}
        {/* The duplicate exists only to make the wrap seamless. */}
        {group(true)}
      </div>
    </div>
  );
}
