import Image from "next/image";
import { CaseStudyPhoneCarousel } from "@/components/case-study/CaseStudyPhoneCarousel";
import { hobbyImages } from "@/data/home";

const HOBBY_LABELS = ["Coding", "Reading", "Painting", "Baking"] as const;

export function HobbiesSection() {
  return (
    <section className="bg-light-bg px-page py-section">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10">
        <h2 className="text-section-label w-full max-w-section-label text-text-on-light">
          HOBBYING OUTSIDE OF WORK
        </h2>

        <CaseStudyPhoneCarousel
          images={hobbyImages}
          alts={HOBBY_LABELS.map((label) => `${label} hobby`)}
          imageFit="cover"
          className="min-[768px]:hidden"
        />

        <div className="hidden w-full max-w-none grid-cols-2 gap-hobbies-gap min-[768px]:grid xl:grid-cols-4">
          {hobbyImages.map((src, index) => (
            <div
              key={src}
              className="relative h-[320px] w-full overflow-hidden rounded-none bg-light-image-bg transition-[border-radius] duration-300 ease-out nav-hover:rounded-[10px] xl:h-[400px]"
            >
              <Image
                src={src}
                alt={`${HOBBY_LABELS[index]} hobby`}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 50vw, 310px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
