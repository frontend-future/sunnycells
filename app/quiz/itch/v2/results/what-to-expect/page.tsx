"use client";

import { Icon } from "@/components/core/Icon";
import { itchFridayZoomiesQuiz } from "@/lib/quiz/itchFridayZoomies";
import { ItchEducation } from "@/components/itch-quiz/ItchEducation";

const MONTHS = (name: string) => [
  { lead: "Month 1:", rest: ` omega-3s build up in ${name}'s skin and coat, and many dogs start scratching noticeably less.` },
  { lead: "Month 2:", rest: " results keep improving as the skin barrier gets stronger, with less redness and a shinier coat." },
  { lead: "Month 3:", rest: ` skin and coat at their best. Daily use keeps the itch from coming back.` },
];

export default function Page() {
  return (
    <ItchEducation quizId={itchFridayZoomiesQuiz.id} nextHref="/quiz/itch/v2/results/more-than-relief" video="what-to-expect" title="What to expect">
      {({ name }) => (
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
          {MONTHS(name).map((m) => (
            <li key={m.lead} style={{ display: "flex", gap: "var(--space-4)", alignItems: "flex-start" }}>
              <span
                aria-hidden="true"
                style={{ flex: "none", marginTop: 1, width: 26, height: 26, borderRadius: "50%", background: "var(--ink)", color: "var(--sun)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Icon name="check" size={16} strokeWidth={3.5} />
              </span>
              <span>
                <strong style={{ fontWeight: 800 }}>{m.lead}</strong>
                {m.rest}
              </span>
            </li>
          ))}
        </ul>
      )}
    </ItchEducation>
  );
}
