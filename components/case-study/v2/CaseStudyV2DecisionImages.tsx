"use client";

import { CaseStudyDecisionImage } from "@/components/case-study/CaseStudyDecisionImage";
import { CaseStudyV2Asset } from "@/components/case-study/v2/CaseStudyV2Asset";
import type { CaseStudyV2DesignDecisionImage } from "@/data/cbf-flo-v2-types";

interface CaseStudyV2DecisionImagesProps {
  images: CaseStudyV2DesignDecisionImage[];
  caption?: string;
}

/**
 * Two-up decisions reuse CaseStudyDecisionImage pair layout (Applatch gap-10).
 * Single assets use the v2 intrinsic frame wrapper.
 */
export function CaseStudyV2DecisionImages({
  images,
  caption,
}: CaseStudyV2DecisionImagesProps) {
  return (
    <div className="flex flex-col gap-4">
      {images.length >= 2 ? (
        <CaseStudyDecisionImage
          src={images[0].src}
          imageSecondary={images[1].src}
          imageArrangement="pair"
          isMobile={false}
        />
      ) : images.length === 1 ? (
        <CaseStudyV2Asset
          src={images[0].src}
          imageWidth={images[0].width}
          imageHeight={images[0].height}
          background="primary"
          padded
          responsiveFrame
        />
      ) : null}
      {caption ? (
        <p className="text-body text-center text-text-muted">{caption}</p>
      ) : null}
    </div>
  );
}
