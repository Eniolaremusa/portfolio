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
      <section className="bg-light-bg px-page pb-10 pt-16 md:pb-section md:pt-hero-pt">
        <div className="mx-auto max-w-[1312px]">
          <CaseStudyTitleBlock study={study} />
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
        constraints={study.constraints}
        takeaways={study.takeaways}
      />
    </>
  );
}
