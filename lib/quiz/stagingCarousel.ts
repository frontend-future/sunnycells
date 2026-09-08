import type { CarouselContent } from "@/components/quiz/HeroCarousel";
import { SLIDE_ATTRIBUTES, SLIDE_SEALS, SLIDE_STATS, SLIDE_STATS_NOTE } from "./carousel";

/**
 * The hero carousel for the staging plans page, Cortisol Control in a gummy.
 *
 * Same six slides in the same order as the live one, composed in markup rather than
 * rendered into pictures, because that is what the live carousel is: baked-in text
 * cannot be edited, translated, selected or read by a screen reader.
 *
 * PLACEHOLDER PANEL, exactly as the live one is. The actives are the ones this funnel
 * already names in plansContent.ts, restated for a two-gummy serving instead of a
 * scoop, but the amounts have not been through a formulator and the panel has not
 * been through regulatory review. Nothing here may be printed on anything.
 *
 * The one thing that IS exact is the arithmetic: every % DV is computed from the FDA
 * adult reference value rather than estimated, so the panel is at least internally
 * consistent. C 45 of 90, D 25 of 20, B6 2 of 1.7, folate 200 of 400, B12 12 of 2.4,
 * magnesium 40 of 420, chromium 100 of 35.
 */

const IMG = "/staging/cortisol-control";

export const STAGING_FACTS = {
  serving: "2 gummies",
  perContainer: "30",
  rows: [
    ["Calories", "15", ""],
    ["Total carbohydrate", "4 g", "1%*"],
    ["Total sugars", "0 g", "†"],
    ["Vitamin C (as ascorbic acid)", "45 mg", "50%"],
    ["Vitamin D (as cholecalciferol)", "25 mcg", "125%"],
    ["Vitamin B6 (as pyridoxal-5-phosphate)", "2 mg", "118%"],
    ["Folate (as L-methylfolate calcium)", "200 mcg DFE", "50%"],
    ["Vitamin B12 (as methylcobalamin)", "12 mcg", "500%"],
    ["Magnesium (as magnesium glycinate)", "40 mg", "10%"],
    ["Chromium (as chromium picolinate)", "100 mcg", "286%"],
  ] as [string, string, string][],
  blend:
    "KSM-66 Ashwagandha Root Extract, L-Theanine, Inositol, SunPS Sunflower Seed Extract (20% Phosphatidylserine), D-Chiro Inositol, Rhodiola Root Extract, Organic Turmeric Root, Black Pepper Fruit Extract",
  blendAmount: "1,200 mg",
  other:
    "Tapioca syrup, purified water, pectin, citric acid, natural tart cherry flavor, black carrot juice concentrate (color), stevia leaf extract, coconut oil, carnauba wax",
};

export const STAGING_CAROUSEL: CarouselContent = {
  benefitsTitle: "Benefits of the ingredients in Cortisol Control",
  benefits: [
    "Lowers cortisol levels",
    "Releases stress",
    "Calm focus without jitters",
    "Promotes deep, restorative sleep",
    "Relieves mood swings",
    "Supports healthy metabolism",
  ],
  /* Unchanged, and still the placeholder survey the live slide carries. */
  stats: SLIDE_STATS,
  statsNote: SLIDE_STATS_NOTE,
  attributesTitle: "Cortisol control and hormonal support",
  attributes: SLIDE_ATTRIBUTES,
  servingTitle: "Take 2 gummies",
  servingBody: "Daily in the morning, with or without food. No scoop, no shaker, no water needed.",
  /* 60 gummies at two a day is the 30 servings printed on the canister. */
  servingFigures: [["30", "servings"], ["2 gummies", "per serving"]],
  seals: SLIDE_SEALS,
  facts: STAGING_FACTS,
  /* The tall cell first, so the portrait-shaped crop gets the shot that survives it. */
  socialPhotos: [`${IMG}/ugc-3.webp`, `${IMG}/ugc-1.webp`],
};
