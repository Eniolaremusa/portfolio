import { CaseStudyDivider } from "@/components/case-study/CaseStudyDivider";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import type { CaseStudyV2QuickSummaryColumn } from "@/data/cbf-flo-v2-types";

interface CaseStudyQuickSummarySectionProps {
  title: string;
  columns: CaseStudyV2QuickSummaryColumn[];
}

export function CaseStudyQuickSummarySection({
  title,
  columns,
}: CaseStudyQuickSummarySectionProps) {
  return (
    <section className="bg-light-bg px-page-case-study pb-case-study-v2-quick-summary pt-case-study-v2-quick-summary">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-start">
          <h2 className="text-h2 w-full shrink-0 text-text-on-light min-[1280px]:w-[30%]">
            {title}
          </h2>

          <div className="flex w-full min-w-0 flex-col gap-6 min-[1024px]:flex-row min-[1024px]:items-stretch min-[1280px]:w-[70%]">
            {columns.map((column, index) => (
              <div
                key={column.label}
                className="flex min-w-0 flex-1 min-[1024px]:flex-row min-[1024px]:items-stretch"
              >
                {index > 0 ? (
                  <CaseStudyDivider
                    orientation="vertical"
                    className="mx-0 mr-6 hidden min-[1024px]:block"
                  />
                ) : null}
                <div className="flex min-w-0 flex-1 flex-col gap-4 bg-light-image-bg p-case-study-v2-card">
                  <p className="text-eyebrow text-text-on-light">{column.label}</p>
                  <ol className="flex list-decimal flex-col gap-2 pl-[22.5px] text-body text-text-on-light marker:text-text-on-light">
                    {column.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
