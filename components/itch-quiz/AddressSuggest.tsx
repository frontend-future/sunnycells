"use client";

import { useEffect, useRef, useState } from "react";
import s from "./fzCheckout.module.css";

/* Google Places (New) address suggestions on our own address input. The suggestions come from
   the Maps JavaScript API's AutocompleteSuggestion, not the legacy widget, and we draw the
   list ourselves so it matches the form. Picking one fills street, city, state and ZIP.
   With no key, or if Google fails to load, this is a plain input and the form works as before. */
const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

type Component = { longText: string; shortText: string; types: string[] };
type Place = { fetchFields(o: { fields: string[] }): Promise<unknown>; addressComponents?: Component[] };
type Prediction = { text: { text: string }; mainText?: { text: string }; secondaryText?: { text: string }; toPlace(): Place };
type PlacesLib = {
  AutocompleteSessionToken: new () => unknown;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions(o: { input: string; includedRegionCodes: string[]; sessionToken: unknown }): Promise<{ suggestions: { placePrediction: Prediction | null }[] }>;
  };
};

let lib: Promise<PlacesLib | null> | null = null;
function loadPlaces(): Promise<PlacesLib | null> {
  if (!KEY) return Promise.resolve(null);
  return (lib ??= new Promise<PlacesLib | null>((resolve) => {
    const w = window as unknown as { google?: { maps?: { importLibrary(n: string): Promise<unknown> } }; __fzMapsReady?: () => void };
    const done = () => w.google!.maps!.importLibrary("places").then((l) => resolve(l as PlacesLib), () => resolve(null));
    if (w.google?.maps?.importLibrary) return void done();
    w.__fzMapsReady = done;
    const el = document.createElement("script");
    el.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&loading=async&v=weekly&callback=__fzMapsReady`;
    el.async = true;
    el.onerror = () => resolve(null);
    document.head.appendChild(el);
  }));
}

/* Sets a field the way typing would, so React and the browser both see the change. */
function setField(root: HTMLElement, name: string, value: string) {
  const el = root.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${name}"]`);
  if (!el) return;
  const proto = el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value")?.set?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

const part = (c: Component[], type: string, short = false) => {
  const hit = c.find((x) => x.types.includes(type));
  return hit ? (short ? hit.shortText : hit.longText) : "";
};

export function AddressSuggest({ prefix, className }: { prefix: string; className: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const token = useRef<unknown>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  /* Bumped on every pick and every keystroke so a lookup that comes back late is dropped, and
     set while we fill the form so our own writes are not mistaken for typing. */
  const seq = useRef(0);
  const filling = useRef(false);
  const [items, setItems] = useState<Prediction[]>([]);
  const [active, setActive] = useState(-1);

  useEffect(() => () => clearTimeout(timer.current), []);

  const close = () => { setItems([]); setActive(-1); };

  const lookup = (text: string) => {
    if (filling.current) return;
    clearTimeout(timer.current);
    const mine = ++seq.current;
    if (text.trim().length < 3) return close();
    timer.current = setTimeout(async () => {
      const places = await loadPlaces();
      if (!places) return;
      token.current ??= new places.AutocompleteSessionToken();
      try {
        const { suggestions } = await places.AutocompleteSuggestion.fetchAutocompleteSuggestions({ input: text, includedRegionCodes: ["us"], sessionToken: token.current });
        if (mine !== seq.current) return;
        setItems(suggestions.map((x) => x.placePrediction).filter((p): p is Prediction => !!p).slice(0, 5));
        setActive(-1);
      } catch { close(); }
    }, 200);
  };

  const pick = async (p: Prediction) => {
    clearTimeout(timer.current);
    seq.current++;
    close();
    const place = p.toPlace();
    await place.fetchFields({ fields: ["addressComponents"] });
    token.current = null; // a pick ends the billing session
    const c = place.addressComponents ?? [];
    const root = wrap.current?.closest("form, [data-address-root]") as HTMLElement | null;
    if (!root) return;
    filling.current = true;
    const num = part(c, "street_number");
    const street = [num, part(c, "route")].filter(Boolean).join(" ");
    setField(root, `${prefix}address`, street || p.mainText?.text || p.text.text);
    setField(root, `${prefix}city`, part(c, "locality") || part(c, "sublocality") || part(c, "postal_town"));
    setField(root, `${prefix}state`, part(c, "administrative_area_level_1", true));
    setField(root, `${prefix}zip`, part(c, "postal_code"));
    const unit = part(c, "subpremise");
    if (unit) setField(root, `${prefix}address2`, `Unit ${unit}`);
    filling.current = false;
    root.querySelector<HTMLInputElement>(`[name="${prefix}address2"]`)?.focus();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!items.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % items.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(items[active]); }
    else if (e.key === "Escape") close();
  };

  return (
    <div ref={wrap} className={`${className} ${s.suggestWrap}`}>
      <input
        ref={input}
        className={s.input}
        name={`${prefix}address`}
        placeholder="Address *"
        aria-label="Address"
        autoComplete="address-line1"
        role="combobox"
        aria-expanded={items.length > 0}
        aria-autocomplete="list"
        aria-controls={`${prefix}suggest`}
        required
        onInput={(e) => lookup((e.target as HTMLInputElement).value)}
        onKeyDown={onKey}
        onBlur={() => setTimeout(close, 150)}
      />
      {items.length > 0 ? (
        <ul id={`${prefix}suggest`} role="listbox" className={s.suggest}>
          {items.map((p, i) => (
            <li
              key={p.text.text}
              role="option"
              aria-selected={i === active}
              className={i === active ? s.suggestOn : undefined}
              onMouseDown={(e) => { e.preventDefault(); pick(p); }}
            >
              <strong>{p.mainText?.text ?? p.text.text}</strong>
              {p.secondaryText ? <span>{p.secondaryText.text}</span> : null}
            </li>
          ))}
          <li className={s.suggestBy} aria-hidden="true">Powered by Google</li>
        </ul>
      ) : null}
    </div>
  );
}
