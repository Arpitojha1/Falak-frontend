// EventCard — Torn-paper desi maximalism event card
// Street gig flyer / wheatpaste poster fragment aesthetic:
// Hazard tape, brutalist borders, hard offset shadows, high-contrast typography.
// Clean hierarchy with ZERO text collisions or overlays.

import type { CSSProperties } from 'react';
import { type FalakEvent, CATEGORY_COLORS, CATEGORY_LABELS } from '../../data/scheduleData';

interface EventCardProps {
  event: FalakEvent;
  style?: CSSProperties;
  className?: string;
  compact?: boolean;
}

// Tape rotation variants for visual variety
const TAPE_ROTATIONS = [-3, 2, -1.5, 2.5, -2, 1.5, -3, 2];
const CARD_ROTATIONS = [0, -0.4, 0.5, -0.3, 0.4, -0.5, 0.2, -0.4];

export function EventCard({ event, style, className = '', compact = false }: EventCardProps) {
  const cardIndex = event.id.charCodeAt(event.id.length - 1) % 8;
  const tapeRot = TAPE_ROTATIONS[cardIndex];
  const cardRot = CARD_ROTATIONS[cardIndex];
  const categoryColor = CATEGORY_COLORS[event.category] || '#FF3D7F';
  const categoryLabel = CATEGORY_LABELS[event.category] || 'EVENT';

  if (event.isAnchor) {
    return (
      <AnchorEventBar event={event} categoryColor={categoryColor} style={style} className={className} />
    );
  }

  return (
    <div
      className={`event-card group relative ${compact ? 'pt-4 px-3 pb-3' : 'pt-5 px-4 pb-4'} rounded-none cursor-pointer transition-all duration-200 hover:-translate-y-1.5 ${className}`}
      style={{
        background: '#F3EDE2',
        border: '2.5px solid #000000',
        borderTop: `5px solid ${categoryColor}`,
        transform: `rotate(${cardRot}deg)`,
        boxShadow: `4px 4px 0px #000000, 7px 7px 0px ${categoryColor}`,
        clipPath: 'polygon(0 0, 100% 0, 100% 90%, 96% 95%, 92% 100%, 0 100%)',
        ...style,
      }}
    >
      {/* Newspaper / Halftone overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,0,0,0.4) 1px, transparent 1px)',
          backgroundSize: '10px 10px',
        }}
      />

      {/* Street Duct Tape top — positioned dead-center top, zero conflict with left category or right badges */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 px-2 py-0.5 text-[7px] font-mono font-black uppercase text-black pointer-events-none shadow-sm"
        style={{
          background: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 6px, #000 6px, #000 12px)',
          transform: `translateX(-50%) rotate(${tapeRot}deg)`,
          border: '1px solid #000',
        }}
      >
        <span className="bg-[#FFD700] text-black px-1 font-bold">FALAK &apos;26</span>
      </div>

      {/* ── Category chip & Badges row (completely unobstructed) ── */}
      <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
        <span
          className="text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded-none font-black"
          style={{
            background: categoryColor === '#C6FF00' ? '#000000' : categoryColor,
            color: categoryColor === '#C6FF00' ? '#C6FF00' : '#FFFFFF',
            border: '1.5px solid #000000',
          }}
        >
          {categoryLabel}
        </span>

        <div className="flex items-center gap-1.5">
          {event.isAllDay && (
            <span className="text-[8px] font-mono font-black uppercase tracking-wider px-1.5 py-0.5 bg-black text-[#C6FF00] border border-black shadow-xs">
              ALL DAY
            </span>
          )}
          {event.prizePool && (
            <span className="text-[9px] font-mono bg-black text-[#C6FF00] font-black px-1.5 py-0.5 border border-black shadow-xs">
              {event.prizePool}
            </span>
          )}
        </div>
      </div>

      {/* ── Event Name / Heading (Cleanly spaced, no glyph collision) ── */}
      <div
        className={`font-display uppercase leading-[1.2] text-black font-black ${compact ? 'text-base' : 'text-lg md:text-xl'} group-hover:tracking-wide transition-all duration-200 mt-1 mb-2`}
        style={{
          fontFamily: '"Anton", sans-serif',
          letterSpacing: '0.03em',
          wordBreak: 'break-word',
        }}
      >
        {event.name}
      </div>

      {/* Time + Venue */}
      {!compact && (
        <div className="mt-2.5 flex flex-col gap-1 border-t border-black/15 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-black flex-shrink-0" />
            <span className="text-xs font-mono text-black font-black uppercase tracking-wider">
              {event.startTime}–{event.endTime}
            </span>
          </div>
          <span className="text-xs font-mono text-black/90 font-bold truncate flex items-center gap-1">
            <span className="text-[#FF3D7F]">📍</span> {event.venue}
          </span>
        </div>
      )}
    </div>
  );
}

// Full-width anchor event bar (for Inauguration, DJ Set, Battle of Bands, etc.)
function AnchorEventBar({
  event,
  categoryColor,
  style,
  className,
}: {
  event: FalakEvent;
  categoryColor: string;
  style?: CSSProperties;
  className?: string;
}) {
  const isSpecial = event.category === 'special';
  const bgColor = isSpecial ? '#FF3D7F' : categoryColor;

  return (
    <div
      className={`w-full flex items-center justify-between px-5 py-4 relative overflow-hidden ${className}`}
      style={{
        background: bgColor,
        border: '3px solid #000000',
        boxShadow: '6px 6px 0px #000000',
        ...style,
      }}
    >
      {/* Scan-line street texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 5px)',
        }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <span className="w-3 h-3 bg-black animate-ping" />
        <div>
          <div
            className="text-black text-2xl md:text-3xl uppercase leading-[1.1] font-black"
            style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.02em' }}
          >
            {event.name}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-mono font-black uppercase tracking-wider bg-black text-white px-2 py-0.5">
              HEADLINER EVENT
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-end gap-1">
        <span className="text-black font-mono text-xs md:text-sm uppercase tracking-widest font-black bg-white px-2 py-0.5 border border-black">
          {event.startTime}
        </span>
        <span className="text-black font-mono text-xs font-bold flex items-center gap-1">
          📍 {event.venue}
        </span>
        {event.prizePool && (
          <span className="text-white font-mono text-xs font-black bg-black px-2 py-0.5 border border-black">
            {event.prizePool}
          </span>
        )}
      </div>
    </div>
  );
}
