"use client";

import { useCallback, useEffect, useRef } from "react";

const GAP_PX = 12;
const SLIDE_PX = 345;

interface CaseStudyPhoneCarouselProps {
  /** Two or more slides; duplicated internally for infinite loop */
  images: readonly string[];
  className?: string;
  /** contain: phone mockups. cover: photo fills slide (hobbies) */
  imageFit?: "contain" | "cover";
  /** Alt text per unique slide (same length as images) */
  alts?: readonly string[];
}

/**
 * Mobile carousel — 345×345 cards, 12px gap, infinite swipe loop.
 * Figma ref: node 94:38859 (decisions), reused for hobbies.
 *
 * Loop correction runs on scrollend only (not scroll) so it does not fight
 * scroll-snap or momentum scrolling.
 */
export function CaseStudyPhoneCarousel({
  images,
  className = "",
  imageFit = "contain",
  alts,
}: CaseStudyPhoneCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);

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

  const imageClass =
    imageFit === "cover"
      ? "case-study-phone-carousel-image-cover"
      : "case-study-phone-carousel-image";

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
            className="case-study-phone-carousel-slide shrink-0 snap-start"
          >
            <div className="case-study-phone-carousel-slide-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alts?.[index % images.length] ?? ""}
                className={imageClass}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
