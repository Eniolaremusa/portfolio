"use client";

import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";
import { ExpandableDecisionAsset } from "@/components/case-study/ExpandableDecisionAsset";
import {
  useHasMounted,
  useIsMobileViewport,
} from "@/hooks/useMediaQuery";

interface CaseStudyV2AssetProps {
  src: string;
  background?: "primary" | "secondary" | "light";
  /** Defaults true — matches original decision frame inset */
  padded?: boolean;
  priority?: boolean;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Square frame below 768px, intrinsic at tablet+ — original decision pattern */
  responsiveFrame?: boolean;
}

function placeholderBgClass(background: CaseStudyV2AssetProps["background"]) {
  if (background === "light") return "bg-light-image-bg";
  if (background === "secondary") return "bg-case-study-hero-image-bg";
  return "bg-case-study-hero-bg";
}

/**
 * CBF Flo v2 asset shell — reuses CaseStudyImageCard + ExpandableDecisionAsset
 * from the original case study template (inset, hover, lightbox).
 */
export function CaseStudyV2Asset({
  src,
  background = "primary",
  padded = true,
  priority = false,
  className = "",
  imageWidth,
  imageHeight,
  responsiveFrame = false,
}: CaseStudyV2AssetProps) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();

  if (!mounted) {
    return (
      <div
        className={`case-study-image-card-square w-full shrink-0 ${placeholderBgClass(background)} ${className}`}
        aria-hidden
      />
    );
  }

  const aspect = responsiveFrame
    ? isMobileViewport
      ? "square"
      : "intrinsic"
    : "intrinsic";

  return (
    <ExpandableDecisionAsset
      src={src}
      className={className ? `block ${className}` : "block"}
    >
      <CaseStudyImageCard
        src={src}
        aspect={aspect}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        background={background}
        padded={padded}
        hoverRounded
        priority={priority}
      />
    </ExpandableDecisionAsset>
  );
}
