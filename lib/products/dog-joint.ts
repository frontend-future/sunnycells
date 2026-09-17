/**
 * SC-02 Hip & Joint Chews: everything the joint quiz's results pages say about
 * the product, kept out of the components the way every other product on this
 * site does. Real formulation, from the label: eight actives totalling
 * 1,997 mg per chew.
 *
 * PLACEHOLDER FLAG: REVIEWS and the story screen's customer are written to
 * brand voice, not collected from real customers, same footing as every
 * other product's placeholder content on this site. Replace with a real,
 * consenting customer before launch.
 */

export const PRODUCT = {
  sku: "SC-02",
  name: "SC-02 Hip & Joint Chews",
  form: "Soft chews",
  flavor: "Pork liver",
  servings: 60,
  chewsPerServing: 1,
  netWeight: "60 chews",
} as const;

/** Eight actives, in the order the results pages introduce them. Doses match
    the label exactly (they total 1,997 mg per chew). */
export const INGREDIENTS = [
  {
    key: "glucosamine",
    name: "Glucosamine HCl",
    dose: "1,250 mg",
    copy: "The primary building block for cartilage, giving your dog's joints the raw material they need to rebuild what's worn down.",
  },
  {
    key: "chondroitin",
    name: "Chondroitin Sulfate",
    dose: "150 mg",
    copy: "Works alongside glucosamine to keep cartilage elastic and slow the enzymes that break it down further.",
  },
  {
    key: "msm",
    name: "MSM",
    dose: "400 mg",
    copy: "A natural source of sulfur with anti-inflammatory properties that can ease the swelling and soreness behind stiff, achy joints.",
  },
  {
    key: "hyaluronic-acid",
    name: "Hyaluronic Acid",
    dose: "21 mg",
    copy: "A key part of the fluid that lubricates joints, helping your dog move more freely instead of feeling stiff and grinding.",
  },
  {
    key: "green-lipped-mussels",
    name: "Green-Lipped Mussels",
    dose: "100 mg",
    copy: "A natural source of omega-3s and glycosaminoglycans, the same combination many premium joint formulas are built around.",
  },
  {
    key: "omega3",
    name: "Omega-3 Fatty Acids",
    dose: "16.5 mg",
    copy: "Supports a healthy inflammation response throughout the body, not just the joints.",
  },
  {
    key: "vitamin-c",
    name: "Vitamin C",
    dose: "50 mg",
    copy: "An antioxidant that supports collagen production, the protein your dog's cartilage and connective tissue are actually made of.",
  },
  {
    key: "yucca",
    name: "Yucca Schidigera",
    dose: "10 mg",
    copy: "A plant extract traditionally used in dogs to help ease joint discomfort.",
  },
] as const;

export const RATING = { score: 4.7, count: 518 } as const;

export const TIMELINE = [
  {
    when: "Day 1",
    title: "Calming inflammation",
    copy: "MSM and green-lipped mussels start working on joint inflammation from the first chew, the same swelling behind stiff, achy movement.",
  },
  {
    when: "Week 2",
    title: "Less stiffness",
    copy: "Most dogs show a noticeable drop in morning stiffness as the swelling around the joint eases.",
  },
  {
    when: "Week 4",
    title: "Cartilage rebuilding",
    copy: "Glucosamine and chondroitin continue supporting cartilage repair, giving worn joints more cushioning.",
  },
  {
    when: "Week 8",
    title: "Full mobility",
    copy: "Hyaluronic acid and continued cartilage support keep joints moving smoothly for the long term.",
  },
] as const;

export const FAQ = [
  { title: "How do I give SC-02 Hip & Joint Chews?", body: "One chew daily, with or without food. Ask your vet before giving more than the labeled amount." },
  { title: "How soon will I notice a difference?", body: "Most owners notice less stiffness within 2 to 4 weeks, with the fuller effect on mobility building over about 8 weeks of consistent use." },
  { title: "Does it contain any allergens?", body: "No corn, wheat, or soy. Always check with your vet if your dog has a known food allergy before starting anything new." },
  { title: "Which dogs is this for?", body: "Formulated for large and giant breed dogs, 65 lbs and up, who carry more weight on their joints, though any adult or senior dog dealing with stiffness can take it." },
  { title: "Which dogs should not take it?", body: "Not recommended for puppies under 6 months, pregnant or nursing dogs, or dogs on other medication without checking with your vet first." },
] as const;

/* PLACEHOLDER reviews. Voice is ours, the people are not real. */
export const REVIEWS = [
  { name: "Tom H.", when: "3 weeks ago", title: "Max is jumping on the couch again", body: "He stopped hesitating at the stairs within a few weeks. I didn't realize how much he'd slowed down until I saw him speed back up." },
  { name: "Linda K.", when: "1 month ago", title: "Bella's morning stiffness is gone", body: "She used to struggle to stand up for the first few minutes every morning. That's completely gone now." },
  { name: "Carlos M.", when: "2 months ago", title: "Rex stopped limping after walks", body: "We tried a vet-prescribed anti-inflammatory before this. It worked, sort of, but this actually seems to be fixing the problem." },
  { name: "Emily R.", when: "5 months ago", title: "Luna is keeping up on hikes again", body: "She used to lag behind and sit down halfway through. Now she's out front the whole time." },
] as const;
