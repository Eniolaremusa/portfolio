import type { DecisionContent } from "@/data/types";
import { CaseStudyDecisionImage } from "@/components/case-study/CaseStudyDecisionImage";
import { CaseStudyDivider } from "@/components/case-study/CaseStudyDivider";

interface CaseStudyDecisionSectionProps {
  decision: DecisionContent;
  isMobile: boolean;
}

function formatBeat(prefix: string, value?: string) {
  if (!value) return null;
  const normalized = value.match(/^(Explored|Rejected|Decided)\.\s/i)
    ? value
    : `${prefix}. ${value}`;
  return normalized;
}

function DecisionBeat({ text }: { text: string }) {
  const match = text.match(/^(Explored|Rejected|Decided)\.\s*(.*)$/);
  if (!match) {
    return <p className="text-body text-text-on-light">{text}</p>;
  }

  return (
    <p className="text-body text-text-on-light">
      <span className="font-medium">{match[1]}.</span> {match[2]}
    </p>
  );
}

export function CaseStudyDecisionSection({
  decision,
  isMobile,
}: CaseStudyDecisionSectionProps) {
  const isThreeColumn = decision.layoutVariant === "three-column";

  return (
    <section className="bg-light-bg px-page py-section">
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-10 min-[768px]:flex-row min-[768px]:items-start">
          <div className="w-full shrink-0 min-[768px]:w-[30%]">
            <p className="text-eyebrow text-text-on-light">{decision.eyebrow}</p>
            <h2 className="text-callout mt-8 text-text-on-light">{decision.title}</h2>
          </div>

          <div className="w-full min-[768px]:w-[70%]">
            {isThreeColumn ? (
              <div className="flex flex-col gap-8 min-[768px]:flex-row min-[768px]:items-stretch min-[768px]:gap-decision-col-gap">
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  {decision.explored ? (
                    <DecisionBeat text={formatBeat("Explored", decision.explored)!} />
                  ) : null}
                  {decision.rejected ? (
                    <DecisionBeat text={formatBeat("Rejected", decision.rejected)!} />
                  ) : null}
                </div>

                <CaseStudyDivider className="hidden min-[768px]:block" />

                <div className="min-w-0 flex-1">
                  <DecisionBeat text={formatBeat("Decided", decision.decided)!} />
                </div>
              </div>
            ) : (
              <DecisionBeat text={formatBeat("Decided", decision.decided)!} />
            )}
          </div>
        </div>

        <CaseStudyDecisionImage
          src={decision.image}
          isMobile={isMobile}
          className="mt-10 min-[768px]:mt-section"
        />
      </div>
    </section>
  );
}
