import { useState } from 'react';
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

// Note: `key` is a React special prop — not destructured, handled externally by React.

export function EventCard({ event, isExpanded, onToggle, isDimmed }: EventCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      transition={{ type: 'spring', bounce: 0.18, duration: 0.55 }}
      className={`
        relative w-full cursor-pointer text-left overflow-hidden
        transition-all duration-300
        ${isExpanded
          ? 'col-span-2 row-span-2 bg-deep-plum border border-aurora-violet/50 shadow-[0_0_40px_rgba(138,92,255,0.25)]'
          : isDimmed
            ? 'opacity-30 blur-[2px] pointer-events-none'
            : 'opacity-100 hover:-translate-y-1'
        }
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
    >
      {/* ══════════════════════════════════════════════════════════════
          COLLAPSED TILE — Ticket Stub frame + content + photo slot
          ══════════════════════════════════════════════════════════════ */}
      {!isExpanded && (
        <div className="relative w-full" style={{ aspectRatio: '8 / 3', minHeight: '120px' }}>

          {/* ── LAYER 0: stamp-card.png as the tile background ────────────
              Crackle texture + double border + filigree corners baked into PNG.
              object-fill stretches to fill the tile's exact bounding box.
              CSS mask removed — the PNG's own border IS the frame shape now. */}
          <img
            src="/assets/culturalAssets/stamp-card.png"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
            style={{ objectFit: 'fill', zIndex: 0 }}
          />

          {/* ── LAYER 1: Hover colour-tint overlay ────────────────────────
              Baked-in champagne fill means fill-swap must be done via overlay.
              Default: faint Aurora Violet tint (ties card into the palette).
              Hover:   Soft Lilac wash — cohesive "coming into focus" signal.
              mix-blend-mode: multiply preserves the crackle texture beneath.
              NOTE: this overlay NEVER applies to the thumbnail — the thumbnail
              is a separate stacked element on Layer 2. */}
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

          {/* ── LAYER 2: Card content — floats over the ticket PNG ──────── */}
          <div
            className="absolute inset-0 flex items-stretch"
            style={{ zIndex: 2 }}
          >
            {/* Left stub zone (~16% width, left of the dashed perforation line in the PNG).
                Holds the photo slot — ID-photo "corner-mount" position.
                The dashed line in the asset sits at roughly 16% from the left edge. */}
            <div
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '16%', paddingLeft: '6px' }}
            >
              {/* ── Photo slot ────────────────────────────────────────────────
                  TODO: Replace placeholderImg with real per-event photography.
                  Currently sourced from reference/cultural/ — portrait/scene refs only:
                  ref_c-2 (chaiwala duotone), ref_c-4 (dancer portrait),
                  ref_c-16 (dancer stencil), ref_c-17 (performer, stage-lit). */}
              <div
                className="relative overflow-hidden flex-shrink-0"
                style={{
                  width: '38px',
                  height: '46px',
                  borderRadius: '3px',
                  /* Thin Champagne Pearl border — distinguishes thumbnail from card border */
                  border: '1.5px solid rgba(237, 228, 211, 0.75)',
                }}
              >
                {/* Image — default state: duotone (Deep Plum + Champagne Pearl tones).
                    grayscale → sepia → hue-rotate(220deg) shifts to a plum-violet tone.
                    Hover: contrast raised to 1.6 so halftone dots (Layer 3) interact
                    meaningfully with the tonal structure of the underlying image. */}
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

                {/* ── LAYER 3: Halftone dot overlay ──────────────────────────
                    Applied ONLY to the photo thumbnail — NEVER to the stamp-card.png frame.
                    The ticket's texture identity is the crackle pattern baked into the PNG;
                    halftone is reserved for photographic content (direction doc rule).
                    Default: opacity 0 (invisible — duotone-only state shown).
                    Hover:   opacity 1 — dot grid fades in, 220ms, same timing as filter above.
                    Aurora Violet dots at 55% opacity + multiply blend integrate with the
                    plum-shifted duotone rather than sitting as opaque dots on top. */}
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

            {/* Main text zone — right of the perforation line */}
            <div className="flex-1 flex flex-col justify-center px-3 py-2 min-w-0">
              {/* Category + denomination — top metadata strip */}
              <div className="flex items-center justify-between mb-1 gap-1">
                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-deep-plum/60 font-semibold truncate">
                  {event.category}
                </span>
                <span className="font-fraunces italic text-deep-plum/40 text-[9px] flex-shrink-0">
                  {event.denomination}
                </span>
              </div>

              {/* Thin rule */}
              <div className="w-full h-px bg-deep-plum/10 mb-2" />

              {/* Event title */}
              <h3 className="font-accent font-extrabold text-deep-plum leading-tight text-sm mb-0.5 truncate">
                {event.title}
              </h3>

              {/* Devanagari name */}
              <p className="font-baloo-devanagari font-bold text-aurora-violet/80 text-xs mb-1 truncate">
                {event.devanagari}
              </p>

              {/* Teaser — only if room */}
              <p className="font-sans text-deep-plum/50 text-[9px] leading-snug line-clamp-2">
                {event.teaser}
              </p>
            </div>

            {/* Right margin — filigree corner zone in the PNG, kept clear of text */}
            <div
              className="flex-shrink-0 flex flex-col items-center justify-end pb-2 pr-2"
              style={{ width: '10%' }}
            >
              {/* Postmark circle — decorative, matches the asset's ornamental register */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="6" stroke="#1C0B46" strokeWidth="0.6" strokeOpacity="0.25" />
                <line x1="2" y1="8" x2="14" y2="8" stroke="#1C0B46" strokeWidth="0.5" strokeOpacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          EXPANDED DETAIL VIEW — unchanged from Session 2 spec
          ══════════════════════════════════════════════════════════════ */}
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
              <div className="flex flex-col gap-1 p-4 bg-midnight-indigo/60 border border-aurora-violet/20 rounded-sm">
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-aurora-violet/60">Date & Time</span>
                <span className="font-accent font-bold text-champagne-pearl text-sm">{event.date}</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-midnight-indigo/60 border border-aurora-violet/20 rounded-sm">
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-aurora-violet/60">Venue</span>
                <span className="font-accent font-bold text-champagne-pearl text-sm">{event.venue}</span>
              </div>
              <div className="flex flex-col gap-1 p-4 bg-midnight-indigo/60 border border-aurora-violet/20 rounded-sm">
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-aurora-violet/60">Format</span>
                <span className="font-accent font-bold text-champagne-pearl text-sm">{event.format}</span>
              </div>
            </div>

            {/* Actions row — plain StampCTA (no ticket asset, no image, no halftone — per correction) */}
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
