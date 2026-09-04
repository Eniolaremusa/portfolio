import { CaseStudyDivider } from "@/components/case-study/CaseStudyDivider";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { CaseStudyV2DecisionImages } from "@/components/case-study/v2/CaseStudyV2DecisionImages";
import type { CaseStudyV2DesignDecision } from "@/data/cbf-flo-v2-types";

interface CaseStudyDesignDecisionSectionProps {
  decision: CaseStudyV2DesignDecision;
}

function CalloutLeadText({ text }: { text: string }) {
  const match = text.match(/^((?:Tradeoff|Decision):\s*)([\s\S]*)$/);

  if (!match) {
    return <>{text}</>;
  }

  return (
    <>
      <span className="font-bold">{match[1]}</span>
      {match[2]}
    </>
  );
}

function CalloutBox({
  text,
  variant,
}: {
  text: string;
  variant: "tradeoff" | "decision";
}) {
  const bgClass =
    variant === "tradeoff"
      ? "bg-case-study-problem-card"
      : "bg-case-study-solution-card";

  return (
    <div className={`p-case-study-v2-card ${bgClass}`}>
      <p className="text-body text-text-on-light">
        <CalloutLeadText text={text} />
      </p>
    </div>
  );
}

function OptionCard({
  label,
  text,
  isDecision,
}: {
  label?: string;
  text: string;
  isDecision?: boolean;
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col gap-4 p-case-study-v2-card ${
        isDecision ? "bg-case-study-solution-card" : "bg-light-image-bg"
      }`}
    >
      {label ? (
        <p className="text-eyebrow text-text-on-light">{label}</p>
      ) : null}
      <p className="text-body text-text-on-light">
        <CalloutLeadText text={text} />
      </p>
    </div>
  );
}

export function CaseStudyDesignDecisionSection({
  decision,
}: CaseStudyDesignDecisionSectionProps) {
  const hasOptions = Boolean(decision.options?.length);

  return (
    <section className="bg-light-bg px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within">
          <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-start">
            <div className="flex w-full min-w-0 flex-col gap-2 min-[1280px]:w-[48%]">
              <h3 className="text-callout text-text-on-light">{decision.title}</h3>
              <p className="text-body text-text-on-light">{decision.body}</p>
            </div>

            {(decision.decisionCallout || decision.tradeoffCallout) && (
              <div className="flex w-full min-w-0 flex-col gap-4 min-[1280px]:w-[52%]">
                {decision.decisionCallout ? (
                  <CalloutBox text={decision.decisionCallout} variant="decision" />
                ) : null}
                {decision.tradeoffCallout ? (
                  <CalloutBox text={decision.tradeoffCallout} variant="tradeoff" />
                ) : null}
              </div>
            )}
          </div>

          {hasOptions ? (
            <div className="flex flex-col gap-6 min-[1280px]:flex-row min-[1280px]:items-stretch">
              <p className="text-options-label w-full shrink-0 text-text-on-light min-[1280px]:w-[30%]">
                {decision.optionsLabel ?? "Options Considered"}
              </p>
              <div className="flex w-full min-w-0 flex-col gap-4 min-[1280px]:w-[70%] min-[1280px]:flex-row min-[1280px]:items-stretch min-[1280px]:gap-0">
                {decision.options?.map((option, index) => (
                  <div
                    key={`${option.label}-${option.text.slice(0, 24)}`}
                    className="flex min-w-0 flex-1 min-[1280px]:flex-row min-[1280px]:items-stretch"
                  >
                    {index > 0 ? (
                      <CaseStudyDivider
                        orientation="vertical"
                        className="mx-6 hidden min-[1280px]:block"
                      />
                    ) : null}
                    <OptionCard
                      label={option.label}
                      text={option.text}
                      isDecision={option.isDecision}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {decision.images.length > 0 ? (
            <CaseStudyV2DecisionImages
              images={decision.images}
              caption={decision.imageCaption}
            />
          ) : null}
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}

interface CaseStudyRoleImpactLineProps {
  text: string;
}

export function CaseStudyRoleImpactLine({ text }: CaseStudyRoleImpactLineProps) {
  return (
    <section className="bg-light-bg px-page-case-study pb-case-study-v2-section pt-0">
      <CaseStudyPageContainer>
        <p className="text-role-impact break-words">{text}</p>
      </CaseStudyPageContainer>
    </section>
  );
}
