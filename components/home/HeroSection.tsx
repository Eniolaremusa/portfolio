import { heroContent } from "@/data/home";

function HeroInfoItem({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1 min-[768px]:max-[1023px]:flex-1">
      <p className="text-label-sm text-text-muted">{label}</p>
      {/*
        flex-wrap keeps each item inside the column width; commas stay between
        items on the same line without forcing a single unbreakable string.
      */}
      <p className="text-body flex min-w-0 flex-wrap text-text-on-light">
        {items.map((item, index) => (
          <span key={item} className="min-w-0 max-w-full break-words">
            {item}
            {index < items.length - 1 ? (
              <span aria-hidden>,&nbsp;</span>
            ) : null}
          </span>
        ))}
      </p>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-light-bg px-page pt-[54px] max-[767px]:pb-10 min-[768px]:pt-hero-pt">
      {/*
        60/40 via 3fr/2fr grid at ≥1024 so the 100px gap is inside the track
        math (flex 60%+40%+gap was overflowing past page padding).
        Mobile: info stacks under intro and stays visible.
      */}
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 min-[768px]:flex-row min-[768px]:flex-wrap min-[768px]:items-start min-[1024px]:grid min-[1024px]:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] min-[1024px]:items-center min-[1024px]:gap-case-study-title-gap">
        <div className="flex w-full min-w-0 flex-col gap-3">
          <h1 className="text-title text-text-on-light min-[1024px]:text-balance">
            {heroContent.headline}
          </h1>
          <p className="text-body text-text-on-light">{heroContent.bio}</p>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-6 min-[768px]:max-[1023px]:basis-full min-[768px]:max-[1023px]:flex-row min-[768px]:max-[1023px]:gap-8 min-[1024px]:flex-col min-[1024px]:gap-6">
          <HeroInfoItem label="Skills" items={heroContent.skills} />
          <HeroInfoItem label="Industries" items={heroContent.industries} />
          <HeroInfoItem label={heroContent.toolsLabel} items={heroContent.tools} />
        </div>
      </div>
    </section>
  );
}
