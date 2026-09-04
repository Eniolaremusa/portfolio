import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";

interface CaseStudyRoleFlowsIntroSectionProps {
  title: string;
  description: string;
}

export function CaseStudyRoleFlowsIntroSection({
  title,
  description,
}: CaseStudyRoleFlowsIntroSectionProps) {
  return (
    <section className="bg-light-bg px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex max-w-[624px] flex-col gap-2">
          <h2 className="text-h2 text-text-on-light">{title}</h2>
          <p className="text-body text-text-on-light">{description}</p>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
