import Link from "next/link";
import { ExternalLinkArrow } from "@/components/ExternalLinkArrow";
import { StickySection } from "@/components/home/StickySection";
import { personalExplorations } from "@/data/home";

export function PersonalExplorationsSection() {
  return (
    <StickySection
      label="PERSONAL EXPLORATIONS"
      contentClassName="flex w-full max-w-none flex-col gap-exploration-row-gap min-[768px]:max-w-[884px] xl:justify-self-end"
    >
      {personalExplorations.map((exploration) => (
        <div
          key={exploration.slug}
          className="flex w-full flex-col gap-6 min-[768px]:flex-row min-[768px]:items-end min-[768px]:gap-10"
        >
          <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-light-image-bg min-[768px]:w-[400px]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="size-full object-cover"
              aria-label={`${exploration.title} prototype preview`}
            >
              <source src={encodeURI(exploration.video)} type="video/mp4" />
            </video>
          </div>
          <div className="flex w-full flex-col gap-1 min-[768px]:flex-1">
            <Link
              href={exploration.prototypeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-link-medium inline-flex w-fit items-center gap-1.5 underline decoration-from-font underline-offset-2"
            >
              {exploration.title}
              <ExternalLinkArrow className="max-[495px]:hidden opacity-0 scale-90 transition-all duration-200 ease-out nav-group-hover:opacity-100 nav-group-hover:scale-100" />
            </Link>
            <p className="text-body text-text-on-light">{exploration.description}</p>
          </div>
        </div>
      ))}
    </StickySection>
  );
}
