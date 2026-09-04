"use client";

import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";
import { ExpandableDecisionAsset } from "@/components/case-study/ExpandableDecisionAsset";
import { OnarvoDeskPlaceholderFrame } from "@/components/case-study/onarvo/OnarvoDeskPlaceholderFrame";
import {
  useHasMounted,
  useIsMobileViewport,
} from "@/hooks/useMediaQuery";

interface OnarvoDeskAssetProps {
  src?: string;
  placeholderLabel?: string;
  priority?: boolean;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Hero uses secondary frame; dark-panel assets use primary (no #F7F4ED inset) */
  frameVariant?: "hero" | "dark-panel" | "light";
  padded?: boolean;
}

export function OnarvoDeskAsset({
  src,
  placeholderLabel = "Asset placeholder",
  priority = false,
  className = "",
  imageWidth,
  imageHeight,
  frameVariant = "dark-panel",
  padded = true,
}: OnarvoDeskAssetProps) {
  const mounted = useHasMounted();
  const isMobileViewport = useIsMobileViewport();

  if (!src) {
    return <OnarvoDeskPlaceholderFrame label={placeholderLabel} className={className} />;
  }

  const cardBackground =
    frameVariant === "hero"
      ? "secondary"
      : frameVariant === "dark-panel"
        ? "primary"
        : "light";

  if (!mounted) {
    return (
      <div
        className={`aspect-[4/3] w-full shrink-0 bg-case-study-hero-bg ${className}`}
        aria-hidden
      />
    );
  }

  const aspect = isMobileViewport ? "square" : "intrinsic";

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
        background={cardBackground}
        padded={padded}
        hoverRounded
        priority={priority}
      />
    </ExpandableDecisionAsset>
  );
}
