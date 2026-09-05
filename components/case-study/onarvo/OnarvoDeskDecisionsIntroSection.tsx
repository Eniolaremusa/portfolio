import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";

interface OnarvoDeskDecisionsIntroSectionProps {
  title: string;
}

export function OnarvoDeskDecisionsIntroSection({
  title,
}: OnarvoDeskDecisionsIntroSectionProps) {
  return (
    <section className="onarvo-section-warm px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <h2 className="text-h2 text-text-on-light">{title}</h2>
      </CaseStudyPageContainer>
    </section>
  );
}
