import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { OnarvoDeskAsset } from "@/components/case-study/onarvo/OnarvoDeskAsset";
import type { OnarvoDeskComparisonCard } from "@/data/onarvo-desk-types";

interface OnarvoDeskBeforeAfterSectionProps {
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
  before: OnarvoDeskComparisonCard[];
  after: OnarvoDeskComparisonCard[];
  screenshot: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
}

function BulletList({
  items,
  className = "",
}: {
  items: OnarvoDeskComparisonCard[];
  className?: string;
}) {
  return (
    <ul className={`onarvo-text-body flex list-disc flex-col gap-2 pl-[22.5px] ${className}`}>
      {items.map((item) => (
        <li key={item.text}>{item.text}</li>
      ))}
    </ul>
  );
}

export function OnarvoDeskBeforeAfterSection({
  title,
  subtitle,
  beforeLabel,
  afterLabel,
  before,
  after,
  screenshot,
}: OnarvoDeskBeforeAfterSectionProps) {
  return (
    <section className="onarvo-section-tint px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within">
          <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-start">
            <div className="flex w-full min-w-0 flex-col gap-2 min-[1280px]:w-[27%] min-[1280px]:shrink-0">
              <h2 className="onarvo-text-section-title">{title}</h2>
              <p className="onarvo-text-body">{subtitle}</p>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-6 min-[768px]:flex-row min-[1280px]:w-[73%]">
              <div className="onarvo-card-before flex min-w-0 flex-1 flex-col gap-4 p-case-study-v2-card">
                <p className="onarvo-text-card-label">{beforeLabel}</p>
                <BulletList items={before} />
              </div>
              <div className="onarvo-card-after flex min-w-0 flex-1 flex-col gap-4 p-case-study-v2-card">
                <p className="onarvo-text-card-label">{afterLabel}</p>
                <BulletList items={after} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="onarvo-decision-image-panel flex min-h-[320px] w-full items-center justify-center overflow-hidden min-[768px]:min-h-[720px]">
              <OnarvoDeskAsset
                src={screenshot.src}
                imageWidth={screenshot.width}
                imageHeight={screenshot.height}
                frameVariant="dark-panel"
                padded={false}
                className="max-h-full max-w-full"
              />
            </div>
            <p className="onarvo-text-body text-center">{screenshot.caption}</p>
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
