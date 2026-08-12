"use client";

import { CaseStudyDualPhoneImage } from "@/components/case-study/CaseStudyDualPhoneImage";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";
import { ExpandableDecisionAsset } from "@/components/case-study/ExpandableDecisionAsset";
import {
  useHasMounted,
  useIsMobileViewport,
} from "@/hooks/useMediaQuery";

interface CaseStudyHeroImageProps {
  images: string[];
  /** Optional mobile-only hero asset (<768px) */
  heroMobile?: string;
  isMobile: boolean;
  heroIntrinsicAspect?: boolean;
  /** Frame inset on intrinsic heroes; defaults to true */
  heroPadded?: boolean;
  className?: string;
}

export function CaseStudyHeroImage({
  images,
  heroMobile,
  isMobile,
  heroIntrinsicAspect = false,
  heroPadded = true,
  className = "",
}: CaseStudyHeroImageProps) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();

  if (isMobile && images.length >= 2) {
    return (
      <CaseStudyDualPhoneImage
        images={[images[0], images[1]]}
        variant="hero"
        className={className}
        priority
      />
    );
  }

  const src = images[0];
  const heroBackground = isMobile ? "secondary" : "primary";

  if (!src) {
    return (
      <CaseStudyImageCard
        src=""
        aspect={heroIntrinsicAspect ? "intrinsic" : isMobile ? "hero-mobile" : "wide"}
        background={heroBackground}
        padded={heroPadded}
        className={className}
      />
    );
  }

  if (heroIntrinsicAspect) {
    if (heroMobile) {
      if (!mounted) {
        return (
          <div
            className={`w-full shrink-0 overflow-hidden ${heroBackground === "secondary" ? "bg-case-study-hero-image-bg" : "bg-case-study-hero-bg"} ${className}`}
            style={{ aspectRatio: "16 / 10" }}
            aria-hidden
          />
        );
      }

      const activeSrc = isMobileViewport ? heroMobile : src;

      return (
        <ExpandableDecisionAsset
          src={activeSrc}
          className={className ? `block ${className}` : "block"}
        >
          <CaseStudyImageCard
            src={activeSrc}
            aspect="intrinsic"
            background={heroBackground}
            padded={heroPadded}
            hoverRounded
            priority
          />
        </ExpandableDecisionAsset>
      );
    }

    return (
      <ExpandableDecisionAsset
        src={src}
        className={className ? `block ${className}` : "block"}
      >
        <CaseStudyImageCard
          src={src}
          aspect="intrinsic"
          background={heroBackground}
          padded={heroPadded}
          hoverRounded
          priority
        />
      </ExpandableDecisionAsset>
    );
  }

  const desktopAspect = isMobile ? "hero-mobile" : "wide";

  if (!mounted) {
    return (
      <div
        className={`case-study-image-card-square w-full shrink-0 ${heroBackground === "secondary" ? "bg-case-study-hero-image-bg" : "bg-case-study-hero-bg"} ${className}`}
        aria-hidden
      />
    );
  }

  if (isMobileViewport) {
    return (
      <ExpandableDecisionAsset
        src={src}
        className={className ? `block ${className}` : "block"}
      >
        <CaseStudyImageCard
          src={src}
          aspect="square"
          background={heroBackground}
          imageFit="contain"
          padded
          hoverRounded
          priority
        />
      </ExpandableDecisionAsset>
    );
  }

  return (
    <ExpandableDecisionAsset
      src={src}
      className={className ? `block ${className}` : "block"}
    >
      <CaseStudyImageCard
        src={src}
        aspect={desktopAspect}
        background={heroBackground}
        imageFit={isMobile || heroPadded ? "contain" : "cover"}
        objectPosition={isMobile || heroPadded ? "center" : "top"}
        padded={isMobile || heroPadded}
        hoverRounded
        priority
      />
    </ExpandableDecisionAsset>
  );
}
