"use client";

import Image from "next/image";
import { Accordion } from "@/components/navigation/Accordion";
import { Badge } from "@/components/core/Badge";
import { BrandText } from "@/components/core/BrandText";
import { Button } from "@/components/core/Button";
import { Icon } from "@/components/core/Icon";
import { StarRating } from "@/components/commerce/StarRating";
import { Wordmark } from "@/components/core/Wordmark";
import { dietQuiz } from "@/lib/quiz/diet";
import { useAnswers } from "@/lib/quiz/store";
import {
  COMPARISON, FAQS, HEADLINE_REVIEW, INGREDIENTS, PILLARS, QUICK_BENEFITS, REVIEWS,
} from "@/lib/quiz/plansContent";
import { AnnouncementMarquee } from "./AnnouncementMarquee";
import { HeroCarousel } from "./HeroCarousel";
import { OfferCountdown } from "./OfferCountdown";
import { PlanCards } from "./PlanCards";

const PRESS = [
  { name: "Business Insider", src: "/press/business-insider.webp", width: 256, height: 80 },
  { name: "Women's Health", src: "/press/womens-health.webp", width: 256, height: 52 },
  { name: "Healthline", src: "/press/healthline.webp", width: 256, height: 42 },
  { name: "Sports Illustrated", src: "/press/sports-illustrated.webp", width: 256, height: 78 },
];

const HERO_POINTS = ["Helps with weight loss", "Lowers cortisol levels", "Relieves mood swings"];

const TRUST = [
  { icon: "truck", label: "Free shipping" },
  { icon: "shield-check", label: "Made in the USA" },
  { icon: "check", label: "Third party tested" },
] as const;

function Section({
  title, sub, children, tone = "white", id,
}: {
  title?: string;
  sub?: string;
  children: React.ReactNode;
  tone?: "white" | "shell";
  id?: string;
}) {
  return (
    <section
      id={id}
      style={{
        background: tone === "shell" ? "var(--surface-sunk)" : "var(--surface-page)",
        padding: "var(--space-16) var(--page-gutter-mobile)",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {title ? (
          <h2
            style={{
              margin: "0 0 var(--space-3)",
              textAlign: "center",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-h4), 5.4vw, var(--size-h2))",
              fontWeight: 900,
              letterSpacing: "var(--tracking-heading)",
              lineHeight: "var(--leading-snug)",
            }}
          >
            {title}
          </h2>
        ) : null}
        {sub ? (
          <p style={{ margin: "0 auto var(--space-8)", maxWidth: 620, textAlign: "center", fontSize: "var(--size-body)", color: "var(--ink-80)" }}>
            {sub}
          </p>
        ) : (
          title && <div style={{ height: "var(--space-8)" }} />
        )}
        {children}
      </div>
    </section>
  );
}

