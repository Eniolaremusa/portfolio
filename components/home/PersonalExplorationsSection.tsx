import { CaseStudyTextCtaContent } from "@/components/CaseStudyTextCta";
import {
  personalExplorations,
  personalExplorationsHeading,
} from "@/data/home";

function PersonalExplorationRow({
  exploration,
}: {
  exploration: (typeof personalExplorations)[number];
}) {
  return (
    <a
      href={exploration.prototypeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group exploration-row flex w-full min-w-0 flex-col gap-6 min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-12"
      aria-label={`${exploration.title} — explore prototype`}
    >
      <div className="card-hover-press relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-light-image-bg min-[768px]:aspect-auto min-[768px]:h-[280px] min-[768px]:w-[70%] min-[768px]:max-w-[918px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="card-hover-press-media size-full object-cover"
          aria-hidden
        >
          <source src={encodeURI(exploration.video)} type="video/mp4" />
        </video>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center min-[768px]:max-w-[calc(30%-0px)] min-[768px]:flex-[0_1_30%]">
        <div className="flex flex-col gap-1">
          <h3 className="text-link-medium text-on-dark">{exploration.title}</h3>
          <p className="text-body text-on-dark">{exploration.description}</p>
        </div>
        <span className="exploration-prototype-cta text-body mt-3 inline-flex w-fit items-center gap-1.5 text-on-dark">
          <CaseStudyTextCtaContent label="Explore prototype" />
        </span>
      </div>
    </a>
  );
}

export function PersonalExplorationsSection() {
  return (
    <section className="personal-explorations-section page-full-bleed bg-accent px-page py-section">
      <div className="mx-auto grid w-full max-w-[1312px] grid-cols-1 gap-home-section-label xl:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] xl:items-start xl:gap-y-0">
        <header className="xl:sticky xl:top-[69px] xl:z-10 xl:col-start-1 xl:row-start-1 xl:self-start xl:bg-accent xl:py-2">
          <h2 className="text-home-section-lead max-w-[26rem] text-on-dark">
            {personalExplorationsHeading}
          </h2>
        </header>

        <div className="flex w-full min-w-0 flex-col gap-8 xl:col-start-2 xl:row-start-1">
          {personalExplorations.map((exploration) => (
            <PersonalExplorationRow
              key={exploration.slug}
              exploration={exploration}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
