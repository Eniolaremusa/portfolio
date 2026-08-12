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
        Column split matches CaseStudyTitleBlock at tablet/desktop (60/40, 100px gap),
        but homepage keeps Skills/Industries/Tools visible on mobile — stacked under
        the intro — instead of hiding like case-study Role/Team/Timeline.
      */}
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:items-start min-[1024px]:flex-nowrap min-[1024px]:items-center min-[1024px]:gap-case-study-title-gap">
        <div className="flex w-full min-w-0 flex-col gap-3 min-[1024px]:w-[60%] min-[1024px]:shrink-0">
          <h1 className="text-title text-text-on-light">{heroContent.headline}</h1>
          <p className="text-body text-text-on-light">{heroContent.bio}</p>
        </div>

        <div className="flex w-full flex-col gap-6 min-[768px]:max-[1023px]:basis-full min-[768px]:max-[1023px]:flex-row min-[768px]:max-[1023px]:gap-8 min-[1024px]:w-[40%] min-[1024px]:shrink-0 min-[1024px]:flex-col min-[1024px]:gap-6">
          <HeroInfoItem label="Skills" value={heroContent.skills} />
          <HeroInfoItem label="Industries" value={heroContent.industries} />
          <HeroInfoItem label={heroContent.toolsLabel} value={heroContent.tools} />
        </div>
      </div>
    </section>
  );
}
