import { HORIZON_DAYS, inUnit, levelWord, RATE_LABELS, type Metabolism, type Projection, type Row } from "@/lib/quiz/assessment";

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
/**
 * The projection curve. Weight for the diet funnel, good hours for the energy one:
 * the drawing is the same either way, so the series is passed in normalised rather
 * than the chart knowing what it plots. `compare` is the second, dashed line, given
 * as a fraction of the gap travelled at time t.
 */
export function ProjectionChart({
  p, startLabel, endLabel,
  format,
  planLabel = "With Metabolic Morning Blend",
  compareLabel = "With dieting alone",
  ariaNoun = "weight",
  compare = dietLoss,
}: {
  p: Projection;
  startLabel: string;
  endLabel: string;
  format?: (value: number) => string;
  planLabel?: string;
  compareLabel?: string;
  ariaNoun?: string;
  compare?: (t: number) => number;
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
  /* The value axis always puts the larger number at the top, whichever direction the
     series travels. Weight starts high and falls; good hours start low and climb.
     Deriving the window from min and max rather than from start and target is what
     keeps the second case from drawing upside down. */
  const pad = Math.abs(toLose) * 0.12;
  const lo = Math.min(p.start, p.target) - pad;
  const hi = Math.max(p.start, p.target) + pad;
  const x = (t: number) => padX + t * (W - padX * 2);
  const y = (lb: number) => padT + (1 - (lb - lo) / (hi - lo)) * (H - padT - padB);

  const DRAW_MS = 1400;
  const show = format ?? ((lb: number) => `${inUnit(lb, p.unit)} ${p.unit}`);

  const plan = p.points.map((pt, i) => `${i ? "L" : "M"}${x(pt.week / p.weeks).toFixed(1)} ${y(pt.lb).toFixed(1)}`).join(" ");
  const area = `${plan} L${x(1).toFixed(1)} ${H - padB} L${x(0).toFixed(1)} ${H - padB} Z`;

  const SAMPLES = 60;
  const diet = Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const t = i / SAMPLES;
    return `${i ? "L" : "M"}${x(t).toFixed(1)} ${y(p.start - toLose * compare(t)).toFixed(1)}`;
  }).join(" ");

  return (
    <figure style={{ margin: 0 }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Projected ${ariaNoun} from ${show(p.start)} to ${show(p.target)} over ${p.weeks} weeks, against a ${compareLabel.toLowerCase()} curve that gives most of it back`}
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          {/* Translucent fade rather than a flat block. The system bars gradients as
              page backgrounds; this is a chart area fill, where the fade is what stops
              the block competing with the line drawn on top of it. */}
          <linearGradient id="sc-plan-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--series-plan)" stopOpacity={0.28} />
            <stop offset="100%" stopColor="var(--series-plan)" stopOpacity={0.02} />
          </linearGradient>
          {/* The lines are drawn on by widening this clip, which works for the dashed
              series too. Animating stroke-dashoffset would only march the dashes. */}
          <clipPath id="sc-plan-reveal">
            <rect
              x={0}
              y={0}
              width={W}
              height={H}
              style={{
                transformBox: "fill-box",
                transformOrigin: "left center",
                animation: `sc-grow-x ${DRAW_MS}ms var(--ease-standard) both`,
              }}
            />
          </clipPath>
        </defs>

        {[1 / 3, 2 / 3].map((t) => (
          <line key={t} x1={x(t)} y1={padT - 6} x2={x(t)} y2={H - padB} stroke="var(--ink-20)" strokeWidth={1} />
        ))}
        <line x1={x(0)} y1={H - padB} x2={x(1)} y2={H - padB} stroke="var(--ink-20)" strokeWidth={1} />

        <g clipPath="url(#sc-plan-reveal)">
          <path d={area} fill="url(#sc-plan-fill)" />
          {/* Dashed, so the two series differ by more than hue. */}
          <path d={diet} fill="none" stroke="var(--series-diet)" strokeWidth={2.5} strokeDasharray="7 5" strokeLinecap="round" />
          <path d={plan} fill="none" stroke="var(--series-plan)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Each endpoint appears as the line reaches it. */}
        <g style={{ animation: `sc-fade-in var(--duration-base) var(--ease-standard) both` }}>
          <Pill cx={Math.max(x(0) + 16, 34)} cy={y(p.start)} label={show(p.start)} />
        </g>
        <g style={{ animation: `sc-fade-in var(--duration-base) var(--ease-standard) ${DRAW_MS - 200}ms both` }}>
          <Pill cx={Math.min(x(1) - 16, W - 34)} cy={y(p.target)} label={show(p.target)} />
        </g>
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
          <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>Day {HORIZON_DAYS}+</div>
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
          { label: planLabel, color: "var(--series-plan)", dash: undefined },
          { label: compareLabel, color: "var(--series-diet)", dash: "9 7" },
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


/* Four bands running slow to fast, so the ramp is the severity scale reversed: the
   bad end is on the left here. Every band is named underneath and both markers carry
   a text label, so the colour is a reinforcement rather than the message. */
/* One continuous ramp across the whole track rather than four flat blocks. Each
   segment paints the same gradient at four times its own width and slides it to its
   own slice, so the colour runs unbroken through the gaps without anyone hand mixing
   the in-between values. */
const RATE_RAMP = "linear-gradient(90deg, var(--scale-high), var(--zest), var(--scale-mid), var(--scale-low))";

const MARKER_AREA = 34;
const ARROW_H = 9;

const BAR_MS = 520;
const SLIDE_MS = 1100;
const SLIDE_DELAY_MS = 700;

/** Label with the arrow tip directly under it, nothing joining them. */
function Marker({ at, label, animation }: { at: number; label: string; animation: string }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: `${at}%`,
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        animation,
      }}
    >
      <span style={{ fontSize: "var(--size-meta)", fontWeight: 700, lineHeight: "20px", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span
        aria-hidden="true"
        style={{
          marginTop: 4,
          width: 0,
          height: 0,
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderTop: `${ARROW_H}px solid var(--ink)`,
        }}
      />
    </div>
  );
}

/** Where her metabolism sits now, and where the plan puts it. */
export function MetabolismGauge({ m, afterLabel }: { m: Metabolism; afterLabel: string }) {
  /* The plan marker starts where she is now and travels, so the screen shows the move
     rather than just its endpoint. The keyframes carry her own numbers, which is why
     they are emitted here instead of living in globals.css. Under reduced motion the
     global rule collapses the run to a single 1ms pass, which lands it on the final
     frame rather than holding it at the start. */
  const slide = `@keyframes sc-metab-slide {
    0% { left: ${m.now}%; opacity: 0; }
    18% { left: ${m.now}%; opacity: 1; }
    100% { left: ${m.after}%; opacity: 1; }
  }`;

  return (
    <div>
      <style>{slide}</style>

      <div style={{ position: "relative", height: MARKER_AREA, marginBottom: "var(--space-2)" }}>
        <Marker
          at={m.now}
          label="Right now"
          animation={`sc-fade-in var(--duration-base) var(--ease-standard) ${BAR_MS}ms both`}
        />
        <Marker
          at={m.after}
          label={afterLabel}
          animation={`sc-metab-slide ${SLIDE_MS}ms var(--ease-out) ${SLIDE_DELAY_MS}ms both`}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 3,
          animation: `sc-reveal-x ${BAR_MS}ms var(--ease-standard) both`,
        }}
        role="img"
        aria-label={`Metabolism now: ${RATE_LABELS[1]}. With the plan: ${RATE_LABELS[3]}`}
      >
        {RATE_LABELS.map((l, i) => (
          <span
            key={l}
            style={{
              flex: 1,
              height: 14,
              backgroundImage: RATE_RAMP,
              backgroundSize: `${RATE_LABELS.length * 100}% 100%`,
              backgroundPosition: `${(i / (RATE_LABELS.length - 1)) * 100}% 0`,
              borderRadius:
                i === 0 ? "var(--radius-pill) 0 0 var(--radius-pill)"
                : i === RATE_LABELS.length - 1 ? "0 var(--radius-pill) var(--radius-pill) 0"
                : 2,
            }}
          />
        ))}
      </div>

      <div style={{ display: "flex", marginTop: "var(--space-2)" }}>
        {RATE_LABELS.map((l, i) => (
          <span
            key={l}
            style={{
              flex: 1,
              /* The end labels pull to the outside edges rather than centring in a
                 quarter-width column, which is what made "Very slow" wrap on a 375px
                 screen. The inner two stay centred under their bands. */
              textAlign: i === 0 ? "left" : i === RATE_LABELS.length - 1 ? "right" : "center",
              whiteSpace: "nowrap",
              fontSize: "var(--size-meta)",
              color: "var(--ink-60)",
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
