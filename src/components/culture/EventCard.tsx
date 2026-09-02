import { useState, useEffect } from 'react';
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

// Note: `key` is a React special prop — not destructured, handled externally.

export function EventCard({ event, isExpanded, onToggle, isDimmed }: EventCardProps) {
  const [hovered, setHovered] = useState(false);

  // Clear hover state on expand — halftone should not persist through the transition
  useEffect(() => {
    if (isExpanded) setHovered(false);
  }, [isExpanded]);

  return (
    <motion.div
      layout
      className={`
        relative w-full text-left overflow-hidden
        transition-opacity transition-[filter] duration-300
        ${isExpanded
          ? 'cursor-default'
          : isDimmed
            ? 'opacity-30 blur-[2px] pointer-events-none cursor-pointer'
            : 'opacity-100 cursor-pointer hover:-translate-y-1 transition-transform duration-300'
        }
      `}
      onMouseEnter={() => { if (!isExpanded) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
      onClick={isExpanded ? undefined : onToggle}
      onKeyDown={(e) => {
        if (!isExpanded && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onToggle();
        }
      }}
      tabIndex={isExpanded ? -1 : 0}
      role={isExpanded ? undefined : 'button'}
      aria-expanded={isExpanded}
    >

      {/* ══════════════════════════════════════════════════════════════
          COLLAPSED TILE — ticket stub asset, photo slot, event info
          (visual spec unchanged from Session 3 — scope lock applies)
          ══════════════════════════════════════════════════════════════ */}
      {!isExpanded && (
        <div className="relative w-full" style={{ aspectRatio: '8 / 3', minHeight: '120px' }}>

          {/* LAYER 0 — stamp-card.png tile background.
              layoutId persists this element through the expand transition:
              Framer Motion will FLIP-animate the PNG from tile size/position
              to expanded size/position when isExpanded switches. */}
          <motion.img
            layoutId={`ticket-frame-${event.id}`}
            src="/assets/culturalAssets/stamp-card.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            style={{ objectFit: 'fill', zIndex: 0 }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
          />

          {/* LAYER 1 — hover colour-tint overlay (mix-blend multiply, champagne crackle stays visible).
              Default: faint Aurora Violet tint. Hover: Soft Lilac wash.
              Explicitly does NOT apply to the photo thumbnail on Layer 2. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              backgroundColor: hovered
                ? 'rgba(230, 223, 246, 0.22)'
                : 'rgba(138, 92, 255, 0.06)',
              mixBlendMode: 'multiply',
              transition: 'background-color 220ms ease',
            }}
          />

          {/* LAYER 2 — card content over the ticket PNG */}
          <div
            className="absolute inset-0 flex items-stretch"
            style={{ zIndex: 2 }}
          >
            {/* Left stub zone (~16% — left of the dashed perf line in the PNG).
                Holds the ID-photo-style thumbnail. */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '16%', paddingLeft: '6px' }}
            >
              {/* TODO: Replace with real per-event photography.
                  Placeholder pool: ref_c-2 (chaiwala), ref_c-4 (dancer portrait),
                  ref_c-16 (dancer stencil), ref_c-17 (performer, stage-lit). */}
              <div
                className="relative overflow-hidden flex-shrink-0"
                style={{
                  width: '38px',
                  height: '46px',
                  borderRadius: '3px',
                  border: '1.5px solid rgba(237, 228, 211, 0.75)',
                }}
              >
                {/* Default: duotone (Deep Plum + Champagne Pearl tones).
                    Hover: contrast raised to 1.6 for halftone interaction. */}
                <img
                  src={event.placeholderImg}
                  alt={`${event.title} preview`}
                  draggable="false"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  style={{
                    filter: hovered
                      ? 'grayscale(1) sepia(0.4) hue-rotate(220deg) contrast(1.6) brightness(0.88)'
                      : 'grayscale(1) sepia(0.5) hue-rotate(220deg) contrast(1.25) brightness(0.95)',
                    transition: 'filter 220ms ease',
                  }}
                />

                {/* Halftone dot overlay — photo only, NEVER the stamp-card.png frame.
                    Fade in on hover, 220ms, Aurora Violet dots with multiply blend. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(138, 92, 255, 0.55) 1.5px, transparent 1.5px)',
                    backgroundSize: '4px 4px',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 220ms ease',
                    mixBlendMode: 'multiply',
                  }}
                />
              </div>
            </div>

            {/* Main text zone — right of perforation line */}
            <div className="flex-1 flex flex-col justify-center px-3 py-2 min-w-0">
              <div className="flex items-center justify-between mb-1 gap-1">
                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-deep-plum/60 font-semibold truncate">
                  {event.category}
                </span>
                <span className="font-fraunces italic text-deep-plum/40 text-[9px] flex-shrink-0">
                  {event.denomination}
                </span>
              </div>
              <div className="w-full h-px bg-deep-plum/10 mb-2" />
              <h3 className="font-accent font-extrabold text-deep-plum leading-tight text-sm mb-0.5 truncate">
                {event.title}
              </h3>
              <p className="font-baloo-devanagari font-bold text-aurora-violet/80 text-xs mb-1 truncate">
                {event.devanagari}
              </p>
              <p className="font-sans text-deep-plum/50 text-[9px] leading-snug line-clamp-2">
                {event.teaser}
              </p>
            </div>

            {/* Right margin — filigree corner zone, kept clear of text */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-end pb-2 pr-2"
              style={{ width: '10%' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6" stroke="#1C0B46" strokeWidth="0.6" strokeOpacity="0.25" />
                <line x1="2" y1="8" x2="14" y2="8" stroke="#1C0B46" strokeWidth="0.5" strokeOpacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          EXPANDED VIEW — same stamp-card.png persists via layoutId,
          content redistributes into the scaled-up frame.
          Text uses Deep Plum / Aurora Violet on the champagne PNG base.
          ══════════════════════════════════════════════════════════════ */}
      {isExpanded && (
        <div
          className="relative w-full"
          style={{ minHeight: '420px' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* LAYER 0 — same PNG, same layoutId.
              Framer Motion animates this element from the tile's screen rect
              to the expanded screen rect — the crackle/border/filigree scale up
              as one continuous element, no crossfade to a different background.
              objectFit: fill stretches the PNG to the new container shape;
              the flat champagne interior stretches cleanly, borders stretch subtly. */}
          <motion.img
            layoutId={`ticket-frame-${event.id}`}
            src="/assets/culturalAssets/stamp-card.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            style={{ objectFit: 'fill', zIndex: 0 }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
          />

          {/* LAYER 1 — subtle tint wash in expanded state (not hover-driven).
              Soft Lilac at very low opacity to visually indicate "selected" state.
              Still uses multiply so crackle texture is preserved. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              zIndex: 1,
              backgroundColor: 'rgba(230, 223, 246, 0.12)',
              mixBlendMode: 'multiply',
            }}
          />

          {/* LAYER 2 — expanded content.
              Staggered fade-in with delay so it appears after the layout animation
              completes (300ms spring). Content doesn't pop before the frame finishes growing. */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.2 }}
            className="absolute inset-0 flex items-stretch"
            style={{ zIndex: 2 }}
          >
            {/* Left stub zone (~14%) — denomination + branding, rotated vertically.
                Mirrors the tile's stub zone. The dashed perf line in the PNG acts
                as a natural visual boundary here at full scale. */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-center gap-3 py-6"
              style={{ width: '14%' }}
            >
              <span
                className="font-fraunces italic text-deep-plum/35 text-xs tracking-[0.18em]"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                FALAK&apos;26
              </span>
              <span className="font-sans text-deep-plum/25 text-[10px] font-medium">
                {event.denomination}
              </span>
              {/* Postmark circle — decorative, echoing tile */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="#1C0B46" strokeWidth="0.7" strokeOpacity="0.2" />
                <line x1="3" y1="12" x2="21" y2="12" stroke="#1C0B46" strokeWidth="0.5" strokeOpacity="0.18" />
                <line x1="12" y1="3" x2="12" y2="21" stroke="#1C0B46" strokeWidth="0.5" strokeOpacity="0.18" />
              </svg>
            </div>

            {/* Thin vertical rule echoing the perf line — separates stub from content */}
            <div className="flex-shrink-0 w-px bg-deep-plum/8 self-stretch my-6" />

            {/* Main content zone (~56%) — event detail content on the champagne base */}
            <div className="flex-1 flex flex-col py-6 pl-6 pr-4 min-w-0">
              {/* Top: category label + close button */}
              <div className="flex items-start justify-between mb-3">
                <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-aurora-violet font-semibold">
                  {event.category}
                </span>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onToggle(); }}
                  className="
                    shrink-0 flex items-center justify-center w-8 h-8 rounded-full
                    border border-deep-plum/20 text-deep-plum/40
                    hover:text-deep-plum hover:border-deep-plum/50
                    transition-colors duration-200
                  "
                  aria-label="Close event detail"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="1" y1="1" x2="9" y2="9" />
                    <line x1="9" y1="1" x2="1" y2="9" />
                  </svg>
                </button>
              </div>

              {/* Title — Deep Plum on champagne, large. */}
              <h3
                className="font-accent font-extrabold text-deep-plum leading-none mb-1"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)' }}
              >
                {event.title}
              </h3>
              <p className="font-baloo-devanagari font-bold text-aurora-violet text-xl mb-3">
                {event.devanagari}
              </p>

              {/* Thin ornamental rule */}
              <div className="w-full h-px bg-deep-plum/10 mb-4" />

              {/* Description */}
              <p className="font-sans text-deep-plum/65 text-sm leading-relaxed mb-5 flex-1 overflow-hidden"
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical' as React.CSSProperties['WebkitBoxOrient'],
                  overflow: 'hidden',
                }}
              >
                {event.description}
              </p>

              {/* Metadata row — three inline chips, Deep Plum text on champagne base */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Date & Time', value: event.date },
                  { label: 'Venue', value: event.venue },
                  { label: 'Format', value: event.format },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex flex-col gap-0.5 p-3 rounded-sm"
                    style={{
                      background: 'rgba(28, 11, 70, 0.06)',
                      border: '1px solid rgba(28, 11, 70, 0.12)',
                    }}
                  >
                    <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-deep-plum/40">
                      {label}
                    </span>
                    <span className="font-accent font-bold text-deep-plum text-xs leading-snug">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Actions — Register CTA (plain reverted form) + Rulebook link.
                  Positioned near the bottom of the content zone, above the ticket baseline. */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-deep-plum/8">
                <StampCTA label="REGISTER NOW" href="#" />
                {event.rulesLink && (
                  <a
                    href={event.rulesLink}
                    onClick={(e) => e.stopPropagation()}
                    className="font-accent font-bold text-xs uppercase tracking-[0.12em] text-aurora-violet hover:text-deep-plum transition-colors duration-200 underline-offset-4 hover:underline"
                  >
                    Rulebook →
                  </a>
                )}
              </div>
            </div>

            {/* Thin vertical rule before the photo zone */}
            <div className="flex-shrink-0 w-px bg-deep-plum/8 self-stretch my-6" />

            {/* Photo zone (~22%) — placeholder image, clearly visible at expanded scale.
                Duotone treatment only — no halftone overlay (expanded = clear/focused state per spec).
                TODO: Replace with real per-event photography before launch. */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '22%', padding: '24px 20px 24px 16px' }}
            >
              <div
                className="relative overflow-hidden w-full h-full"
                style={{
                  borderRadius: '3px',
                  border: '1.5px solid rgba(237, 228, 211, 0.8)',
                  maxHeight: '280px',
                }}
              >
                <img
                  src={event.placeholderImg}
                  alt={`${event.title} preview — placeholder pending real event photography`}
                  draggable="false"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  style={{
                    /* Duotone — plum-shifted, same default treatment as the collapsed tile.
                       No halftone on the expanded state — this is the "clear" view. */
                    filter: 'grayscale(1) sepia(0.5) hue-rotate(220deg) contrast(1.25) brightness(0.95)',
                  }}
                />
              </div>
            </div>

            {/* Right filigree margin — leaves the PNG's ornamental corner brackets clear */}
            <div className="flex-shrink-0" style={{ width: '3%' }} />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
