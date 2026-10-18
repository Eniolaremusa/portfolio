"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion";
import { useHeroRevealDelay } from "@/lib/useHeroRevealDelay";

interface HeroRevealGroupProps {
  children: React.ReactNode;
  /** Added on top of the base reveal delay (first visit vs return). */
  offset?: number;
  className?: string;
}

export function HeroRevealGroup({
  children,
  offset = 0,
  className,
}: HeroRevealGroupProps) {
  const reduceMotion = useReducedMotion();
  const baseDelay = useHeroRevealDelay();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.42,
        ease: MOTION_EASE,
        delay: reduceMotion ? 0 : baseDelay + offset,
      }}
    >
      {children}
    </motion.div>
  );
}
