"use client";

import type { CaseStudyV2Hero } from "@/data/cbf-flo-v2-types";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";
import { ExpandableDecisionAsset } from "@/components/case-study/ExpandableDecisionAsset";
import {
  useHasMounted,
  useIsMobileViewport,
} from "@/hooks/useMediaQuery";

interface CaseStudyHeroImageV2Props {
  hero: CaseStudyV2Hero;
  className?: string;
}

/** Matches original CaseStudyHeroImage: square + inset on mobile, intrinsic flush on desktop. */
export function CaseStudyHeroImageV2({
  hero,
  className = "",
}: CaseStudyHeroImageV2Props) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();

  if (!mounted) {
    return (
      <div
        className={`case-study-image-card-square w-full shrink-0 bg-case-study-hero-image-bg ${className}`}
        aria-hidden
      />
    );
  }

  if (isMobileViewport) {
    return (
      <ExpandableDecisionAsset
        src={hero.heroImage}
        className={className ? `block ${className}` : "block"}
      >
        <CaseStudyImageCard
          src={hero.heroImage}
          aspect="square"
          background="secondary"
          padded
          hoverRounded
          priority
        />
      </ExpandableDecisionAsset>
    );
  }

  return (
    <ExpandableDecisionAsset
      src={hero.heroImage}
      className={className ? `block ${className}` : "block"}
    >
      <CaseStudyImageCard
        src={hero.heroImage}
        aspect="intrinsic"
        background="secondary"
        padded={false}
        hoverRounded
        priority
      />
    </ExpandableDecisionAsset>
  );
}
