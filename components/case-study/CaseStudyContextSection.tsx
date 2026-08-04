import { CaseStudyBodyParagraphs } from "@/components/case-study/CaseStudyBodyParagraphs";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";

interface CaseStudyContextSectionProps {
  productContext: string;
  businessProblem: string;
}

export function CaseStudyContextSection({
  productContext,
  businessProblem,
}: CaseStudyContextSectionProps) {
  if (!productContext && !businessProblem) return null;

  return (
    <section className="bg-light-bg px-page-case-study py-section">
      <CaseStudyPageContainer className="flex flex-col gap-10 min-[768px]:flex-row min-[768px]:items-start min-[768px]:justify-center min-[768px]:gap-16">
        <div className="w-full min-[768px]:w-[40%]">
          <div className="flex flex-col gap-section-heading">
            <p className="text-eyebrow text-text-on-light">Product Context</p>
            <CaseStudyBodyParagraphs text={productContext} />
          </div>
        </div>
        <div className="w-full min-[768px]:w-[40%]">
          <div className="flex flex-col gap-section-heading">
            <p className="text-eyebrow text-text-on-light">Business Problem</p>
            <CaseStudyBodyParagraphs text={businessProblem} />
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
