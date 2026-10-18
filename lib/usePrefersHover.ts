"use client";

import { useEffect, useState } from "react";

/** True when the primary input supports hover (mouse/trackpad), not touch-only. */
export function usePrefersHover(): boolean {
  const [prefersHover, setPrefersHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setPrefersHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return prefersHover;
}
