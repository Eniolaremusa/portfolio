import type { CaseStudyV2Hero } from "@/data/cbf-flo-v2-types";

interface CaseStudyTitleBlockV2Props {
  hero: CaseStudyV2Hero;
}

function MetadataItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <p className="text-label-sm text-text-muted">{label}</p>
      <p className="text-body break-words text-case-study-hero-text">{value}</p>
    </div>
  );
}

export function CaseStudyTitleBlockV2({ hero }: CaseStudyTitleBlockV2Props) {
  return (
    <div className="flex flex-col gap-10 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:items-start min-[1024px]:flex-nowrap min-[1024px]:items-center min-[1024px]:gap-case-study-title-gap">
      <div className="flex w-full min-w-0 flex-col gap-3 min-[1024px]:w-[60%] min-[1024px]:shrink-0">
        <p className="text-eyebrow text-case-study-hero-eyebrow">{hero.eyebrow}</p>
        <h1 className="text-title text-case-study-hero-text min-[768px]:max-[1023px]:line-clamp-2">
          {hero.headline}
        </h1>
        <p className="text-body text-case-study-hero-text">{hero.intro}</p>
      </div>

      <div className="hidden w-full min-w-0 flex-col min-[768px]:flex min-[768px]:max-[1023px]:basis-full min-[768px]:max-[1023px]:flex-row min-[768px]:max-[1023px]:gap-6 min-[1024px]:w-[40%] min-[1024px]:shrink-0 min-[1024px]:flex-col min-[1024px]:gap-4">
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-4 min-[768px]:max-[1023px]:gap-x-6 min-[1024px]:gap-x-4 min-[1024px]:gap-y-4">
          <MetadataItem label="Role" value={hero.role} />
          <MetadataItem label="Team" value={hero.team} />
          <MetadataItem label="Timeline" value={hero.timeline} />
          <MetadataItem label="Industry" value={hero.industry} />
        </div>
      </div>
    </div>
  );
}
