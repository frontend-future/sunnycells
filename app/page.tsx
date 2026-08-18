"use client";

import { useState } from "react";
import {
  Accordion, Badge, Banner, Breadcrumb, Button, Card, Checkbox, Dialog, Icon,
  IconButton, Input, NavLink, OfferFlag, Price, ProductCard, QuantityStepper,
  RadioOption, Select, StarRating, SubscriptionBox, Switch, Tabs, Tag, Toast,
  Wordmark,
} from "@/components";

/* The system reference. This is not the storefront, it is the proof that every
   token and component resolves. Build pages against these, never around them. */

const BASE = [
  ["--white", "#FFFFFF"], ["--ink", "#0D0D0C"], ["--ink-80", "#38382F"],
  ["--ink-60", "#6B6B60"], ["--ink-40", "#9B9B90"], ["--ink-20", "#D8D6CE"],
  ["--ink-10", "#EAE8E1"], ["--shell", "#F7F5F0"],
] as const;

const ACCENTS = [
  ["--sun", "#FFC61E", "Brand primary. Ingestibles."],
  ["--zest", "#FF7A1A", "Topical skincare."],
  ["--sky", "#8CB0E8", "Hair and scalp."],
  ["--sprout", "#79C47E", "Wellness."],
] as const;

const TYPE = [
  ["Hero", "var(--size-hero)", "var(--font-display)", 900, "AGE IS A NUMBER"],
  ["Display", "var(--size-display)", "var(--font-display)", 900, "THE INSIDE JOB"],
  ["H1", "var(--size-h1)", "var(--font-display)", 800, "CELLS ARE THE STORY"],
  ["H2", "var(--size-h2)", "var(--font-display)", 800, "What is actually in it"],
  ["H3", "var(--size-h3)", "var(--font-text)", 800, "Three types of collagen"],
  ["H4", "var(--size-h4)", "var(--font-text)", 800, "One shot a day"],
] as const;

const PLANS = [
  { id: "m1", label: "Every month", price: 39, per: "per month", unit: "month" },
  { id: "m2", label: "Every two months", price: 35, note: "Works out cheaper per month", flag: "Most chosen", per: "per month", unit: "month" },
  { id: "m3", label: "Every three months", price: 32, note: "The lowest monthly price", per: "per month", unit: "month" },
];

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ paddingTop: "var(--space-20)" }}>
      <h2
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: "var(--size-h2)",
          fontWeight: 800,
          letterSpacing: "var(--tracking-heading)",
          textTransform: "uppercase",
        }}
      >
        {title}
      </h2>
      {note ? (
        <p style={{ margin: "var(--space-3) 0 0", maxWidth: 620, color: "var(--ink-60)" }}>{note}</p>
      ) : null}
      <div style={{ marginTop: "var(--space-8)" }}>{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-label)",
        fontSize: "var(--size-meta)",
        fontWeight: 600,
        letterSpacing: "var(--tracking-mono)",
        color: "var(--ink-60)",
        marginBottom: "var(--space-4)",
      }}
    >
      {children}
    </div>
  );
}

