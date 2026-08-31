"use client";

import { Icon } from "@/components/core/Icon";
import { AGING_MAP, DOSE_BARS, GRADE_LABEL, type Grade } from "@/lib/products/revitalize";
import { CURVE, STUDIES, TIMELINE } from "@/lib/content/revitalize";
import Image from "next/image";
import styles from "./visuals.module.css";

/* Shared between the PDP and the advertorial, because both pages are arguing the same
   thing and neither should drift from the other. */

/**
 * Cortisol, drawn. An SVG rather than a picture of a chart, so it stays legible at any
 * width and the axis labels are real text a screen reader can read.
 */
export function CortisolCurve() {
  const W = 640, H = 260, PAD_L = 34, PAD_B = 34, PAD_T = 16, PAD_R = 12;
  const n = CURVE.hours.length;
  const x = (i: number) => PAD_L + (i * (W - PAD_L - PAD_R)) / (n - 1);
  const y = (v: number) => PAD_T + (1 - v / 130) * (H - PAD_T - PAD_B);
  const path = (vals: readonly number[]) =>
    vals.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

  return (
    <figure className={styles.chartFig}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.chart} role="img"
        aria-label="Two cortisol curves through the day. A normal profile peaks mid morning and falls steadily to near zero by midnight. A chronically strained profile starts higher, peaks higher, and stays well above the normal one all day.">
        {[0, 32.5, 65, 97.5, 130].map((v) => (
          <line key={v} x1={PAD_L} x2={W - PAD_R} y1={y(v)} y2={y(v)} className={styles.grid} />
        ))}
        <path d={path(CURVE.strained)} className={styles.lineStrained} />
        <path d={path(CURVE.normal)} className={styles.lineNormal} />
        {CURVE.strained.map((v, i) => <circle key={`s${i}`} cx={x(i)} cy={y(v)} r="4" className={styles.dotStrained} />)}
        {CURVE.normal.map((v, i) => <circle key={`n${i}`} cx={x(i)} cy={y(v)} r="4" className={styles.dotNormal} />)}
        {/* 3pm marked, because it is the moment the whole page is about. */}
        <line x1={x(3)} x2={x(3)} y1={PAD_T} y2={H - PAD_B} className={styles.marker} />
        <text x={x(3)} y={H - PAD_B + 22} className={styles.axis} textAnchor="middle">3pm</text>
        {CURVE.hours.map((h, i) =>
          i === 3 ? null : (
            <text key={h} x={x(i)} y={H - PAD_B + 22} className={styles.axis} textAnchor="middle">{h}</text>
          ))}
        <text x={PAD_L - 8} y={y(130) + 5} className={styles.axis} textAnchor="end">high</text>
        <text x={PAD_L - 8} y={y(0) + 5} className={styles.axis} textAnchor="end">low</text>
      </svg>
      <div className={styles.legend}>
        <span><span className={`${styles.swatch} ${styles.swatchNormal}`} aria-hidden="true" />{CURVE.legend[0].label}</span>
        <span><span className={`${styles.swatch} ${styles.swatchStrained}`} aria-hidden="true" />{CURVE.legend[1].label}</span>
      </div>
      <figcaption className={styles.caption}>{CURVE.caption}</figcaption>
    </figure>
  );
}

function GradeChip({ grade }: { grade: Grade }) {
  return (
    <span className={`${styles.grade} ${styles[grade]}`}>
      <span className={styles.pips} aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={i < (grade === "strong" ? 3 : grade === "supportive" ? 2 : 1) ? styles.pipOn : styles.pip} />
        ))}
      </span>
      {GRADE_LABEL[grade]}
    </span>
  );
}

/**
 * The problem, shown. One photograph per effect, a label and a single line. No doses,
 * no grades, no mechanism: this section's whole job is recognition. The fix is the
 * next section and it carries all of that.
 */
