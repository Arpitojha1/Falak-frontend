import { Hero } from '../components/Hero';
import { RecapSection } from '../components/RecapSection';

export function Home() {
  return (
    <main className="w-full">
      <Hero />
      <RecapSection />
    </main>
  );
}
