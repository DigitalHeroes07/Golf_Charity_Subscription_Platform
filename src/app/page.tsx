import LandingHero from '@/components/landing/LandingHero';
import HowItWorks from '@/components/landing/HowItWorks';
import CharityImpact from '@/components/landing/CharityImpact';

export default function Home() {
  return (
    <main>
      <LandingHero />
      <CharityImpact />
      <HowItWorks />
    </main>
  );
}
