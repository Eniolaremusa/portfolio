"use client";

import { CaseStudyDualPhoneImage } from "@/components/case-study/CaseStudyDualPhoneImage";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";
import {
  useHasMounted,
  useIsMobileViewport,
} from "@/hooks/useMediaQuery";

interface CaseStudyDecisionImageProps {
  src: string;
  imageSecondary?: string;
  mobileImage?: string;
  desktopImageScale?: number;
  tabletDecisionImageScale?: number;
  isMobile: boolean;
  className?: string;
}

/**
 * Decision product frame. Only the active viewport asset is mounted — hidden
 * CSS twins are not used, so inactive breakpoint files are never requested.
 * Below-fold: no priority (next/image defaults to lazy).
 */
export function CaseStudyDecisionImage({
  src,
  imageSecondary,
  mobileImage,
  desktopImageScale,
  tabletDecisionImageScale,
  isMobile,
  className = "",
}: CaseStudyDecisionImageProps) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();

  if (isMobile) {
    const secondary = imageSecondary ?? src;
    return (
      <CaseStudyDualPhoneImage
        images={[src, secondary]}
        variant="decision"
        tabletImageScale={tabletDecisionImageScale}
        className={className}
      />
    );
  }

  if (mobileImage) {
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
        <CaseStudyImageCard
          src={mobileImage}
          aspect="square"
          className={className}
          padded
          background="secondary"
        />
      );
    }

    return (
      <CaseStudyImageCard
        src={src}
        className={className}
        padded
        desktopImageScale={desktopImageScale}
      />
    );
  }

  return <CaseStudyImageCard src={src} className={className} padded />;
}
