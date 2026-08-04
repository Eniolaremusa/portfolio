import type { ReactNode } from "react";

interface CaseStudyPageContainerProps {
  children: ReactNode;
  className?: string;
}

/** Shared content width + horizontal alignment for all case study sections. */
export function CaseStudyPageContainer({
  children,
  className = "",
}: CaseStudyPageContainerProps) {
  return (
    <div className={`mx-auto w-full min-w-0 max-w-page ${className}`}>{children}</div>
  );
}
