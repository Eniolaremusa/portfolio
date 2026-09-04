import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { OnarvoDeskDivider } from "@/components/case-study/onarvo/OnarvoDeskDivider";
import type { OnarvoDeskFinding } from "@/data/onarvo-desk-types";

interface OnarvoDeskResearchSectionProps {
  title: string;
  primaryResearch: string;
  secondaryResearch: string;
  findings: OnarvoDeskFinding[];
}

function FindingCard({ finding }: { finding: OnarvoDeskFinding }) {
  return (
    <div className="onarvo-card-research flex min-w-0 flex-1 flex-col p-case-study-v2-card">
      <p className="onarvo-text-body">
        <span className="font-bold">{finding.lead}</span> {finding.body}
      </p>
    </div>
  );
}

export function OnarvoDeskResearchSection({
  title,
  primaryResearch,
  secondaryResearch,
  findings,
}: OnarvoDeskResearchSectionProps) {
  return (
    <section className="onarvo-section-warm px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-center">
            <h2 className="onarvo-text-section-title w-full shrink-0 min-[1280px]:w-[357px]">
              {title}
            </h2>

            <div className="flex w-full min-w-0 flex-col gap-6 min-[768px]:flex-row min-[768px]:items-stretch min-[1280px]:flex-1 min-[1280px]:gap-case-study-v2-within">
              <p className="onarvo-text-body min-w-0 flex-1">{primaryResearch}</p>
              <OnarvoDeskDivider
                orientation="vertical"
                className="hidden min-[768px]:block"
              />
              <OnarvoDeskDivider
                orientation="horizontal"
                className="min-[768px]:hidden"
              />
              <p className="onarvo-text-body min-w-0 flex-1">{secondaryResearch}</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 min-[768px]:flex-row min-[768px]:items-stretch">
            {findings.map((finding, index) => (
              <div
                key={finding.lead}
                className="flex min-w-0 flex-1 min-[768px]:flex-row min-[768px]:items-stretch"
              >
                {index > 0 ? (
                  <OnarvoDeskDivider
                    orientation="vertical"
                    className="mx-0 mr-6 hidden min-[768px]:block"
                  />
                ) : null}
                <FindingCard finding={finding} />
              </div>
            ))}
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
