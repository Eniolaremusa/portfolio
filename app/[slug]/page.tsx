import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { caseStudySlugs, getCaseStudy } from "@/data";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <p className="text-eyebrow mb-4 uppercase">Case study placeholder</p>
        <h1 className="text-title mb-6 text-text-on-light">{caseStudy.title}</h1>
        <p className="text-body text-text-on-light">
          Template route is wired up. Content for this project will be built in a
          later step.
        </p>
      </main>
      <Footer />
    </>
  );
}
