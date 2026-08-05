"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";
import { CaseStudyPhoneCarousel } from "@/components/case-study/CaseStudyPhoneCarousel";
import {
  useHasMounted,
  useIsMobileViewport,
} from "@/hooks/useMediaQuery";

interface CaseStudyDualPhoneImageProps {
  images: [string, string];
  className?: string;
  /** hero-mobile: 1312/536 dark frame. decision: two 636×690 columns */
  variant?: "hero" | "decision";
  priority?: boolean;
  /** Scales decision phone assets at tablet (768–1023px) */
  tabletImageScale?: number;
}

function isSvgSrc(src: string) {
  return src.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
}

/**
 * Two phone mockups (Applatch / Propheski layout).
 * Mobile: 345px carousel. Tablet+: side-by-side columns.
 * Only the active breakpoint layout is mounted so the other is never requested.
 */
export function CaseStudyDualPhoneImage({
  images,
  className = "",
  variant = "decision",
  priority = false,
  tabletImageScale,
}: CaseStudyDualPhoneImageProps) {
  const isHero = variant === "hero";
  const mounted = useHasMounted();
  const isMobile = useIsMobileViewport();

  if (isHero) {
    return (
      <div
        className={`case-study-dual-phone-frame-hero bg-case-study-hero-bg w-full shrink-0 overflow-hidden ${className}`}
      >
        <div className="flex h-full min-h-0 w-full items-center justify-center gap-10 case-study-frame-inset min-[768px]:grid min-[768px]:h-full min-[768px]:grid-cols-2 min-[768px]:items-center min-[768px]:gap-10">
          {images.map((src, index) => (
            <CaseStudyImageCard
              key={src}
              src={src}
              aspect="phone"
              background="secondary"
              className="mx-auto max-w-[328px]"
              priority={priority && index === 0}
            />
          ))}
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div
        className={`case-study-image-card-square w-full shrink-0 bg-case-study-hero-image-bg ${className}`}
        aria-hidden
      />
    );
  }

  if (isMobile) {
    return <CaseStudyPhoneCarousel images={images} className={className} />;
  }

  return (
    <div className={`flex w-full items-start gap-10 ${className}`}>
      {images.map((src, index) => (
        <div key={src} className="case-study-decision-phone-column relative">
          <Image
            src={src}
            alt=""
            width={315}
            height={600}
            sizes="(max-width: 1023px) 40vw, 315px"
            unoptimized={isSvgSrc(src)}
            priority={priority && index === 0}
            className={
              tabletImageScale !== undefined
                ? "case-study-decision-phone-image case-study-decision-phone-image--tablet-scaled"
                : "case-study-decision-phone-image"
            }
            style={
              tabletImageScale !== undefined
                ? ({ "--tablet-image-scale": tabletImageScale } as CSSProperties)
                : undefined
            }
          />
        </div>
      ))}
    </div>
  );
}
