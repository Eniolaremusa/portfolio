import Image from "next/image";
import { heroContent } from "@/data/home";

function HeroPortrait({
  src,
  alt,
  rotation,
  className,
}: {
  src: string;
  alt: string;
  rotation: string;
  className?: string;
}) {
  return (
    <div className={className} style={{ transform: `rotate(${rotation})` }}>
      <div className="relative h-[300px] w-[233px] overflow-hidden rounded-[23.81px] border-[8.333px] border-photo-border bg-white shadow-photo">
        <Image src={src} alt={alt} fill className="object-cover" sizes="233px" priority />
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="bg-light-bg px-page pb-section pt-16 md:pt-hero-pt">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-12 lg:flex-row lg:items-center lg:gap-hero-gap">
        <div className="flex max-w-[734px] flex-col gap-6">
          <div className="flex max-w-[613px] flex-col gap-3">
            <h1 className="text-title text-text-on-light">{heroContent.headline}</h1>
            <p className="text-body text-text-on-light">{heroContent.bio}</p>
          </div>
          <div className="flex max-w-[572px] flex-col">
            <p className="text-label-sm text-text-muted">{heroContent.toolsLabel}</p>
            <p className="text-body whitespace-pre text-text-on-light">{heroContent.tools}</p>
          </div>
        </div>

        {/* Figma 61:19464 — single relative container, second image absolute inside */}
        <div className="mx-auto flex shrink-0 justify-center lg:mx-0 lg:ml-auto">
          <div className="relative h-[354px] w-[495px] max-w-full origin-top scale-[0.72] sm:scale-[0.86] md:scale-95 lg:scale-100">
            <HeroPortrait
              src={heroContent.portraits[0].src}
              alt="Eniola Aigbokhaode in a cafe"
              rotation="-8.02deg"
              className="absolute left-0 top-0 z-10"
            />
            <HeroPortrait
              src={heroContent.portraits[1].src}
              alt="Eniola Aigbokhaode in a bookstore"
              rotation="6.76deg"
              className="absolute left-[228px] top-[28px] z-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
