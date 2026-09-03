import { Hero } from '../components/Hero';
import { RecapSection } from '../components/RecapSection';
import { HeroCircles } from '../components/landing/HeroCircles';

export function Home() {
  return (
    <main className="w-full">
      {/*
        Relative wrapper so HeroCircles can be absolutely positioned
        against the hero bounds without restructuring Hero's internals.
      */}
      <div className="relative">
        <Hero />
        <HeroCircles />
      </div>
      <RecapSection />
    </main>
  );
}
