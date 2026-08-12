"use client";

import type { DecisionImageArrangement } from "@/data/types";
import { CaseStudyDualPhoneImage } from "@/components/case-study/CaseStudyDualPhoneImage";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";
import { ExpandableDecisionAsset } from "@/components/case-study/ExpandableDecisionAsset";
import {
  useHasMounted,
  useIsMobileViewport,
} from "@/hooks/useMediaQuery";

interface DecisionFrameStyle {
  padded?: boolean;
  imageFit?: "contain" | "cover";
  objectPosition?: "top" | "center" | "bottom";
  desktopImageScale?: number;
}

interface CaseStudyDecisionImageProps extends DecisionFrameStyle {
  src: string;
  imageSecondary?: string;
  imageTertiary?: string;
  imageArrangement?: DecisionImageArrangement;
  mobileImage?: string;
  tabletDecisionImageScale?: number;
  isMobile: boolean;
  className?: string;
}

function DesktopDecisionFrame({
  src,
  aspect,
  desktopImageScale,
  padded = true,
  imageFit = "contain",
  objectPosition = "center",
  className = "",
}: {
  src: string;
  aspect: "wide" | "square" | "pair";
  className?: string;
} & DecisionFrameStyle) {
  return (
    <ExpandableDecisionAsset
      src={src}
      className={className ? `block ${className}` : "block"}
    >
      <CaseStudyImageCard
        src={src}
        aspect={aspect}
        padded={padded}
        background="primary"
        imageFit={imageFit}
        objectPosition={objectPosition}
        desktopImageScale={desktopImageScale}
        hoverRounded
      />
    </ExpandableDecisionAsset>
  );
}

/**
 * Two equal frames — Applatch paired column sizing (636×690) at tablet+,
 * stacked squares on mobile. Always CBF Flo dark frame background.
 */
function PairedDesktopFrames({
  images,
  desktopImageScale,
  padded,
  imageFit,
  objectPosition,
  className = "",
}: {
  images: [string, string];
  className?: string;
} & DecisionFrameStyle) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();

  if (!mounted) {
    return (
      <div
        className={`case-study-image-card-square w-full shrink-0 bg-case-study-hero-bg ${className}`}
        aria-hidden
      />
    );
  }

  if (isMobileViewport) {
    return (
      <div className={`flex w-full flex-col gap-10 ${className}`}>
        {images.map((src) => (
          <DesktopDecisionFrame
            key={src}
            src={src}
            aspect="square"
            desktopImageScale={desktopImageScale}
            padded={padded}
            imageFit={imageFit}
            objectPosition={objectPosition}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`flex w-full items-start gap-10 ${className}`}>
      {images.map((src) => (
        <DesktopDecisionFrame
          key={src}
          src={src}
          aspect="pair"
          desktopImageScale={desktopImageScale}
          padded={padded}
          imageFit={imageFit}
          objectPosition={objectPosition}
          className="min-w-0 flex-1"
        />
      ))}
    </div>
  );
}

/**
 * Decision product frame. Only the active viewport asset is mounted — hidden
 * CSS twins are not used, so inactive breakpoint files are never requested.
 * Below-fold: no priority (next/image defaults to lazy).
 */
export function CaseStudyDecisionImage({
  src,
  imageSecondary,
  imageTertiary,
  imageArrangement = "single",
  mobileImage,
  desktopImageScale,
  padded,
  imageFit,
  objectPosition,
  tabletDecisionImageScale,
  isMobile,
  className = "",
}: CaseStudyDecisionImageProps) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();
  const frameStyle: DecisionFrameStyle = {
    desktopImageScale,
    padded,
    imageFit,
    objectPosition,
  };

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

  if (imageArrangement === "single-then-pair" && imageSecondary && imageTertiary) {
    return (
      <div className={`flex w-full flex-col gap-10 ${className}`}>
        {mounted ? (
          <DesktopDecisionFrame
            src={src}
            aspect={isMobileViewport ? "square" : "wide"}
            {...frameStyle}
          />
        ) : (
          <div
            className="case-study-image-card-square w-full shrink-0 bg-case-study-hero-bg"
            aria-hidden
          />
        )}
        <PairedDesktopFrames
          images={[imageSecondary, imageTertiary]}
          {...frameStyle}
        />
      </div>
    );
  }

  if (imageArrangement === "pair" && imageSecondary) {
    return (
      <PairedDesktopFrames
        images={[src, imageSecondary]}
        {...frameStyle}
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
        <ExpandableDecisionAsset
          src={mobileImage}
          className={className ? `block ${className}` : "block"}
        >
          <CaseStudyImageCard
            src={mobileImage}
            aspect="square"
            padded
            background="secondary"
            hoverRounded
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
          padded
          desktopImageScale={desktopImageScale}
          hoverRounded
        />
      </ExpandableDecisionAsset>
    );
  }

  if (!mounted) {
    return (
      <div
        className={`case-study-image-card-square w-full shrink-0 bg-case-study-hero-bg ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <DesktopDecisionFrame
      src={src}
      aspect={isMobileViewport ? "square" : "wide"}
      {...frameStyle}
      className={className}
    />
  );
}
