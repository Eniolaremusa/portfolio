import type { CaseStudy } from "@/data/types";
import { CaseStudyConstraintsTakeaways } from "@/components/case-study/CaseStudyConstraintsTakeaways";
import { CaseStudyContextSection } from "@/components/case-study/CaseStudyContextSection";
import { CaseStudyDecisionSection } from "@/components/case-study/CaseStudyDecisionSection";
import { CaseStudyHeroImage } from "@/components/case-study/CaseStudyHeroImage";
import { CaseStudyPullQuote } from "@/components/case-study/CaseStudyPullQuote";
import { CaseStudyTitleBlock } from "@/components/case-study/CaseStudyTitleBlock";

interface CaseStudyLayoutProps {
  study: CaseStudy;
}

export function CaseStudyLayout({ study }: CaseStudyLayoutProps) {
  return (
    <>
      <section className="bg-case-study-hero-bg px-page pb-section pt-8">
        <div className="mx-auto max-w-[1312px]">
          <CaseStudyTitleBlock study={study} variant="dark" />
          <CaseStudyHeroImage
            images={study.images.hero}
            isMobile={study.isMobile}
            className="mt-10"
          />
        </div>
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
