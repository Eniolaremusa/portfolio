import { CaseStudyDivider } from "@/components/case-study/CaseStudyDivider";
import { CaseStudyPageContainer } from "@/components/case-study/CaseStudyPageContainer";
import { CaseStudyV2Image } from "@/components/case-study/v2/CaseStudyV2Image";
import type { CaseStudyV2Persona } from "@/data/cbf-flo-v2-types";

function PersonaLeadText({ text }: { text: string }) {
  const match = text.match(/^((?:Pain|Consequence|Need)\s*—\s*)([\s\S]*)$/);

  if (!match) {
    return <>{text}</>;
  }

  return (
    <>
      <span className="font-bold">{match[1]}</span>
      {match[2]}
    </>
  );
}

function PersonaColumn({ persona }: { persona: CaseStudyV2Persona }) {
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="flex min-w-0 flex-col bg-light-image-bg p-case-study-v2-card pb-0">
        <p className="text-eyebrow mb-4 text-case-study-persona-label">
          {persona.label}
        </p>
        <CaseStudyV2Image
          src={persona.image}
          alt={persona.alt}
          width={persona.width}
          height={persona.height}
          sizes="(max-width: 767px) 100vw, 33vw"
          className="h-auto w-full"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2 rounded-sm bg-light-image-bg p-case-study-v2-card">
        <p className="text-body text-text-on-light">
          <PersonaLeadText text={persona.pain} />
        </p>
        <p className="text-body text-text-on-light">
          <PersonaLeadText text={persona.consequence} />
        </p>
        <p className="text-body text-text-on-light">
          <PersonaLeadText text={persona.need} />
        </p>
      </div>
    </div>
  );
}

interface CaseStudyResearchSectionProps {
  title: string;
  primaryResearch: string;
  secondaryResearch: string;
  personas: CaseStudyV2Persona[];
}

export function CaseStudyResearchSection({
  title,
  primaryResearch,
  secondaryResearch,
  personas,
}: CaseStudyResearchSectionProps) {
  return (
    <section className="bg-light-bg px-page-case-study py-case-study-v2-section">
      <CaseStudyPageContainer>
        <div className="flex flex-col gap-case-study-v2-within">
          <div className="flex flex-col gap-case-study-v2-within min-[1280px]:flex-row min-[1280px]:items-start">
            <h2 className="text-h2 w-full shrink-0 text-text-on-light min-[1280px]:w-[30%]">
              {title}
            </h2>

            <div className="flex w-full min-w-0 flex-col gap-6 min-[1280px]:w-[70%] min-[1024px]:flex-row min-[1024px]:items-stretch min-[1024px]:gap-0">
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="text-eyebrow text-text-on-light">PRIMARY RESEARCH</p>
                <p className="text-body text-text-on-light">{primaryResearch}</p>
              </div>
              <CaseStudyDivider
                orientation="vertical"
                className="mx-6 hidden min-[1024px]:block"
              />
              <CaseStudyDivider
                orientation="horizontal"
                className="min-[1024px]:hidden"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <p className="text-eyebrow text-text-on-light">SECONDARY RESEARCH</p>
                <p className="text-body text-text-on-light">{secondaryResearch}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 min-[1280px]:grid min-[1280px]:grid-cols-3 min-[1280px]:gap-6">
            {personas.map((persona, index) => (
              <div
                key={persona.label}
                className="flex min-w-0 flex-col min-[1280px]:flex-row min-[1280px]:items-stretch"
              >
                {index > 0 ? (
                  <CaseStudyDivider
                    orientation="vertical"
                    className="mx-0 mr-6 hidden min-[1280px]:block"
                  />
                ) : null}
                <PersonaColumn persona={persona} />
              </div>
            ))}
          </div>
        </div>
      </CaseStudyPageContainer>
    </section>
  );
}
