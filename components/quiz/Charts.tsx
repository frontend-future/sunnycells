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

/* Seven segments running low to high, drawn from the severity ramp rather than the
   muted status pair. The level is also written into each row's accessible name and
   spelled out on the scale beneath, so colour never carries it alone. */
const SEGMENTS = [
  "var(--scale-low)",
  "var(--scale-low)",
  "var(--scale-mid)",
  "var(--scale-mid)",
  "var(--scale-mid)",
  "var(--scale-high)",
  "var(--scale-high)",
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
                      height: 18,
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
                  width: 26,
                  height: 26,
                  marginTop: -13,
                  marginLeft: -13,
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

/* The dieting curve as loss-so-far at points across the plan: down for a while, then
   most of it back on, twice. Anchors rather than a formula, because the shape is the
   point and a closed form that produced it would be harder to read than the numbers. */
const DIET_ANCHORS: [number, number][] = [
  [0, 0], [0.15, 0.16], [0.3, 0.33], [0.45, 0.44],
  [0.6, 0.19], [0.72, 0.29], [0.86, 0.11], [1, 0.06],
];

function dietLoss(t: number): number {
  for (let i = 0; i < DIET_ANCHORS.length - 1; i++) {
    const [t0, v0] = DIET_ANCHORS[i];
    const [t1, v1] = DIET_ANCHORS[i + 1];
    if (t <= t1) {
      const k = (t - t0) / (t1 - t0);
      /* Cosine easing between anchors, so the joins are smooth without pulling in a
         spline library for eight points. */
      return v0 + (v1 - v0) * (1 - Math.cos(k * Math.PI)) / 2;
    }
  }
  return DIET_ANCHORS[DIET_ANCHORS.length - 1][1];
}

/** Endpoint marker: a dot on the curve with its weight on a tab above it. Lives at
    module scope, not inside the chart, so React does not treat it as a new component
    type on every render. */
function Pill({ cx, cy, label }: { cx: number; cy: number; label: string }) {
  const w = label.length * 8 + 16;
  return (
    <g>
      <rect x={cx - w / 2} y={cy - 28} width={w} height={22} rx={11} fill="var(--ink)" />
      <text x={cx} y={cy - 12} fontSize={13} fontWeight={800} fill="var(--white)" textAnchor="middle">
        {label}
      </text>
      <circle cx={cx} cy={cy} r={4} fill="var(--ink)" />
    </g>
  );
}

/** Projected weight over time, against what dieting alone tends to do. */
export function ProjectionChart({
  p, startLabel, endLabel,
}: {
  p: Projection;
  startLabel: string;
  endLabel: string;
}) {
  /* A 400 unit box, not 640: the SVG scales to its container, so a wide viewBox
     shrinks the type inside it. At 400 the labels land near their nominal size on a
     phone instead of half of it. */
  const W = 400;
  const H = 210;
  const padX = 10;
  const padT = 34;
  const padB = 16;

  const toLose = p.start - p.target;
  const lo = p.target - toLose * 0.12;
  const hi = p.start + toLose * 0.12;
  const x = (t: number) => padX + t * (W - padX * 2);
  const y = (lb: number) => padT + (1 - (lb - lo) / (hi - lo)) * (H - padT - padB);

  const plan = p.points.map((pt, i) => `${i ? "L" : "M"}${x(pt.week / p.weeks).toFixed(1)} ${y(pt.lb).toFixed(1)}`).join(" ");
  const area = `${plan} L${x(1).toFixed(1)} ${H - padB} L${x(0).toFixed(1)} ${H - padB} Z`;

  const SAMPLES = 60;
  const diet = Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const t = i / SAMPLES;
    return `${i ? "L" : "M"}${x(t).toFixed(1)} ${y(p.start - toLose * dietLoss(t)).toFixed(1)}`;
  }).join(" ");

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Projected weight from ${p.start} pounds to ${p.target} pounds over ${p.weeks} weeks, against a dieting curve that regains most of what it loses`}
        style={{ display: "block", overflow: "visible" }}
      >
        {[1 / 3, 2 / 3].map((t) => (
          <line key={t} x1={x(t)} y1={padT - 6} x2={x(t)} y2={H - padB} stroke="var(--ink-20)" strokeWidth={1} />
        ))}
        <line x1={x(0)} y1={H - padB} x2={x(1)} y2={H - padB} stroke="var(--ink-20)" strokeWidth={1} />

        <path d={area} fill="var(--sprout-tint)" />
        {/* Dashed, so the two series differ by more than hue. */}
        <path d={diet} fill="none" stroke="var(--series-diet)" strokeWidth={2.5} strokeDasharray="7 5" strokeLinecap="round" />
        <path d={plan} fill="none" stroke="var(--series-plan)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        <Pill cx={Math.max(x(0) + 16, 34)} cy={y(p.start)} label={`${p.start} lb`} />
        <Pill cx={Math.min(x(1) - 16, W - 34)} cy={y(p.target)} label={`${p.target} lb`} />
      </svg>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "var(--space-4)",
          marginTop: "var(--space-3)",
        }}
      >
        <div>
          <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>Today</div>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700 }}>{startLabel}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>Day {p.weeks * 7}+</div>
          <div style={{ fontSize: "var(--size-body)", fontWeight: 700 }}>{endLabel}</div>
        </div>
      </div>

      <figcaption
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--space-3) var(--space-6)",
          marginTop: "var(--space-5)",
          paddingTop: "var(--space-4)",
          borderTop: "1px solid var(--border-hairline)",
        }}
      >
        {[
          { label: "With Metabolic Morning Blend", color: "var(--series-plan)", dash: undefined },
          { label: "With dieting alone", color: "var(--series-diet)", dash: "9 7" },
        ].map((k) => (
          <span key={k.label} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontSize: "var(--size-meta)", fontWeight: 600 }}>
            <svg width={26} height={10} aria-hidden="true" style={{ flex: "none" }}>
              <line x1={1} y1={5} x2={25} y2={5} stroke={k.color} strokeWidth={3} strokeDasharray={k.dash} strokeLinecap="round" />
            </svg>
            {k.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
