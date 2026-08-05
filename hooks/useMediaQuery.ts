"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query. Server snapshot avoids hydration mismatch;
 * pair with `useHasMounted()` when you must not fetch the wrong breakpoint asset.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

/** True only after client mount — use to defer image mounts until viewport is known. */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Matches site mobile breakpoint: below 768px */
export function useIsMobileViewport(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
