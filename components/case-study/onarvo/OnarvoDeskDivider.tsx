interface OnarvoDeskDividerProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function OnarvoDeskDivider({
  orientation = "vertical",
  className = "",
}: OnarvoDeskDividerProps) {
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
