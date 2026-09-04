import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { CaseStudyViewUserFlowCta } from "@/components/case-study/CaseStudyViewUserFlowCta";
import { CaseStudyV2Asset } from "@/components/case-study/v2/CaseStudyV2Asset";

interface CaseStudyRoleIntroSectionProps {
  title: string;
  description: string;
  flowImage: string;
  flowAlt: string;
  flowWidth: number;
  flowHeight: number;
}

export function CaseStudyRoleIntroSection({
  title,
  description,
  flowImage,
}: CaseStudyRoleIntroSectionProps) {
  return (
    <section className="bg-light-bg px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within min-[768px]:flex-row min-[768px]:items-end">
          <div className="flex w-full min-w-0 flex-col gap-2 min-[768px]:w-[30%] min-[768px]:max-w-[357px]">
            <h2 className="text-callout text-text-on-light">{title}</h2>
            <p className="text-body text-text-on-light">{description}</p>
            <CaseStudyViewUserFlowCta
              src={flowImage}
              className="mt-2 min-[768px]:hidden"
            />
          </div>

          <div className="hidden w-full min-w-0 min-[768px]:block min-[768px]:flex-1">
            <CaseStudyV2Asset
              src={flowImage}
              background="light"
              padded
              responsiveFrame
            />
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
