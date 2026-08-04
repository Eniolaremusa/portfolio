import type { CaseStudy } from "@/data/types";

interface CaseStudyTitleBlockProps {
  study: CaseStudy;
}

function MetadataItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-label-sm uppercase text-text-muted">{label}</p>
      <p className="text-body text-text-on-light">{value}</p>
    </div>
  );
}

export function CaseStudyTitleBlock({ study }: CaseStudyTitleBlockProps) {
  const eyebrow = study.eyebrow ?? `${study.title.toUpperCase()} CASE STUDY`;
  const headline = study.headline ?? study.title;
  const intro = study.intro ?? study.description;

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-case-study-title-gap">
      <div className="flex max-w-[734px] flex-col gap-3">
        <p className="text-eyebrow text-text-on-light">{eyebrow}</p>
        <h1 className="text-title max-w-[613px] text-text-on-light">{headline}</h1>
        <p className="text-body max-w-[613px] text-text-on-light">{intro}</p>
      </div>
      <div className="flex w-full max-w-[506px] flex-col gap-6 lg:shrink-0">
        <MetadataItem label="Role" value={study.role} />
        <MetadataItem label="Team" value={study.team} />
        <MetadataItem label="Timeline" value={study.timeline} />
      </div>
    </div>
  );
}
