"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/home";
import { MOTION_EASE } from "@/lib/motion";
import { usePrefersHover } from "@/lib/usePrefersHover";

interface HeroReachOutButtonProps {
  label: string;
}

const LAYOUT_SPRING = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.75,
};
const CONTENT_TRANSITION = { duration: 0.22, ease: MOTION_EASE };
/** Hover out: shrink pill, then swap email → label */
const HOVER_OUT_LABEL_DELAY_MS = 140;

function CopyIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="shrink-0 opacity-90"
    >
      <rect
        x="4.5"
        y="4.5"
        width="7.5"
        height="7.5"
        rx="1.25"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M3.5 9.5h-.75A1.25 1.25 0 0 1 1.5 8.25V2.75A1.25 1.25 0 0 1 2.75 1.5h5.5A1.25 1.25 0 0 1 9.5 2.75v.75"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M3.25 7.25 5.75 9.75 10.75 4.25"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CtaVisualState = "label" | "email" | "copied";

function CtaStateContent({
  state,
  label,
}: {
  state: CtaVisualState;
  label: string;
}) {
  if (state === "copied") {
    return (
      <>
        <CheckIcon />
        Copied
      </>
    );
  }
  if (state === "email") {
    return (
      <>
        <span className="truncate">{siteConfig.email}</span>
        <CopyIcon />
      </>
    );
  }
  return <>{label}</>;
}

export function HeroReachOutButton({ label }: HeroReachOutButtonProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [shownState, setShownState] = useState<CtaVisualState>("label");
  const prefersHover = usePrefersHover();
  const reduceMotion = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hoverOutTimeoutRef.current) clearTimeout(hoverOutTimeoutRef.current);
    },
    [],
  );

  const showEmail = prefersHover && hovered && !copied;

  /** Drives pill width — updates immediately on hover in/out */
  const layoutState: CtaVisualState = copied
    ? "copied"
    : showEmail
      ? "email"
      : "label";

  useEffect(() => {
    if (hoverOutTimeoutRef.current) {
      clearTimeout(hoverOutTimeoutRef.current);
      hoverOutTimeoutRef.current = null;
    }

    if (copied) {
      setShownState("copied");
      return;
    }

    if (showEmail) {
      setShownState("email");
      return;
    }

    hoverOutTimeoutRef.current = setTimeout(() => {
      setShownState("label");
      hoverOutTimeoutRef.current = null;
    }, reduceMotion ? 0 : HOVER_OUT_LABEL_DELAY_MS);
  }, [showEmail, copied, reduceMotion]);

  const shrinkingFromEmail =
    !showEmail && !copied && layoutState === "label" && shownState === "email";

  const ariaLabel =
    shownState === "copied"
      ? "Email copied to clipboard"
      : shownState === "email"
        ? `Copy email ${siteConfig.email}`
        : "Reach out — copy email address";

  return (
    <motion.button
      type="button"
      layout
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ layout: reduceMotion ? { duration: 0 } : LAYOUT_SPRING }}
      className="home-hero-cta"
      aria-label={ariaLabel}
    >
      <span className="home-hero-cta__inner" aria-live="polite" aria-atomic="true">
        <span
          aria-hidden
          className="home-hero-cta__sizer home-hero-cta__content"
        >
          <CtaStateContent state={layoutState} label={label} />
        </span>
        <span className="home-hero-cta__overlay">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={shownState}
              className="home-hero-cta__content"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{
                opacity: shrinkingFromEmail ? 0 : 1,
              }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={
                shrinkingFromEmail
                  ? {
                      duration: HOVER_OUT_LABEL_DELAY_MS / 1000,
                      ease: MOTION_EASE,
                    }
                  : CONTENT_TRANSITION
              }
            >
              <CtaStateContent state={shownState} label={label} />
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </motion.button>
  );
}
