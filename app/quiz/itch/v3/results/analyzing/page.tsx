import type { Metadata } from "next";
import { Analyzing } from "@/components/quiz/Analyzing";
import type { Review } from "@/components/quiz/ReviewsCarousel";

export const metadata: Metadata = { title: "Reading your answers | SUNNYCELLS" };

const REVIEWS: Review[] = [
  {
    name: "Izzy W.",
    rating: 5,
    title: "Our pups are happy campers",
    body: "Love this. Our dogs stopped itching and licking, and they love their morning treat.",
  },
  {
    name: "Angela S.",
    rating: 5,
    title: "Our English Bulldog is happier",
    body: "Our English bulldog's yeasty ears have gone away. His scratching has also gone down. He's happier and acts like a puppy again.",
  },
  {
    name: "Anita M.",
    rating: 5,
    title: "No more itching",
    body: "My dog has stopped scratching since taking these. Worked like a charm.",
  },
  {
    name: "George L.",
    rating: 5,
    title: "These really work",
    body: "My dog Biscuit was on Apoquel for chewing on his paws and legs and it wasn't working. He's been on these for 3 to 4 months and he isn't chewing anymore.",
  },
  {
    name: "Jamie O.",
    rating: 5,
    title: "No more itching",
    body: "Puppies are healthy. They no longer lick their feet or scratch incessantly all day long, and they love their little vitamins.",
  },
];

export default function AnalyzingPage() {
  return <Analyzing nextHref="/quiz/itch/v3/results/summary" reviews={REVIEWS} />;
}
