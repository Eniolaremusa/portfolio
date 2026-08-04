import { CaseStudyBodyParagraphs } from "@/components/case-study/CaseStudyBodyParagraphs";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";

interface CaseStudyConstraintsTakeawaysProps {
  constraintsTitle: string;
  constraints: string;
  takeawaysTitle: string;
  takeaways: string;
}

export function CaseStudyConstraintsTakeaways({
  constraintsTitle,
  constraints,
  takeawaysTitle,
  takeaways,
}: CaseStudyConstraintsTakeawaysProps) {
  if (!constraints && !takeaways) return null;

  return (
    <section className="bg-light-bg px-page-case-study py-section">
      <CaseStudyPageContainer className="flex flex-col gap-10 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-center min-[768px]:gap-16">
        <div className="w-full min-[768px]:w-[40%]">
          <p className="text-eyebrow text-text-on-light">{constraintsTitle}</p>
          <div className="mt-section-heading">
            <CaseStudyBodyParagraphs text={constraints} />
          </div>
        </div>
        <div className="w-full min-[768px]:w-[40%]">
          <p className="text-eyebrow text-text-on-light">{takeawaysTitle}</p>
          <div className="mt-section-heading">
            <CaseStudyBodyParagraphs text={takeaways} />
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
