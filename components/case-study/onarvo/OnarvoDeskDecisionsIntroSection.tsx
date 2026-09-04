import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";

interface OnarvoDeskDecisionsIntroSectionProps {
  title: string;
  description: string;
}

export function OnarvoDeskDecisionsIntroSection({
  title,
  description,
}: OnarvoDeskDecisionsIntroSectionProps) {
  return (
    <section className="onarvo-section-warm px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-start">
          <h2 className="onarvo-text-section-title w-full shrink-0 min-[1280px]:w-[27%]">
            {title}
          </h2>
          <p className="onarvo-text-body w-full min-[1280px]:w-[73%]">{description}</p>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
