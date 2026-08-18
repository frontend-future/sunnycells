/** Content for the six hero carousel slides. */

export const SLIDE_BENEFITS = [
  "Weight loss",
  "Lowers cortisol levels",
  "Releases stress",
  "Promotes better sleep",
  "Relieves mood swings",
  "Helps with metabolism",
];

/* PLACEHOLDER SURVEY FIGURES. No survey has been run. Percentages in claims are
   integers in this system, which is why the reference's 78.2% is not reproduced.
   Replace with real numbers and a real respondent count, or delete the slide. */
export const SLIDE_STATS = [
  { figure: "79%", body: "of SUNNYCELLS customers recommend it to someone else" },
  { figure: "78%", body: "said their mood improved" },
  { figure: "91%", body: "reported losing weight" },
];
export const SLIDE_STATS_NOTE = "Based on a customer survey of 6,314 respondents.";

export const SLIDE_ATTRIBUTES = [
  { icon: "droplet", label: "Zero sugar" },
  { icon: "wheat-off", label: "Gluten-free" },
  { icon: "shield-check", label: "GMP certified" },
  { icon: "dna", label: "Non-GMO" },
  { icon: "leaf", label: "Dairy free" },
  { icon: "check", label: "Third party tested" },
] as const;

/* The four seals on the serving slide. Two came with the brief, two were generated to
   match them. There is no GMP seal: the wording would not render legibly at this size
   and it is a certification claim worth making only once it is actually held. */
export const SLIDE_SEALS = [
  { src: "/badges/third-party-tested.webp", label: "Third party tested" },
  { src: "/badges/heavy-metal-tested.webp", label: "Heavy metal tested" },
  { src: "/badges/money-back.png", label: "Money back guarantee" },
  { src: "/badges/made-in-usa.png", label: "Made in the USA" },
];

/* PLACEHOLDER PANEL, not a real specification. Amounts and daily values need a
   formulator and a regulatory review before this can be printed anywhere. */
export const SUPPLEMENT_FACTS = {
  serving: "1 scoop (5.91 g)",
  perContainer: "About 30",
  rows: [
    ["Total carbohydrate", "<1 g", "<1%*"],
    ["Vitamin C (as ascorbic acid)", "500 mg", "556%"],
    ["Vitamin D (as cholecalciferol)", "100 mcg", "500%"],
    ["Vitamin B6 (as pyridoxal-5-phosphate)", "10 mg", "588%"],
    ["Folate (as L-methylfolate calcium)", "400 mcg DFE", "100%"],
    ["Vitamin B12 (as methylcobalamin)", "24 mcg", "1,000%"],
    ["Magnesium (as magnesium glycinate)", "50 mg", "12%"],
    ["Chromium (as chromium picolinate)", "200 mcg", "571%"],
    ["Potassium (as potassium chloride)", "200 mg", "4%"],
  ],
  blend: "Inositol, KSM-66 Ashwagandha Root Extract, SunPS Sunflower Seed Extract (20% Phosphatidylserine), L-Theanine, D-Chiro Inositol, Rhodiola Root Extract, Organic Turmeric Root, Black Pepper Fruit Extract",
  blendAmount: "2,710 mg",
  other: "Citric acid, natural tangerine flavor, natural orange flavor, natural flavor, stevia leaf extract, color, silicon dioxide",
};
