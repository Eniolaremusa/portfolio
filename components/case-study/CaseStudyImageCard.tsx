import type { CSSProperties } from "react";

interface CaseStudyImageCardProps {
  src: string;
  className?: string;
  /** Horizontal inset only — no top padding so images stay vertically centered */
  padded?: boolean;
  priority?: boolean;
  background?: "primary" | "secondary" | "light";
  /** wide: 1312/504. square: 1/1. hero-mobile: 1312/656. phone: 315/600 */
  aspect?: "wide" | "square" | "hero-mobile" | "phone";
  /** contain: centered in frame (decisions). cover: fills frame width/height (hero). */
  imageFit?: "contain" | "cover";
  /** Scales image content within frame at 768px+; frame size unchanged */
  desktopImageScale?: number;
  /** Scales image content within frame below 768px; frame size unchanged */
  belowDesktopImageScale?: number;
  /** Pin crop when using object-cover (hero) */
  objectPosition?: "top" | "center";
}

/**
 * Fixed-aspect shell; image scales inside via object-contain and never drives card size.
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

  const aspectClass = {
    wide: "case-study-image-card",
    square: "case-study-image-card-square",
    "hero-mobile": "case-study-image-card-hero-mobile",
    phone: "case-study-image-card-phone",
  }[aspect];

  const imgFitClass =
    imageFit === "cover"
      ? "object-cover"
      : "object-contain";

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
      className={`${aspectClass} w-full shrink-0 overflow-hidden ${bgClass} ${className}`}
      style={style}
    >
      <div
        className={`flex h-full min-h-0 w-full items-center justify-center ${padded ? "px-case-card-image-x" : ""}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          fetchPriority={priority ? "high" : undefined}
          className={`block h-full w-full min-h-0 min-w-0 ${imgPositionClass} ${imgFitClass} ${imgScaleClass}`}
        />
      </div>
    </div>
  );
}
