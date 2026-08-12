"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import { CaseStudyImageLightbox } from "@/components/case-study/CaseStudyImageLightbox";

interface ExpandableDecisionAssetProps {
  src: string;
  children: ReactNode;
  className?: string;
}

/**
 * Makes a decision asset open the shared fullscreen lightbox on click/tap
 * (all breakpoints). Hover effects on the child are unchanged.
 */
export function ExpandableDecisionAsset({
  src,
  children,
  className = "",
}: ExpandableDecisionAssetProps) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  if (!src) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View design fullscreen"
        className={`w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left ${className}`}
      >
        {children}
      </button>
      <CaseStudyImageLightbox src={src} open={open} onClose={close} />
    </>
  );
}
