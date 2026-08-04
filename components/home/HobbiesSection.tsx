import Image from "next/image";
import { hobbyImages } from "@/data/home";

export function HobbiesSection() {
  return (
    <section className="bg-light-bg px-page py-section">
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10">
        <h2 className="text-section-label w-full max-w-section-label text-text-on-light">
          HOBBYING OUTSIDE OF WORK
        </h2>
        <div className="grid w-full max-w-none grid-cols-1 gap-hobbies-gap min-[768px]:grid-cols-2 xl:grid-cols-4">
          {hobbyImages.map((src, index) => {
            const labels = ["Coding", "Reading", "Painting", "Baking"] as const;

            return (
              <div
                key={src}
                className="relative h-[280px] w-full overflow-hidden rounded-none bg-light-image-bg transition-[border-radius] duration-300 ease-out nav-hover:rounded-[10px] min-[768px]:h-[320px] xl:h-[400px]"
              >
                <Image
                  src={src}
                  alt={`${labels[index]} hobby`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 310px"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
