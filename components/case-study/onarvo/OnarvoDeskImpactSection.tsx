import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { OnarvoDeskDivider } from "@/components/case-study/onarvo/OnarvoDeskDivider";
import type { OnarvoDeskImpactStat } from "@/data/onarvo-desk-types";

interface OnarvoDeskImpactSectionProps {
  title: string;
  stats: OnarvoDeskImpactStat[];
}

export function OnarvoDeskImpactSection({
  title,
  stats,
}: OnarvoDeskImpactSectionProps) {
  return (
    <section className="onarvo-section-warm px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-start min-[1280px]:gap-16">
          <h2 className="onarvo-text-section-title w-full shrink-0 min-[1280px]:w-[357px]">
            {title}
          </h2>

          <div className="flex w-full min-w-0 flex-col gap-6 min-[768px]:flex-row min-[768px]:items-stretch min-[1280px]:flex-1 min-[1280px]:gap-[31px]">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex min-w-0 flex-1 min-[768px]:flex-row min-[768px]:items-stretch"
              >
                {index > 0 ? (
                  <OnarvoDeskDivider
                    orientation="vertical"
                    className="mx-0 mr-[31px] hidden min-[768px]:block"
                  />
                ) : null}
                <div className="onarvo-card-impact flex min-h-[111px] min-w-0 flex-1 flex-col gap-4 px-6 py-4">
                  <p className="onarvo-text-impact-stat">{stat.value}</p>
                  <p className="onarvo-text-body">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
