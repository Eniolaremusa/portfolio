import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { OnarvoDeskAsset } from "@/components/case-study/onarvo/OnarvoDeskAsset";
import type {
  OnarvoDeskDecision,
  OnarvoDeskDecisionOption,
} from "@/data/onarvo-desk-types";

function CalloutLeadText({ text }: { text: string }) {
  const match = text.match(/^((?:Tradeoff|Decision):\s*)([\s\S]*)$/);

  if (!match) {
    return <>{text}</>;
  }

  return (
    <>
      <span className="font-medium">{match[1]}</span>
      {match[2]}
    </>
  );
}

function OptionCard({ option }: { option: OnarvoDeskDecisionOption }) {
  const cardClass =
    option.variant === "decision" ? "onarvo-card-decision" : "onarvo-card-neutral";

  return (
    <div className={`flex flex-col gap-4 p-case-study-v2-card ${cardClass}`}>
      {option.label ? (
        <p className="text-label-sm text-text-on-light">{option.label}</p>
      ) : null}
      <p className="text-body text-text-on-light">
        <CalloutLeadText text={option.text} />
      </p>
    </div>
  );
}

interface OnarvoDeskDecisionSectionProps {
  decision: OnarvoDeskDecision;
}

export function OnarvoDeskDecisionSection({
  decision,
}: OnarvoDeskDecisionSectionProps) {
  const hasOptions = Boolean(decision.options?.length);

  return (
    <section className="onarvo-section-warm px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-end">
          <div className="flex w-full min-w-0 flex-col gap-6 min-[1280px]:max-w-[480px] min-[1280px]:shrink-0">
            <div className="flex flex-col gap-2">
              <p className="text-label-sm text-text-on-light">{decision.number}</p>
              <h3 className="text-callout text-text-on-light">{decision.title}</h3>
              <p className="text-body text-text-on-light">{decision.body}</p>
            </div>

            {hasOptions ? (
              <div className="flex flex-col gap-4">
                {decision.optionsLabel ? (
                  <p className="onarvo-options-label text-text-on-light">
                    {decision.optionsLabel}
                  </p>
                ) : null}
                <div className="flex flex-col gap-4">
                  {decision.options?.map((option) => (
                    <OptionCard key={option.text} option={option} />
                  ))}
                </div>
              </div>
            ) : null}

            {decision.tradeoffCallout ? (
              <div className="onarvo-card-tradeoff p-case-study-v2-card">
                <p className="text-body text-text-on-light">
                  <CalloutLeadText text={decision.tradeoffCallout} />
                </p>
              </div>
            ) : null}
          </div>

          <div className="onarvo-decision-image-panel flex min-h-[360px] w-full min-w-0 flex-1 items-center justify-center overflow-hidden min-[1280px]:min-h-[720px]">
            <OnarvoDeskAsset
              src={decision.image.src}
              imageWidth={decision.image.width}
              imageHeight={decision.image.height}
              frameVariant="dark-panel"
              padded
              className="h-full w-full"
            />
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
