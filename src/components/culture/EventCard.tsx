import type React from 'react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import type { CultureEvent } from './cultureData';
import { StampCTA } from './StampCTA';

interface EventCardProps {
  key?: React.Key;
  event: CultureEvent;
  isExpanded: boolean;
  onToggle: () => void;
  isDimmed: boolean;
}

// Note: `key` is passed by the parent as a React special prop — it must NOT
// appear in this interface. TypeScript handles it externally.

// Scalloped stamp border via CSS mask — repeating radial gradient creates
// perforated notches on all four edges. This is the tile-level shape.
const STAMP_MASK = `
  radial-gradient(circle at 0% 8px, transparent 5px, white 5px) left / 100% 16px repeat-y,
  radial-gradient(circle at 100% 8px, transparent 5px, white 5px) right / 100% 16px repeat-y,
  radial-gradient(circle at 8px 0%, transparent 5px, white 5px) top / 16px 100% repeat-x,
  radial-gradient(circle at 8px 100%, transparent 5px, white 5px) bottom / 16px 100% repeat-x
`;

export function EventCard({ event, isExpanded, onToggle, isDimmed }: EventCardProps) {
  return (
    <motion.div
      layout
      transition={{ type: 'spring', bounce: 0.18, duration: 0.55 }}
      style={{
        // Scalloped stamp mask on the tile
        WebkitMaskImage: isExpanded ? 'none' : STAMP_MASK,
        maskImage: isExpanded ? 'none' : STAMP_MASK,
        WebkitMaskComposite: 'destination-in',
        maskComposite: 'intersect',
      }}
      className={`
        relative w-full cursor-pointer text-left
        transition-all duration-300
        ${isExpanded
          ? 'col-span-2 row-span-2 bg-deep-plum border border-aurora-violet/50 shadow-[0_0_40px_rgba(138,92,255,0.25)]'
          : `bg-midnight-indigo border border-aurora-violet/20
             ${isDimmed ? 'opacity-30 blur-[2px] pointer-events-none' : 'opacity-100 hover:border-aurora-violet/60 hover:shadow-[0_4px_20px_rgba(138,92,255,0.2)] hover:-translate-y-1'}
          `
        }
      `}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
    >
      {/* ── Collapsed tile view ── */}
      {!isExpanded && (
        <div className="p-5 flex flex-col h-full min-h-[200px]">
          {/* Top strip: category label */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-aurora-violet/70 font-medium"
            >
              {event.category}
            </span>
            {/* Denomination — stamp value, top right */}
            <span
              className="font-fraunces italic text-champagne-pearl/50 text-xs"
            >
              {event.denomination}
            </span>
          </div>

          {/* Thin ornamental rule */}
          <div className="w-full h-px bg-aurora-violet/15 mb-4" />

          {/* Event name — Baloo 2 */}
          <h3 className="font-accent font-extrabold text-champagne-pearl leading-tight text-xl mb-1">
            {event.title}
          </h3>

          {/* Devanagari name — below, Aurora Violet */}
          <p className="font-baloo-devanagari font-bold text-aurora-violet text-sm mb-3">
            {event.devanagari}
          </p>

          {/* Teaser */}
          <p className="font-sans text-silver/60 text-xs leading-relaxed flex-1">
            {event.teaser}
          </p>

          {/* Bottom stamp detail strip */}
          <div className="mt-4 pt-3 border-t border-aurora-violet/10 flex items-center justify-between">
            <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-silver/30">
              Falak '26
            </span>
            {/* Tiny postmark circle */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="#C0C0C0" strokeWidth="0.6" strokeOpacity="0.3" />
              <line x1="2" y1="9" x2="16" y2="9" stroke="#C0C0C0" strokeWidth="0.5" strokeOpacity="0.3" />
              <line x1="9" y1="2" x2="9" y2="16" stroke="#C0C0C0" strokeWidth="0.5" strokeOpacity="0.3" />
            </svg>
          </div>
        </div>
      )}

      {/* ── Expanded detail view ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle carpet-weave texture in expanded area */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04] rounded-sm"
              style={{
                backgroundImage: `
                  linear-gradient(0deg, rgba(138,92,255,0.6) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(138,92,255,0.6) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Header row */}
            <div className="flex items-start justify-between gap-6 mb-2 relative z-10">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-aurora-violet/60 font-medium block mb-2">
                  {event.category} · {event.denomination}
                </span>
                <h3 className="font-accent font-extrabold text-champagne-pearl text-4xl md:text-5xl leading-none mb-1">
                  {event.title}
                </h3>
                <p className="font-baloo-devanagari font-bold text-aurora-violet text-2xl">
                  {event.devanagari}
                </p>
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className="
                  shrink-0 flex items-center justify-center w-10 h-10 rounded-full
                  border border-aurora-violet/40
                  text-silver/60 hover:text-champagne-pearl hover:border-aurora-violet
                  transition-colors duration-200
                "
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="1" y1="1" x2="13" y2="13" />
                  <line x1="13" y1="1" x2="1" y2="13" />
                </svg>
              </button>
            </div>

            {/* Ornamental divider */}
            <div className="flex items-center gap-3 my-6 relative z-10">
              <div className="flex-1 h-px bg-aurora-violet/20" />
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="#8A5CFF" strokeWidth="0.7" strokeOpacity="0.5" />
                <circle cx="8" cy="8" r="3" stroke="#8A5CFF" strokeWidth="0.4" strokeOpacity="0.4" />
                <circle cx="8" cy="8" r="1" fill="#8A5CFF" fillOpacity="0.5" />
              </svg>
              <div className="flex-1 h-px bg-aurora-violet/20" />
            </div>

            {/* Description */}
            <p className="font-sans text-silver/80 text-base leading-relaxed mb-8 max-w-2xl relative z-10">
              {event.description}
            </p>

            {/* Metadata chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 relative z-10">
              {/* Date */}
              <div className="flex flex-col gap-1 p-4 bg-midnight-indigo/60 border border-aurora-violet/20 rounded-sm">
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-aurora-violet/60">Date & Time</span>
                <span className="font-accent font-bold text-champagne-pearl text-sm">{event.date}</span>
              </div>
              {/* Venue */}
              <div className="flex flex-col gap-1 p-4 bg-midnight-indigo/60 border border-aurora-violet/20 rounded-sm">
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-aurora-violet/60">Venue</span>
                <span className="font-accent font-bold text-champagne-pearl text-sm">{event.venue}</span>
              </div>
              {/* Format */}
              <div className="flex flex-col gap-1 p-4 bg-midnight-indigo/60 border border-aurora-violet/20 rounded-sm">
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-aurora-violet/60">Format</span>
                <span className="font-accent font-bold text-champagne-pearl text-sm">{event.format}</span>
              </div>
            </div>

            {/* Actions row — distinct Stamp CTA (not tile-as-button) */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-aurora-violet/20 relative z-10">
              <StampCTA label="REGISTER NOW" href="#" />

              {event.rulesLink && (
                <a
                  href={event.rulesLink}
                  onClick={(e) => e.stopPropagation()}
                  className="font-accent font-bold text-sm uppercase tracking-[0.12em] text-soft-lilac/70 hover:text-aurora-violet transition-colors duration-200 underline-offset-4 hover:underline"
                >
                  Rulebook →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
