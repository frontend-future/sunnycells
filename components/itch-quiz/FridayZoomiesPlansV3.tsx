"use client";

import { PlansScreenV3 } from "@/components/quiz/PlansScreenV3";
import { FridayZoomiesPdpV3 } from "@/components/itch-quiz/FridayZoomiesPdpV3";
import { FZ_PLANS_CONTENT_V2 } from "@/lib/quiz/fridayzoomiesOfferV2";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { FIRST, OIL_NAME } from "@/lib/quiz/fzOrder";
import { pumpsPerDay } from "@/lib/quiz/itchAssessment";
import { readAnswers, useAnswers } from "@/lib/quiz/store";
import { trackMetaEvent } from "@/lib/meta";
import { useRouter } from "next/navigation";

/* Same checkout as v2 until v3 has its own. */
const DESTINATION = "/quiz/itch/v2/checkout/oil";

/* Fires on the real buy button, never on the buttons that only scroll to it. The purchase
   itself is reported from the thank you page. */
const trackCheckout = () =>
  trackMetaEvent(
    "InitiateCheckout",
    { currency: "USD", value: FIRST, content_ids: ["pure-omega-salmon-oil"], content_type: "product", content_name: OIL_NAME },
    { email: readAnswers(itchFridayZoomiesQuiz.id).email },
  );

export function FridayZoomiesPlansV3() {
  const router = useRouter();
  const { answers } = useAnswers(itchFridayZoomiesQuiz.id);
  const pumps = pumpsPerDay(answers) === 2 ? "Two easy pumps per day target" : "One easy pump per day targets";
  const content = {
    ...FZ_PLANS_CONTENT_V2,
    howItWorks: FZ_PLANS_CONTENT_V2.howItWorks.map((h) => ({ ...h, body: h.body.replace("{pumps}", pumps) })),
  };
  const startCheckout = () => {
    trackCheckout();
    router.push(DESTINATION);
  };
  return (
    <PlansScreenV3
      content={content}
      destinationHref={DESTINATION}
      planCtaLabel="Try now"
      plansSection={<FridayZoomiesPdpV3 key="pdp" onStart={startCheckout} />}
    />
  );
}
