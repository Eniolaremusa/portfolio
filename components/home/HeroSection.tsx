import { heroContent } from "@/data/home";

export function HeroSection() {
  return (
    <section className="bg-light-bg px-page pt-[54px] max-[767px]:pb-10 min-[768px]:pt-hero-pt">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-12 lg:flex-row lg:items-start lg:gap-hero-gap">
        <div className="flex w-full max-w-[734px] flex-col gap-6">
          <div className="flex max-w-[613px] flex-col gap-3">
            <h1 className="text-title text-text-on-light">{heroContent.headline}</h1>
            <p className="text-body text-text-on-light">{heroContent.bio}</p>
          </div>
          <div className="flex max-w-[572px] flex-col">
            <p className="text-label-sm text-text-muted">{heroContent.toolsLabel}</p>
            <p className="text-body whitespace-pre text-text-on-light">{heroContent.tools}</p>
          </div>
        </div>

        {/*
          Spacer preserves the former portrait column so text layout stays put.
          Same breakpoints/size as the previous image stack; no visual content.
        */}
        <div
          className="hidden shrink-0 min-[491px]:block lg:ml-auto"
          aria-hidden
        >
          <div className="relative h-[354px] w-[495px] max-w-full origin-top-left scale-[0.72] sm:scale-[0.86] md:scale-95 lg:scale-100" />
        </div>
      </div>
    </section>
  );
}
