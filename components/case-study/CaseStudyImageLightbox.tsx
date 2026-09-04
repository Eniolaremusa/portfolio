"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { caseStudyImageUnoptimized } from "@/lib/caseStudyImage";

/** Matches shared card-hover-press easing */
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.28;
/** ~10% slower than the original 0.32s slide */
const SLIDE_DURATION = 0.35;
const SWIPE_THRESHOLD_PX = 48;

interface CaseStudyImageLightboxProps {
  images: readonly string[];
  /** null = closed */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

function NavArrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={isPrev ? "Previous design" : "Next design"}
      className={`absolute top-1/2 z-[101] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-on-dark transition-transform duration-150 ease-out active:scale-[0.97] ${
        isPrev ? "left-2 min-[768px]:left-4" : "right-2 min-[768px]:right-4"
      }`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={isPrev ? "" : "rotate-180"}
      >
        <path
          d="M9.5 3.5L5 7.5L9.5 11.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "70%" : "-70%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? "-70%" : "70%",
    opacity: 0,
  }),
};

/**
 * Full-viewport image overlay for case study assets.
 * Closes via X, backdrop click, or Escape. Arrow / swipe / keyboard navigate
 * the full case-study sequence with a directional slide. Click/tap only.
 */
export function CaseStudyImageLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: CaseStudyImageLightboxProps) {
  const titleId = useId();
  const open = index !== null && images.length > 0;
  const currentIndex = index ?? 0;
  const src = open ? images[currentIndex] : null;
  const canPrev = open && currentIndex > 0;
  const canNext = open && currentIndex < images.length - 1;
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const directionRef = useRef(1);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (index === null || nextIndex === index) return;
      if (nextIndex < 0 || nextIndex >= images.length) return;
      directionRef.current = nextIndex > index ? 1 : -1;
      onIndexChange(nextIndex);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(currentIndex - 1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(currentIndex + 1);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, goTo, currentIndex]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && src ? (
        <motion.div
          key="case-study-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[color-mix(in_srgb,var(--color-case-study-hero-bg)_92%,transparent)] p-4 min-[768px]:p-10"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION, ease: EASE }}
        >
          <h2 id={titleId} className="sr-only">
            Fullscreen design preview
          </h2>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            aria-label="Close fullscreen preview"
            className="absolute right-3 top-3 z-[102] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-on-dark transition-transform duration-150 ease-out active:scale-[0.97] min-[768px]:right-6 min-[768px]:top-6"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M3.5 3.5L11.5 11.5M11.5 3.5L3.5 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {canPrev ? (
            <NavArrow direction="prev" onClick={() => goTo(currentIndex - 1)} />
          ) : null}
          {canNext ? (
            <NavArrow direction="next" onClick={() => goTo(currentIndex + 1)} />
          ) : null}

          <motion.div
            className="relative flex h-full w-full max-h-[min(100dvh-2rem,920px)] max-w-[min(100vw-2rem,1200px)] items-center justify-center overflow-hidden min-[768px]:max-h-[min(100dvh-5rem,920px)] min-[768px]:max-w-[min(100vw-5rem,1200px)]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: DURATION, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => {
              pointerStart.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerUp={(event) => {
              const start = pointerStart.current;
              pointerStart.current = null;
              if (!start) return;
              const dx = event.clientX - start.x;
              const dy = event.clientY - start.y;
              if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
              if (Math.abs(dx) < Math.abs(dy)) return;
              if (dx > 0) goTo(currentIndex - 1);
              else goTo(currentIndex + 1);
            }}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
          >
            <AnimatePresence initial={false} custom={directionRef.current}>
              <motion.div
                key={src}
                custom={directionRef.current}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: SLIDE_DURATION, ease: EASE }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={src}
                  alt=""
                  width={1600}
                  height={1200}
                  unoptimized={caseStudyImageUnoptimized(src)}
                  className="max-h-full max-w-full object-contain"
                  sizes="100vw"
                  priority
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
