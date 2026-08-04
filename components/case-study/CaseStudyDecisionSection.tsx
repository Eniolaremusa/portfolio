import type { ReactNode } from "react";
import type { DecisionContent } from "@/data/types";
import { CaseStudyDecisionImage } from "@/components/case-study/CaseStudyDecisionImage";

interface CaseStudyDecisionSectionProps {
  decision: DecisionContent;
  isMobile: boolean;
}

function DecisionColumn({ children }: { children: ReactNode }) {
  return <div className="flex max-w-[379px] flex-col gap-2">{children}</div>;
}

function DecisionParagraph({ text }: { text: string }) {
  return <p className="text-body text-text-on-light">{text}</p>;
}

function formatBeat(prefix: string, value?: string) {
  if (!value) return null;
  const normalized = value.match(/^(Explored|Rejected|Decided)\.\s/i)
    ? value
    : `${prefix}. ${value}`;
  return normalized;
}

export function CaseStudyDecisionSection({
  decision,
  isMobile,
}: CaseStudyDecisionSectionProps) {
  const isThreeColumn = decision.layoutVariant === "three-column";

  return (
    <section className="bg-light-bg px-page py-section">
      <div className="mx-auto max-w-[1312px]">
        <div className="flex flex-col gap-10 xl:flex-row xl:gap-0">
          <div className="w-full max-w-section-label shrink-0 xl:pr-10">
            <p className="text-eyebrow text-text-on-light">{decision.eyebrow}</p>
            <h2 className="text-callout mt-8 max-w-[357px] text-text-on-light">
              {decision.title}
            </h2>
          </div>

          {isThreeColumn ? (
            <div className="flex flex-1 flex-col gap-8 min-[768px]:flex-row min-[768px]:gap-decision-col-gap">
              <DecisionColumn>
                {decision.explored ? (
                  <DecisionParagraph text={formatBeat("Explored", decision.explored)!} />
                ) : null}
                {decision.rejected ? (
                  <DecisionParagraph text={formatBeat("Rejected", decision.rejected)!} />
                ) : null}
              </DecisionColumn>
              <div
                aria-hidden
                className="hidden w-px shrink-0 self-stretch bg-text-muted/30 min-[768px]:block"
              />
              <DecisionColumn>
                <DecisionParagraph text={formatBeat("Decided", decision.decided)!} />
              </DecisionColumn>
            </div>
          ) : (
            <div className="flex-1">
              <DecisionColumn>
                <DecisionParagraph text={formatBeat("Decided", decision.decided)!} />
              </DecisionColumn>
            </div>
          )}
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
