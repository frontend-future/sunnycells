/**
 * SC-01 Daily Chews: everything the itch quiz's results pages say about the
 * product, kept out of the components the way every other product on this
 * site does.
 *
 * PLACEHOLDER FLAG: REVIEWS and the story screen's customer are written to
 * brand voice, not collected from real customers, same footing as every
 * other product's placeholder content on this site. Replace with a real,
 * consenting customer before launch.
 */

export const PRODUCT = {
  sku: "SC-01",
  name: "SC-01 Daily Chews",
  form: "Soft chews",
  servings: 60,
  chewsPerServing: 1,
  netWeight: "60 chews",
} as const;

/** Four actives, in the order the results pages introduce them. */
export const INGREDIENTS = [
  {
    key: "quercetin",
    name: "Quercetin",
    dose: "50 mg",
    copy: "A natural plant flavonoid that's been shown to calm the body's histamine response, the same overreaction that turns a harmless trigger into nonstop itching.",
  },
  {
    key: "omega3",
    name: "Omega-3 Fish Oil",
    dose: "150 mg",
    copy: "Supports the skin barrier from the inside out, which is linked to a shinier coat and less shedding with consistent daily use.",
  },
  {
    key: "zinc-e",
    name: "Zinc & Vitamin E",
    dose: "10 mg / 15 IU",
    copy: "Helps skin heal faster and stay resilient, so an irritated patch is less likely to turn into a full hot spot.",
  },
  {
    key: "probiotics",
    name: "Probiotic Blend",
    dose: "1 billion CFU",
    copy: "Supports digestion, which plays a bigger role in skin health than most people realize, especially for flare-ups triggered by food sensitivities.",
  },
] as const;

/** The Friday Zoomies chew label: eight actives, amounts per serving of 2 soft chews (4 g). */
export const CHEW_SERVING = "2 Soft Chews (4 g)";
export const CHEW_ACTIVES = [
  { name: "Bovine colostrum 20%", dose: "200 mg", copy: "Supplies immunoglobulins and other immune factors that help balance an overreactive immune response to allergens." },
  { name: "Wild Alaskan salmon oil", dose: "200 mg", copy: "A source of omega-3s (EPA/DHA) that supports the skin barrier and a healthy inflammatory response, for less dry, itchy skin and a shinier coat." },
  { name: "Quercetin dihydrate", dose: "100 mg", copy: "A plant flavonoid that helps stabilize mast cells and support normal histamine levels, often called \"nature's antihistamine.\"" },
  { name: "Vitamin C (ascorbic acid)", dose: "40 mg", copy: "An antioxidant that supports immune function and works alongside quercetin." },
  { name: "Bromelain", dose: "40 mg", copy: "A pineapple enzyme that improves quercetin absorption and supports a healthy inflammatory response." },
  { name: "Zinc", dose: "2 mg", copy: "An essential mineral for skin repair, coat quality, and normal immune function." },
  { name: "Vitamin E (d-alpha tocopheryl acetate)", dose: "10 IU", copy: "A fat-soluble antioxidant that protects skin cells from oxidative stress and complements the omega-3s." },
  { name: "Six-probiotic blend", dose: "500 million CFU", copy: "L. plantarum, L. acidophilus, L. casei, B. bifidum, L. lactis, L. fermentum. Supports gut health, where much of the immune system lives, helping temper allergic responses." },
] as const;
export const CHEW_OTHER = "Oat flour, natural fish flavor, lecithin, glycerin, sunflower oil (high oleic), natural flavor oil, natural antioxidant (mixed tocopherols, rosemary extract)";
/** Soft chews per day by body weight. */
export const CHEW_DOSING = [
  ["Under 10 lbs", "1 soft chew"],
  ["10 to 30 lbs", "2 soft chews"],
  ["31 to 60 lbs", "3 soft chews"],
  ["61 to 90 lbs", "4 soft chews"],
  ["Over 90 lbs", "5 soft chews"],
] as const;

export const RATING = { score: 4.8, count: 662 } as const;

export const TIMELINE = [
  {
    when: "Day 1",
    title: "Calming the response",
    copy: "Quercetin starts working on the histamine response from the first chew, the same mechanism behind the itch-scratch cycle.",
  },
  {
    when: "Week 2",
    title: "Less scratching",
    copy: "Most dogs show a noticeable drop in scratching, licking, and chewing as the skin gets a chance to stop being irritated.",
  },
  {
    when: "Week 4",
    title: "Skin recovering",
    copy: "Zinc and vitamin E continue supporting skin healing, so existing hot spots and bald patches have room to recover.",
  },
  {
    when: "Week 8",
    title: "Coat and comfort",
    copy: "Omega-3s and the probiotic blend keep supporting the skin barrier and gut, for a shinier coat and steadier comfort long term.",
  },
] as const;

export const FAQ = [
  { title: "How do I give SC-01 Daily Chews?", body: "One chew daily, with or without food. Ask your vet before giving more than the labeled amount." },
  { title: "How soon will I notice a difference?", body: "Most owners notice less scratching within 2 weeks, with the fuller effect on skin and coat building over about 8 weeks of consistent use." },
  { title: "Does it contain any allergens?", body: "No corn, wheat, or soy. Always check with your vet if your dog has a known food allergy before starting anything new." },
  { title: "Which dogs is this for?", body: "Adult and senior dogs of any size dealing with occasional or ongoing itching, licking, or skin irritation." },
  { title: "Which dogs should not take it?", body: "Not recommended for puppies under 6 months, pregnant or nursing dogs, or dogs on other medication without checking with your vet first." },
] as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const REVIEWS = [
  { name: "Sarah T.", when: "3 weeks ago", title: "Cooper finally stopped scratching", body: "We tried three different vet treatments before this. Within a few weeks the constant scratching just stopped." },
  { name: "Marcus D.", when: "1 month ago", title: "No more hot spots", body: "Our lab used to get a hot spot every few weeks. It's been over a month now with nothing." },
  { name: "Priya N.", when: "2 months ago", title: "Coat looks so much better", body: "I noticed the shedding slow down before I noticed the itching stop. Her coat looks shinier than it has in years." },
  { name: "Ellie B.", when: "6 months ago", title: "Worth it for the sleep alone", body: "He used to keep us up licking his paws all night. That alone was worth trying this." },
] as const;