export default function SystemPage() {
  const [tab, setTab] = useState("Ingredients");
  const [cadence, setCadence] = useState("m2");
  const [qty, setQty] = useState(1);
  const [sub, setSub] = useState(true);
  const [remind, setRemind] = useState(false);
  const [filter, setFilter] = useState("Skin");
  const [dialog, setDialog] = useState(false);

  return (
    <>
      <Banner tone="sun">50% off your first order. Free shipping, always</Banner>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: "var(--space-8)",
          padding: "var(--space-3) var(--page-gutter-mobile)",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-hairline)",
        }}
      >
        <Wordmark size={26} />
        <nav style={{ display: "flex", gap: "var(--space-6)", marginLeft: "auto" }}>
          <NavLink href="#color">Color</NavLink>
          <NavLink href="#type">Type</NavLink>
          <NavLink href="#components">Components</NavLink>
        </nav>
        <IconButton icon="shopping-bag" label="Bag" size="sm" />
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--page-gutter-mobile) var(--space-24)",
        }}
      >
        <div style={{ paddingTop: "var(--space-16)" }}>
          <Label>Design system reference, version 1</Label>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(var(--size-hero-m), 9vw, var(--size-hero))",
              fontWeight: 900,
              letterSpacing: "var(--tracking-display)",
              lineHeight: "var(--leading-tight)",
              textTransform: "uppercase",
            }}
          >
            Age is a number.
            <br />
            Cells are the story.
          </h1>
          <p style={{ maxWidth: 620, marginTop: "var(--space-6)", fontSize: "var(--size-body-lg)" }}>
            Black type on white paper, big and bold, punctuated by flat blocks of sunny color. Every
            size assumes a reader who is 35 to 55 and up, on a phone, in daylight.
          </p>
        </div>

        <Section id="color" title="Color" note="Black ink on white paper is about 90% of every screen. Color is an event. All four accents carry black text only, and a maximum of two background colors share a screen.">
          <Label>Base. Warm neutrals, never blue gray.</Label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "var(--space-4)" }}>
            {BASE.map(([name, hex]) => (
              <div key={name}>
                <div
                  style={{
                    height: 96,
                    background: `var(${name})`,
                    border: "1px solid var(--border-hairline)",
                    borderRadius: "var(--radius-md)",
                  }}
                />
                <div style={{ marginTop: "var(--space-2)", fontSize: "var(--size-meta)", fontWeight: 700 }}>{name}</div>
                <div style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)", fontVariantNumeric: "tabular-nums" }}>{hex}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "var(--space-10)" }}>
            <Label>Accents. Product family codes, not decoration.</Label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-4)" }}>
              {ACCENTS.map(([name, hex, use]) => (
                <div key={name} style={{ background: `var(${name})`, borderRadius: "var(--radius-md)", padding: "var(--space-5)", minHeight: 160 }}>
                  <div style={{ fontSize: "var(--size-body)", fontWeight: 800, color: "var(--ink)" }}>{name}</div>
                  <div style={{ fontSize: "var(--size-meta)", color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{hex}</div>
                  <div style={{ marginTop: "var(--space-4)", fontSize: "var(--size-meta)", fontWeight: 600, color: "var(--ink)" }}>{use}</div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ marginTop: "var(--space-6)", fontSize: "var(--size-meta)", color: "var(--ink-60)", maxWidth: 620 }}>
            <strong style={{ color: "var(--ink)" }}>--ink-40 is not a text color.</strong> At 2.8:1 on
            white it fails AA at every size. It is for hairline furniture, disabled glyphs, and icons on
            a dark fill. The lightest text on white is --ink-60.
          </p>
        </Section>

        <Section id="type" title="Type" note="Outfit for display, Figtree for text and micro-labels. Two faces, no third, no monospace. Body is 20px minimum at weight 500 minimum.">
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
            {TYPE.map(([role, size, family, weight, sample]) => (
              <div key={role} style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--space-4)" }}>
                <Label>{role}</Label>
                <div
                  style={{
                    fontFamily: family,
                    fontSize: size,
                    fontWeight: weight,
                    letterSpacing: "var(--tracking-display)",
                    lineHeight: "var(--leading-snug)",
                  }}
                >
                  {sample}
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--space-4)" }}>
              <Label>Body, 20px, weight 500, line height 1.55</Label>
              <p style={{ maxWidth: 620, margin: 0 }}>
                Ceramides first, collagen second. Barrier before building, because a leaky barrier
                wastes everything you put on top of it.
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--border-hairline)", paddingTop: "var(--space-4)" }}>
              <Label>Micro-label, sentence case, +0.04em, weight 600</Label>
              <div style={{ fontFamily: "var(--font-label)", fontWeight: 600, letterSpacing: "var(--tracking-mono)", fontVariantNumeric: "tabular-nums" }}>
                500 ml · 30 servings
              </div>
              <div style={{ marginTop: "var(--space-2)", fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
                In a 12-week study of 84 women, aged 35 to 60
              </div>
            </div>
          </div>
        </Section>

        <Section id="components" title="Core" note="Buttons are 12px corners, never pills, and never below 48px tall. The accent, zest, sky, and sprout fills exist so an add-to-bag button can match its product family.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center" }}>
            <Button>Add to bag</Button>
            <Button variant="accent" price={39}>Add to bag</Button>
            <Button variant="outline">Read the study</Button>
            <Button variant="quiet" iconRight="arrow-right">See all</Button>
            <Button disabled>Back in stock soon</Button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center", marginTop: "var(--space-6)" }}>
            <Button size="sm" variant="zest">Topical</Button>
            <Button size="md" variant="sky">Hair</Button>
            <Button size="lg" variant="sprout">Wellness</Button>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center", marginTop: "var(--space-8)" }}>
            <Badge>Bestseller</Badge>
            <Badge tone="sun">New</Badge>
            <Badge tone="success">In stock</Badge>
            <OfferFlag />
            <OfferFlag tone="sun" size="sm" />
            <Tag selected onClick={() => setFilter("Skin")}>Skin</Tag>
            <Tag onClick={() => setFilter(filter)}>Hair</Tag>
            <IconButton icon="search" label="Search" variant="outline" />
            <IconButton icon="user" label="Account" variant="solid" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "var(--space-6)", marginTop: "var(--space-8)" }}>
            <Card hoverable>
              <h3 style={{ margin: 0, fontSize: "var(--size-h4)", fontWeight: 800 }}>Card, white</h3>
              <p style={{ marginBottom: 0, color: "var(--ink-60)" }}>Hairline, 16px corners, no shadow at rest.</p>
            </Card>
            <Card tone="shell">
              <h3 style={{ margin: 0, fontSize: "var(--size-h4)", fontWeight: 800 }}>Card, shell</h3>
              <p style={{ marginBottom: 0, color: "var(--ink-60)" }}>The quiet band between white sections.</p>
            </Card>
            <Card tone="ink">
              <h3 style={{ margin: 0, fontSize: "var(--size-h4)", fontWeight: 800 }}>Card, ink</h3>
              <p style={{ marginBottom: 0, opacity: 0.75 }}>Inverted, for a single loud block.</p>
            </Card>
          </div>
        </Section>

        <Section id="commerce" title="Commerce" note="Prices are integers. Savings are dollars. Every entry point leads with 50% off the first order, always shown with the ongoing price.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-12)", alignItems: "flex-start" }}>
            <div>
              <Label>Price</Label>
              <Price value={39} compareAt={49} size="lg" />
            </div>
            <div>
              <Label>Star rating</Label>
              <StarRating value={4.7} count={12480} showValue />
            </div>
            <div>
              <Label>Quantity</Label>
              <QuantityStepper value={qty} onChange={setQty} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--grid-gap)", marginTop: "var(--space-10)" }}>
            <ProductCard name="SC-12 Liquid Collagen" subtitle="Three types, one shot, sixty seconds." family="ingestible" price={39} rating={4.7} reviewCount={12480} badge="Bestseller" flavor="Blood orange · 30 servings" />
            <ProductCard name="SC-04 Barrier Cream" subtitle="Ceramides first, then the actives." family="topical" price={49} compareAt={59} rating={4.6} reviewCount={3210} flavor="50 ml · unscented" />
            <ProductCard name="SC-08 Scalp Serum" subtitle="Twelve weeks, measured at the root." family="hair" price={45} rating={4.5} reviewCount={1890} flavor="60 ml · 90 applications" />
          </div>

          <div style={{ marginTop: "var(--space-12)", maxWidth: 560 }}>
            <Label>Subscription box. The only buy box in the system.</Label>
            <SubscriptionBox plans={PLANS} value={cadence} onChange={setCadence} compareAt={49} />
          </div>
        </Section>

        <Section id="forms" title="Forms" note="Every control clears 48px. Errors say what is needed, never 'Invalid input'.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--space-6)", alignItems: "start" }}>
            <Input label="Email" placeholder="you@example.com" hint="Order updates and nothing else." />
            <Input label="Email" defaultValue="jane@" error="We need a full email address to send your order." />
            <Select label="Delivery day" options={["Monday", "Wednesday", "Friday"]} hint="Change it any time." />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <Checkbox label="Add the scalp serum" description="Save $10 when it ships together." checked={sub} onChange={setSub} />
              <Switch label="Remind me before each delivery" description="Three days ahead, by email." checked={remind} onChange={setRemind} />
            </div>
          </div>
          <div style={{ display: "grid", gap: "var(--space-3)", marginTop: "var(--space-6)", maxWidth: 560 }}>
            <RadioOption name="size" label="30 servings" description="One month." price={39} priceNote="per month" selected />
            <RadioOption name="size" label="60 servings" description="Two months, one delivery." price={70} priceNote="per delivery" />
          </div>
        </Section>

        <Section id="navigation" title="Navigation and feedback">
          <Breadcrumb items={[{ label: "Home", href: "#" }, { label: "Skin", href: "#" }, { label: "SC-04 Barrier Cream" }]} />
          <div style={{ marginTop: "var(--space-8)" }}>
            <Tabs items={["Ingredients", "How to use", "The study"]} value={tab} onChange={setTab} />
            <p style={{ maxWidth: 620 }}>{tab} panel content sits here.</p>
          </div>
          <div style={{ marginTop: "var(--space-8)", maxWidth: 760 }}>
            <Accordion
              defaultOpen={0}
              items={[
                { title: "When will I see a change?", body: "Most measurable change lands between week eight and week twelve. Skin turns over on its own clock and no ingredient shortcuts that." },
                { title: "Can I skip a delivery?", body: "Yes. Skip, change the date, or cancel from your account, with no call and no retention script." },
                { title: "What is actually in it?", body: "Ten grams of hydrolysed collagen across three types, 100 mg vitamin C, and nothing else. The full panel is on the label." },
              ]}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-4)", alignItems: "center", marginTop: "var(--space-8)" }}>
            <Toast action={{ label: "View bag", onClick: () => {} }}>Added to your bag.</Toast>
            <Button variant="outline" onClick={() => setDialog(true)}>Open dialog</Button>
          </div>
          <Dialog
            open={dialog}
            title="Change your delivery date"
            onClose={() => setDialog(false)}
            footer={
              <>
                <Button variant="quiet" onClick={() => setDialog(false)}>Not now</Button>
                <Button onClick={() => setDialog(false)}>Save</Button>
              </>
            }
          >
            Your next order ships on the 14th. Move it, skip it, or cancel it, and nothing is charged
            until it ships.
          </Dialog>
        </Section>

        <Section id="icons" title="Icons" note="Lucide at 2px stroke, always --ink, always with a label except in the header utility row. No emoji, no unicode dingbats.">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-6)" }}>
            {(["menu", "search", "user", "shopping-bag", "chevron-down", "chevron-right", "x", "plus", "minus", "check", "star", "truck", "repeat", "shield-check", "arrow-right"] as const).map((n) => (
              <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-2)", width: 96 }}>
                <Icon name={n} size={28} />
                <span style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)", textAlign: "center" }}>{n}</span>
              </div>
            ))}
          </div>
        </Section>
      </main>

      <footer style={{ background: "var(--shell)", padding: "var(--space-12) var(--page-gutter-mobile)", borderTop: "1px solid var(--border-hairline)" }}>
        <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "var(--space-6)", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark size={22} />
          <span style={{ fontSize: "var(--size-meta)", color: "var(--ink-60)" }}>
            Free shipping, always. Skip or cancel anytime. Thirty-day returns.
          </span>
        </div>
      </footer>
    </>
  );
}
