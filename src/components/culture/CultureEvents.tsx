import { useState, useMemo } from 'react';
import { AnimatePresence } from 'motion/react';
import { cultureData } from './cultureData';
import { EventCard } from './EventCard';
import { StampBurst } from './StampBurst';

export const CULTURAL_CATEGORIES = [
  'Dance',
  'Music',
  'Drama',
  'Business',
  'Lifestyle',
  'Creative',
  'Quiz',
  'Esports',
] as const;

export type CulturalCategory = (typeof CULTURAL_CATEGORIES)[number];

export function CultureEvents() {
  const [selectedCategory, setSelectedCategory] = useState<CulturalCategory>('Dance');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CULTURAL_CATEGORIES) {
      counts[cat] = cultureData.filter(
        (e) => e.category.toLowerCase() === cat.toLowerCase()
      ).length;
    }
    return counts;
  }, []);

  const filteredEvents = useMemo(() => {
    return cultureData.filter(
      (e) => e.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [selectedCategory]);

  function handleCategoryChange(cat: CulturalCategory) {
    if (selectedCategory === cat) return;
    setExpandedId(null);
    setActiveId(null);
    setSelectedCategory(cat);
  }

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

        {/* ── Category Filter Toggles (Wrapped, No horizontal scroll) ── */}
        <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3 pt-6 md:pt-8">
          {CULTURAL_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = categoryCounts[cat] ?? 0;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`
                  group relative flex-shrink-0 inline-flex items-center gap-2 px-3.5 xs:px-4 md:px-5 py-2 rounded-full
                  font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.14em]
                  transition-all duration-300 cursor-pointer select-none
                  ${
                    isSelected
                      ? 'bg-aurora-violet text-midnight-indigo border border-champagne-pearl/70 shadow-[0_0_22px_rgba(138,92,255,0.45)] scale-105'
                      : 'bg-deep-plum/60 text-soft-lilac/75 border border-aurora-violet/25 hover:border-aurora-violet/60 hover:text-champagne-pearl hover:bg-aurora-violet/15'
                  }
                `}
                aria-pressed={isSelected}
              >
                <span>{cat}</span>
                <span
                  className={`
                    text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full leading-none transition-colors
                    ${
                      isSelected
                        ? 'bg-midnight-indigo/20 text-midnight-indigo'
                        : 'bg-aurora-violet/15 text-soft-lilac/60 group-hover:text-champagne-pearl'
                    }
                  `}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE LAYOUT (md:hidden) — Clean vertical feed, NO desktop FLIP/dimming interaction, NO horizontal scrolling ── */}
      <div className="flex flex-col gap-6 max-w-md mx-auto w-full md:hidden relative z-10">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="relative w-full aspect-[3/4.2] min-h-[500px] rounded-sm overflow-hidden shadow-2xl"
          >
            {/* Background stamp asset */}
            <img
              src="/assets/culturalAssets/stamp-card-portrait.jpg"
              alt=""
              aria-hidden="true"
              draggable="false"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
            />

            {/* Top Jaali Header: Category & Denomination */}
            <div
              className="absolute left-0 right-0 flex items-center justify-between px-5 pointer-events-none"
              style={{ top: '4%', height: '14%' }}
            >
              <div className="flex items-center gap-2">
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-soft-lilac bg-deep-plum/85 px-2.5 py-1 rounded border border-aurora-violet/30 font-semibold shadow-sm">
                  {event.category}
                </span>
                <span className="font-fraunces italic text-deep-plum/60 text-xs font-semibold">
                  {event.denomination}
                </span>
              </div>
            </div>

            {/* Middle Parchment Content Zone */}
            <div
              className="absolute left-0 right-0 flex flex-col items-center justify-center text-center px-6 py-2"
              style={{ top: '24%', height: '52%' }}
            >
              <h3 className="font-accent font-extrabold text-deep-plum leading-tight text-xl xs:text-2xl line-clamp-2">
                {event.title}
              </h3>
              <p className="font-baloo-devanagari font-bold text-aurora-violet text-sm xs:text-base mt-0.5 leading-none">
                {event.devanagari}
              </p>

              <div className="w-14 h-px bg-deep-plum/15 my-2" />

              <p className="font-sans text-deep-plum/70 text-xs xs:text-[13px] leading-relaxed line-clamp-3 xs:line-clamp-4 max-w-xs px-2">
                {event.description}
              </p>

              {/* 3 Clean, legible micro-chips */}
              <div className="grid grid-cols-3 gap-1.5 xs:gap-2 w-full max-w-xs mt-2.5">
                <div className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-deep-plum/[0.04] border border-deep-plum/10 text-center">
                  <span className="font-sans text-[7px] xs:text-[8px] uppercase tracking-wider text-deep-plum/50 font-semibold">Date & Time</span>
                  <span className="font-accent font-bold text-deep-plum text-[10px] xs:text-[11px] leading-tight mt-0.5">{event.date}</span>
                </div>
                <div className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-deep-plum/[0.04] border border-deep-plum/10 text-center">
                  <span className="font-sans text-[7px] xs:text-[8px] uppercase tracking-wider text-deep-plum/50 font-semibold">Venue</span>
                  <span className="font-accent font-bold text-deep-plum text-[10px] xs:text-[11px] leading-tight mt-0.5">{event.venue}</span>
                </div>
                <div className="flex flex-col items-center justify-center py-1.5 px-1 rounded bg-deep-plum/[0.04] border border-deep-plum/10 text-center">
                  <span className="font-sans text-[7px] xs:text-[8px] uppercase tracking-wider text-deep-plum/50 font-semibold">Format</span>
                  <span className="font-accent font-bold text-deep-plum text-[10px] xs:text-[11px] leading-tight mt-0.5">{event.format}</span>
                </div>
              </div>

              {event.rulesLink && (
                <a
                  href={event.rulesLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-accent font-bold text-[11px] uppercase tracking-wider text-aurora-violet hover:text-deep-plum transition-colors underline-offset-2 hover:underline mt-2 block"
                >
                  Rulebook & Guidelines →
                </a>
              )}
            </div>

            {/* Bottom Dark Banner: CTA cleanly housed in dark container */}
            <div
              className="absolute left-0 right-0 flex items-center justify-center px-6"
              style={{ top: '78%', height: '18%' }}
            >
              <StampBurst>
                <button
                  type="button"
                  className="
                    w-full max-w-[220px] py-2.5 px-6
                    bg-aurora-violet hover:bg-soft-lilac text-midnight-indigo
                    font-accent font-bold text-xs xs:text-sm uppercase tracking-[0.18em]
                    rounded shadow-[0_4px_16px_rgba(138,92,255,0.4)]
                    border border-champagne-pearl/30
                    transition-all duration-200 active:scale-95 cursor-pointer text-center
                  "
                >
                  REGISTER NOW
                </button>
              </StampBurst>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP LAYOUT (hidden md:block) — Stamp Sheet Grid with FLIP expand ── */}
      <div className="max-w-7xl mx-auto relative z-10 hidden md:block">
        <AnimatePresence mode="sync">
          {expandedId ? (
            /* Expanded state — show expanded card full-width + rest dimmed below */
            <div className="space-y-6">
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

              {/* Remaining dimmed tiles in category row below */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {filteredEvents
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
            /* Collapsed state — filtered category stamp sheet grid */
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {filteredEvents.map((event) => (
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
