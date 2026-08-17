import { levelWord, type Projection, type Row } from "@/lib/quiz/assessment";

/**
 * Both charts are single series and every value is printed on the mark, so identity
 * never rests on colour and no categorical palette is in play. Marks are --ink on an
 * --ink-10 track, which is the same black-on-paper structure the rest of the system
 * uses. No chart library: two inline SVGs are smaller than the import would be.
 */

/* Each row starts a beat after the one above it, so the eye reads down the list in
   order instead of taking six gauges at once. Calm and quick: no bounce, and the
   whole sequence is done inside a second. */
const ROW_STAGGER_MS = 110;

/* Seven segments running low to high. Green and red are the system's status pair,
   which is what a severity scale is; sun sits in the middle as the brand's own
   caution value. The level is also written into each row's accessible name and
   spelled out on the scale beneath, so colour never carries it alone. */
const SEGMENTS = [
  "var(--status-success)",
  "var(--status-success)",
  "var(--sun)",
  "var(--sun)",
  "var(--sun)",
  "var(--status-error)",
  "var(--status-error)",
];

/** Segmented low-to-high gauge with a marker at the score. */
export function AssessmentChart({ rows }: { rows: Row[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
      {rows.map((r, i) => {
        const level = levelWord(r.you);
        return (
          <div key={r.label} role="group" aria-label={`${r.label}: ${level}`}>
            <div style={{ fontSize: "var(--size-body)", fontWeight: 700, marginBottom: "var(--space-3)" }}>
              {r.label}
            </div>

            <div style={{ position: "relative" }}>
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  animation: "sc-reveal-x var(--duration-slow) var(--ease-standard) both",
                  animationDelay: `${i * ROW_STAGGER_MS}ms`,
                }}
              >
                {SEGMENTS.map((c, n) => (
                  <span
                    key={n}
                    style={{
                      flex: 1,
                      height: 12,
                      background: c,
                      borderRadius:
                        n === 0 ? "var(--radius-pill) 0 0 var(--radius-pill)"
                        : n === SEGMENTS.length - 1 ? "0 var(--radius-pill) var(--radius-pill) 0"
                        : 2,
                    }}
                  />
                ))}
              </div>

              {/* Ink dot with a white ring, so it reads on any segment it lands on.
                  Inset by 3% at each end so it never hangs off the track. */}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: `${3 + (r.you / 100) * 94}%`,
                  width: 22,
                  height: 22,
                  marginTop: -11,
                  marginLeft: -11,
                  borderRadius: "50%",
                  background: "var(--ink)",
                  boxShadow: "0 0 0 3px var(--white)",
                  animation: "sc-fade-in var(--duration-base) var(--ease-standard) both",
                  animationDelay: `${i * ROW_STAGGER_MS + 240}ms`,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "var(--space-2)",
                fontSize: "var(--size-meta)",
                color: "var(--ink-60)",
              }}
            >
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        );
      })}
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
