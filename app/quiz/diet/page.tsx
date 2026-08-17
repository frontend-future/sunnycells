import type { Metadata } from "next";
import Image from "next/image";
import { NavLink } from "@/components/navigation/NavLink";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { Wordmark } from "@/components/core/Wordmark";
import { RatingPill } from "@/components/quiz/RatingPill";
import { StartChoice } from "@/components/quiz/StartChoice";
import { dietQuiz } from "@/lib/quiz/diet";

export const metadata: Metadata = {
  title: "Cortisol quiz | SUNNYCELLS",
  description:
    "Twenty questions, about two minutes. Get a read on your cortisol pattern and what to do about it.",
};

const FOOTER_LINKS = [
  [
    { label: "Privacy policy", href: "#" },
    { label: "Terms and conditions", href: "#" },
    { label: "Refund policy", href: "#" },
  ],
  [
    { label: "Shipping policy", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Support", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Science", href: "#" },
  ],
];

export default function QuizLandingPage() {
  return (
    <>
      <AnnouncementMarquee
        terms={[
          { strong: "Free shipping", rest: "on all orders" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      {/* The flat tint block sits behind the top of the product and the cutout
          overhangs it onto white. That overhang is the brand's merchandising move, and
          it is also what the reference's peach gradient is doing, minus the gradient. */}
      <div style={{ position: "relative", background: "var(--white)" }}>
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: "0 0 34% 0", background: "var(--sun-tint)" }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "var(--page-max)",
            margin: "0 auto",
            padding: "var(--space-4) var(--page-gutter-mobile) 0",
          }}
        >
          <Wordmark size={26} />
          <Image
            src="/product/metabolic-morning-blend.png"
            alt="SC-21 Metabolic Morning Blend, a yellow pouch beside a scoop of powder"
            width={2400}
            height={1792}
            priority
            style={{
              display: "block",
              width: "100%",
              maxWidth: 560,
              height: "auto",
              maxHeight: "min(21vh, 300px)",
              objectFit: "contain",
              margin: "0 auto",
            }}
          />
        </div>
      </div>

      <main style={{ width: "100%", maxWidth: 720, margin: "0 auto", padding: "0 var(--page-gutter-mobile)" }}>
        <div style={{ textAlign: "center", paddingTop: "var(--space-6)" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h4), 7.6vw, var(--size-h1))",
              letterSpacing: "var(--tracking-display)",
              lineHeight: "var(--leading-snug)",
              textTransform: "uppercase",
              textWrap: "balance",
            }}
          >
            <span style={{ fontWeight: 700 }}>Lose the cortisol belly with </span>
            <span style={{ fontWeight: 900 }}>Metabolic Morning Blend</span>
          </h1>

          <p
            style={{
              maxWidth: 480,
              margin: "var(--space-4) auto 0",
              fontSize: "var(--size-body)",
              lineHeight: 1.45,
              textWrap: "pretty",
            }}
          >
            Cortisol that stays high changes where you store fat and how you sleep.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-4)" }}>
            <RatingPill value={4.7} count={12480} />
          </div>

          <StartChoice
            config={dietQuiz}
            field="gender"
            options={[
              { label: "Male", icon: "mars" },
              { label: "Female", icon: "venus", variant: "accent" },
            ]}
          />

          <p style={{ marginTop: "var(--space-4)", marginBottom: 0, fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
            Twenty questions, about two minutes. Your answers stay in this browser.
          </p>
        </div>

        <section style={{ padding: "var(--space-20) 0 var(--space-16)", textAlign: "center" }}>
          <h2
            style={{
              margin: "0 0 var(--space-10)",
              fontFamily: "var(--font-text)",
              fontSize: "var(--size-body-lg)",
              fontWeight: 600,
              letterSpacing: 0,
            }}
          >
            Benefits of our ingredients are researched by:
          </h2>
          {/* NO PUBLICATION LOGOS WERE SUPPLIED, and the reference's belong to third
              parties: reprinting them here would assert an endorsement of SUNNYCELLS
              that does not exist. The slot is held open the same way ProductCard holds
              one open for a missing cutout. */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "var(--space-6)",
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 72,
                  border: "1px dashed var(--border-hairline)",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-label)",
                  fontSize: "var(--size-meta)",
                  fontWeight: 600,
                  letterSpacing: "var(--tracking-mono)",
                  color: "var(--ink-60)",
                }}
              >
                Publication logo
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid var(--border-hairline)", padding: "var(--space-12) var(--page-gutter-mobile)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Wordmark size={22} tone="ink" style={{ opacity: 0.35 }} />
          <p style={{ margin: "var(--space-6) 0 var(--space-6)", fontSize: "var(--size-meta)", color: "var(--ink-80)" }}>
            Copyright © 2026 SUNNYCELLS. All rights reserved.
          </p>
          {FOOTER_LINKS.map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0 var(--space-6)",
              }}
            >
              {row.map((l) => (
                <NavLink key={l.label} href={l.href} size="sm" style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          ))}
          <p style={{ margin: "var(--space-8) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)", lineHeight: 1.5 }}>
            These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
          </p>
        </div>
      </footer>
    </>
  );
}
