import { CaseStudyDivider } from "@/components/case-study/CaseStudyDivider";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import type { CaseStudyV2ProblemSolutionCard } from "@/data/cbf-flo-v2-types";

interface CaseStudyProblemSolutionSectionProps {
  title: string;
  problems: CaseStudyV2ProblemSolutionCard[];
  solutions: CaseStudyV2ProblemSolutionCard[];
}

function CardGrid({
  label,
  cards,
  variant,
}: {
  label: string;
  cards: CaseStudyV2ProblemSolutionCard[];
  variant: "problem" | "solution";
}) {
  const cardBgClass =
    variant === "problem" ? "bg-case-study-problem-card" : "bg-case-study-solution-card";

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <p className="text-eyebrow text-text-on-light">{label}</p>
      <div className="grid grid-cols-1 gap-4 min-[1280px]:grid-cols-2">
        {cards.map((card) => (
          <div key={card.text} className={`p-case-study-v2-card ${cardBgClass}`}>
            <p className="text-body text-text-on-light">{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CaseStudyProblemSolutionSection({
  title,
  problems,
  solutions,
}: CaseStudyProblemSolutionSectionProps) {
  return (
    <section className="bg-light-bg px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-6">
          <h2 className="text-h2 text-text-on-light">{title}</h2>

          <div className="flex flex-col gap-case-study-v2-within border border-light-image-bg p-case-study-v2-card min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-12">
            <CardGrid label="PROBLEMS" cards={problems} variant="problem" />
            <CaseStudyDivider
              orientation="vertical"
              className="hidden min-[1024px]:block"
            />
            <CaseStudyDivider
              orientation="horizontal"
              className="min-[1024px]:hidden"
            />
            <CardGrid label="SOLUTIONS" cards={solutions} variant="solution" />
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
