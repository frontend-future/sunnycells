"use client";

import { useEffect, useState } from "react";
import {
  CTA, INTRO, META, OFFER, SIGNS, SOLUTION, TIMELINE,
} from "@/lib/content/cortisolCollagenMatrix";

/* Deep green ground with a champagne hover, per the brief. Held here rather than in
   five places so every placement stays identical. */
const BTN =
  "py-4 px-8 text-lg md:text-xl font-bold rounded-lg shadow-xl w-full max-w-md text-center " +
  "block mx-auto uppercase tracking-wide text-white bg-[#14402F] hover:bg-[#C8A96A] " +
  "hover:text-[#14402F] hover:scale-[1.02] active:scale-100 transition-all duration-200";

function Cta({ className = "" }: { className?: string }) {
  return (
    <a href={CTA.href} className={`${BTN} ${className}`}>
      {CTA.label}
    </a>
  );
}

function Figure({ src, alt, caption, priority }: { src: string; alt: string; caption: string; priority?: boolean }) {
  return (
    <figure className="my-8 md:my-10">
      {/* Plain <img> per the brief rather than next/image. */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        className="w-full rounded-xl shadow-lg"
      />
      <figcaption className="mt-3 text-sm md:text-base italic text-stone-500 leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

export function CortisolMatrixPage() {
  const [progress, setProgress] = useState(0);

  /* Measured against the article, not the document. The document reports height that
     is not actually scrollable here, so a document-based bar stalls around 90 and sits
     there. Reading progress through the piece is also the more honest thing for the
     bar to mean. */
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("article");
      if (!el) return;
      const top = el.offsetTop;
      const span = el.offsetHeight - window.innerHeight;
      const read = window.scrollY - top + window.innerHeight * 0.35;
      setProgress(span > 0 ? Math.max(0, Math.min(100, (read / (span + window.innerHeight * 0.35)) * 100)) : 0);
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
    <div className="min-h-screen bg-white font-sans text-stone-800 antialiased">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <span className="font-serif text-xl font-bold tracking-tight text-[#14402F]">
            SUNNYCELLS
          </span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 sm:block">
            Health &amp; Longevity
          </span>
        </div>
        <div className="h-1 w-full bg-stone-100">
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
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 pb-32 pt-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14 lg:pb-16">
        <article id="article" className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#14402F]">
            {META.category}
          </p>
          <h1 className="mt-4 font-serif text-3xl font-bold leading-[1.15] tracking-tight text-stone-900 md:text-5xl">
            {META.title}
          </h1>
          <p className="mt-4 border-b border-stone-200 pb-6 text-sm text-stone-500 md:text-base">
            {META.author}
          </p>

          <Figure
            src="/advertorials/cortisol-collagen-matrix/hero-header.webp"
            alt="Split-screen of the same woman: on the left tired with morning facial puffiness, on the right rested with a sculpted jawline"
            caption="Left: elevated nighttime cortisol. Right: after four weeks of restored deep sleep."
            priority
          />

          <div className="space-y-5 text-lg leading-relaxed text-stone-700 md:text-xl md:leading-[1.75]">
            {INTRO.map((p) => <p key={p}>{p}</p>)}
          </div>

          {SIGNS.map((s) => (
            <section key={s.n} className="mt-12 border-t border-stone-200 pt-10">
              <h2 className="font-serif text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
                <span className="text-[#C8A96A]">{s.n}.</span> {s.title}
              </h2>
              <Figure src={s.image} alt={s.alt} caption={s.caption} />
              <div className="space-y-5 text-lg leading-relaxed text-stone-700 md:text-xl md:leading-[1.75]">
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </section>
          ))}

          <section className="mt-12 border-t border-stone-200 pt-10">
            <h2 className="font-serif text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
              {SOLUTION.heading}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-700 md:text-xl md:leading-[1.75]">
              {SOLUTION.lead}
            </p>
            <ol className="mt-5 space-y-4 text-lg leading-relaxed text-stone-700 md:text-xl">
              {SOLUTION.numbered.map((t, i) => (
                <li key={t} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[#14402F] text-sm font-bold text-white">
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

            <p className="text-lg leading-relaxed text-stone-700 md:text-xl md:leading-[1.75]">
              {SOLUTION.after}
            </p>

            <div className="mt-8 rounded-xl border border-stone-200 bg-stone-50 p-6 md:p-8">
              <h3 className="font-serif text-xl font-bold text-stone-900 md:text-2xl">
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
            <h2 className="font-serif text-2xl font-bold leading-tight text-stone-900 md:text-4xl">
              {TIMELINE.heading}
            </h2>
            <ul className="mt-6 space-y-6">
              {TIMELINE.rows.map((r) => (
                <li key={r.when} className="border-l-4 border-[#C8A96A] pl-5">
                  <p className="font-serif text-lg font-bold text-stone-900 md:text-xl">{r.when}</p>
                  <p className="mt-1 text-lg leading-relaxed text-stone-700 md:text-xl">{r.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-t border-stone-200 pt-10">
            <Figure src={OFFER.image} alt={OFFER.alt} caption={OFFER.caption} />
            <div className="space-y-5 text-lg leading-relaxed text-stone-700 md:text-xl md:leading-[1.75]">
              {OFFER.body.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-8 rounded-xl border-2 border-[#14402F] bg-[#14402F]/[0.04] p-6 text-center md:p-10">
              <p className="font-serif text-xl font-bold text-[#14402F] md:text-3xl">
                {OFFER.offerLine}
              </p>
              <p className="mt-3 text-base text-stone-600 md:text-lg">{OFFER.guarantee}</p>
              <div className="mt-7">
                <Cta />
              </div>
            </div>
          </section>
        </article>

        {/* Desktop sidebar. Sticky so the offer stays with the reader down a long page. */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-lg">
              <img
                src={SOLUTION.image}
                alt={SOLUTION.alt}
                loading="lazy"
                className="w-full rounded-lg"
              />
              <p className="mt-5 font-serif text-xl font-bold leading-tight text-stone-900">
                Youth Matrix Chews
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                Four tart-cherry evening chews. Gelatin, magnesium glycinate,
                L-theanine, niacinamide and acerola vitamin C.
              </p>
              <p className="mt-5 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-stone-900">{CTA.price}</span>
                <span className="rounded bg-[#C8A96A] px-2 py-1 text-xs font-bold uppercase tracking-wide text-[#14402F]">
                  23% off
                </span>
              </p>
              <a
                href={CTA.href}
                className="mt-5 block w-full rounded-lg bg-[#14402F] px-6 py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:bg-[#C8A96A] hover:text-[#14402F]"
              >
                {CTA.label}
              </a>
              <p className="mt-4 text-center text-xs text-stone-500">
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Sticky mobile CTA. Hidden above lg, where the sidebar carries the offer. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <span className="flex-none leading-tight">
            <span className="block font-serif text-xl font-bold text-stone-900">{CTA.price}</span>
            <span className="block text-xs font-semibold text-[#C8A96A]">23% off</span>
          </span>
          <a
            href={CTA.href}
            className="flex-1 rounded-lg bg-[#14402F] px-4 py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-xl transition-transform duration-200 active:scale-[0.99]"
          >
            {CTA.label}
          </a>
        </div>
      </div>
    </div>
  );
}
