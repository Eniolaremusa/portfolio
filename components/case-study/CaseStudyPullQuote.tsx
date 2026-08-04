import Image from "next/image";

interface CaseStudyPullQuoteProps {
  image: string;
  quote: string;
}

function QuoteLines({ quote }: { quote: string }) {
  const lines = quote.includes("\n")
    ? quote.split("\n").filter(Boolean)
    : (() => {
        const commaIndex = quote.indexOf(",");
        if (commaIndex === -1) return [quote];
        return [
          `${quote.slice(0, commaIndex + 1).trimEnd()}`,
          quote.slice(commaIndex + 1).trim(),
        ];
      })();

  return (
    <>
      {lines.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </>
  );
}

export function CaseStudyPullQuote({ image, quote }: CaseStudyPullQuoteProps) {
  return (
    <section className="bg-case-study-hero-bg px-page">
      {/* Figma 56:4024 — inner Hero 1312×504, text left, map frame right */}
      <div className="mx-auto flex w-full max-w-[1312px] flex-col gap-10 py-section min-[768px]:h-[504px] min-[768px]:flex-row min-[768px]:items-center min-[768px]:justify-between min-[768px]:gap-16 min-[768px]:py-0">
        <p className="text-callout max-w-[411px] shrink-0 text-on-dark">
          <QuoteLines quote={quote} />
        </p>

        <div className="flex h-[504px] w-full shrink-0 items-center justify-center bg-light-image-bg min-[768px]:w-[633px]">
          <div className="relative h-[490px] w-full">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 633px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