function Tick() {
  return (
    <span
      aria-hidden="true"
      style={{
        flex: "none",
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: "var(--ink)",
        color: "var(--sun)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon name="check" size={15} strokeWidth={3.5} />
    </span>
  );
}

export function PlansScreen() {
  const { answers } = useAnswers(dietQuiz.id);
  const set = answers.gender === "Male" ? "male" : "female";

  return (
    <div style={{ background: "var(--surface-page)" }}>
      {/* Offer bar. The countdown is the brand's one timer, called out in
          OfferCountdown. Sun with ink on it, the only pairing allowed on yellow. */}
      <div
        style={{
          background: "var(--sun)",
          color: "var(--ink)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-3) var(--space-6)",
          padding: "8px var(--page-gutter-mobile)",
          fontSize: "var(--size-meta)",
          fontWeight: 700,
          letterSpacing: "var(--tracking-caps)",
          textTransform: "uppercase",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)" }}>
          Limited time offer <Badge tone="ink">50% off</Badge> <OfferCountdown />
        </span>
        <span style={{ fontWeight: 500 }}>30 day money back guarantee</span>
      </div>

      <AnnouncementMarquee
        terms={[
          { strong: "Free shipping", rest: "on all orders" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      {/* Hero */}
      <section style={{ padding: "var(--space-8) var(--page-gutter-mobile) var(--space-12)" }}>
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "var(--space-8)",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "clamp(var(--size-h3), 6.4vw, var(--size-h1))",
                fontWeight: 900,
                letterSpacing: "var(--tracking-heading)",
                lineHeight: "var(--leading-snug)",
              }}
            >
              Complete natural formula
            </h1>
            <p style={{ margin: "var(--space-4) 0 var(--space-6)", fontSize: "var(--size-body-lg)", lineHeight: 1.35 }}>
              <BrandText>SUNNYCELLS is here to release your stress and help you to lose weight.</BrandText>
            </p>
            <ul style={{ margin: "0 0 var(--space-6)", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {HERO_POINTS.map((h) => (
                <li key={h} style={{ display: "flex", gap: "var(--space-3)", alignItems: "center", fontSize: "var(--size-body)" }}>
                  <Tick />
                  {h}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "var(--space-4)" }}>
              <Button
                size="lg"
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get it now
              </Button>

              {/* The shipping line as a badge rather than a note under the button, so it
                  reads as a term of the offer instead of small print. */}
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  minHeight: "var(--control-h-lg)",
                  padding: "var(--space-2) var(--space-5) var(--space-2) var(--space-2)",
                  background: "var(--white)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: "var(--radius-pill)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "var(--sun)",
                    color: "var(--ink)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon name="percent" size={22} strokeWidth={2.5} />
                </span>
                <span style={{ lineHeight: 1.25 }}>
                  <span style={{ display: "block", fontSize: "var(--size-body)", fontWeight: 800 }}>Order now</span>
                  <span style={{ display: "block", fontSize: "var(--size-meta)" }}>
                    and get it shipped for <strong style={{ fontWeight: 800 }}>free</strong>
                  </span>
                </span>
              </span>
            </div>
          </div>

          <HeroCarousel photoSet={set} />
        </div>
      </section>

      {/* Plans */}
      <Section id="plans" title="Let the Blend do the work" tone="shell">
        {/* Sits above the cards, where it is an argument for the longer supply rather
            than a line of small print underneath one. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-4)",
            maxWidth: 620,
            margin: "0 auto var(--space-8)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              flex: "none",
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "var(--sun)",
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "var(--size-body)",
              letterSpacing: "-0.02em",
            }}
          >
            2x
          </span>
          <span style={{ fontSize: "var(--size-body)", lineHeight: 1.35, textAlign: "left" }}>
            <BrandText>
              People using SUNNYCELLS for 3 months lose twice as much weight as for 1 month
            </BrandText>
          </span>
        </div>

        <PlanCards />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "var(--space-6)",
            marginTop: "var(--space-8)",
          }}
        >
          {TRUST.map((t) => (
            <span key={t.label} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--size-meta)", fontWeight: 600 }}>
              <Icon name={t.icon} size={20} />
              {t.label}
            </span>
          ))}
        </div>
      </Section>

      {/* Quick benefits */}
      <Section title="Benefits">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-4)" }}>
          {QUICK_BENEFITS.map((b) => (
            <div
              key={b}
              style={{
                display: "flex",
                gap: "var(--space-3)",
                alignItems: "flex-start",
                padding: "var(--space-5)",
                background: "var(--sun-tint)",
                borderRadius: "var(--radius-card)",
                fontSize: "var(--size-body)",
                lineHeight: 1.4,
              }}
            >
              <Tick />
              {b}
            </div>
          ))}
        </div>
      </Section>

      {/* Pillars */}
      <Section tone="shell">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-6)" }}>
          {PILLARS.map((p) => (
            <div key={p.slug} style={{ textAlign: "center" }}>
              <Image
                src={`/illustrations/${p.slug}-${set}.png`}
                alt=""
                width={320}
                height={320}
                style={{ width: 120, height: 120, margin: "0 auto" }}
              />
              <h3 style={{ margin: "var(--space-3) 0 var(--space-2)", fontSize: "var(--size-body-lg)", fontWeight: 800, lineHeight: 1.25 }}>
                {p.title}
              </h3>
              <p style={{ margin: 0, fontSize: "var(--size-body)", color: "var(--ink-80)", lineHeight: "var(--leading-body)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Press */}
      <Section title="Featured in">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            alignItems: "center",
            justifyItems: "center",
            gap: "var(--space-8)",
            maxWidth: 760,
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
              style={{ width: "100%", height: "auto", maxWidth: 150, maxHeight: 46, objectFit: "contain", filter: "grayscale(1)", opacity: 0.55 }}
            />
          ))}
        </div>
      </Section>

      {/* Headline review */}
      <Section tone="shell">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-8)", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--size-meta)", fontWeight: 700 }}>{HEADLINE_REVIEW.name}</span>
              <Badge tone="success">Verified</Badge>
            </div>
            <StarRating value={5} size={18} />
            <h3 style={{ margin: "var(--space-4) 0 var(--space-3)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)", lineHeight: 1.2 }}>
              {HEADLINE_REVIEW.title}
            </h3>
            <p style={{ margin: 0, fontSize: "var(--size-body)", lineHeight: "var(--leading-body)", color: "var(--ink-80)" }}>
              {HEADLINE_REVIEW.body}
            </p>
          </div>
          <Image
            src={`/photos/story-${set}.jpg`}
            alt=""
            width={1080}
            height={1480}
            style={{ width: "auto", maxWidth: "100%", maxHeight: 420, height: "auto", margin: "0 auto", display: "block", borderRadius: "var(--radius-card)" }}
          />
        </div>
      </Section>

      {/* Reviews */}
      <Section title="Thousands of happy clients" sub="This could be you. Read what customers around the world say.">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--space-5)" }}>
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                padding: "var(--space-5)",
                border: "1px solid var(--border-hairline)",
                borderRadius: "var(--radius-card)",
              }}
            >
              <StarRating value={5} size={16} />
              <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
                <Image src={r.photo} alt="" width={200} height={200} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
                <span>
                  <span style={{ display: "block", fontSize: "var(--size-meta)", fontWeight: 700 }}>{r.name}</span>
                  <span style={{ fontSize: "var(--size-meta)", color: "var(--status-success)", fontWeight: 600 }}>Verified buyer</span>
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "var(--size-meta)", lineHeight: 1.55, color: "var(--ink-80)" }}>{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Ingredients */}
      <Section title="The science behind the core ingredients" tone="shell">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Accordion items={INGREDIENTS} />
        </div>
      </Section>

      {/* How it works */}
      <Section title="How does it work?">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-8)", maxWidth: 720, margin: "0 auto" }}>
          {[
            { img: "step-scoop", title: "Add 1 scoop", body: "Mix a scoop into water or your favorite juice. Drink it in the morning." },
            { img: "step-drink", title: "Feel calmer and healthier", body: "Notice your cortisol blend take effect within 48 hours. Release stress and boost your metabolism." },
          ].map((s) => (
            <div key={s.img} style={{ textAlign: "center" }}>
              <Image src={`/illustrations/${s.img}.png`} alt="" width={320} height={320} style={{ width: 130, height: 130, margin: "0 auto" }} />
              <h3 style={{ margin: "var(--space-3) 0 var(--space-2)", fontSize: "var(--size-body-lg)", fontWeight: 800 }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: "var(--size-body)", color: "var(--ink-80)", lineHeight: "var(--leading-body)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Comparison */}
      <Section tone="shell">
        <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--white)", border: "1px solid var(--border-hairline)", borderRadius: "var(--radius-card)", padding: "var(--space-6)" }}>
          <h2 style={{ margin: "0 0 var(--space-2)", fontFamily: "var(--font-display)", fontSize: "var(--size-h4)", fontWeight: 900, letterSpacing: "var(--tracking-heading)" }}>
            Metabolic Morning Blend
          </h2>
          <p style={{ margin: "0 0 var(--space-6)", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
            Compared to other cortisol lowering drinks
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--size-meta)" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }} />
                <th style={{ width: 72, padding: "0 0 var(--space-3)", fontWeight: 800 }}>Ours</th>
                <th style={{ width: 72, padding: "0 0 var(--space-3)", fontWeight: 600, color: "var(--ink-60)" }}>Others</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row} style={{ borderTop: "1px solid var(--border-hairline)" }}>
                  <td style={{ padding: "var(--space-3) var(--space-3) var(--space-3) 0", lineHeight: 1.4 }}>{row}</td>
                  <td style={{ textAlign: "center", color: "var(--status-success)" }}>
                    <Icon name="check" size={20} strokeWidth={3} title="Yes" />
                  </td>
                  <td style={{ textAlign: "center", color: "var(--ink-40)" }}>
                    <Icon name="x" size={20} strokeWidth={3} title="No" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Testing */}
      <Section title="Pioneering world leading quality standards and testing">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-8)", maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          {[
            { t: "Third party tested", b: "Tested at an independent laboratory to confirm quality and potency." },
            { t: "Heavy metal tested", b: "Every batch is screened for heavy metals against world class testing methods." },
          ].map((s) => (
            <div key={s.t}>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  background: "var(--sun)",
                  color: "var(--ink)",
                }}
              >
                <Icon name="shield-check" size={38} />
              </span>
              <h3 style={{ margin: "var(--space-3) 0 var(--space-2)", fontSize: "var(--size-body-lg)", fontWeight: 800 }}>{s.t}</h3>
              <p style={{ margin: 0, fontSize: "var(--size-meta)", color: "var(--ink-80)", lineHeight: 1.5 }}>{s.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section title="Frequently asked questions" tone="shell">
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Accordion items={FAQS} />
        </div>
      </Section>

      <footer style={{ borderTop: "1px solid var(--border-hairline)", padding: "var(--space-12) var(--page-gutter-mobile)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Wordmark size={20} tone="ink" style={{ opacity: 0.35 }} />
          <p style={{ margin: "var(--space-5) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)", lineHeight: 1.55 }}>
            These statements have not been evaluated by the Food and Drug Administration.
            This product is not intended to diagnose, treat, cure, or prevent any disease.
            Results vary from person to person.
          </p>
          <p style={{ margin: "var(--space-4) 0 0", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
            Copyright © 2026 SUNNYCELLS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
