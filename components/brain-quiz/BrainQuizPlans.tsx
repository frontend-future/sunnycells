import { Wordmark } from "@/components/core/Wordmark";
import { AnnouncementMarquee } from "@/components/quiz/AnnouncementMarquee";
import { BrainMemoryOffer } from "@/components/brain-memory/BrainMemoryOffer";
import { BrainMemoryStickyBar } from "@/components/brain-memory/BrainMemoryStickyBar";
import brainMemoryStyles from "@/components/brain-memory/brain-memory.module.css";

/**
 * The quiz's pre-checkout screen, playing the same role /quiz/diet/results/plans
 * plays for the diet funnel: the last stop before checkout, making the offer once
 * more with the real product imagery. Brain & Memory Power Boost has one plan, not
 * a ladder, so there is nothing to pick between, unlike the diet funnel's PlanCards:
 * this reuses the product page's own gallery and buy box as-is, pointed at the
 * quiz's checkout instead of the product page's.
 */
export function BrainQuizPlans() {
  return (
    <div className={brainMemoryStyles.page}>
      <AnnouncementMarquee
        terms={[
          { strong: "First bottle free", rest: "just cover shipping" },
          { strong: "30 day", rest: "money back guarantee" },
          { strong: "Skip or cancel", rest: "anytime" },
        ]}
      />

      <header className={brainMemoryStyles.header}>
        <div className={`${brainMemoryStyles.wrap} ${brainMemoryStyles.headerInner}`}>
          <Wordmark size={22} />
        </div>
      </header>

      <BrainMemoryOffer checkoutHref="/quiz/brain/results/checkout" lander="quiz" />
      <BrainMemoryStickyBar />
    </div>
  );
}
