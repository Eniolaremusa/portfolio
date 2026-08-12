import type { CaseStudy, DecisionContent } from "@/data/types";

function isRenderableDecision(decision: DecisionContent) {
  return Boolean(decision.title && decision.title !== "Placeholder");
}

function appendDecisionImages(
  images: string[],
  decision: DecisionContent,
  options: { isMobileProduct: boolean; isMobileViewport: boolean },
) {
  const { isMobileProduct, isMobileViewport } = options;

  if (isMobileProduct) {
    images.push(decision.image);
    if (decision.imageSecondary) images.push(decision.imageSecondary);
    return;
  }

  if (isMobileViewport && decision.mobileImage) {
    images.push(decision.mobileImage);
    return;
  }

  const arrangement = decision.imageArrangement ?? "single";

  if (arrangement === "single-then-pair") {
    images.push(decision.image);
    if (decision.imageSecondary) images.push(decision.imageSecondary);
    if (decision.imageTertiary) images.push(decision.imageTertiary);
    return;
  }

  if (arrangement === "pair") {
    images.push(decision.image);
    if (decision.imageSecondary) images.push(decision.imageSecondary);
    return;
  }

  images.push(decision.image);
}

/**
 * Fullscreen gallery order for a case study: hero, then each decision's
 * images in reading order. Matches the assets shown for the active viewport.
 */
export function getCaseStudyGalleryImages(
  study: CaseStudy,
  isMobileViewport: boolean,
): string[] {
  const images: string[] = [];

  if (study.isMobile && study.images.hero.length >= 2) {
    images.push(study.images.hero[0], study.images.hero[1]);
  } else if (isMobileViewport && study.images.heroMobile) {
    images.push(study.images.heroMobile);
  } else if (study.images.hero[0]) {
    images.push(study.images.hero[0]);
  }

  for (const decision of study.decisions) {
    if (!isRenderableDecision(decision)) continue;
    appendDecisionImages(images, decision, {
      isMobileProduct: study.isMobile,
      isMobileViewport,
    });
  }

  return images;
}