export function EffectGrid() {
  return (
    <div className={styles.effects}>
      {AGING_MAP.flatMap((g) => g.rows).map((r) => (
        <figure key={r.key} className={styles.effect}>
          <Image src={r.photo} alt={r.alt} width={800} height={800} className={styles.effectShot} />
          <figcaption>
            <span className={styles.effectTitle}>{r.short}</span>
            <span className={styles.effectBody}>{r.short_body}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * The fix, compact. One line per row: what it meets, what meets it, how good the
 * evidence is. The caveats are collected once underneath rather than repeated inside
 * fifteen cards, which is what made the old version unreadable.
 */
export function FixList() {
  const caveats = AGING_MAP.flatMap((g) => g.rows).filter((r) => r.caveat);
  return (
    <div className={styles.fix}>
      {AGING_MAP.map((g) => (
        <section key={g.group} className={styles.fixGroup}>
          <h3 className={styles.groupTitle}>{g.group}</h3>
          <ul className={styles.fixRows}>
            {g.rows.map((r) => (
              <li key={r.key} className={styles.fixRow}>
                <span className={styles.fixEffect}>{r.short}</span>
                <span className={styles.fixActives}>
                  {r.actives.map((a) => <span key={a} className={styles.active}>{a}</span>)}
                </span>
                <GradeChip grade={r.grade} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <details className={styles.caveats}>
        <summary className={styles.caveatsHead}>
          Where we are being careful ({caveats.length})
          <Icon name="chevron-down" size={20} strokeWidth={2.5} />
        </summary>
        <ul className={styles.caveatList}>
          {caveats.map((r) => (
            <li key={r.key}>
              <strong>{r.short}.</strong> {r.caveat}
            </li>
          ))}
        </ul>
      </details>

      <p className={styles.gradeKey}>
        Three pips is a required biochemical role or a controlled trial at a comparable
        dose. Two is an established role with a reasonable link. One is a plausible
        mechanism and thin human evidence. We would rather print the difference than
        average it away.
      </p>
    </div>
  );
}

/** Future pacing, staged by the biology rather than by when we want you to re-order. */
export function Timeline() {
  return (
    <ol className={styles.tl}>
      {TIMELINE.stages.map((st) => (
        <li key={st.when} className={styles.tlStage}>
          <span className={styles.tlWhen}>{st.when}</span>
          <div className={styles.tlCard}>
            <h3 className={styles.tlTitle}>{st.title}</h3>
            <p className={styles.tlBody}>{st.body}</p>
            <p className={styles.fixActives}>
              {st.actives.map((a) => <span key={a} className={styles.active}>{a}</span>)}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** The panel as a picture. One bar per nutrient, at its own %DV. */
export function DoseBars() {
  return (
    <div className={styles.bars}>
      {DOSE_BARS.map((d) => (
        <div key={d.name} className={styles.bar}>
          <span className={styles.barName}>{d.name}</span>
          <span className={styles.barTrack} aria-hidden="true">
            <span className={styles.barFill} style={{ width: `${Math.min(d.pct, 100)}%` }} />
          </span>
          <span className={styles.barVal}>{d.amount} <span className={styles.barPct}>{d.pct}% DV</span></span>
        </div>
      ))}
    </div>
  );
}

/** The evidence, with its design and sample size on the front of the card. */
export function StudyCards() {
  return (
    <div className={styles.studies}>
      {STUDIES.map((s) => (
        <article key={s.finding} className={styles.study}>
          <div className={styles.studyMeta}>
            <span className={styles.studyN}>{s.n}</span>
            <span className={styles.studyDesign}>{s.design}</span>
          </div>
          <h3 className={styles.studyFinding}>{s.finding}</h3>
          <p className={styles.studyBody}>{s.body}</p>
          <p className={styles.studyCite}>{s.cite}</p>
        </article>
      ))}
      <p className={styles.gradeKey}>
        None of these is a trial of Revitalize. They are the research on stress and on
        the nutrients in it, which is a different and smaller claim, and the only one we
        can make until we have run something ourselves.
      </p>
    </div>
  );
}
