interface CaseStudyDividerProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function CaseStudyDivider({
  orientation = "vertical",
  className = "",
}: CaseStudyDividerProps) {
  return (
    <div
      aria-hidden
      className={
        orientation === "vertical"
          ? `w-px shrink-0 self-stretch bg-case-study-divider ${className}`
          : `h-px w-full shrink-0 bg-case-study-divider ${className}`
      }
    />
  );
}
