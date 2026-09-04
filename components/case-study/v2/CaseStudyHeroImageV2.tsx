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

/** Matches v1 CBF Flo hero: intrinsic height + flush edges on mobile; intrinsic flush on desktop. */
export function CaseStudyHeroImageV2({
  hero,
  className = "",
}: CaseStudyHeroImageV2Props) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();

  if (!mounted) {
    return (
      <div
        className={`w-full shrink-0 overflow-hidden bg-case-study-hero-bg ${className}`}
        style={{ aspectRatio: `${hero.heroWidth} / ${hero.heroHeight}` }}
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
          aspect="intrinsic"
          imageWidth={hero.heroWidth}
          imageHeight={hero.heroHeight}
          background="primary"
          padded={false}
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
        imageWidth={hero.heroWidth}
        imageHeight={hero.heroHeight}
        background="secondary"
        padded={false}
        hoverRounded
        priority
      />
    </ExpandableDecisionAsset>
  );
}
