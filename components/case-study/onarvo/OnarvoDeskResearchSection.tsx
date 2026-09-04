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
      <p className="text-body text-text-on-light">
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
        <div className="flex flex-col gap-case-study-v2-within">
          <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-start">
            <h2 className="text-h2 w-full shrink-0 text-text-on-light min-[1280px]:w-[30%]">
              {title}
            </h2>

            <div className="flex w-full min-w-0 flex-col gap-6 min-[1280px]:w-[70%] min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-0">
              <p className="text-body min-w-0 flex-1 text-text-on-light">{primaryResearch}</p>
              <OnarvoDeskDivider
                orientation="vertical"
                className="mx-6 hidden min-[1024px]:block"
              />
              <OnarvoDeskDivider
                orientation="horizontal"
                className="min-[1024px]:hidden"
              />
              <p className="text-body min-w-0 flex-1 text-text-on-light">{secondaryResearch}</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 min-[1280px]:grid min-[1280px]:grid-cols-3 min-[1280px]:gap-6">
            {findings.map((finding, index) => (
              <div
                key={finding.lead}
                className="flex min-w-0 flex-col min-[1280px]:flex-row min-[1280px]:items-stretch"
              >
                {index > 0 ? (
                  <OnarvoDeskDivider
                    orientation="vertical"
                    className="mx-0 mr-6 hidden min-[1280px]:block"
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
