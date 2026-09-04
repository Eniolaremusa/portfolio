import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import type { OnarvoDeskReflectionItem } from "@/data/onarvo-desk-types";

interface OnarvoDeskReflectionSectionProps {
  title: string;
  items: OnarvoDeskReflectionItem[];
}

export function OnarvoDeskReflectionSection({
  title,
  items,
}: OnarvoDeskReflectionSectionProps) {
  return (
    <section className="onarvo-section-tint px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-h2 text-center text-text-on-light">{title}</h2>

          <div className="onarvo-reflection-panel w-full max-w-[800px] p-10">
            <div className="flex flex-col gap-10 min-[768px]:flex-row min-[768px]:items-start">
              {items.map((item) => (
                <div key={item.title} className="flex min-w-0 flex-1 flex-col gap-2">
                  <p className="text-body font-semibold text-case-study-hero-text">
                    {item.title}
                  </p>
                  <p className="text-body text-text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
