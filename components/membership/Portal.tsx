"use client";
/* eslint-disable @next/next/no-img-element -- plain img like the rest of the site */
import { useEffect, useState, type ReactNode } from "react";
import type { Membership } from "@/lib/membership";
import { STAGES, dayOf, dollars, stageIndex } from "@/lib/portal";
import { AddressSuggest } from "@/components/itch-quiz/AddressSuggest";
import "./portal.css";

/* The subscription portal. Layout follows the Javvy portal: one hero, a quiet way into a
   drawer, then a modal of actions. Every action is a REQUEST: it emails the team what the customer
   wants and nothing changes in Stripe. Nothing here names a product, a dog or a customer unless the
   data has one. */

const JAR = "/quiz/fridayzoomies/jar.webp";
const PHOTO_HIGHFIVE = "/quiz/fridayzoomies/membership/vet-kept.jpg";
const PHOTO_VET = "/quiz/fridayzoomies/membership/vet-home.jpg";
const PHOTO_HAPPY = "/quiz/fridayzoomies/thanks/day-30.webp";
const SUPPORT = "https://fridayzoomies.com/pages/support";
const CARD_PORTAL = "https://billing.stripe.com/p/login/cNi14nfrC9k11jCcER0sU00";
const DAY = 86_400;

type View = "dashboard" | "upcoming" | "previous" | "manage" | "account";
type Screen = "next" | "skip" | "reschedule" | "frequency" | "quantity" | "keep" | "reason" | "received";

const NAV: [View, string][] = [["dashboard", "Dashboard"], ["upcoming", "Upcoming order"], ["previous", "Previous orders"], ["manage", "Manage subscription"], ["account", "Address and payment"]];
const FAQ: [string, string][] = [
  ["How does my Friday Zoomies subscription work?", "Your order ships on the schedule you pick. You always pay the subscriber price, shipping is free, and you can ask to skip, reschedule or cancel right here. No calls needed."],
  ["How do I change my next order date?", "Go to Upcoming order, tap Manage this subscription, then Reschedule. Pick how long to delay it and we'll confirm by email."],
  ["How do I skip an order?", "Go to Upcoming order, tap Manage this subscription, then Skip next order. Nothing ships and you won't be charged, then your normal schedule picks back up."],
  ["How do I change how often it ships?", "Tap Manage this subscription, then Edit frequency, and pick every 2, 4, 6 or 8 weeks. It applies to every order after this one."],
  ["How do I update my address or card?", "Choose Address and payment in the menu. Your changes apply to your next order and every one after."],
  ["How do I change the quantity?", "Tap Manage this subscription, then Edit quantity. The new amount applies to your next order and every one after."],
];

