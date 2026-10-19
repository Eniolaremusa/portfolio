"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { Drawer } from "vaul";
import {
  caseStudyPreviewSlides,
  formatCaseStudyPreviewEyebrowMobile,
  getCaseStudyPreviewContent,
  getCaseStudyPreviewHeaderCta,
  type CaseStudyPreviewSheetSlug,
} from "@/data/caseStudyPreviewSheet";
import type { CaseStudy } from "@/data/types";
import { MOTION_EASE } from "@/lib/motion";

const SHEET_EASE = MOTION_EASE;
const SLIDE_CROSSFADE_DURATION = 0.42;

interface CaseStudyPreviewSheetProps {
  study: CaseStudy | null;
  onClose: () => void;
}

function CarouselDots({
  slides,
  safeIndex,
  onSelect,
}: {
  slides: readonly string[];
  safeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="flex min-w-0 justify-center justify-self-center gap-2"
      role="tablist"
      aria-label="Preview screens"
    >
      {slides.map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-label={`Screen ${i + 1} of ${slides.length}`}
          aria-selected={i === safeIndex}
          onClick={() => onSelect(i)}
          className={`h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out ${
            i === safeIndex
              ? "w-6 bg-accent"
              : "w-1.5 bg-text-muted/50 hover:bg-text-muted/70"
          }`}
        />
      ))}
    </div>
  );
}

