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

const PRESS = [
  { name: "Business Insider", src: "/press/business-insider.webp", width: 256, height: 80 },
  { name: "Women's Health", src: "/press/womens-health.webp", width: 256, height: 52 },
  { name: "Healthline", src: "/press/healthline.webp", width: 256, height: 42 },
  { name: "Sports Illustrated", src: "/press/sports-illustrated.webp", width: 256, height: 78 },
];

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
          {/* Sentence case, not the display caps the casing table calls for on a hero.
              This one is set to match the sister brand's start page. */}
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h3), 8.2vw, var(--size-h1))",
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-snug)",
              textWrap: "balance",
            }}
          >
            <span style={{ fontWeight: 600 }}>Release stress &amp; lose weight with </span>
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
            Balancing your levels of cortisol can help with weight loss, better skin,
            cortisol belly and more.
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
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              justifyItems: "center",
              gap: "var(--space-10) var(--space-8)",
              maxWidth: 460,
              margin: "0 auto",
            }}
          >
            {PRESS.map((p) => (
              <Image
                key={p.src}
                src={p.src}
                alt={p.name}
                width={p.width}
                height={p.height}
                style={{
                  /* All four files are 256px wide at different heights, so capping
                     both dimensions lets the two-line lockups sit taller than the
                     single-line ones, which is how the wordmarks are drawn. */
                  width: "100%",
                  height: "auto",
                  maxWidth: 180,
                  maxHeight: 56,
                  objectFit: "contain",
                  /* grayscale() alone would do nothing visible: two of these are
                     already black. The opacity is what makes them read grey. 0.55
                     lands black at roughly --ink-60 on white, which is the lightest
                     value the system will put legible content at. */
                  filter: "grayscale(1)",
                  opacity: 0.55,
                }}
              />
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
