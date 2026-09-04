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
          <h2 className="text-h2 w-full shrink-0 text-text-on-light min-[1280px]:w-[30%]">
            {title}
          </h2>
          <p className="text-body w-full text-text-on-light min-[1280px]:w-[70%]">{description}</p>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
