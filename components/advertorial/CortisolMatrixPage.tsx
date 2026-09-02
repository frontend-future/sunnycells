"use client";

import { useEffect, useState } from "react";
import {
  CTA, INTRO, META, NEWS, OFFER, SIGNS, SOLUTION, TIMELINE,
} from "@/lib/content/cortisolCollagenMatrix";

/* Deep green ground with a champagne hover, per the brief. Held here rather than in
   four places so every placement stays identical. */
const BTN =
  "block w-full max-w-md mx-auto rounded-lg px-8 py-4 text-center text-lg font-bold " +
  "uppercase tracking-wide text-white shadow-xl transition-all duration-200 md:text-xl " +
  "bg-[#14402F] hover:bg-[#C8A96A] hover:text-[#14402F] hover:scale-[1.02] active:scale-100";

/* Sans furniture: kickers, bylines, captions, nav. The article itself is serif. */
const FURN = "font-editorial-ui text-xs font-semibold uppercase tracking-[0.18em]";

function Cta({ children }: { children?: React.ReactNode }) {
  return (
    <a href={CTA.href} className={BTN}>
      {children ?? CTA.label}
    </a>
  );
}

function Figure({
  src, alt, caption, priority,
}: { src: string; alt: string; caption: string; priority?: boolean }) {
  return (
    <figure className="my-8 md:my-10">
      {/* Plain <img> per the brief rather than next/image. */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="w-full rounded-sm"
      />
      {/* Caption rule and credit line, the way a news page runs one. */}
      <figcaption className="mt-3 border-l-2 border-stone-300 pl-4 font-editorial-ui text-sm leading-relaxed text-stone-500">
        {caption}{" "}
        <span className="whitespace-nowrap text-stone-400">/ SUNNYCELLS</span>
      </figcaption>
    </figure>
  );
}

export function CortisolMatrixPage() {
  const [progress, setProgress] = useState(0);
  /* The offer is not on the page until the reader has been through the five signs
     and reached the section that explains the fix. Nothing above that point shows a
     product or a price. */
  const [pastGate, setPastGate] = useState(false);

  /* Measured against the article, not the document. The document reports height that
     is not actually scrollable here, so a document-based bar stalls around 90 and sits
     there. Reading progress through the piece is also the more honest thing for the
     bar to mean. */
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article");
      if (el) {
        const top = el.offsetTop;
        const span = el.offsetHeight - window.innerHeight;
        const read = window.scrollY - top + window.innerHeight * 0.35;
        setProgress(span > 0 ? Math.max(0, Math.min(100, (read / (span + window.innerHeight * 0.35)) * 100)) : 0);
      }
      const gate = document.getElementById("the-fix");
      if (gate) setPastGate(gate.getBoundingClientRect().top < window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    /* Lazy images grow the document after the reader has already reached the foot, so
       the bar would stall short of 100 and sit there. Recalculate as each one lands. */
    window.addEventListener("load", onScroll);
    const imgs = Array.from(document.images);
    imgs.forEach((i) => i.addEventListener("load", onScroll));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("load", onScroll);
      imgs.forEach((i) => i.removeEventListener("load", onScroll));
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-editorial text-stone-800 antialiased">
      {/* Masthead. Static, the way a paper's is, with only a slim bar following the
          reader down. The publisher is named here rather than implied. */}
      <div className="border-b border-stone-200">
        <div className={`mx-auto flex max-w-6xl items-center justify-between px-5 py-2 ${FURN} text-stone-500`}>
          <span>{NEWS.publisher}</span>
          <span className="hidden sm:block">{NEWS.dateline}</span>
        </div>
      </div>
      <div className="border-b-2 border-stone-900">
        <div className="mx-auto max-w-6xl px-5 py-7 text-center">
          <p className="font-editorial text-3xl font-bold tracking-[0.02em] text-stone-900 md:text-5xl">
            {NEWS.masthead}
          </p>
        </div>
      </div>
      <nav aria-label="Sections" className="border-b border-stone-200">
        <ul className={`mx-auto flex max-w-6xl items-center justify-center gap-6 overflow-x-auto px-5 py-3 ${FURN} text-stone-600 md:gap-9`}>
          {NEWS.sections.map((s) => (
            <li key={s} className={s === NEWS.section ? "whitespace-nowrap text-[#14402F] underline decoration-2 underline-offset-[6px]" : "whitespace-nowrap"}>
              {s}
            </li>
          ))}
        </ul>
      </nav>

      {/* Sticky slim bar. Section, masthead and reading progress. No offer. */}
      <div className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-2.5 ${FURN} text-stone-500`}>
          <span className="truncate text-stone-900">{NEWS.masthead}</span>
          <span className="truncate">{NEWS.section}</span>
        </div>
        <div className="h-[3px] w-full bg-stone-100">
          <div
            className="h-full bg-[#14402F] transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-label="Reading progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Paid-content disclosure. A real news page labels these, and so does this one. */}
      <div className="border-b border-stone-200 bg-stone-50">
        <p className={`mx-auto max-w-6xl px-5 py-2.5 text-center font-editorial-ui text-[0.7rem] font-semibold uppercase tracking-[0.16em] leading-relaxed text-stone-500`}>
          {NEWS.disclosure}
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-24 pt-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        <article id="article" className="min-w-0">
          <p className={`${FURN} text-[#14402F]`}>{META.category}</p>
          <h1 className="mt-4 font-editorial text-3xl font-bold leading-[1.12] tracking-[-0.01em] text-stone-900 md:text-[3.25rem]">
            {META.title}
          </h1>
          {/* Standfirst. */}
          <p className="mt-5 font-editorial text-xl font-normal leading-relaxed text-stone-600 md:text-2xl md:leading-[1.5]">
            {NEWS.deck}
          </p>

          {/* Byline block. */}
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 border-y border-stone-200 py-4">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#14402F] font-editorial text-base font-bold text-white"
            >
              EV
            </span>
            <span className="min-w-0">
              <span className="block font-editorial-ui text-base font-bold text-stone-900">
                By {NEWS.byline}
              </span>
              <span className="block font-editorial-ui text-sm text-stone-500">
                {NEWS.bylineRole}
              </span>
            </span>
            <span className="ml-auto font-editorial-ui text-sm text-stone-500">
              {NEWS.dateline} &middot; {NEWS.readTime}
            </span>
          </div>

          <Figure
            src="/advertorials/cortisol-collagen-matrix/hero-header.webp"
            alt="Split-screen of the same woman: on the left tired with morning facial puffiness, on the right rested with a sculpted jawline"
            caption="Left: elevated nighttime cortisol. Right: after four weeks of restored deep sleep."
            priority
          />

          {/* Key points box. Standard news furniture, and it earns its place by
              letting a skimmer get the piece without the offer being anywhere near. */}
          <aside className="my-8 border-l-4 border-[#14402F] bg-stone-50 p-6 md:p-7">
            <p className={`${FURN} text-stone-900`}>{NEWS.keyPointsTitle}</p>
            <ul className="mt-4 space-y-3">
              {NEWS.keyPoints.map((k) => (
                <li key={k} className="flex gap-3 font-editorial-ui text-base leading-relaxed text-stone-700">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[#C8A96A]" />
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Drop cap on the opening paragraph only. */}
          <div className="space-y-5 text-lg leading-relaxed text-stone-800 md:text-xl md:leading-[1.75] [&>p:first-child]:first-letter:mr-2 [&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:font-bold [&>p:first-child]:first-letter:leading-[0.82] [&>p:first-child]:first-letter:text-[4rem] [&>p:first-child]:first-letter:text-[#14402F]">
            {INTRO.map((p) => <p key={p}>{p}</p>)}
          </div>

          {SIGNS.map((s, i) => (
            <section key={s.n} id={`sign-${s.n}`} className="mt-12 scroll-mt-28 border-t border-stone-200 pt-10">
              <h2 className="font-editorial text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
                <span className="text-[#C8A96A]">{s.n}.</span> {s.title}
              </h2>
              <Figure src={s.image} alt={s.alt} caption={s.caption} />
              <div className="space-y-5 text-lg leading-relaxed text-stone-800 md:text-xl md:leading-[1.75]">
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </div>

              {/* Pull quote, set once, mid piece. */}
              {i === 1 && (
                <blockquote className="my-10 border-y-2 border-stone-900 py-7">
                  <p className="font-editorial text-2xl font-bold leading-snug text-stone-900 md:text-3xl">
                    &ldquo;{NEWS.pullQuote}&rdquo;
                  </p>
                  <footer className={`mt-4 ${FURN} text-stone-500`}>{NEWS.pullQuoteWho}</footer>
                </blockquote>
              )}
            </section>
          ))}

          {/* Everything from here down is where the product first appears. */}
          <section id="the-fix" className="mt-12 scroll-mt-28 border-t border-stone-200 pt-10">
            <h2 className="font-editorial text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
              {SOLUTION.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-800 md:text-xl md:leading-[1.75]">
              {SOLUTION.lead}
            </p>
            <ol className="mt-5 space-y-4 text-lg leading-relaxed text-stone-800 md:text-xl">
              {SOLUTION.numbered.map((t, i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#14402F] font-editorial-ui text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-lg font-semibold leading-relaxed text-stone-900 md:text-xl">
              {SOLUTION.bridge}
            </p>

            <Figure src={SOLUTION.image} alt={SOLUTION.alt} caption={SOLUTION.caption} />

            <p className="text-lg leading-relaxed text-stone-800 md:text-xl md:leading-[1.75]">
              {SOLUTION.after}
            </p>

            <div className="mt-8 border border-stone-200 bg-stone-50 p-6 md:p-8">
              <h3 className="font-editorial text-xl font-bold text-stone-900 md:text-2xl">
                {SOLUTION.stackTitle}
              </h3>
              <ul className="mt-5 space-y-5">
                {SOLUTION.stack.map((x) => (
                  <li key={x.lead} className="flex gap-3 text-base leading-relaxed text-stone-700 md:text-lg">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 flex-none rounded-full bg-[#C8A96A]" />
                    <span>
                      <strong className="font-bold text-stone-900">{x.lead}</strong>
                      {x.rest}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Cta />
            </div>
          </section>

          <section className="mt-12 border-t border-stone-200 pt-10">
            <h2 className="font-editorial text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
              {TIMELINE.heading}
            </h2>
            <ul className="mt-6 space-y-6">
              {TIMELINE.rows.map((r) => (
                <li key={r.when} className="border-l-4 border-[#C8A96A] pl-5">
                  <p className="font-editorial text-lg font-bold text-stone-900 md:text-xl">{r.when}</p>
                  <p className="mt-1 text-lg leading-relaxed text-stone-800 md:text-xl">{r.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-stone-200 pt-10">
            <Figure src={OFFER.image} alt={OFFER.alt} caption={OFFER.caption} />
            <div className="space-y-5 text-lg leading-relaxed text-stone-800 md:text-xl md:leading-[1.75]">
              {OFFER.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-8 border-2 border-[#14402F] bg-[#14402F]/[0.04] p-6 text-center md:p-10">
              <p className="font-editorial text-xl font-bold text-[#14402F] md:text-3xl">
                {OFFER.offerLine}
              </p>
              {/* The first-order price never stands alone. */}
              <p className="mt-3 font-editorial-ui text-lg font-semibold text-stone-900 md:text-xl">
                {OFFER.offerPrice}
              </p>
              <p className="mt-2 font-editorial-ui text-base text-stone-600">{OFFER.guarantee}</p>
              <div className="mt-7">
                <Cta />
              </div>
            </div>
          </section>

          {/* Author note and the disclosure again, where a news page runs them. */}
          <div className="mt-12 border-t border-stone-200 pt-8">
            <p className="font-editorial-ui text-base leading-relaxed text-stone-600">
              {NEWS.authorNote}
            </p>
            <p className="mt-4 font-editorial-ui text-sm leading-relaxed text-stone-500">
              {NEWS.footnote}
            </p>
          </div>
        </article>

        {/* Sidebar. Reader furniture, not an offer: the piece's own contents and the
            terms it leans on. The product is not sold from here. */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            <nav aria-labelledby="in-this-article">
              <p id="in-this-article" className={`border-b-2 border-stone-900 pb-2 ${FURN} text-stone-900`}>
                {NEWS.inThisArticle}
              </p>
              <ol className="mt-4 space-y-3">
                {SIGNS.map((s) => (
                  <li key={s.n} className="flex gap-3 font-editorial-ui text-sm leading-snug text-stone-600">
                    <span aria-hidden="true" className="font-bold text-[#C8A96A]">{s.n}</span>
                    <a href={`#sign-${s.n}`} className="hover:text-[#14402F] hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
                <li className="flex gap-3 font-editorial-ui text-sm leading-snug text-stone-600">
                  <span aria-hidden="true" className="font-bold text-[#C8A96A]">&rarr;</span>
                  <a href="#the-fix" className="hover:text-[#14402F] hover:underline">
                    {SOLUTION.heading}
                  </a>
                </li>
              </ol>
            </nav>

            <div>
              <p className={`border-b-2 border-stone-900 pb-2 ${FURN} text-stone-900`}>
                {NEWS.glossaryTitle}
              </p>
              <dl className="mt-4 space-y-4">
                {NEWS.glossary.map((g) => (
                  <div key={g.term}>
                    <dt className="font-editorial-ui text-sm font-bold text-stone-900">{g.term}</dt>
                    <dd className="mt-1 font-editorial-ui text-sm leading-relaxed text-stone-600">{g.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </aside>
      </div>

      <footer className="border-t-2 border-stone-900 bg-stone-50">
        <div className="mx-auto max-w-6xl px-5 py-8 text-center">
          <p className="font-editorial text-xl font-bold text-stone-900">{NEWS.masthead}</p>
          <p className={`mt-2 ${FURN} text-stone-500`}>{NEWS.publisher}</p>
        </div>
      </footer>

      {/* The offer bar, on every viewport, but only once the reader has reached the
          section that explains the fix. Above that point the page has no price on it. */}
      <div
        aria-hidden={!pastGate}
        className={
          "fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 px-4 py-3 " +
          "shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 " +
          (pastGate ? "translate-y-0" : "pointer-events-none translate-y-full")
        }
      >
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <span className="flex-none leading-tight">
            <span className="block font-editorial text-xl font-bold text-stone-900">
              {CTA.price}
            </span>
            <span className="block font-editorial-ui text-xs font-semibold text-stone-500">
              {CTA.note}
            </span>
          </span>
          <a
            href={CTA.href}
            className="flex-1 rounded-lg bg-[#14402F] px-4 py-4 text-center font-editorial-ui text-base font-bold uppercase tracking-wide text-white shadow-xl transition-transform duration-200 active:scale-[0.99]"
          >
            {CTA.label}
          </a>
        </div>
      </div>
    </div>
  );
}
