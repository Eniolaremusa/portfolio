import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { CaseStudyV2GalleryProvider } from "@/components/case-study/CaseStudyGalleryProvider";
import {
  CaseStudyDesignDecisionSection,
  CaseStudyRoleImpactLine,
} from "@/components/case-study/v2/CaseStudyDesignDecisionSection";
import { CaseStudyHeroImageV2 } from "@/components/case-study/v2/CaseStudyHeroImageV2";
import { CaseStudyImpactStatsSection } from "@/components/case-study/v2/CaseStudyImpactStatsSection";
import { CaseStudyProblemSolutionSection } from "@/components/case-study/v2/CaseStudyProblemSolutionSection";
import { CaseStudyProductStrategySection } from "@/components/case-study/v2/CaseStudyProductStrategySection";
import { CaseStudyQuickSummarySection } from "@/components/case-study/v2/CaseStudyQuickSummarySection";
import { CaseStudyResearchSection } from "@/components/case-study/v2/CaseStudyResearchSection";
import { CaseStudyRoleFlowsIntroSection } from "@/components/case-study/v2/CaseStudyRoleFlowsIntroSection";
import { CaseStudyRoleIntroSection } from "@/components/case-study/v2/CaseStudyRoleIntroSection";
import { CaseStudyTitleBlockV2 } from "@/components/case-study/v2/CaseStudyTitleBlockV2";
import type { CaseStudyV2 } from "@/data/cbf-flo-v2-types";

interface CaseStudyLayoutV2Props {
  study: CaseStudyV2;
}

export function CaseStudyLayoutV2({ study }: CaseStudyLayoutV2Props) {
  return (
    <CaseStudyV2GalleryProvider study={study}>
      <div className="case-study-page">
      <section className="bg-case-study-hero-bg px-page-case-study pb-case-study-v2-section pt-hero-section">
        <CaseStudyPageContainer>
          <CaseStudyTitleBlockV2 hero={study.hero} />
          <CaseStudyHeroImageV2 hero={study.hero} className="mt-10" />
        </CaseStudyPageContainer>
      </section>

      <CaseStudyQuickSummarySection
        title={study.quickSummary.title}
        columns={study.quickSummary.columns}
      />

      <CaseStudyProblemSolutionSection
        title={study.businessProblem.title}
        problems={study.businessProblem.problems}
        solutions={study.businessProblem.solutions}
      />

      <CaseStudyResearchSection
        title={study.research.title}
        primaryResearch={study.research.primaryResearch}
        secondaryResearch={study.research.secondaryResearch}
        personas={study.research.personas}
      />

      <CaseStudyProductStrategySection
        title={study.productStrategy.title}
        desktopImage={study.productStrategy.desktopImage}
        mobileImage={study.productStrategy.mobileImage}
        desktopWidth={study.productStrategy.desktopWidth}
        desktopHeight={study.productStrategy.desktopHeight}
        mobileWidth={study.productStrategy.mobileWidth}
        mobileHeight={study.productStrategy.mobileHeight}
      />

      <CaseStudyRoleFlowsIntroSection
        title={study.roleFlowsIntro.title}
        description={study.roleFlowsIntro.description}
      />

      {study.roles.map((role) => (
        <div key={role.title}>
          <CaseStudyRoleIntroSection
            title={role.title}
            description={role.description}
            flowImage={role.flowImage}
            flowAlt={role.flowAlt}
            flowWidth={role.flowWidth}
            flowHeight={role.flowHeight}
          />
          {role.decisions.map((decision) => (
            <CaseStudyDesignDecisionSection
              key={decision.title}
              decision={decision}
            />
          ))}
          {role.impactLine ? (
            <CaseStudyRoleImpactLine text={role.impactLine} />
          ) : null}
        </div>
      ))}

      <CaseStudyImpactStatsSection
        title={study.impactStats.title}
        stats={study.impactStats.stats}
      />
      </div>
    </CaseStudyV2GalleryProvider>
  );
}
