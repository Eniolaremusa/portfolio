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
  const labelClass =
    variant === "dark" ? "text-label-sm text-metadata-label" : "text-label-sm text-text-muted";
  const valueClass =
    variant === "dark" ? "text-body text-on-dark" : "text-body text-text-on-light";

  return (
    <div className="flex min-w-0 flex-col gap-1 min-[768px]:max-[1023px]:flex-1">
      <p className={labelClass}>{label}</p>
      <p className={valueClass}>{value}</p>
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
    <div className="flex flex-col gap-10 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:items-start min-[1024px]:flex-nowrap min-[1024px]:items-center min-[1024px]:gap-case-study-title-gap">
      <div className="flex w-full min-w-0 flex-col gap-3 min-[1024px]:w-[60%] min-[1024px]:shrink-0">
        <p className={`text-eyebrow ${primaryText}`}>{eyebrow}</p>
        <h1
          className={`text-title ${primaryText} min-[768px]:max-[1023px]:line-clamp-2`}
        >
          {headline}
        </h1>
        <p className={`text-body ${primaryText}`}>{intro}</p>
      </div>

      <div className="hidden w-full flex-col gap-6 min-[768px]:max-[1023px]:basis-full min-[768px]:max-[1023px]:flex-row min-[768px]:max-[1023px]:gap-8 min-[1024px]:w-[40%] min-[1024px]:shrink-0 min-[1024px]:flex-col min-[1024px]:gap-6 min-[768px]:flex">
        <MetadataItem label="Role" value={study.role} variant={variant} />
        <MetadataItem label="Team" value={study.team} variant={variant} />
        <MetadataItem label="Timeline" value={study.timeline} variant={variant} />
      </div>
    </div>
  );
}
