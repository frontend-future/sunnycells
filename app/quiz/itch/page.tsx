import type { Metadata } from "next";
import Image from "next/image";
import { NavLink } from "@/components/navigation/NavLink";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { Wordmark } from "@/components/core/Wordmark";
import { RatingPill } from "@/components/quiz/RatingPill";
import { StartChoice } from "@/components/quiz/StartChoice";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { RATING } from "@/lib/products/dog-itch";
import styles from "./theme.module.css";

export const metadata: Metadata = {
  description: "A couple minutes of questions to find out why your dog is itching, and what to do about it.",
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
  ],
];

export default function FridayZoomiesLandingPage() {
  return (
    <>
      <AnnouncementMarquee
        terms={[
          { strong: "Free shipping", rest: "on your first order" },
          { strong: "90 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      <div style={{ position: "relative", background: "var(--surface-sunk)" }}>
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: "0 0 34% 0", background: "var(--sprout-tint)" }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "var(--page-max)",
            margin: "0 auto",
            padding: "var(--space-5) var(--page-gutter-mobile) 0",
          }}
        >
          <Wordmark size={24} style={{ display: "block", margin: "0 auto" }} />
          {/* The jar's own sky blue ground sits straight on the page's sky panel, so the
              product reads as the answer to the hook before a question is asked. */}
          <div style={{ maxWidth: "min(320px, calc(24.5dvh + max(0px, 100dvh - 740px) * 0.25))", margin: "var(--space-4) auto 0", paddingBottom: "var(--space-3)" }}>
            <Image
              src="/quiz/fridayzoomies/hero-chew-spray.webp"
              alt="A fluffy white Great Pyrenees lying in the grass next to Friday Zoomies daily chews and itch spray"
              width={1000}
              height={1000}
              priority
              style={{ display: "block", width: "100%", height: "auto", borderRadius: "var(--radius-card)" }}
            />
          </div>
        </div>
      </div>

      <main style={{ width: "100%", maxWidth: 720, margin: "0 auto", padding: "0 var(--page-gutter-mobile)" }}>
        <div style={{ textAlign: "center", paddingTop: "var(--space-3)" }}>
          <h1
            className={styles.sentence}
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h3), 7.6vw, var(--size-h1))",
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-snug)",
              textWrap: "balance",
            }}
          >
            <span style={{ fontWeight: 900 }}>Discover why your dog is itching</span>
          </h1>

          <p
            style={{
              maxWidth: 480,
              margin: "var(--space-2) auto 0",
              fontSize: "var(--size-body)",
              lineHeight: 1.35,
              textWrap: "pretty",
            }}
          >
            A couple minutes of questions to get to the root cause of the scratching,
            licking, and skin irritation, and what to do about it.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-3)" }}>
            <RatingPill value={RATING.score} count={RATING.count} />
          </div>

          <p
            style={{
              margin: "var(--space-4) 0 0",
              fontSize: "var(--size-body)",
              fontWeight: 700,
            }}
          >
            What gender is your dog?
          </p>

          <StartChoice
            config={itchFridayZoomiesQuiz}
            field="gender"
            marginTop="var(--space-3)"
            shadow="0 10px 24px rgba(20, 30, 60, 0.28), 0 3px 6px rgba(20, 30, 60, 0.18)"
            options={[
              { label: "Male", icon: "mars" },
              { label: "Female", icon: "venus", variant: "accent" },
            ]}
          />
        </div>
      </main>

      <footer style={{ borderTop: "1px solid var(--border-hairline)", padding: "var(--space-12) var(--page-gutter-mobile)", marginTop: "var(--space-16)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Wordmark size={22} tone="ink" style={{ opacity: 0.35 }} />
          <p style={{ margin: "var(--space-6) 0 var(--space-6)", fontSize: "var(--size-meta)", color: "var(--ink-80)" }}>
            Copyright © 2026 Friday Zoomies. All rights reserved.
          </p>
          {FOOTER_LINKS.map((row, i) => (
            <div key={i} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 var(--space-6)" }}>
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
