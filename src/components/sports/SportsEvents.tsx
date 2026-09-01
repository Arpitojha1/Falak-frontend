import { useState } from 'react';
import { sportsData } from './sportsData';
import { SportsEventCard } from './SportsEventCard';

export function SportsEvents() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="events" className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Background element for Events section */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-electric-orange/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative">
        <div className="flex flex-col items-start relative z-10">
          <div className="inline-flex items-center gap-2 bg-acid-lime text-midnight-indigo px-4 py-1.5 font-label-sports uppercase tracking-[0.2em] text-sm font-bold -rotate-2 mb-6 border-2 border-midnight-indigo shadow-[4px_4px_0_0_#FF6A00]">
            Compete & Conquer
          </div>
          <h2 className="font-headline-sports-section text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter text-silver drop-shadow-[4px_4px_0_rgba(11,15,43,1)]">
            THE <span className="text-electric-orange">EVENTS</span>
          </h2>
        </div>
        
        <p className="font-sans text-silver/80 text-base sm:text-lg max-w-sm md:text-right border-l-4 md:border-l-0 md:border-r-4 border-electric-orange pl-4 md:pl-0 md:pr-4 py-2 bg-midnight-indigo/50">
          Six competitive arenas. Unrestricted aggression. Select a tournament to view match rules and registration details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <div className="lg:col-span-10 lg:col-start-2 flex flex-col gap-6">
          {sportsData.map((event) => (
            <SportsEventCard
              key={event.id}
              event={event}
              isExpanded={expandedId === event.id}
              onToggle={() => setExpandedId(expandedId === event.id ? null : event.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
