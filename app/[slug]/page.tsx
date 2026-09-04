import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study/CaseStudyLayout";
import { CaseStudyLayoutV2 } from "@/components/case-study/v2/CaseStudyLayoutV2";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cbfFloV2 } from "@/data/cbf-flo-v2";
import { caseStudySlugs, getCaseStudy } from "@/data";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [...caseStudySlugs, cbfFloV2.slug].map((slug) => ({ slug }));
}

function CaseStudyPlaceholder({ title }: { title: string }) {
  return (
    <section className="bg-light-bg px-page py-section pt-16 md:pt-hero-pt">
      <div className="mx-auto max-w-[1312px]">
        <h1 className="text-title text-text-on-light">{title}</h1>
        <p className="text-body mt-6 text-text-on-light">
          Case study content is coming soon.
        </p>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  if (slug === cbfFloV2.slug) {
    return (
      <>
        <Header variant="dark" paddingClass="px-page-case-study" />
        <main className="overflow-x-clip">
          <CaseStudyLayoutV2 study={cbfFloV2} />
        </main>
        <Footer paddingClass="px-page-case-study" />
      </>
    );
  }

  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const isComplete = Boolean(caseStudy.productContext);

  return (
    <>
      <Header
        variant={isComplete ? "dark" : "light"}
        paddingClass={isComplete ? "px-page-case-study" : "px-page"}
      />
      <main className="overflow-x-clip">
        {isComplete ? (
          <CaseStudyLayout study={caseStudy} />
        ) : (
          <CaseStudyPlaceholder title={caseStudy.title} />
        )}
      </main>
      <Footer paddingClass={isComplete ? "px-page-case-study" : "px-page"} />
    </>
  );
}