function CarouselSideNav({
  direction,
  onClick,
  className = "",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={isPrev ? "Previous screen" : "Next screen"}
      className={`flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-light-bg text-text-on-light shadow-[0_2px_12px_rgba(34,32,29,0.12)] transition-transform duration-150 ease-out active:scale-[0.97] ${className}`}
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
          d={isPrev ? "M9 3L4 7.5L9 12" : "M6 3L11 7.5L6 12"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function Carousel({
  slug,
  slides,
  title,
}: {
  slug: string;
  slides: readonly string[];
  title: string;
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = Math.max(slides.length, 1);
  const safeIndex = slides.length ? index % slides.length : 0;
  const hasMultiple = slides.length > 1;

  useEffect(() => {
    setIndex(0);
  }, [slug]);

  const goPrev = useCallback(() => {
    if (!hasMultiple) return;
    setIndex((i) => (i - 1 + count) % count);
  }, [count, hasMultiple]);

  const goNext = useCallback(() => {
    if (!hasMultiple) return;
    setIndex((i) => (i + 1) % count);
  }, [count, hasMultiple]);

  const frameClassName = [
    "case-study-preview-carousel-frame relative w-full min-w-0 flex-1",
    hasMultiple && slides.length > 0
      ? "case-study-preview-carousel-frame--has-nav"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const isApplatch = slug === "applatch";

  return (
    <div
      className={`case-study-preview-carousel relative flex w-full min-w-0 flex-1 flex-col${isApplatch ? " case-study-preview-carousel--applatch" : ""}`}
    >
      <div className="case-study-preview-carousel-track flex w-full min-w-0 items-stretch gap-2 min-[768px]:gap-3">
        {hasMultiple ? (
          <CarouselSideNav
            direction="prev"
            onClick={goPrev}
            className="case-study-preview-carousel-chrome-side self-center"
          />
        ) : null}

        <div className={frameClassName}>
          {slides.length === 0 ? (
            <div className="flex min-h-[min(52vw,320px)] w-full items-center justify-center px-6 py-10 text-center">
              <p className="text-body text-text-muted text-balance">
                UI screens for {title} will appear here once assets are added.
              </p>
            </div>
          ) : (
            <>
              <div className="case-study-preview-carousel-stage relative w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeURI(slides[safeIndex]!)}
                  alt=""
                  aria-hidden
                  className="case-study-preview-carousel-image pointer-events-none invisible"
                />
                <AnimatePresence initial={false}>
                  <motion.div
                    key={slides[safeIndex]}
                    className="case-study-preview-carousel-slide absolute inset-x-0 top-0"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{
                      duration: SLIDE_CROSSFADE_DURATION,
                      ease: SHEET_EASE,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={encodeURI(slides[safeIndex]!)}
                      alt=""
                      decoding="async"
                      className="case-study-preview-carousel-image"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {hasMultiple ? (
                <div className="case-study-preview-carousel-dots-overlay absolute inset-x-0 bottom-0 z-10 justify-center pb-1">
                  <CarouselDots
                    slides={slides}
                    safeIndex={safeIndex}
                    onSelect={setIndex}
                  />
                </div>
              ) : null}
            </>
          )}
        </div>

        {hasMultiple ? (
          <CarouselSideNav
            direction="next"
            onClick={goNext}
            className="case-study-preview-carousel-chrome-side self-center"
          />
        ) : null}
      </div>

      {hasMultiple && slides.length > 0 ? (
        <div className="case-study-preview-carousel-controls mt-3 w-full min-w-0">
          <CarouselSideNav direction="prev" onClick={goPrev} />
          <CarouselDots
            slides={slides}
            safeIndex={safeIndex}
            onSelect={setIndex}
          />
          <CarouselSideNav direction="next" onClick={goNext} />
        </div>
      ) : null}
    </div>
  );
}

function PreviewHeaderCta({
  slug,
  className,
}: {
  slug: CaseStudyPreviewSheetSlug;
  className: string;
}) {
  const cta = getCaseStudyPreviewHeaderCta(slug);

  if (cta.external) {
    return (
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {cta.label}
      </a>
    );
  }

  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

export function CaseStudyPreviewSheet({
  study,
  onClose,
}: CaseStudyPreviewSheetProps) {
  const reduceMotion = useReducedMotion();
  const titleId = useId();
  const open = Boolean(study);
  const [cachedStudy, setCachedStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    if (study) setCachedStudy(study);
  }, [study]);

  const activeStudy = study ?? cachedStudy;
  const slug = activeStudy?.slug as CaseStudyPreviewSheetSlug | undefined;
  const content = slug ? getCaseStudyPreviewContent(slug) : null;
  const slides =
    slug && slug in caseStudyPreviewSlides
      ? caseStudyPreviewSlides[slug]
      : [];

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) onClose();
    },
    [onClose],
  );

  const handleAnimationEnd = useCallback((nextOpen: boolean) => {
    if (!nextOpen) setCachedStudy(null);
  }, []);

  const headerCtaClassName =
    "case-study-preview-read-full inline-flex h-8 shrink-0 items-center justify-center rounded-full bg-accent px-3";

  if (!activeStudy && !open) {
    return null;
  }

  return (
    <Drawer.Root
      open={open}
      onOpenChange={handleOpenChange}
      onAnimationEnd={handleAnimationEnd}
      shouldScaleBackground={false}
      repositionInputs={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay
          className="case-study-preview-sheet-backdrop fixed inset-0 z-[120]"
          {...(reduceMotion ? { "data-vaul-animate": "false" } : {})}
        />
        <Drawer.Content
          aria-labelledby={titleId}
          className="case-study-preview-sheet-panel case-study-preview-sheet-panel-height fixed inset-x-0 bottom-0 z-[120] flex w-full flex-col overflow-hidden bg-light-bg outline-none"
          {...(reduceMotion ? { "data-vaul-animate": "false" } : {})}
        >
          <div className="case-study-preview-sheet-handle-wrap">
            <Drawer.Handle
              className="case-study-preview-sheet-handle"
              aria-hidden
            />
          </div>
          {activeStudy && content && slug ? (
            <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden px-page">
              <div className="mx-auto flex min-h-0 w-full max-w-[1312px] flex-1 flex-col overflow-hidden pb-8 min-[768px]:pb-10">
                <header className="mb-[var(--spacing-case-study-preview-header-main-gap)] flex shrink-0 items-center justify-between gap-4">
                  <p className="text-case-study-preview-header-eyebrow min-w-0 text-pretty">
                    <span className="min-[768px]:hidden">
                      {formatCaseStudyPreviewEyebrowMobile(content.eyebrow)}
                    </span>
                    <span className="max-[767px]:hidden">{content.eyebrow}</span>
                  </p>
                  <PreviewHeaderCta
                    slug={slug}
                    className={headerCtaClassName}
                  />
                </header>

                <div className="case-study-preview-sheet-scroll">
                  <div className="case-study-preview-sheet-grid-wrap">
                    <div className="case-study-preview-sheet-grid">
                      <div className="flex min-w-0 flex-col gap-6">
                        <div className="flex flex-col gap-3">
                          <Drawer.Title asChild>
                            <h2
                              id={titleId}
                              className="text-case-study-preview-headline"
                            >
                              {content.headline}
                            </h2>
                          </Drawer.Title>
                          <Drawer.Description asChild>
                            <p className="text-body text-text-on-light text-pretty">
                              {content.summary}
                            </p>
                          </Drawer.Description>
                        </div>

                        <div className="flex flex-col gap-6 bg-case-study-hero-bg p-8">
                          {content.highlights.map((item) => (
                            <div key={item.label} className="flex flex-col">
                              <p className="text-case-study-preview-highlight-label">
                                {item.label}
                              </p>
                              <p className="text-body text-on-dark text-pretty">
                                {item.body}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="min-w-0 w-full">
                        <Carousel
                          slug={activeStudy.slug}
                          slides={slides}
                          title={activeStudy.title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
