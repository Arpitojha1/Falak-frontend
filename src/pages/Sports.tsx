import { SportsHero } from '../components/sports/SportsHero';
import { SportsEvents } from '../components/sports/SportsEvents';
import { SportsFooter } from '../components/sports/SportsFooter';

export function SportsPage() {
  return (
    <main className="w-full min-h-screen bg-midnight-indigo font-sans text-silver selection:bg-electric-orange selection:text-midnight-indigo">
      <SportsHero />
      <SportsEvents />
      <SportsFooter />
    </main>
  );
}
