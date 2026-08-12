"use client";

import type { ReactNode } from "react";
import { useCaseStudyGallery } from "@/components/case-study/CaseStudyGalleryProvider";

interface ExpandableDecisionAssetProps {
  src: string;
  children: ReactNode;
  className?: string;
}

/**
 * Makes a case study asset open the shared fullscreen gallery on click/tap
 * (all breakpoints). Hover effects on the child are unchanged.
 */
export function ExpandableDecisionAsset({
  src,
  children,
  className = "",
}: ExpandableDecisionAssetProps) {
  const { openSrc } = useCaseStudyGallery();

  if (!src) {
    return <div className={className}>{children}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => openSrc(src)}
      aria-label="View design fullscreen"
      className={`w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left ${className}`}
    >
      {children}
    </button>
  );
}
