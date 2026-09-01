import { useState } from 'react';
import { sportsData } from './sportsData';
import { SportsEventCard } from './SportsEventCard';

export function SportsEvents() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="events" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex flex-col items-start mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-orange/10 border border-electric-orange/20 text-electric-orange text-xs font-label-sports uppercase tracking-widest mb-3">
          Compete & Conquer
        </div>
        <h2 className="font-headline-sports-section text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-silver">
          THE EVENTS
        </h2>
        <p className="font-sans text-silver/60 text-sm sm:text-base mt-2 max-w-xl">
          Six competitive arenas. Click any tournament card to view match rules, schedule details, and registration information.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:gap-5">
        {sportsData.map((event) => (
          <SportsEventCard
            key={event.id}
            event={event}
            isExpanded={expandedId === event.id}
            onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
          />
        ))}
      </div>
    </section>
  );
}
