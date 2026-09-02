"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ADVERTORIAL, CHECKOUT_HREF, COMPARE, DISCLAIMER, GALLERY, PLANS, PRODUCT,
  PROOF_BANNER, REVIEWS, STACK, TRUST, type Plan,
} from "@/lib/products/youth-matrix-chews";

const CTA_CLASS =
  "py-5 px-8 text-xl font-bold rounded-lg shadow-xl w-full text-center block " +
  "bg-emerald-900 text-white hover:bg-emerald-800 transition-all uppercase tracking-wide";

function Stars({ n = 5, className = "" }: { n?: number; className?: string }) {
  return (
    <span className={`text-[#C8A96A] ${className}`} aria-hidden="true">
      {"★".repeat(n)}
      <span className="text-stone-300">{"★".repeat(5 - n)}</span>
    </span>
  );
}

export function YouthMatrixPage() {
  const [shot, setShot] = useState(0);
  const [plan, setPlan] = useState<Plan["id"]>("sub");
  const chosen = PLANS.find((p) => p.id === plan) ?? PLANS[0];

  return (
    <div className="min-h-screen bg-white font-sans text-stone-800 antialiased">
      <header className="border-b border-stone-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
          <Link href="/" className="inline-flex min-h-[48px] items-center font-serif text-xl font-bold tracking-tight text-emerald-900">
            SUNNYCELLS
          </Link>
          <Link
            href={ADVERTORIAL.href}
            className="hidden min-h-[48px] items-center text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 hover:text-emerald-900 sm:inline-flex"
          >
            The Science
          </Link>
        </div>
      </header>

      {/* ---------- above the fold ---------- */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-24 pt-8 lg:grid-cols-2 lg:gap-16 lg:pb-16">
        {/* Gallery. Sticky on desktop so the purchase box can run long beside it. */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <img
            src={GALLERY[shot].src}
            alt={GALLERY[shot].alt}
            className="aspect-square w-full rounded-2xl object-cover shadow-lg"
          />
          <div className="mt-3 grid grid-cols-6 gap-2 sm:gap-3">
            {GALLERY.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setShot(i)}
                aria-label={g.alt}
                aria-current={i === shot}
                className={`aspect-square min-h-[48px] overflow-hidden rounded-lg border-2 transition-colors ${
                  i === shot ? "border-emerald-900" : "border-stone-200 hover:border-stone-400"
                }`}
              >
                <img src={g.src} alt="" aria-hidden="true" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Purchase box */}
        <div className="min-w-0">
          <span className="inline-block rounded-full bg-emerald-900/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-900">
            {PRODUCT.badge}
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight text-stone-900 md:text-5xl">
            {PRODUCT.title}
          </h1>
          <p className="mt-3 font-serif text-lg italic text-stone-600 md:text-xl">
            {PRODUCT.subhead}
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-stone-600 md:text-base">
            <Stars className="text-lg tracking-[0.15em]" />
            <span className="font-bold text-stone-900">{PRODUCT.rating.score}</span>
            <span>({PRODUCT.rating.count})</span>
          </p>

          {/* Cross-link to the advertorial, directly above pricing as specified. */}
          <Link
            href={ADVERTORIAL.href}
            className="mt-7 block rounded-xl border-l-4 border-[#C8A96A] bg-stone-50 p-5 transition-colors hover:bg-stone-100"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">
              As seen in {ADVERTORIAL.eyebrow}
            </p>
            <p className="mt-2 font-serif text-lg italic leading-snug text-stone-900">
              “{ADVERTORIAL.quote}”
            </p>
            <span className="mt-3 inline-block text-sm font-bold text-emerald-900 underline underline-offset-4">
              {ADVERTORIAL.cta}
            </span>
          </Link>

          <div className="mt-7 space-y-3" role="radiogroup" aria-label="Choose a purchase type">
            {PLANS.map((p) => {
              const on = p.id === plan;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setPlan(p.id)}
                  className={`w-full rounded-xl border-2 p-5 text-left transition-colors ${
                    on ? "border-emerald-900 bg-emerald-900/[0.04]" : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className={`mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 ${
                        on ? "border-emerald-900" : "border-stone-300"
                      }`}
                    >
                      {on && <span className="h-2.5 w-2.5 rounded-full bg-emerald-900" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-stone-900">{p.name}</span>
                        {p.best && (
                          <span className="rounded bg-[#C8A96A] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-950">
                            Recommended
                          </span>
                        )}
                      </span>
                      <span className="mt-2 flex flex-wrap items-baseline gap-2">
                        <span className="font-serif text-2xl font-bold text-stone-900">{p.price}</span>
                        {p.cadence && <span className="text-stone-600">{p.cadence}</span>}
                        {p.compareAt && (
                          <span className="text-stone-500 line-through">(Regularly {p.compareAt})</span>
                        )}
                      </span>
                      {p.points && (
                        <span className="mt-3 block space-y-1.5">
                          {p.points.map((pt) => (
                            <span key={pt} className="flex gap-2 text-sm leading-relaxed text-stone-600">
                              <span aria-hidden="true" className="text-emerald-800">✓</span>
                              {pt}
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <a href={CHECKOUT_HREF} className={`${CTA_CLASS} mt-7`}>
            Check Availability &amp; Order
          </a>

          <ul className="mt-6 space-y-2.5">
            {TRUST.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm text-stone-600 md:text-base">
                <span aria-hidden="true" className="font-bold text-emerald-800">✓</span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------- the clinical stack ---------- */}
      <section className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-7xl px-5 py-16 md:py-20">
          <h2 className="text-center font-serif text-3xl font-bold text-stone-900 md:text-4xl">
            {STACK.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-stone-600">{STACK.lede}</p>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STACK.items.map((x) => (
              <div key={x.name} className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="font-serif text-2xl font-bold text-emerald-900">{x.dose}</p>
                <h3 className="mt-2 text-base font-bold leading-snug text-stone-900">{x.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">{x.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- comparison ---------- */}
      <section className="mx-auto max-w-5xl px-5 py-16 md:py-20">
        <h2 className="text-center font-serif text-3xl font-bold text-stone-900 md:text-4xl">
          {COMPARE.title}
        </h2>

        {/* Table above sm, stacked below: four columns of prose will not fit a phone. */}
        <div className="mt-10 hidden overflow-hidden rounded-xl border border-stone-200 sm:block">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-stone-50">
                <th scope="col" className="p-4 text-sm font-bold uppercase tracking-wide text-stone-500">
                  Feature / Benefit
                </th>
                <th scope="col" className="bg-emerald-900 p-4 text-sm font-bold uppercase tracking-wide text-white">
                  {COMPARE.usLabel}
                </th>
                <th scope="col" className="p-4 text-sm font-bold uppercase tracking-wide text-stone-500">
                  {COMPARE.themLabel}
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r) => (
                <tr key={r.feature} className="border-t border-stone-200 align-top">
                  <th scope="row" className="p-4 font-bold text-stone-900">{r.feature}</th>
                  <td className="bg-emerald-900/[0.05] p-4 font-semibold text-stone-900">{r.us}</td>
                  <td className="p-4 text-stone-600">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 space-y-4 sm:hidden">
          {COMPARE.rows.map((r) => (
            <div key={r.feature} className="rounded-xl border border-stone-200 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-stone-500">{r.feature}</p>
              <p className="mt-3 flex gap-2 font-semibold text-stone-900">
                <span aria-hidden="true" className="text-emerald-800">✓</span>
                <span><span className="sr-only">{COMPARE.usLabel}: </span>{r.us}</span>
              </p>
              <p className="mt-2 flex gap-2 text-stone-500">
                <span aria-hidden="true">✕</span>
                <span><span className="sr-only">{COMPARE.themLabel}: </span>{r.them}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- advertorial bridge ---------- */}
      <section className="bg-emerald-950 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:py-20 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl">
              {PROOF_BANNER.heading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-emerald-50/85 md:text-xl">
              {PROOF_BANNER.body}
            </p>
            <Link
              href={PROOF_BANNER.href}
              className="mt-7 inline-block rounded-lg bg-[#C8A96A] px-7 py-4 text-base font-bold text-emerald-950 shadow-xl transition-transform hover:scale-[1.02] md:text-lg"
            >
              {PROOF_BANNER.cta}
            </Link>
          </div>
          <img
            src={PROOF_BANNER.image}
            alt={PROOF_BANNER.alt}
            loading="lazy"
            className="aspect-square w-full rounded-2xl object-cover shadow-2xl"
          />
        </div>
      </section>

      {/* ---------- reviews ---------- */}
      <section className="mx-auto max-w-5xl px-5 py-16 md:py-20">
        <h2 className="text-center font-serif text-3xl font-bold text-stone-900 md:text-4xl">
          What people are saying
        </h2>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-2 text-stone-600">
          <Stars className="text-xl tracking-[0.15em]" />
          <span className="font-bold text-stone-900">{PRODUCT.rating.score}</span>
          <span>({PRODUCT.rating.count})</span>
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <article key={r.name} className="rounded-xl border border-stone-200 p-6">
              <Stars n={r.stars} className="text-base tracking-[0.15em]" />
              <h3 className="mt-3 font-bold text-stone-900">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-stone-600">{r.body}</p>
              <p className="mt-4 text-sm text-stone-500">
                <span className="font-bold text-stone-700">{r.name}</span> · {r.when}
              </p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto max-w-4xl px-5 py-12 pb-32 text-center md:pb-12">
          <p className="text-sm leading-relaxed text-stone-500">{DISCLAIMER}</p>
          <nav className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link href="/" className="inline-flex min-h-[48px] items-center text-stone-600 underline underline-offset-4">
              Home
            </Link>
            <Link href={ADVERTORIAL.href} className="inline-flex min-h-[48px] items-center text-stone-600 underline underline-offset-4">
              The clinical case study
            </Link>
          </nav>
          <p className="mt-2 text-sm text-stone-500">© 2026 SUNNYCELLS</p>
        </div>
      </footer>

      {/* ---------- sticky mobile bar, under 768px only ---------- */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <img
            src={GALLERY[0].src}
            alt=""
            aria-hidden="true"
            className="h-12 w-12 flex-none rounded-lg object-cover"
          />
          <span className="flex-none leading-tight">
            <span className="block font-serif text-xl font-bold text-stone-900">{chosen.price}</span>
            {chosen.cadence && <span className="block text-xs text-stone-500">{chosen.cadence}</span>}
          </span>
          <a
            href={CHECKOUT_HREF}
            className="flex-1 rounded-lg bg-emerald-900 px-4 py-4 text-center text-base font-bold uppercase tracking-wide text-white shadow-xl transition-transform active:scale-[0.99]"
          >
            Check Availability
          </a>
        </div>
      </div>
    </div>
  );
}
