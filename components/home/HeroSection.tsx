import { HeroClientLogo } from "@/components/home/HeroClientLogo";
import { HeroReachOutButton } from "@/components/home/HeroReachOutButton";
import { HeroRevealGroup } from "@/components/home/HeroRevealGroup";
import { heroContent } from "@/data/home";

export function HeroSection() {
  return (
    <section className="bg-light-bg px-page pt-hero-section pb-section">
      <div className="home-hero-column home-hero-split mx-auto flex w-full max-w-page flex-col gap-12">
        <div className="home-hero-split__row flex w-full flex-col items-start gap-10 text-left min-[768px]:grid min-[768px]:grid-cols-2 min-[768px]:items-center min-[768px]:gap-[72px]">
          <HeroRevealGroup className="home-hero-split__intro min-w-0 w-full">
            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex w-full flex-col items-start gap-3 text-left">
                <h1 className="text-home-h1">
                  {heroContent.headline}
                </h1>
                <p className="text-body text-text-on-light text-pretty">
                  {heroContent.bio}
                </p>
              </div>
              <HeroReachOutButton label={heroContent.reachOutLabel} />
            </div>
          </HeroRevealGroup>

          <HeroRevealGroup
            offset={0.08}
            className="home-hero-split__clients min-w-0 w-full"
          >
            <div className="flex w-full flex-col items-start gap-3 text-left">
              <p className="text-eyebrow text-home-hero-client-label text-balance">
                {heroContent.clientsLabel}
              </p>
              <ul className="home-hero-logos home-hero-logos--split flex w-full flex-wrap items-center gap-x-6 gap-y-5">
                {heroContent.clients.map((client) => (
                  <HeroClientLogo key={client.name} {...client} />
                ))}
              </ul>
            </div>
          </HeroRevealGroup>
        </div>
      </div>
    </section>
  );
}
