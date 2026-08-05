import type { CSSProperties } from "react";
import Image from "next/image";

interface CaseStudyImageCardProps {
  src: string;
  className?: string;
  /** Inset mockup from frame edges on all sides (responsive shared tokens) */
  padded?: boolean;
  priority?: boolean;
  background?: "primary" | "secondary" | "light";
  /** wide: 1312/504. square: 1/1. hero-mobile: 1312/656. intrinsic: height from asset. phone: 315/600 */
  aspect?: "wide" | "square" | "hero-mobile" | "hero-short" | "intrinsic" | "phone";
  /** contain: centered in frame (decisions). cover: fills frame width/height (hero). */
  imageFit?: "contain" | "cover";
  /** Scales image content within frame at 768px+; frame size unchanged */
  desktopImageScale?: number;
  /** Scales image content within frame below 768px; frame size unchanged */
  belowDesktopImageScale?: number;
  /** Pin crop when using object-cover (hero) */
  objectPosition?: "top" | "center";
}

function isSvgSrc(src: string) {
  return src.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
}

/**
 * Fixed-aspect shell; image scales inside via object-contain/cover.
 * Uses next/image (SVGs pass through unoptimized — Next does not recompress SVG).
 */
export function CaseStudyImageCard({
  src,
  className = "",
  padded = false,
  priority = false,
  background = "primary",
  aspect = "wide",
  imageFit = "contain",
  desktopImageScale,
  belowDesktopImageScale,
  objectPosition = "center",
}: CaseStudyImageCardProps) {
  const bgClass =
    background === "secondary"
      ? "bg-case-study-hero-image-bg"
      : background === "light"
        ? "bg-light-image-bg"
        : "bg-case-study-hero-bg";

  const unoptimized = isSvgSrc(src);

  if (aspect === "intrinsic") {
    return (
      <div className={`w-full shrink-0 overflow-hidden ${bgClass} ${className}`}>
        <div className={padded ? "case-study-frame-inset" : undefined}>
          <Image
            src={src}
            alt=""
            width={1312}
            height={800}
            sizes="(max-width: 1312px) 100vw, 1312px"
            unoptimized={unoptimized}
            priority={priority}
            fetchPriority={priority ? "high" : undefined}
            className="h-auto w-full"
          />
        </div>
      </div>
    );
  }

  const aspectClass = {
    wide: "case-study-image-card",
    square: "case-study-image-card-square",
    "hero-mobile": "case-study-image-card-hero-mobile",
    "hero-short": "case-study-image-card-hero-short",
    phone: "case-study-image-card-phone",
  }[aspect];

  const imgFitClass = imageFit === "cover" ? "object-cover" : "object-contain";
  const imgPositionClass =
    objectPosition === "top" ? "object-top" : "object-center";

  const imgScaleClass = [
    desktopImageScale !== undefined
      ? "min-[768px]:[transform:scale(var(--desktop-image-scale))]"
      : "",
    belowDesktopImageScale !== undefined
      ? "max-[767px]:[transform:scale(var(--below-desktop-image-scale))]"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const style =
    desktopImageScale !== undefined || belowDesktopImageScale !== undefined
      ? ({
          ...(desktopImageScale !== undefined
            ? { "--desktop-image-scale": desktopImageScale }
            : {}),
          ...(belowDesktopImageScale !== undefined
            ? { "--below-desktop-image-scale": belowDesktopImageScale }
            : {}),
        } as CSSProperties)
      : undefined;

  return (
    <div
      className={`${aspectClass} relative w-full shrink-0 overflow-hidden ${bgClass} ${className}`}
      style={style}
    >
      <div
        className={`relative flex h-full min-h-0 w-full items-center justify-center ${padded ? "case-study-frame-inset" : ""}`}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 1312px) 100vw, 1312px"
          unoptimized={unoptimized}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className={`min-h-0 min-w-0 ${imgPositionClass} ${imgFitClass} ${imgScaleClass}`}
        />
      </div>
    </div>
  );
}
