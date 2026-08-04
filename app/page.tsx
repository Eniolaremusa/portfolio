import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-eyebrow mb-4 uppercase">Portfolio scaffold</p>
        <h1 className="text-title mb-6 text-text-on-light">
          Pipeline check
        </h1>
        <p className="text-body max-w-md text-text-on-light">
          Next.js, Tailwind CSS, TypeScript, and Framer Motion are configured.
          Fonts and color tokens are wired up — real page content comes next.
        </p>
      </main>
      <Footer />
    </>
  );
}
