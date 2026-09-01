import { SportsEvents } from '../components/sports/SportsEvents';
import { SportsFooter } from '../components/sports/SportsFooter';

export function SportsPage() {
  return (
    <main className="w-full min-h-screen bg-midnight-indigo font-sans text-silver selection:bg-electric-orange selection:text-midnight-indigo">
      {/* We will add Hero, Events, and Footer here in subsequent tasks */}
      <div className="pt-32 px-6 flex justify-center">
        <h1 className="font-headline-sports-section text-4xl text-electric-orange">SPORTS HUB COMING SOON</h1>
      </div>

      <SportsEvents />
      <SportsFooter />
    </main>
  );
}

