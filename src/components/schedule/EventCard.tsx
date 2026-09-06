// EventCard — Torn-paper desi maximalism event card
// Represents a single event as a physical torn piece of paper with tape

import type { CSSProperties } from 'react';
import { type FalakEvent, CATEGORY_COLORS, CATEGORY_LABELS } from '../../data/scheduleData';

interface EventCardProps {
  event: FalakEvent;
  style?: CSSProperties;
  className?: string;
  compact?: boolean;
}

// Tape rotation variants for visual variety
const TAPE_ROTATIONS = [-3, 2, -1.5, 3, -2.5, 1, -4, 2.5];
const CARD_ROTATIONS = [0, -0.3, 0.4, -0.2, 0.5, -0.6, 0.2, -0.4];

export function EventCard({ event, style, className = '', compact = false }: EventCardProps) {
  const cardIndex = event.id.charCodeAt(event.id.length - 1) % 8;
  const tapeRot = TAPE_ROTATIONS[cardIndex];
  const cardRot = CARD_ROTATIONS[cardIndex];
  const categoryColor = CATEGORY_COLORS[event.category];
  const categoryLabel = CATEGORY_LABELS[event.category];

  if (event.isAnchor) {
    return (
      <AnchorEventBar event={event} categoryColor={categoryColor} style={style} className={className} />
    );
  }

  return (
    <div
      className={`event-card group relative ${compact ? 'p-2' : 'p-3'} rounded-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${className}`}
      style={{
        background: '#EDE4D3',
        borderTop: `3px solid ${categoryColor}`,
        transform: `rotate(${cardRot}deg)`,
        boxShadow: '2px 4px 12px rgba(0,0,0,0.4)',
        clipPath: 'polygon(0 0, 100% 0, 100% 88%, 97% 94%, 94% 100%, 0 100%)',
        ...style,
      }}
    >
      {/* Tape strip top */}
      <div
        className="absolute -top-2 left-3 w-8 h-3 rounded-sm pointer-events-none z-10"
        style={{
          background: 'rgba(255,255,255,0.35)',
          transform: `rotate(${tapeRot}deg)`,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
          backdropFilter: 'blur(1px)',
        }}
      />

      {/* Category chip */}
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-[9px] font-mono uppercase tracking-[0.15em] px-1.5 py-0.5 rounded-sm font-bold"
          style={{
            background: categoryColor,
            color: event.category === 'music' ? '#0B0F2B' : '#fff',
          }}
        >
          {categoryLabel}
        </span>
        {event.prizePool && (
          <span className="text-[9px] font-mono text-[#0B0F2B]/60 font-bold">
            {event.prizePool}
          </span>
        )}
      </div>

      {/* Event name */}
      <div
        className={`font-display uppercase leading-[1] text-[#0B0F2B] ${compact ? 'text-sm' : 'text-base'} group-hover:tracking-wide transition-all duration-200`}
        style={{ fontFamily: '"Anton", sans-serif' }}
      >
        {event.name}
      </div>


      {/* Time + Venue */}
      {!compact && (
        <div className="mt-2 flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <div
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: categoryColor }}
            />
            <span className="text-[10px] font-mono text-[#0B0F2B]/70 uppercase tracking-widest">
              {event.startTime}–{event.endTime}
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#0B0F2B]/60 pl-2 truncate">
            {event.venue}
          </span>
        </div>
      )}

      {/* All-day badge */}
      {event.isAllDay && (
        <div
          className="absolute top-2 right-2 text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-sm"
          style={{ background: '#0B0F2B', color: '#C6FF00' }}
        >
          ALL DAY
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

  return (
    <div
      className={`w-full flex items-center justify-between px-4 py-3 relative overflow-hidden ${className}`}
      style={{
        background: isSpecial ? '#FF3D7F' : categoryColor,
        borderLeft: '4px solid #fff',
        ...style,
      }}
    >
      {/* Scan-line texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
        }}
      />

      <div className="relative z-10">
        <div
          className="text-white text-xl md:text-2xl uppercase leading-none"
          style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '-0.01em' }}
        >
          {event.name}
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-end gap-1">
        <span className="text-white/80 font-mono text-xs uppercase tracking-widest">
          {event.startTime}
        </span>
        <span className="text-white/60 font-mono text-[10px]">{event.venue}</span>
        {event.prizePool && (
          <span className="text-white font-mono text-xs font-bold bg-black/20 px-1.5 py-0.5 rounded-sm">
            {event.prizePool}
          </span>
        )}
      </div>
    </div>
  );
}
