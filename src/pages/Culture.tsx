import { CultureHero } from '../components/culture/CultureHero';
import { CultureEvents } from '../components/culture/CultureEvents';

export function CulturePage() {
  return (
    <main className="w-full min-h-screen bg-midnight-indigo font-sans text-silver selection:bg-aurora-violet selection:text-white">
      <CultureHero />
      <CultureEvents />
    </main>
  );
}
