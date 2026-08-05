import type { CaseStudy } from "@/data/types";
import { CaseStudyConstraintsTakeaways } from "@/components/case-study/CaseStudyConstraintsTakeaways";
import { CaseStudyContextSection } from "@/components/case-study/CaseStudyContextSection";
import { CaseStudyDecisionSection } from "@/components/case-study/CaseStudyDecisionSection";
import { CaseStudyHeroImage } from "@/components/case-study/CaseStudyHeroImage";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { CaseStudyPullQuote } from "@/components/case-study/CaseStudyPullQuote";
import { CaseStudyTitleBlock } from "@/components/case-study/CaseStudyTitleBlock";

interface CaseStudyLayoutProps {
  study: CaseStudy;
}

export function CaseStudyLayout({ study }: CaseStudyLayoutProps) {
  return (
    <div className="case-study-page">
      <section className="bg-case-study-hero-bg px-page-case-study pb-case-study-section pt-8">
        <CaseStudyPageContainer>
          <CaseStudyTitleBlock study={study} variant="dark" />
          <CaseStudyHeroImage
            images={study.images.hero}
            isMobile={study.isMobile}
            heroIntrinsicAspect={study.heroIntrinsicAspect}
            className="mt-10"
          />
        </CaseStudyPageContainer>
      </section>

      <CaseStudyContextSection
        productContext={study.productContext}
        businessProblem={study.businessProblem}
      />

      {study.hasPullQuote && study.pullQuote && study.images.pullQuote ? (
        <CaseStudyPullQuote
          image={study.images.pullQuote}
          quote={study.pullQuote}
        />
      ) : null}

      {study.decisions.map((decision) =>
        decision.title && decision.title !== "Placeholder" ? (
          <CaseStudyDecisionSection
            key={decision.eyebrow}
            decision={decision}
            isMobile={study.isMobile}
            tabletDecisionImageScale={study.tabletDecisionImageScale}
          />
        ) : null,
      )}

      <CaseStudyConstraintsTakeaways
        constraintsTitle={study.constraintsTitle ?? "Designing Within Constraints"}
        constraints={study.constraints}
        takeawaysTitle={study.takeawaysTitle ?? "Takeaways"}
        takeaways={study.takeaways}
      />
    </div>
  );
}
