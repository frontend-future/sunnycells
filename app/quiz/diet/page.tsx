import type { Metadata } from "next";
import Image from "next/image";
import { Banner } from "@/components/feedback/Banner";
import { StarRating } from "@/components/commerce/StarRating";
import { Wordmark } from "@/components/core/Wordmark";
import { StartChoice } from "@/components/quiz/StartChoice";
import { dietQuiz } from "@/lib/quiz/diet";

export const metadata: Metadata = {
  title: "Cortisol quiz | SUNNYCELLS",
  description:
    "Twenty questions, about two minutes. Get a read on your cortisol pattern and what to do about it.",
};

export default function QuizLandingPage() {
  return (
    <>
      <Banner tone="ink">Free shipping · Sixty-day returns</Banner>

      <header
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "var(--space-4) var(--page-gutter-mobile)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <Wordmark size={24} />
      </header>

      <main style={{ width: "100%", maxWidth: 720, margin: "0 auto", padding: "0 var(--page-gutter-mobile) var(--space-16)" }}>
        {/* --shell, not --sun: the pouch is already the brand yellow, so a sun block
            behind it hides the product it is meant to present.
            The height cap is what keeps the gender buttons above the fold on a 375px
            screen. Uncapped it was a 280px image and the buttons sat 254px down-page. */}
        <div
          style={{
            background: "var(--shell)",
            borderRadius: "0 0 var(--radius-xl) var(--radius-xl)",
            paddingTop: "var(--space-4)",
          }}
        >
          <Image
            src="/product/metabolic-morning-blend.png"
            alt="SC-21 Metabolic Morning Blend, a yellow pouch beside a scoop of powder"
            width={2400}
            height={1792}
            priority
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "min(21vh, 240px)",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        <div style={{ textAlign: "center", paddingTop: "var(--space-6)" }}>
          <div
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "var(--size-meta)",
              fontWeight: 600,
              letterSpacing: "var(--tracking-mono)",
              color: "var(--ink-60)",
            }}
          >
            Twenty questions · About two minutes
          </div>
          <h1
            style={{
              margin: "var(--space-3) 0 0",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h3), 8vw, var(--size-display))",
              fontWeight: 900,
              letterSpacing: "var(--tracking-display)",
              lineHeight: "var(--leading-tight)",
              textTransform: "uppercase",
            }}
          >
            Cortisol first.
            <br />
            The scale second.
          </h1>
          <p
            style={{
              maxWidth: 520,
              margin: "var(--space-4) auto 0",
              fontSize: "var(--size-body)",
              lineHeight: 1.45,
            }}
          >
            Cortisol that stays high changes where your body stores fat. See where yours sits.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-4)" }}>
            <StarRating value={4.7} count={12480} showValue />
          </div>

          <StartChoice
            config={dietQuiz}
            field="gender"
            options={[{ label: "Male" }, { label: "Female", variant: "accent" }]}
          />

          <p style={{ marginTop: "var(--space-4)", marginBottom: 0, fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
            Your answers stay in this browser until you choose to send them.
          </p>
        </div>

        <section style={{ marginTop: "var(--space-16)", borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--space-10)" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "var(--size-h3)", fontWeight: 800, letterSpacing: "var(--tracking-heading)" }}>
            What the quiz is built on
          </h2>
          <p style={{ fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)", maxWidth: 620 }}>
            The questions follow the symptom clusters used in published cortisol research:
            central fat gain, disrupted sleep, cognitive fog, skin thinning, and appetite
            change. It is a screening questionnaire, not a diagnosis. A blood or saliva
            test is the only way to measure your cortisol, and a doctor is the only person
            who can interpret it.
          </p>
        </section>
      </main>

      <footer style={{ background: "var(--shell)", borderTop: "1px solid var(--border-hairline)", padding: "var(--space-10) var(--page-gutter-mobile)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Wordmark size={20} />
          <p style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)", marginBottom: 0 }}>
            These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </footer>
    </>
  );
}
