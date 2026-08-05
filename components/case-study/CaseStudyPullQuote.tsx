import Image from "next/image";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";

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
    <section className="bg-case-study-hero-bg px-page-case-study py-case-study-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-10 min-[768px]:flex-row min-[768px]:items-center min-[768px]:gap-16">
          <p className="text-callout max-w-[411px] shrink-0 text-on-dark">
            <QuoteLines quote={quote} />
          </p>

          <div className="relative h-[280px] w-full min-w-0 overflow-hidden bg-light-image-bg min-[768px]:h-case-study-image">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1312px) 100vw, 1312px"
            />
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
