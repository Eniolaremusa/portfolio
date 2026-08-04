import type { CaseStudy } from "@/data/types";
import { CaseStudyConstraintsTakeaways } from "@/components/case-study/CaseStudyConstraintsTakeaways";
import { CaseStudyContextSection } from "@/components/case-study/CaseStudyContextSection";
import { CaseStudyDecisionSection } from "@/components/case-study/CaseStudyDecisionSection";
import { CaseStudyHeroImage } from "@/components/case-study/CaseStudyHeroImage";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { CaseStudyTitleBlock } from "@/components/case-study/CaseStudyTitleBlock";

interface CaseStudyLayoutProps {
  study: CaseStudy;
}

export function CaseStudyLayout({ study }: CaseStudyLayoutProps) {
  return (
    <>
      <section className="bg-case-study-hero-bg px-page-case-study pb-section pt-8">
        <CaseStudyPageContainer>
          <CaseStudyTitleBlock study={study} variant="dark" />
          <CaseStudyHeroImage
            images={study.images.hero}
            isMobile={study.isMobile}
            className="mt-10"
          />
        </CaseStudyPageContainer>
      </section>

      <CaseStudyContextSection
        productContext={study.productContext}
        businessProblem={study.businessProblem}
      />

      {/* Callout hidden — revisit separately
      {study.hasPullQuote && study.pullQuote && study.images.pullQuote ? (
        <CaseStudyPullQuote
          image={study.images.pullQuote}
          quote={study.pullQuote}
        />
      ) : null}
      */}

      {study.decisions.map((decision) =>
        decision.title && decision.title !== "Placeholder" ? (
          <CaseStudyDecisionSection
            key={decision.eyebrow}
            decision={decision}
            isMobile={study.isMobile}
          />
        ) : null,
      )}

      <CaseStudyConstraintsTakeaways
        constraintsTitle={study.constraintsTitle ?? "Designing Within Constraints"}
        constraints={study.constraints}
        takeawaysTitle={study.takeawaysTitle ?? "Takeaways"}
        takeaways={study.takeaways}
      />
    </>
  );
}
