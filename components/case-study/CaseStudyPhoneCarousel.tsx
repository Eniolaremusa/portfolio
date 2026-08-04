"use client";

import { useCallback, useEffect, useRef } from "react";

const GAP_PX = 12;
const SLIDE_PX = 345;

interface CaseStudyPhoneCarouselProps {
  images: [string, string];
  className?: string;
}

/**
 * Mobile decision carousel — 345×345 cards, 12px gap, infinite swipe loop.
 * Figma ref: node 94:38859
 *
 * Loop correction runs on scrollend only (not scroll) so it does not fight
 * scroll-snap or momentum scrolling.
 */
export function CaseStudyPhoneCarousel({
  images,
  className = "",
}: CaseStudyPhoneCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumping = useRef(false);

  // [first, second, clone-first, clone-second] — clones appended for forward loop
  const slides = [images[0], images[1], images[0], images[1]] as const;

  const getMetrics = useCallback(
    () => ({
      step: SLIDE_PX + GAP_PX,
      pairWidth: SLIDE_PX * 2 + GAP_PX,
    }),
    [],
  );

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

    // Scrolled into trailing clones — rewind one pair
    if (scrollLeft >= pairWidth - 1) {
      jumpWithoutAnimation(scrollLeft - pairWidth);
      return;
    }

    // Scrolled before start — advance one pair (backward swipe)
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
              <img src={src} alt="" className="case-study-phone-carousel-image" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
