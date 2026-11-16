import Image from "next/image";
import { Badge } from "@/components/core/Badge";
import { Wordmark } from "@/components/core/Wordmark";
import { RatingPill } from "@/components/quiz/RatingPill";
import { StartButton } from "@/components/quiz/StartButton";
import { RATING } from "@/lib/products/dog-itch";
import { dihQuiz } from "@/lib/quiz/dih";
import styles from "./landing.module.css";

/* The quiz's front door: a product-first promise, the offer, and one button. The photo leads
   on a phone and sits beside the text from the width where there is room for two columns. */
export default function DihQuizLandingPage() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--surface-sunk)" }}>
      <header style={{ background: "var(--white)", borderBottom: "1px solid var(--border-hairline)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "var(--space-3) var(--page-gutter-mobile)", display: "flex", justifyContent: "center" }}>
          <Wordmark size={24} />
        </div>
      </header>

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 1080,
          margin: "0 auto",
          padding: "var(--space-8) var(--page-gutter-mobile)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "var(--space-8)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "var(--space-5)" }}>
          <Badge tone="sky">Quiz</Badge>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h3), 7.6vw, var(--size-h1))",
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-snug)",
              textWrap: "balance",
            }}
          >
            Find out if Friday Zoomies salmon oil is <em style={{ fontWeight: 600 }}>right for your dog</em> and get 50% off
          </h1>
          <p style={{ margin: 0, maxWidth: 480, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
            This short quiz helps you see how Pure Omega Salmon Oil could support your dog&apos;s skin and coat.
          </p>
          <RatingPill value={RATING.score} count={RATING.count} />
          <StartButton config={dihQuiz}>Start now</StartButton>
        </div>

        <div className={styles.media}>
          <Image
            src="/quiz/fridayzoomies/hero-oil.webp"
            alt="A fluffy white Great Pyrenees lying in the grass next to a bottle of Friday Zoomies salmon oil"
            width={1000}
            height={1000}
            priority
            style={{ display: "block", width: "100%", maxWidth: 520, height: "auto", margin: "0 auto", borderRadius: "var(--radius-card)" }}
          />
        </div>
      </main>
    </div>
  );
}
