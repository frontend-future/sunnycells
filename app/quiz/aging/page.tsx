import type { Metadata } from "next";
import Image from "next/image";
import { NavLink } from "@/components/navigation/NavLink";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { Wordmark } from "@/components/core/Wordmark";
import { RatingPill } from "@/components/quiz/RatingPill";
import { StartChoice } from "@/components/quiz/StartChoice";
import { RATING } from "@/lib/products/complete-collagen";
import { agingQuiz } from "@/lib/quiz/aging";

export const metadata: Metadata = {
  title: "Aging quiz | SUNNYCELLS",
  description:
    "Twenty questions, about two minutes. Find out where your collagen is going and what it is doing to your skin, hair and nails.",
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

export default function AgingQuizLandingPage() {
  return (
    <>
      <AnnouncementMarquee
        terms={[
          { strong: "Free shipping", rest: "on all orders" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      {/* The flat tint block sits behind the top of the product and the cutout overhangs
          it onto white, the same merchandising move the diet funnel opens with. Sprout
          rather than sun, because this is the energy family. */}
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
            src="/product/complete-collagen.webp"
            alt="SC-23 Complete Collagen, a cream pouch of unflavored collagen powder"
            width={1024}
            height={768}
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
          {/* Sentence case, matching the diet funnel's start page rather than the
              display caps the casing table calls for on a hero. */}
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
            <span style={{ fontWeight: 600 }}>Replace the collagen you stopped making with </span>
            <span style={{ fontWeight: 900 }}>Complete Collagen</span>
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
            Your body makes about one percent less collagen every year from your mid
            twenties. Find out what that is doing to your skin, hair and nails.
          </p>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-4)" }}>
            <RatingPill value={RATING.score} count={RATING.count} />
          </div>

          <StartChoice
            config={agingQuiz}
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
                  width: "100%",
                  height: "auto",
                  maxWidth: 180,
                  maxHeight: 56,
                  objectFit: "contain",
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
