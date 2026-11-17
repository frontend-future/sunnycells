import Image from "next/image";
import { Wordmark } from "@/components/core/Wordmark";
import { StartButton } from "@/components/quiz/StartButton";
import { plcQuiz } from "@/lib/quiz/plc";
import styles from "./landing.module.css";

/* The quiz's front door: a product-first promise, the offer, and one button. The photo leads
   on a phone and sits beside the text from the width where there is room for two columns. */
export default function PlcQuizLandingPage() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", background: "var(--surface-sunk)" }}>
      <header style={{ background: "var(--white)", borderBottom: "1px solid var(--border-hairline)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "var(--space-3) var(--page-gutter-mobile)", display: "flex", justifyContent: "center" }}>
          <Wordmark size={24} />
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.text}>
          <h1
            style={{
              margin: 0,
              /* The body face, not the tight display face: wider letters and normal spacing read
                 more easily at this size, especially for an older audience. */
              fontFamily: "var(--font-text)",
              fontSize: "clamp(var(--size-h3), 7.6vw, var(--size-h1))",
              letterSpacing: "-0.01em",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            Scratching, paw licking, head shaking? See what your dog&apos;s <em style={{ fontWeight: 600 }}>skin</em> is telling you
          </h1>
          <p style={{ margin: 0, maxWidth: 480, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
            Take the 30-second quiz to see if Friday Zoomies Pure Omega Salmon Oil can calm your dog&apos;s itchy skin and ease what you&apos;re seeing.
          </p>
          <StartButton config={plcQuiz}>Start My Quiz</StartButton>
        </div>

        <div className={styles.media}>
          <Image
            src="/quiz/fridayzoomies/hero-oil.webp"
            alt="A fluffy white Great Pyrenees lying in the grass next to a bottle of Friday Zoomies salmon oil"
            fill
            priority
            sizes="(min-width: 900px) 520px, 100vw"
            style={{ objectFit: "cover", objectPosition: "30% 50%", borderRadius: "var(--radius-card)" }}
          />
        </div>
      </main>
    </div>
  );
}
