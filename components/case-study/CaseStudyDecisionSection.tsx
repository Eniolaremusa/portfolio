import type { DecisionContent } from "@/data/types";
import { CaseStudyDecisionImage } from "@/components/case-study/CaseStudyDecisionImage";
import { CaseStudyDivider } from "@/components/case-study/CaseStudyDivider";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";

interface CaseStudyDecisionSectionProps {
  decision: DecisionContent;
  isMobile: boolean;
  tabletDecisionImageScale?: number;
}

function formatBeat(prefix: string, value?: string) {
  if (!value) return null;
  const normalized = value.match(/^(Explored|Rejected|Decided|Before|After)\.\s/i)
    ? value
    : `${prefix}. ${value}`;
  return normalized;
}

function DecisionBeat({ text }: { text: string }) {
  const match = text.match(/^(Explored|Rejected|Decided|Before|After)\.\s*(.*)$/i);
  if (!match) {
    return <p className="text-body text-text-on-light">{text}</p>;
  }

  const label = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();

  return (
    <p className="text-body text-text-on-light">
      <span className="font-medium">{label}.</span> {match[2]}
    </p>
  );
}

export function CaseStudyDecisionSection({
  decision,
  isMobile,
  tabletDecisionImageScale,
}: CaseStudyDecisionSectionProps) {
  const isThreeColumn = decision.layoutVariant === "three-column";

  return (
    <section className="bg-light-bg px-page-case-study py-case-study-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-decision-stack min-[768px]:flex-row min-[768px]:items-start min-[768px]:gap-10">
          <div className="w-full shrink-0 min-[768px]:w-[30%]">
            <p className="text-eyebrow text-text-on-light">{decision.eyebrow}</p>
            <h2 className="text-callout mt-case-study-decision-eyebrow text-text-on-light">
              {decision.title}
            </h2>
          </div>

          <div className="w-full min-[768px]:w-[70%]">
            {isThreeColumn ? (
              <div className="flex flex-col gap-case-study-decision-beats min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-decision-col-gap">
                <div className="flex min-w-0 flex-1 flex-col gap-case-study-decision-beats">
                  {decision.explored ? (
                    <DecisionBeat text={formatBeat("Explored", decision.explored)!} />
                  ) : null}
                  {decision.rejected ? (
                    <DecisionBeat text={formatBeat("Rejected", decision.rejected)!} />
                  ) : null}
                </div>

                <CaseStudyDivider orientation="horizontal" className="min-[1024px]:hidden" />
                <CaseStudyDivider className="hidden min-[1024px]:block" />

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
          imageSecondary={decision.imageSecondary}
          mobileImage={decision.mobileImage}
          desktopImageScale={decision.desktopImageScale}
          isMobile={isMobile}
          tabletDecisionImageScale={tabletDecisionImageScale}
          className="mt-10 min-[768px]:mt-section"
        />
      </CaseStudyPageContainer>
    </section>
  );
}