const svg = (d: ReactNode, w = 2.2) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
const I = {
  chev: svg(<path d="M9 6l6 6-6 6" />, 2.5),
  down: svg(<path d="M6 9l6 6 6-6" />, 2.5),
  left: svg(<path d="M15 6l-6 6 6 6" />, 2.5),
  x: svg(<path d="M6 6l12 12M18 6L6 18" />, 2.5),
  skip: svg(<><path d="M6 5l9 7-9 7z" /><path d="M19 5v14" /></>),
  cal: svg(<><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></>),
  edit: svg(<path d="M4 20l1-4L16 5l3 3L8 19z" />),
  box: svg(<><path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></>),
  pin: svg(<><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  info: svg(<><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7.5v.5" /></>, 2),
  tag: svg(<><path d="M3 12V4h8l10 10-8 8z" /><circle cx="8" cy="9" r="1.5" /></>),
  shield: svg(<><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5L16 9.5" /></>),
  truck: svg(<><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>),
  tick: svg(<path d="M5 12.5l4.5 4.5L19 7" />, 3),
  pause: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.2" /><rect x="14" y="5" width="4" height="14" rx="1.2" /></svg>,
  logout: svg(<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9" />),
};

const Chip = ({ kind = "", children }: { kind?: string; children: ReactNode }) => <span className={`chip ${kind}`}>{children}</span>;

const fmt = (sec: number, o: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" }) =>
  new Date(sec * 1000).toLocaleDateString("en-US", { ...o, timeZone: "America/Chicago" });

export default function Portal({ token, m, nowSec, firstName, dog }: { token: string; m: Membership; nowSec: number; firstName: string | null; dog: string | null }) {
  const [view, setView] = useState<View>("dashboard");
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState<Screen | null>(null);
  const [delay, setDelay] = useState(2);
  const [freq, setFreq] = useState(m.weeks);
  const [qty, setQty] = useState(m.quantity);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [asked, setAsked] = useState<string[]>([]); // plain-language requests we have received, this visit only
  const [toast, setToast] = useState("");
  const [sent, setSent] = useState("");

  const next = m.nextBox;
  const ended = !!m.endedAt;
  const image = m.product.image ?? JAR;
  const price = dollars(m.unitCents);
  const total = dollars(m.unitCents * m.quantity);
  const dogLine = (named: string, plain: string) => (dog ? named.replace("{dog}", dog) : plain);

  /* the dog's name is optional, every line below reads right without it */
  const yourDog = dog ?? "Your dog";
  const dogsPlace = dog ? `${dog}'s` : "your dog's";

  useEffect(() => {
    document.body.style.overflow = drawer || modal ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (modal ? setModal(null) : setDrawer(false));
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [drawer, modal]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  const closeAll = () => { setModal(null); setDrawer(false); setError(""); };
  const open = (s: Screen) => { setError(""); if (s === "reschedule") setDelay(2); if (s === "frequency") setFreq(m.weeks); if (s === "quantity") setQty(m.quantity); if (s === "reason") setReason(""); setModal(s); };
  const go = (v: View) => { setView(v); closeAll(); window.scrollTo(0, 0); };

  /* every action is a request emailed to the team, never a change to the subscription */
  async function send(payload: Record<string, unknown>, ask: string, then: "close" | "received" = "close") {
    setBusy(true);
    setError("");
    const res = await fetch("/api/fz/membership/action", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ t: token, ...payload }) }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setBusy(false);
    if (!res?.ok) return setError(data.error ?? "Something went wrong. Try again, or email support@fridayzoomies.com.");
    setAsked((a) => [...a, ask]);
    if (then === "received") { setSent(ask); setDrawer(false); setModal("received"); return; }
    closeAll();
    setToast("Request received. We'll confirm by email.");
  }

  /* ---------- pieces ---------- */
  const requests = asked.length > 0 && (
    <div className="asked">{asked.map((a, i) => <div className="notice ok" key={i}>{I.tick}<p>We got your request to {a}. We&apos;ll confirm by email.</p></div>)}</div>
  );

  const head = (eyebrow: string, title: string) => <div className="head"><span className="eyebrow">{eyebrow}</span><h1 className="h-page">{title}</h1></div>;

  const endedCard = (
    <section className="card">
      <h2 className="h-card">Your subscription is cancelled</h2>
      <p className="muted" style={{ margin: "8px 0 24px" }}>{m.endedAt ? `It ended on ${fmt(m.endedAt)}. ` : ""}Nothing else will ship or be charged. Want to pick it back up? We&apos;ll sort it out.</p>
      <a className="btn sun" href="mailto:support@fridayzoomies.com?subject=Restart%20my%20subscription">Restart my subscription</a>
    </section>
  );

  const hero = ended ? endedCard : (
    <section className="card hero">
      <div className="hero-img"><img src={image} alt={m.product.name} /></div>
      <div className="hero-body">
        <div className="when">
          <span className="state">
            <span className="eyebrow">{m.paused ? "Next order" : "Next order ships"}</span>
            {m.paused ? <Chip kind="sun">{I.pause}Skipped</Chip> : m.cancelling ? <Chip kind="sun">Ending after this order</Chip> : <Chip kind="green">{I.tick}Active</Chip>}
          </span>
          <span className="date">{next ? fmt(next, { weekday: "long", month: "long", day: "numeric" }) : "Coming up"}</span>
          {m.paused && <p className="muted">You won&apos;t be charged unless you unskip.</p>}
        </div>
        <div className="facts">
          <div><span className="meta">Quantity</span><b>{m.quantity}</b></div>
          <div><span className="meta">Ships every</span><b>{m.weeks} weeks</b></div>
          <div><span className="meta">You pay</span><b>{total}</b></div>
        </div>
        {m.paused && <div className="hero-act"><button className="btn ghost" onClick={() => send({ action: "unskip" }, "unskip your next order")} disabled={busy}>Unskip this order</button></div>}
      </div>
    </section>
  );

  const perks = (
    <section><h2 className="h-sec" style={{ marginBottom: 20 }}>Your subscriber perks</h2>
      <div className="perks3">
        {[[I.tag, "Your subscriber price", `${price} each while you stay subscribed.`], [I.truck, "Free shipping", "Every order ships free."], [I.shield, "Skip or cancel anytime", "No minimum, no fee, no call needed."]].map(([ic, h, t], i) => (
          <div className="perk" key={i}><span className="ico">{ic}</span><h3>{h}</h3><p>{t}</p></div>
        ))}
      </div>
    </section>
  );

  const days = dayOf(m.since, nowSec);
  const since = (
    <section className="card since">
      <div className="since-in">
        <div><span className="eyebrow">Subscribed since</span><p className="date">{fmt(m.since)}</p></div>
        <div className="track">{[["1 day", 1], ["1 month", 30], ["6 months", 180], ["1 year", 365]].map(([l, d]) => <div key={l} className={`stop ${days >= +d ? "done" : ""}`}><i>{days >= +d && I.tick}</i>{l}</div>)}</div>
      </div>
      <div className="since-img"><img src={PHOTO_HAPPY} alt="" /></div>
    </section>
  );

  const faq = (
    <section>
      <div className="card-h" style={{ marginBottom: 16 }}><h2 className="h-sec">Questions</h2><a className="link" href={SUPPORT} target="_blank" rel="noopener">Contact us</a></div>
      <div className="card faq" style={{ padding: "8px 32px" }}>{FAQ.map(([q, a]) => <details key={q}><summary>{q}{I.down}</summary><p>{a}</p></details>)}</div>
    </section>
  );

  const dashboard = <>{head(firstName ? `Welcome back, ${firstName}` : "Welcome back", dog ? `${dog}'s subscription` : "Your subscription")}{requests}{hero}{!ended && perks}{since}{faq}</>;

  const upcoming = <>{head("Your next order", "Upcoming order")}{requests}{hero}{!ended && <div><button className="btn ghost" onClick={() => setDrawer(true)}>Manage this subscription</button></div>}</>;

  const previous = (
    <>{head("History", "Previous orders")}
      <section className="card">
        {m.orders.length === 0 ? <p className="muted">Your orders will show up here once they&apos;ve shipped.</p> : m.orders.map((o, i) => (
          <div className="row" key={i}><img src={image} alt="" /><div className="grow"><h3>{fmt(o.at)}</h3><p className="muted">{m.product.name}</p></div><b className="total">{dollars(o.cents)}</b></div>
        ))}
      </section>
    </>
  );

  const manage = (
    <>{head("Subscription", "Manage subscription")}{requests}
      <section className="card">
        {ended ? <p>No active subscription.</p> : (
          <div className="row"><img src={image} alt="" /><div className="grow"><h3>{m.product.name}</h3><p className="muted">{total} every {m.weeks} weeks</p>{m.paused && <Chip kind="sun">{I.pause}Next order skipped</Chip>}</div><button className="btn ghost" onClick={() => setDrawer(true)}>Manage</button></div>
        )}
      </section>
    </>
  );

  /* uncontrolled on purpose: the Google suggestion fills the fields by name, so read them from the form on submit */
  const submitAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (n: string) => String(f.get(n) ?? "").trim();
    send({ action: "address", address: { name: get("name"), line1: get("address"), line2: get("address2"), city: get("city"), state: get("state"), zip: get("zip") } }, "change your shipping address");
  };
  const account = (
    <>{head("Account", "Address and payment")}{requests}
      <section className="card">
        <h2 className="h-card">Shipping address</h2>
        {m.shipTo.length > 0 && <p className="muted" style={{ marginTop: 8 }}>On file: {m.shipTo.join(", ")}</p>}
        <form className="form" onSubmit={submitAddress}>
          <div className="field full"><label htmlFor="a-name">Full name</label><input id="a-name" name="name" defaultValue={m.shipTo[0] ?? ""} autoComplete="name" /></div>
          <div className="field full"><label htmlFor="a-1">Street address</label>
            <AddressSuggest prefix="" id="a-1" className="sg" placeholder="Start typing your address" skin={{ input: "sg-input", wrap: "sg-wrap", list: "sg-list", on: "sg-on", by: "sg-by" }} />
          </div>
          <div className="field full"><label htmlFor="a-2">Apartment, suite (optional)</label><input id="a-2" name="address2" autoComplete="address-line2" /></div>
          <div className="field full"><label htmlFor="a-3">City</label><input id="a-3" name="city" required autoComplete="address-level2" /></div>
          <div className="field"><label htmlFor="a-4">State</label><input id="a-4" name="state" required maxLength={2} placeholder="TX" autoCapitalize="characters" autoComplete="address-level1" style={{ textTransform: "uppercase" }} /></div>
          <div className="field"><label htmlFor="a-5">ZIP code</label><input id="a-5" name="zip" required inputMode="numeric" maxLength={10} placeholder="78704" autoComplete="postal-code" /></div>
          <div className="full"><button className="btn" type="submit" disabled={busy}>{busy ? "One moment" : "Request address change"}</button>{error && <p className="err" role="alert">{error}</p>}</div>
        </form>
      </section>
      <section className="card"><div className="row" style={{ padding: 0, border: 0 }}>
        <div className="grow"><h2 className="h-card">Payment method</h2><p className="muted">{m.card ? `${m.card.brand[0].toUpperCase()}${m.card.brand.slice(1)} ending ${m.card.last4}, expires ${m.card.exp}` : "No card on file"}</p></div>
        <a className="btn ghost" href={CARD_PORTAL} target="_blank" rel="noopener">Update card</a>
      </div></section>
    </>
  );

  const views: Record<View, ReactNode> = { dashboard, upcoming, previous, manage, account };

  /* ---------- drawer ---------- */
  const stage = stageIndex(days);
  const STAGE_COPY = [
    `${yourDog} is just getting started. Results come on slowly at first, so the best thing you can do is keep it consistent.`,
    "You should start noticing changes. Skipping now can undo some of that progress.",
    "Results keep building. Staying on schedule matters most right now.",
    "You're past the 90 days. Keep going and the results stick.",
  ];
  const drawerBody = (
    <>
      <div className="m-h"><button className="ib" onClick={() => setDrawer(false)} aria-label="Back">{I.left}</button><h2>Next order{next ? `: ${fmt(next, { month: "short", day: "numeric", year: "numeric" })}` : ""}</h2><button className="ib" onClick={() => setDrawer(false)} aria-label="Close">{I.x}</button></div>
      <div className="m-b">
        <div className="mini"><img src={image} alt="" /><div><b>{m.product.name}</b><p className="muted">Ships every {m.weeks} weeks</p><Chip>{I.tag}Subscriber price locked in</Chip></div></div>
        <div className="pace">
          <div><h3 className="h-card">What to expect</h3><p className="meta" style={{ marginTop: 4 }}>{yourDog} is on day {days}. Results build over the first 90 days.</p></div>
          <ol>{STAGES.map((s, i) => (
            <li key={s.key} className={i < stage ? "done" : i === stage ? "now" : ""}>
              <i>{i < stage && I.tick}</i>
              <div><b>{s.title}{i === stage && <Chip kind="sun">{I.pin}You are here</Chip>}</b><span className="when">{s.range}</span><p>{STAGE_COPY[i]}</p></div>
            </li>
          ))}</ol>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}><span className="sec-label">In your next order</span>
          <div className="item"><img src={image} alt="" /><div><b>{m.product.name}</b><p className="meta">{price} each{m.quantity > 1 ? `, ${m.quantity} in the order` : ""}</p></div></div></div>
        <div className="dr-links"><button className="link" onClick={() => go("account")}>Edit address</button><a className="link" href={CARD_PORTAL} target="_blank" rel="noopener">Edit payment method</a></div>
        <button className="btn ghost block" onClick={() => open("next")}>Manage this subscription</button>
      </div>
    </>
  );

  /* ---------- modal screens ---------- */
  const errLine = error && <p className="err" role="alert">{error}</p>;
  const notice = (t: string) => <div className="notice sunk">{I.info}<p>{t}</p></div>;
  const M: Record<Screen, { title: string; back?: Screen; wide?: boolean; body: ReactNode }> = {
    next: {
      title: `Next order${next ? `: ${fmt(next, { month: "short", day: "2-digit", year: "numeric" })}` : ""}`, wide: true, body: (
        <>
          <div className="mini"><img src={image} alt="" /><div><b>{m.product.name}</b><p className="muted">Ships every {m.weeks} weeks</p></div></div>
          <img className="modal-photo" src={PHOTO_HIGHFIVE} alt="A vet giving a happy dog a high five" />
          <div className="tiles">
            {m.paused
              ? <button className="tile" onClick={() => send({ action: "unskip" }, "unskip your next order")}><span className="ic">{I.skip}</span><span className="t"><b>Unskip next order</b><span className="s">Ship it on the normal date</span></span></button>
              : <button className="tile" onClick={() => open("skip")}><span className="ic">{I.skip}</span><span className="t"><b>Skip next order</b><span className="s">Push your next order back {m.weeks} weeks</span></span></button>}
            <button className="tile" onClick={() => open("reschedule")}><span className="badge">Popular</span><span className="ic">{I.cal}</span><span className="t"><b>Reschedule</b><span className="s">Choose a different delivery date</span></span></button>
            <button className="tile" onClick={() => open("frequency")}><span className="ic">{I.edit}</span><span className="t"><b>Edit frequency</b><span className="s">Change how often it ships</span></span></button>
            <button className="tile" onClick={() => open("quantity")}><span className="ic">{I.box}</span><span className="t"><b>Edit quantity</b><span className="s">Add or remove products</span></span></button>
            <button className="tile" onClick={() => go("account")}><span className="ic">{I.pin}</span><span className="t"><b>Address and payment</b><span className="s">Update your address or card</span></span></button>
          </div>
          {errLine}
          {!m.cancelling && <button className="link quiet cancel-link" onClick={() => open("keep")}>Cancel subscription</button>}
        </>
      ),
    },
    skip: {
      title: "Skip next order", back: "next", body: (
        <>
          {notice("Nothing ships and you won't be charged. Your normal schedule picks back up after that.")}
          {next && <div className="skipbox"><span className="label">Your next order moves from</span><span><s>{fmt(next)}</s></span><strong>{fmt(next + m.weeks * 7 * DAY)}</strong></div>}
          <p className="muted">Make sure you have enough left to last until then.</p>
          {errLine}
          <button className="btn block" disabled={busy} onClick={() => send({ action: "skip" }, "skip your next order")}>{busy ? "One moment" : "Skip this order"}</button>
          <button className="btn ghost block" onClick={closeAll}>Keep my order</button>
        </>
      ),
    },
    reschedule: {
      title: "Reschedule", back: "next", body: (
        <>
          {notice("Schedule changes apply to all future orders.")}
          <div className="opts" role="radiogroup">{[2, 4, 6].map((w) => <button key={w} className="opt" role="radio" aria-checked={delay === w} onClick={() => setDelay(w)}><span className="r" />Delay for {w} weeks{next && <span className="end">{fmt(next + w * 7 * DAY, { month: "short", day: "numeric" })}</span>}</button>)}</div>
          {next && <p className="center muted">Next order ships: {fmt(next + delay * 7 * DAY)}</p>}
          {errLine}
          <button className="btn block" disabled={busy} onClick={() => send({ action: "reschedule", delayWeeks: delay }, `delay your next order by ${delay} weeks`)}>{busy ? "One moment" : "Request this change"}</button>
        </>
      ),
    },
    frequency: {
      title: "Edit frequency", back: "next", body: (
        <>
          {notice("Frequency changes apply to all future orders.")}
          <div className="opts" role="radiogroup">{[2, 4, 6, 8].map((w) => <button key={w} className="opt" role="radio" aria-checked={freq === w} onClick={() => setFreq(w)}><span className="r" />Every {w} weeks{w === m.weeks && <span className="end">Current</span>}</button>)}</div>
          {errLine}
          <button className="btn block" disabled={busy || freq === m.weeks} onClick={() => send({ action: "frequency", weeks: freq }, `ship every ${freq} weeks`)}>{busy ? "One moment" : "Request this change"}</button>
        </>
      ),
    },
    quantity: {
      title: "Edit quantity", back: "next", body: (
        <>
          {notice("Quantity changes apply to all future orders.")}
          <div className="stepper"><button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1} aria-label="Decrease quantity">&minus;</button><output>{qty}</output><button onClick={() => setQty(Math.min(6, qty + 1))} disabled={qty >= 6} aria-label="Increase quantity">+</button></div>
          {errLine}
          <button className="btn block" disabled={busy || qty === m.quantity} onClick={() => send({ action: "quantity", qty }, `change your quantity to ${qty}`)}>{busy ? "One moment" : "Request this change"}</button>
        </>
      ),
    },
    keep: {
      title: "", back: "next", wide: true, body: (
        <>
          <div className="keep"><h2>Cancel your next order, not your subscriber price.</h2>
            <p>Need a little more time? Skip your next order and keep your subscriber price, free shipping and {dogsPlace} place on the schedule.</p>
            <img src={PHOTO_VET} alt="" />
            <div className="keep-perks"><h4>Your subscriber perks stay with you</h4><ul><li>{I.tag}Your {price} subscriber price</li><li>{I.truck}Free shipping on every order</li><li>{I.shield}Skip or cancel anytime</li></ul></div></div>
          {next && <div className="skipbox"><span className="label">Skip this shipment</span><span><s>{fmt(next)}</s></span><strong>{fmt(next + m.weeks * 7 * DAY)}</strong></div>}
          {errLine}
          <button className="btn block" disabled={busy} onClick={() => send({ action: "skip" }, "skip your next order")}>{busy ? "One moment" : "Skip next shipment"}</button>
          <div className="stack"><p>Prefer to change your quantity or schedule instead of cancelling?</p><button className="btn ghost" onClick={() => open("next")}>Return to account</button>
            <p style={{ marginTop: 8 }}>Still rather cancel?</p><button className="btn ghost" onClick={() => open("reason")}>Continue</button></div>
        </>
      ),
    },
    reason: {
      title: "Before you go", back: "keep", body: (
        <>
          <p>Your answer takes ten seconds and tells the Friday Zoomies team what to fix for other dogs.</p>
          <div className="opts" role="radiogroup">{["It's too expensive", "I have too much product", "I'm not seeing results yet", dogLine("{dog} got better", "My dog got better"), dogLine("{dog} won't take it", "My dog won't take it"), "Something else"].map((r) => <button key={r} className="opt" role="radio" aria-checked={reason === r} onClick={() => setReason(r)}><span className="r" />{r}</button>)}</div>
          {errLine}
          <button className="btn block" disabled={!reason || busy} onClick={() => send({ action: "cancel", reason }, "cancel your subscription", "received")}>{busy ? "One moment" : "Cancel my subscription"}</button>
          <button className="btn ghost block" onClick={closeAll}>Keep my subscription</button>
        </>
      ),
    },
    received: {
      title: "Request received", body: (
        <>
          <p>We got your request to {sent}. We&apos;ll email you to confirm, and nothing changes until we do.</p>
          <button className="btn sun block" onClick={closeAll}>Close</button>
        </>
      ),
    },
  };
  const cur = modal ? M[modal] : null;

  return (
    <div className="fzp">
      <header className="top"><div className="top-in">
        <img src="/brand/fridayzoomies/logo-oneline.png" alt="Friday Zoomies" width={236} height={36} style={{ height: 36, width: "auto" }} />
        {firstName && <div className="who"><span>Hi, {firstName}</span><div className="avatar" aria-hidden="true">{firstName[0]}</div></div>}
      </div></header>
      <div className="wrap">
        <main className="main">{views[view]}</main>
        <nav className="side" aria-label="Account">
          {NAV.map(([k, l]) => <button key={k} className="nav" aria-current={view === k ? "page" : undefined} onClick={() => go(k)}>{l}{view !== k && I.chev}</button>)}
          <button className="nav out" onClick={() => window.location.assign("/membership")}>Logout{I.logout}</button>
        </nav>
      </div>

      <div className={`scrim drawer-scrim ${drawer ? "on" : ""}`} onClick={(e) => e.target === e.currentTarget && setDrawer(false)}>
        {drawer && <aside className="drawer" role="dialog" aria-modal="true" aria-label="Manage subscription">{drawerBody}</aside>}
      </div>
      <div className={`scrim ${cur ? "on" : ""}`} onClick={(e) => e.target === e.currentTarget && setModal(null)}>
        {cur && (
          <div className={`modal ${cur.wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={cur.title || "Cancel your subscription"}>
            <div className="m-h">{cur.back && <button className="ib" onClick={() => open(cur.back!)} aria-label="Back">{I.left}</button>}<h2>{cur.title}</h2><button className="ib" onClick={() => setModal(null)} aria-label="Close">{I.x}</button></div>
            <div className="m-b">{cur.body}</div>
          </div>
        )}
      </div>
      <div className={`toast ${toast ? "on" : ""}`} role="status">{toast}</div>
    </div>
  );
}
