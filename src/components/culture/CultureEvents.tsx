import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { cultureData } from './cultureData';
import { EventCard } from './EventCard';

export function CultureEvents() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  function toggleEvent(id: string) {
    if (expandedId === id) {
      setExpandedId(null);
      // Keep activeId active for the duration of the transition (500ms)
      setTimeout(() => setActiveId(null), 500);
    } else {
      setExpandedId(id);
      setActiveId(id);
    }
  }

  return (
    <section
      id="events"
      className="w-full py-28 px-6 md:px-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0B0F2B 0%, #1C0B46 40%, #0B0F2B 100%)',
      }}
    >
      {/* Background carpet-weave ambient texture — Aurora Violet at 5% */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(138,92,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138,92,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      {/* Soft radial glow behind the section header */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vh] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #8A5CFF 0%, transparent 70%)',
        }}
      />

      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col items-start">
            {/* Section badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6
                font-sans text-xs font-semibold uppercase tracking-[0.2em]
                text-midnight-indigo bg-aurora-violet
                rounded-full"
            >
              {/* Tiny mandala rosette */}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="4" stroke="#0B0F2B" strokeWidth="0.8" />
                <circle cx="5" cy="5" r="1.5" fill="#0B0F2B" />
              </svg>
              Celebrate & Compete
            </div>

            <h2
              className="font-accent font-extrabold text-champagne-pearl leading-none"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                letterSpacing: '-0.02em',
                textShadow: '2px 3px 0 #1C0B46',
              }}
            >
              The Events
            </h2>
            <p
              className="font-baloo-devanagari font-bold text-aurora-violet mt-1"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.5rem)' }}
            >
              आयोजन
            </p>
          </div>

          <p className="font-sans text-silver/70 text-base max-w-sm leading-relaxed border-l-2 border-aurora-violet/40 pl-4 py-1">
            Six cultural arenas — classical forms, folk traditions, literary craft, and visual art. Each a stamp worth collecting.
          </p>
        </div>

        {/* Ornamental rule below header */}
        <div className="flex items-center gap-4 mt-10">
          <div className="flex-1 h-px bg-aurora-violet/20" />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#8A5CFF" strokeWidth="0.8" strokeOpacity="0.5" />
            <circle cx="10" cy="10" r="4" stroke="#8A5CFF" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="10" cy="10" r="1.5" fill="#8A5CFF" fillOpacity="0.5" />
          </svg>
          <div className="flex-1 h-px bg-aurora-violet/20" />
        </div>
      </div>

      {/* ── Stamp Sheet Grid ── */}
      {/* Standard CSS Grid — no GSAP, no Flip, no Masonry import */}
      <div className="max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="sync">
          {expandedId ? (
            /* Expanded state — show expanded card full-width + rest dimmed below */
            <div className="space-y-6">
              {/* Expanded card — spans full width.
                  key={expandedId} matches key={event.id} in the collapsed grid so Framer
                  Motion can track the layoutId across the DOM position change.
                  No wrapping motion.div — EventCard's internal layoutId on the PNG handles the FLIP. */}
              {(() => {
                const event = cultureData.find((e) => e.id === expandedId);
                return event ? (
                  <EventCard
                    key={expandedId}
                    event={event}
                    isExpanded={true}
                    onToggle={() => toggleEvent(event.id)}
                    isDimmed={false}
                    isActive={activeId === event.id}
                  />
                ) : null;
              })()}

              {/* Remaining dimmed tiles in 3-column row below */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {cultureData
                  .filter((e) => e.id !== expandedId)
                  .map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isExpanded={false}
                      onToggle={() => toggleEvent(event.id)}
                      isDimmed={true}
                      isActive={activeId === event.id}
                    />
                  ))}
              </div>
            </div>
          ) : (
            /* Collapsed state — full 3×2 stamp sheet grid */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {cultureData.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isExpanded={false}
                  onToggle={() => toggleEvent(event.id)}
                  isDimmed={false}
                  isActive={activeId === event.id}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Section footer note */}
      <div className="max-w-7xl mx-auto mt-16 flex items-center justify-center relative z-10">
        <p className="font-sans text-silver/30 text-xs uppercase tracking-[0.2em]">
          Falak '26 · MIT Bengaluru · Cultural Edition
        </p>
      </div>
    </section>
  );
}
