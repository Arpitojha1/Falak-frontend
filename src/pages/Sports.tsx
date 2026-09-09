import { SportsHero } from '../components/sports/SportsHero';
import { SportsEvents } from '../components/sports/SportsEvents';

export function SportsPage() {
  return (
    <main className="w-full min-h-screen bg-midnight-indigo font-sans text-silver">
      <SportsHero />
      <SportsEvents />
    </main>
  );
}
