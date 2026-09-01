import { useState, useMemo } from 'react';
import { sportsData } from './sportsData';
import Masonry from './Masonry';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { Calendar, MapPin, Layers } from 'lucide-react';

export function SportsEvents() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const masonryItems = useMemo(() => {
    return sportsData.map(event => ({
      id: event.id,
      img: event.img,
      url: '#',
      height: event.height
    }));
  }, []);

  const expandedEvent = sportsData.find(e => e.id === expandedId);

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

      <div className="relative z-10 w-full h-[600px] md:h-[800px] mb-8">
        <Masonry 
          items={masonryItems} 
          onItemClick={(item) => setExpandedId(prev => prev === item.id ? null : item.id)} 
          colorShiftOnHover={true}
        />
      </div>

      {/* Expanded Details Panel */}
      <AnimatePresence mode="wait">
        {expandedEvent && (
          <motion.div
            key={expandedEvent.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full bg-silver p-8 border-4 border-midnight-indigo shadow-[8px_8px_0_0_rgba(11,15,43,1)] relative z-20"
          >
            {/* Background grain inside card */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-midnight-indigo) 1px, transparent 0)',
                backgroundSize: '4px 4px'
              }}
            />

            <div className="relative z-10">
              <h3 className="font-headline-sports-section text-4xl md:text-6xl uppercase tracking-tighter text-midnight-indigo leading-none mb-6">
                {expandedEvent.title}
              </h3>
              <p className="font-sans text-lg md:text-xl text-midnight-indigo leading-relaxed mb-8 font-medium max-w-3xl">
                {expandedEvent.description}
              </p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col p-4 bg-midnight-indigo text-silver border-2 border-midnight-indigo transform -rotate-1 shadow-[4px_4px_0_0_#FF6A00]">
                  <div className="text-[10px] uppercase tracking-widest text-acid-lime font-label-sports mb-1">Date & Time</div>
                  <div className="text-sm font-label-sports font-bold tracking-wide">{expandedEvent.date}</div>
                </div>

                <div className="flex flex-col p-4 bg-midnight-indigo text-silver border-2 border-midnight-indigo transform rotate-1 shadow-[4px_4px_0_0_#C6FF00]">
                  <div className="text-[10px] uppercase tracking-widest text-electric-orange font-label-sports mb-1">Venue</div>
                  <div className="text-sm font-label-sports font-bold tracking-wide">{expandedEvent.venue}</div>
                </div>

                <div className="flex flex-col p-4 bg-midnight-indigo text-silver border-2 border-midnight-indigo transform -rotate-1 shadow-[4px_4px_0_0_#FF6A00]">
                  <div className="text-[10px] uppercase tracking-widest text-acid-lime font-label-sports mb-1">Format</div>
                  <div className="text-sm font-label-sports font-bold tracking-wide">{expandedEvent.format}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-6 mt-4 border-t-4 border-midnight-indigo pt-6">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="inline-flex items-center justify-center bg-electric-orange text-midnight-indigo font-headline-sports-section uppercase text-lg px-8 py-4 hover:bg-acid-lime border-2 border-midnight-indigo shadow-[4px_4px_0_0_rgba(11,15,43,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
                >
                  REGISTER NOW
                </button>

                {expandedEvent.rulesLink && (
                  <a
                    href={expandedEvent.rulesLink}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center font-headline-sports-section text-sm uppercase tracking-wider text-midnight-indigo hover:text-electric-orange transition-colors decoration-4 underline-offset-4 hover:underline"
                  >
                    Rulebook & Guidelines →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
