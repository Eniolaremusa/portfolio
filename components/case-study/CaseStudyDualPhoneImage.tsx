import type { CSSProperties } from "react";
import { CaseStudyImageCard } from "@/components/case-study/CaseStudyImageCard";
import { CaseStudyPhoneCarousel } from "@/components/case-study/CaseStudyPhoneCarousel";

interface CaseStudyDualPhoneImageProps {
  images: [string, string];
  className?: string;
  /** hero-mobile: 1312/536 dark frame. decision: two 636×690 columns */
  variant?: "hero" | "decision";
  priority?: boolean;
  /** Scales decision phone assets at tablet (768–1023px) */
  tabletImageScale?: number;
}

/**
 * Two phone mockups (Applatch / Propheski layout).
 * Mobile: 345px carousel (Figma 94:38859). Tablet+: side-by-side columns (Figma 56:11791).
 */
export function CaseStudyDualPhoneImage({
  images,
  className = "",
  variant = "decision",
  priority = false,
  tabletImageScale,
}: CaseStudyDualPhoneImageProps) {
  const isHero = variant === "hero";

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

  return (
    <>
      <CaseStudyPhoneCarousel
        images={images}
        className={`min-[768px]:hidden ${className}`}
      />
      <div
        className={`hidden w-full min-[768px]:flex min-[768px]:items-start min-[768px]:gap-10 ${className}`}
      >
        {images.map((src, index) => (
          <div key={src} className="case-study-decision-phone-column">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              fetchPriority={priority && index === 0 ? "high" : undefined}
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
    </>
  );
}
