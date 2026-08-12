"use client";

import Image from "next/image";
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

function isSvgSrc(src: string) {
  return src.split("?")[0]?.toLowerCase().endsWith(".svg") ?? false;
}

interface CaseStudyImageLightboxProps {
  src: string;
  open: boolean;
  onClose: () => void;
}

/**
 * Full-viewport image overlay for decision assets.
 * Closes via X, backdrop click, or Escape. Click/tap only — no hover trigger.
 */
export function CaseStudyImageLightbox({
  src,
  open,
  onClose,
}: CaseStudyImageLightboxProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[color-mix(in_srgb,var(--color-case-study-hero-bg)_92%,transparent)] p-4 min-[768px]:p-10"
      onClick={onClose}
    >
      <h2 id={titleId} className="sr-only">
        Fullscreen design preview
      </h2>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close fullscreen preview"
        className="absolute right-3 top-3 z-[101] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-on-dark transition-transform duration-150 ease-out active:scale-[0.97] min-[768px]:right-6 min-[768px]:top-6"
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

      <div className="relative flex h-full w-full max-h-[min(100dvh-2rem,920px)] max-w-[min(100vw-2rem,1200px)] items-center justify-center min-[768px]:max-h-[min(100dvh-5rem,920px)] min-[768px]:max-w-[min(100vw-5rem,1200px)]">
        <Image
          src={src}
          alt=""
          width={1600}
          height={1200}
          unoptimized={isSvgSrc(src)}
          className="max-h-full max-w-full object-contain"
          sizes="100vw"
          priority
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    </div>,
    document.body,
  );
}
