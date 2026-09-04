import "@/app/onarvo-desk.css";
import { OnarvoDeskGalleryProvider } from "@/components/case-study/CaseStudyGalleryProvider";
import { OnarvoDeskBeforeAfterSection } from "@/components/case-study/onarvo/OnarvoDeskBeforeAfterSection";
import { OnarvoDeskDecisionSection } from "@/components/case-study/onarvo/OnarvoDeskDecisionSection";
import { OnarvoDeskDecisionsIntroSection } from "@/components/case-study/onarvo/OnarvoDeskDecisionsIntroSection";
import { OnarvoDeskHeroSection } from "@/components/case-study/onarvo/OnarvoDeskHeroSection";
import { OnarvoDeskImpactSection } from "@/components/case-study/onarvo/OnarvoDeskImpactSection";
import { OnarvoDeskQuickSummarySection } from "@/components/case-study/onarvo/OnarvoDeskQuickSummarySection";
import { OnarvoDeskReflectionSection } from "@/components/case-study/onarvo/OnarvoDeskReflectionSection";
import { OnarvoDeskResearchSection } from "@/components/case-study/onarvo/OnarvoDeskResearchSection";
import type { OnarvoDesk } from "@/data/onarvo-desk-types";

interface OnarvoDeskLayoutProps {
  study: OnarvoDesk;
}

export function OnarvoDeskLayout({ study }: OnarvoDeskLayoutProps) {
  return (
    <OnarvoDeskGalleryProvider study={study}>
    <div className="onarvo-desk-page">
      <OnarvoDeskHeroSection hero={study.hero} />

      <OnarvoDeskQuickSummarySection
        title={study.quickSummary.title}
        columns={study.quickSummary.columns}
      />

      <OnarvoDeskBeforeAfterSection
        title={study.beforeAfter.title}
        subtitle={study.beforeAfter.subtitle}
        beforeLabel={study.beforeAfter.beforeLabel}
        afterLabel={study.beforeAfter.afterLabel}
        before={study.beforeAfter.before}
        after={study.beforeAfter.after}
        screenshot={study.beforeAfter.screenshot}
      />

      <OnarvoDeskResearchSection
        title={study.research.title}
        primaryResearch={study.research.primaryResearch}
        secondaryResearch={study.research.secondaryResearch}
        findings={study.research.findings}
      />

      <OnarvoDeskDecisionsIntroSection
        title={study.decisionsIntro.title}
        description={study.decisionsIntro.description}
      />

      {study.decisions.map((decision) => (
        <OnarvoDeskDecisionSection
          key={decision.number}
          decision={decision}
        />
      ))}

      <OnarvoDeskImpactSection
        title={study.impactStats.title}
        stats={study.impactStats.stats}
      />

      <OnarvoDeskReflectionSection
        title={study.reflection.title}
        items={study.reflection.items}
      />
    </div>
    </OnarvoDeskGalleryProvider>
  );
}
