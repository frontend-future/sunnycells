/**
 * Rewrites the itch copy's product name for a funnel that sells it under another
 * one. The shared copy was written for a plural name ("SC-01 Daily Chews are..."),
 * so a singular, article-less replacement needs its article and verb fixed too.
 * Plain module, no "use client", so server files can import it.
 */
export const ITCH_PRODUCT = "SC-01 Daily Chews";

export function renameProduct(s: string, name: string): string {
  if (name === ITCH_PRODUCT) return s;
  const P = ITCH_PRODUCT;
  return (
    s
      /* A bare mention mid-sentence, e.g. "giving Cooper {name}". */
      .replace(new RegExp(`^${P}$`), `the ${name}`)
      .replaceAll(`${P} are`, `The ${name} is`)
      .replaceAll(`, ${P} support`, `, the ${name} supports`)
      .replaceAll(`in ${P} support`, `in the ${name} support`)
      /* Sentence start keeps its capital, everything else takes "the". */
      .replace(new RegExp(`(^|[.!?]\\s+)${P}`, "g"), `$1The ${name}`)
      .replaceAll(P, `the ${name}`)
  );
}
