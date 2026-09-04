"use client";

import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { MOTION_EASE } from "@/lib/motion";
import {
  clearPageIntroClass,
  PAGE_INTRO_HTML_CLASS,
  PAGE_INTRO_SESSION_KEY,
} from "@/lib/pageIntro";

export { PAGE_INTRO_SESSION_KEY };

const LETTERS = "Eniola".split("");
const SPLIT_INDEX = 3;

/** First half — slower reveal */
const FIRST_STAGGER_S = 0.14;
const FIRST_DURATION_S = 0.4;
/** Last half — quicker finish */
const LAST_STAGGER_S = 0.06;
const LAST_DURATION_S = 0.2;
const HOLD_S = 0.28;
const EXIT_DURATION_S = 0.5;
const LETTER_RISE_PX = 10;

function getLetterDelay(index: number): number {
  if (index < SPLIT_INDEX) return index * FIRST_STAGGER_S;
  const lastGroupStart = (SPLIT_INDEX - 1) * FIRST_STAGGER_S + FIRST_DURATION_S;
  return lastGroupStart + (index - SPLIT_INDEX) * LAST_STAGGER_S;
}

function getLetterDuration(index: number): number {
  return index < SPLIT_INDEX ? FIRST_DURATION_S : LAST_DURATION_S;
}

function getIntroCompleteTime(): number {
  const lastIndex = LETTERS.length - 1;
  return getLetterDelay(lastIndex) + getLetterDuration(lastIndex);
}

const EXIT_DELAY_MS = (getIntroCompleteTime() + HOLD_S) * 1000;

type IntroPhase = "intro" | "exiting" | "hidden";

function shouldSkipIntro(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  try {
    return Boolean(sessionStorage.getItem(PAGE_INTRO_SESSION_KEY));
  } catch {
    return true;
  }
}

function hideStaticSplash(): void {
  document.getElementById("page-intro-splash")?.style.setProperty("display", "none");
}

export function PageLoadIntro() {
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (typeof document === "undefined") return "hidden";
    if (shouldSkipIntro()) return "hidden";
    return document.documentElement.classList.contains(PAGE_INTRO_HTML_CLASS)
      ? "intro"
      : "hidden";
  });
  const exitHandledRef = useRef(false);

  useLayoutEffect(() => {
    if (shouldSkipIntro()) {
      clearPageIntroClass();
      setPhase("hidden");
      return;
    }
    setPhase("intro");
    hideStaticSplash();
  }, []);

  useLayoutEffect(() => {
    if (phase !== "intro") return;
    const timer = window.setTimeout(() => setPhase("exiting"), EXIT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleExitComplete = () => {
    if (exitHandledRef.current) return;
    exitHandledRef.current = true;
    try {
      sessionStorage.setItem(PAGE_INTRO_SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable — skip persisting
    }
    clearPageIntroClass();
    setPhase("hidden");
  };

  if (phase === "hidden") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-light-bg"
      initial={false}
      animate={{ opacity: phase === "exiting" ? 0 : 1 }}
      transition={{ duration: EXIT_DURATION_S, ease: MOTION_EASE }}
      onAnimationComplete={() => {
        if (phase === "exiting") handleExitComplete();
      }}
      style={{ pointerEvents: phase === "exiting" ? "none" : "auto" }}
      aria-hidden
    >
      <div className="flex">
        {LETTERS.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            className="inline-block font-crimson text-title italic text-text-on-light"
            initial={{ opacity: 0, y: LETTER_RISE_PX }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: getLetterDuration(index),
              ease: MOTION_EASE,
              delay: getLetterDelay(index),
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
