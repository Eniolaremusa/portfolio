"use client";

import { useEffect, useState } from "react";
import { PAGE_INTRO_SESSION_KEY } from "@/lib/pageIntro";

/** Stagger hero in with the page intro on first visit; quick reveal on return. */
export function useHeroRevealDelay(): number {
  const [delayS, setDelayS] = useState(0.06);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDelayS(0);
      return;
    }

    let firstVisit = false;
    try {
      firstVisit = !sessionStorage.getItem(PAGE_INTRO_SESSION_KEY);
    } catch {
      firstVisit = false;
    }

    setDelayS(firstVisit ? 0.9 : 0.06);
  }, []);

  return delayS;
}
