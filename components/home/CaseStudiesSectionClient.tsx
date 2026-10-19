"use client";

import { useCallback, useState } from "react";
import { CaseStudyPreviewSheet } from "@/components/home/CaseStudyPreviewSheet";
import { StickySection } from "@/components/home/StickySection";
import { getHomepageCaseStudy } from "@/data";
import { isCaseStudyPreviewSheetSlug } from "@/data/caseStudyPreviewSheet";
import { homeCaseStudyOrder } from "@/data/home";
import type { CaseStudy } from "@/data/types";
import { CaseStudyCard } from "@/components/home/CaseStudyCard";

export function CaseStudiesSectionClient() {
  const [previewStudy, setPreviewStudy] = useState<CaseStudy | null>(null);

  const studies = homeCaseStudyOrder
    .map((slug) => getHomepageCaseStudy(slug))
    .filter((study): study is CaseStudy => Boolean(study));

  const openPreview = useCallback((study: CaseStudy) => {
    if (isCaseStudyPreviewSheetSlug(study.slug)) {
      setPreviewStudy(study);
    }
  }, []);

  const closePreview = useCallback(() => setPreviewStudy(null), []);

  return (
    <>
      <StickySection
        label="Read about some of my favorite work."
        labelHeadingClassName="text-home-section-lead bg-light-bg xl:sticky xl:top-[69px] xl:z-10 xl:py-2"
        gridClassName="mx-auto grid w-full max-w-[1312px] grid-cols-1 gap-home-section-label xl:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]"
        contentClassName="grid w-full min-w-0 grid-cols-1 gap-y-grid-gap-y min-[768px]:grid-cols-2 min-[768px]:gap-x-grid-gap-x"
      >
        {studies.map((study) => (
          <CaseStudyCard
            key={study.slug}
            study={study}
            onReadCaseStudy={() => openPreview(study)}
            usePreviewSheet={isCaseStudyPreviewSheetSlug(study.slug)}
          />
        ))}
      </StickySection>

      <CaseStudyPreviewSheet study={previewStudy} onClose={closePreview} />
    </>
  );
}
