import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CaseStudiesSection } from "@/components/home/CaseStudiesSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HobbiesSection } from "@/components/home/HobbiesSection";
import { PersonalExplorationsSection } from "@/components/home/PersonalExplorationsSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CaseStudiesSection />
        <PersonalExplorationsSection />
        <HobbiesSection />
      </main>
      <Footer />
    </>
  );
}
