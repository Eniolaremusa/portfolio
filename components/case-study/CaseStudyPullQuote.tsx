import Image from "next/image";

interface CaseStudyPullQuoteProps {
  image: string;
  quote: string;
}

export function CaseStudyPullQuote({ image, quote }: CaseStudyPullQuoteProps) {
  return (
    <section className="bg-light-bg px-page pb-section">
      <div className="relative mx-auto h-[280px] max-w-[1312px] overflow-hidden min-[768px]:h-case-study-image">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1312px) 100vw, 1312px"
        />
        <div className="absolute inset-0 flex items-end px-6 pb-10 min-[768px]:items-center min-[768px]:px-0 min-[768px]:pb-0">
          <p className="text-callout max-w-[411px] text-[#fffefb] min-[768px]:ml-[102px]">
            {quote}
          </p>
        </div>
      </div>
    </section>
  );
}
