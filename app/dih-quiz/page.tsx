import Image from "next/image";
import { Badge } from "@/components/core/Badge";
import { Wordmark } from "@/components/core/Wordmark";
import { StartButton } from "@/components/quiz/StartButton";
import { dihQuiz } from "@/lib/quiz/dih";

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
            Scratching, paw licking, head shaking? See what your dog&apos;s <em style={{ fontWeight: 600 }}>skin</em> is telling you
          </h1>
          <p style={{ margin: 0, maxWidth: 480, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)" }}>
            Take the 30-second quiz to see if Friday Zoomies Pure Omega Salmon Oil can calm your dog&apos;s itchy skin and ease what you&apos;re seeing. Finish it and get 50% off.
          </p>
          <StartButton config={dihQuiz}>Start now</StartButton>
        </div>

        <div>
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
