import { CaseStudyDivider } from "@/components/case-study/CaseStudyDivider";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import type { CaseStudyV2ImpactStat } from "@/data/cbf-flo-v2-types";

interface CaseStudyImpactStatsSectionProps {
  title: string;
  stats: CaseStudyV2ImpactStat[];
}

export function CaseStudyImpactStatsSection({
  title,
  stats,
}: CaseStudyImpactStatsSectionProps) {
  return (
    <section className="bg-light-bg px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-start">
          <h2 className="text-h2 w-full shrink-0 text-text-on-light min-[1280px]:w-[30%]">
            {title}
          </h2>

          <div className="grid w-full min-w-0 grid-cols-1 gap-6 min-[768px]:grid-cols-2 min-[1280px]:flex min-[1280px]:w-[70%] min-[1280px]:flex-row min-[1280px]:items-stretch min-[1280px]:gap-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="flex min-w-0 flex-1 min-[1280px]:flex-row min-[1280px]:items-stretch"
              >
                {index > 0 ? (
                  <CaseStudyDivider
                    orientation="vertical"
                    className="mx-0 mr-6 hidden min-[1280px]:block"
                  />
                ) : null}
                <div className="flex min-w-0 flex-1 flex-col gap-4 bg-light-image-bg p-case-study-v2-card">
                  <p className="text-stat-value text-text-on-light">{stat.value}</p>
                  <p className="text-body text-text-on-light">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
