import type { Projection, Row } from "@/lib/quiz/assessment";

/**
 * Both charts are single series and every value is printed on the mark, so identity
 * never rests on colour and no categorical palette is in play. Marks are --ink on an
 * --ink-10 track, which is the same black-on-paper structure the rest of the system
 * uses. No chart library: two inline SVGs are smaller than the import would be.
 */

/* Each row starts a beat after the one above it, so the eye reads down the list in
   order instead of taking six bars at once. Calm and quick: no bounce, and the whole
   sequence is done inside a second. */
const ROW_STAGGER_MS = 110;

/** Horizontal bars against a reference tick for the population average. */
export function AssessmentChart({ rows }: { rows: Row[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {rows.map((r, i) => (
        <div key={r.label}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "var(--space-4)" }}>
            <span style={{ fontSize: "var(--size-body)", fontWeight: 700 }}>{r.label}</span>
            <span style={{ fontSize: "var(--size-body)", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
              {r.you}
              <span style={{ color: "var(--ink-60)", fontWeight: 600 }}> / 100</span>
            </span>
          </div>

          <div style={{ position: "relative", height: 20, background: "var(--ink-10)", borderRadius: "var(--radius-xs)", marginTop: "var(--space-2)" }}>
            <div
              style={{
                width: r.you + "%",
                height: "100%",
                background: "var(--ink)",
                borderRadius: "var(--radius-xs)",
                animation: "sc-reveal-x var(--duration-slow) var(--ease-standard) both",
                animationDelay: `${i * ROW_STAGGER_MS}ms`,
              }}
            />
            {/* The average sits as a tick on the same track, so the comparison is a
                position, not a second colour competing with the bar. The white halo is
                what keeps it visible where it crosses the black fill. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: -5,
                bottom: -5,
                left: `calc(${r.average}% - 1px)`,
                width: 2,
                background: "var(--ink-60)",
                boxShadow: "0 0 0 2px var(--white)",
                animation: "sc-fade-in var(--duration-base) var(--ease-standard) both",
                animationDelay: `${i * ROW_STAGGER_MS + 220}ms`,
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-4)", marginTop: 6 }}>
            <span style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>{r.note}</span>
            <span style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)", fontVariantNumeric: "tabular-nums" }}>
              Average {r.average}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Projected weight over time. One line, start and target labelled on the mark. */
export function ProjectionChart({ p }: { p: Projection }) {
  const W = 640;
  const H = 280;
  const padL = 8;
  const padR = 8;
  const padT = 28;
  const padB = 36;

  const lo = p.target - 4;
  const hi = p.start + 4;
  const x = (week: number) => padL + (week / p.weeks) * (W - padL - padR);
  const y = (lb: number) => padT + (1 - (lb - lo) / (hi - lo)) * (H - padT - padB);

  const line = p.points.map((pt, i) => `${i ? "L" : "M"}${x(pt.week).toFixed(1)} ${y(pt.lb).toFixed(1)}`).join(" ");
  const area = `${line} L${x(p.weeks).toFixed(1)} ${H - padB} L${padL} ${H - padB} Z`;

  const ticks = [0, Math.round(p.weeks / 3), Math.round((p.weeks * 2) / 3), p.weeks];

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Projected weight from ${p.start} pounds to ${p.target} pounds over ${p.weeks} weeks`}
        style={{ display: "block", overflow: "visible" }}
      >
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--ink-20)" strokeWidth={1} />
        <path d={area} fill="var(--sun-tint)" />
        <path d={line} fill="none" stroke="var(--ink)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        <circle cx={x(0)} cy={y(p.start)} r={5} fill="var(--ink)" />
        <circle cx={x(p.weeks)} cy={y(p.target)} r={5} fill="var(--ink)" />

        <text x={x(0)} y={y(p.start) - 12} fontSize={17} fontWeight={800} fill="var(--ink)">
          {p.start} lb
        </text>
        <text x={x(p.weeks)} y={y(p.target) - 12} fontSize={17} fontWeight={800} fill="var(--ink)" textAnchor="end">
          {p.target} lb
        </text>

        {ticks.map((t, i) => (
          <text
            key={t}
            x={x(t)}
            y={H - padB + 22}
            fontSize={17}
            fontWeight={600}
            fill="var(--ink-60)"
            textAnchor={i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"}
          >
            {t === 0 ? "Today" : `Week ${t}`}
          </text>
        ))}
      </svg>
      <figcaption style={{ marginTop: "var(--space-4)", fontSize: "var(--size-meta)", color: "var(--ink-60)", lineHeight: 1.5 }}>
        Modelled at about 1% of body weight a week, the rate most clinical guidance
        treats as sustainable. It shows a pace, not a promise: your result depends on
        what you eat, how you move, and how you sleep.
      </figcaption>
    </figure>
  );
}
