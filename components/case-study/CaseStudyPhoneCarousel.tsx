"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CaseStudyImageLightbox } from "@/components/case-study/CaseStudyImageLightbox";

const GAP_PX = 12;
const SLIDE_PX = 345;
/** Ignore expand if the pointer moved more than this during a press (scroll gesture). */
const TAP_MOVE_THRESHOLD_PX = 10;

interface CaseStudyPhoneCarouselProps {
  /** Two or more slides; duplicated internally for infinite loop */
  images: readonly string[];
  className?: string;
  /** contain: phone mockups. cover: photo fills slide (hobbies) */
  imageFit?: "contain" | "cover";
  /** Alt text per unique slide (same length as images) */
  alts?: readonly string[];
  /** Open decision assets in the shared fullscreen lightbox on tap */
  expandable?: boolean;
}

function isSvgSrc(src: string) {
  return src.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
}

/**
 * Mobile carousel — 345×345 cards, 12px gap, infinite swipe loop.
 * Figma ref: node 94:38859 (decisions), reused for hobbies.
 */
export function CaseStudyPhoneCarousel({
  images,
  className = "",
  imageFit = "contain",
  alts,
  expandable = false,
}: CaseStudyPhoneCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const slides = [...images, ...images] as const;

  const getMetrics = useCallback(() => {
    const count = images.length;
    return {
      pairWidth: count * SLIDE_PX + (count - 1) * GAP_PX,
    };
  }, [images.length]);

  const jumpWithoutAnimation = useCallback((scrollLeft: number) => {
    const track = trackRef.current;
    if (!track) return;
    isJumping.current = true;
    track.style.scrollSnapType = "none";
    track.style.scrollBehavior = "auto";
    track.scrollLeft = scrollLeft;
    track.style.scrollBehavior = "";
    track.style.scrollSnapType = "";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isJumping.current = false;
      });
    });
  }, []);

  const correctLoopPosition = useCallback(() => {
    const track = trackRef.current;
    if (!track || isJumping.current) return;

    const { pairWidth } = getMetrics();
    const { scrollLeft } = track;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (scrollLeft >= pairWidth - 1) {
      jumpWithoutAnimation(scrollLeft - pairWidth);
      return;
    }

    if (scrollLeft <= 1 && maxScroll > 0) {
      jumpWithoutAnimation(scrollLeft + pairWidth);
    }
  }, [getMetrics, jumpWithoutAnimation]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScrollEnd = () => {
      correctLoopPosition();
    };

    track.addEventListener("scrollend", onScrollEnd);
    return () => track.removeEventListener("scrollend", onScrollEnd);
  }, [correctLoopPosition]);

  const isCover = imageFit === "cover";
  const imageClass = isCover
    ? "case-study-phone-carousel-image-cover"
    : "case-study-phone-carousel-image card-hover-press-media";
  const slideClass = isCover
    ? "case-study-phone-carousel-slide case-study-phone-carousel-slide--flush shrink-0 snap-start"
    : "case-study-phone-carousel-slide card-hover-press shrink-0 snap-start";
  const innerClass = isCover
    ? "case-study-phone-carousel-slide-inner case-study-phone-carousel-slide-inner--flush relative"
    : "case-study-phone-carousel-slide-inner relative";

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="case-study-phone-carousel-track flex snap-x snap-mandatory overflow-x-auto"
        style={{ gap: GAP_PX }}
      >
        {slides.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`${slideClass}${expandable ? " cursor-zoom-in" : ""}`}
            onPointerDown={
              expandable
                ? (event) => {
                    pointerStart.current = {
                      x: event.clientX,
                      y: event.clientY,
                    };
                  }
                : undefined
            }
            onPointerUp={
              expandable
                ? (event) => {
                    const start = pointerStart.current;
                    pointerStart.current = null;
                    if (!start) return;
                    const dx = Math.abs(event.clientX - start.x);
                    const dy = Math.abs(event.clientY - start.y);
                    if (dx <= TAP_MOVE_THRESHOLD_PX && dy <= TAP_MOVE_THRESHOLD_PX) {
                      setLightboxSrc(src);
                    }
                  }
                : undefined
            }
            onPointerCancel={
              expandable
                ? () => {
                    pointerStart.current = null;
                  }
                : undefined
            }
            role={expandable ? "button" : undefined}
            tabIndex={expandable ? 0 : undefined}
            aria-label={expandable ? "View design fullscreen" : undefined}
            onKeyDown={
              expandable
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setLightboxSrc(src);
                    }
                  }
                : undefined
            }
          >
            <div className={innerClass}>
              {isCover ? (
                <Image
                  src={src}
                  alt={alts?.[index % images.length] ?? ""}
                  fill
                  sizes="345px"
                  unoptimized={isSvgSrc(src)}
                  className={imageClass}
                  draggable={false}
                />
              ) : (
                <Image
                  src={src}
                  alt={alts?.[index % images.length] ?? ""}
                  width={SLIDE_PX}
                  height={SLIDE_PX}
                  sizes="345px"
                  unoptimized={isSvgSrc(src)}
                  className={imageClass}
                  draggable={false}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {expandable && lightboxSrc ? (
        <CaseStudyImageLightbox
          src={lightboxSrc}
          open
          onClose={() => setLightboxSrc(null)}
        />
      ) : null}
    </div>
  );
}
