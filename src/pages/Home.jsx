import About from '@/components/About';
import FAQSection from '@/components/Faq';
import HeroPage from '@/components/HeroPage';
import RoadmapSection from '@/components/TimeLine';
import Tokenomics from '@/components/TokenNomics';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-800 min-h-screen text-white">
      <HeroPage />
      <About />
      <Tokenomics />
      <RoadmapSection />
      <FAQSection />
    </div>
  );
}
