import type { CaseStudy } from "@/data/types";

interface CaseStudyTitleBlockProps {
  study: CaseStudy;
  variant?: "light" | "dark";
}

function MetadataItem({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant: "light" | "dark";
}) {
  return (
    <div className="flex flex-col gap-1">
      <p
        className={
          variant === "dark" ? "text-label-sm text-nav-link" : "text-label-sm text-text-muted"
        }
      >
        {label}
      </p>
      <p
        className={
          variant === "dark" ? "text-body text-on-dark" : "text-body text-text-on-light"
        }
      >
        {value}
      </p>
    </div>
  );
}

export function CaseStudyTitleBlock({
  study,
  variant = "light",
}: CaseStudyTitleBlockProps) {
  const eyebrow = study.eyebrow ?? `${study.title.toUpperCase()} CASE STUDY`;
  const headline = study.headline ?? study.title;
  const intro = study.intro ?? study.description;
  const isDark = variant === "dark";
  const primaryText = isDark ? "text-on-dark" : "text-text-on-light";

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-case-study-title-gap">
      <div className="flex max-w-[734px] flex-col gap-3">
        <p className={`text-eyebrow ${primaryText}`}>{eyebrow}</p>
        <h1 className={`text-title max-w-[613px] ${primaryText}`}>{headline}</h1>
        <p className={`text-body max-w-[613px] ${primaryText}`}>{intro}</p>
      </div>
      <div className="flex w-full max-w-[506px] flex-col gap-6 lg:shrink-0">
        <MetadataItem label="Role" value={study.role} variant={variant} />
        <MetadataItem label="Team" value={study.team} variant={variant} />
        <MetadataItem label="Timeline" value={study.timeline} variant={variant} />
      </div>
    </div>
  );
}
