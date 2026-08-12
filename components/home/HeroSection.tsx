import { heroContent } from "@/data/home";

function HeroInfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1 min-[768px]:max-[1023px]:flex-1">
      <p className="text-label-sm text-text-muted">{label}</p>
      <p className="text-body text-text-on-light">{value}</p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-light-bg px-page pt-[54px] max-[767px]:pb-10 min-[768px]:pt-hero-pt">
      {/*
        Mirrors CaseStudyTitleBlock breakpoints:
        - <768: stacked (info below intro). Shown on mobile so Tools remains available
          after moving out of the left column (title-block metadata is hidden <768).
        - 768–1023: info row across full width under the intro
        - ≥1024: two columns, intro | stacked info
      */}
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:items-start min-[1024px]:flex-nowrap min-[1024px]:gap-case-study-title-gap">
        <div className="flex w-full max-w-[734px] shrink-0 flex-col">
          <div className="flex max-w-[613px] flex-col gap-3">
            <h1 className="text-title text-text-on-light">{heroContent.headline}</h1>
            <p className="text-body text-text-on-light">{heroContent.bio}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 min-[768px]:max-[1023px]:basis-full min-[768px]:max-[1023px]:flex-row min-[768px]:max-[1023px]:gap-8 min-[1024px]:min-w-0 min-[1024px]:flex-1 min-[1024px]:flex-col min-[1024px]:gap-6">
          <HeroInfoItem label="Skills" value={heroContent.skills} />
          <HeroInfoItem label="Industries" value={heroContent.industries} />
          <HeroInfoItem label={heroContent.toolsLabel} value={heroContent.tools} />
        </div>
      </div>
    </section>
  );
}
