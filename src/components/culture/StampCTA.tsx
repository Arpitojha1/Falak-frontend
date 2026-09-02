import { useState } from 'react';
import type React from 'react';
import { StampBurst } from './StampBurst';

interface StampCTAProps {
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  /** Placeholder image shown in the left stub photo slot.
   *  Accepts a URL string from public/. Defaults to ref_c-17 (stage-lit performer).
   *  TODO: replace with real per-event photography once available. */
  placeholderImg?: string;
}

export function StampCTA({
  label = 'REGISTER',
  href,
  onClick,
  placeholderImg = '/assets/reference/cultural/ref_c-17.jpg',
}: StampCTAProps) {
  const [hovered, setHovered] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onClick?.(e);
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
  }

  return (
    <StampBurst>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={label}
        className="
          relative inline-flex items-stretch
          cursor-pointer select-none
          overflow-hidden
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-aurora-violet
        "
        style={{
          /* Exact aspect ratio of stamp-card.png: ~1520×570 ≈ 8:3 */
          /* We drive width from the parent and let height follow. */
          width: '340px',
          height: '128px',
        }}
      >
        {/* ── LAYER 0: Real stamp-card.png asset as the base ────────────────── */}
        {/* Crackle texture and border are baked into the PNG — not re-applied in code. */}
        <img
          src="/assets/culturalAssets/stamp-card.png"
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />

        {/* ── LAYER 1: Hover colour-tint overlay ────────────────────────────── */}
        {/* Because the asset has a baked-in champagne fill (not a transparent outline),
            we apply a colour overlay with mix-blend-mode: multiply.
            Default:  no overlay (Aurora Violet reads through the text + border colours in the PNG).
            Hover:    a soft Soft Lilac wash so the whole ticket lightens slightly.
            This preserves the crackle texture underneath — the overlay does NOT flatten it.  */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            backgroundColor: hovered ? 'rgba(230, 223, 246, 0.28)' : 'rgba(138, 92, 255, 0.08)',
            mixBlendMode: 'multiply',
            transition: 'background-color 200ms ease',
          }}
        />

        {/* ── LAYER 2: Left stub — photo slot ──────────────────────────────── */}
        {/* The left ~15% of the ticket (the tearable stub) holds a small
            ID-photo-style thumbnail. This is intentionally within that zone. */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center"
          style={{
            zIndex: 2,
            /* Stub width mirrors the dashed perforation line in the PNG (~15%) */
            width: '50px',
            paddingLeft: '8px',
          }}
        >
          {/* Photo slot — placeholder, see TODO below */}
          <div
            className="relative overflow-hidden"
            style={{
              width: '36px',
              height: '44px',
              borderRadius: '3px',
              /* Thin Champagne Pearl border so thumbnail doesn't merge into ticket border */
              border: '1.5px solid rgba(237, 228, 211, 0.7)',
              flexShrink: 0,
            }}
          >
            {/* TODO: Replace with real per-event photography.
                Currently using reference/cultural/ images as stand-ins.
                ref_c-2 (chaiwala duotone), ref_c-4 (dancer portrait),
                ref_c-16 (dancer stencil), ref_c-17 (performer, stage-lit) */}
            <img
              src={placeholderImg}
              alt="Event preview"
              draggable="false"
              className="w-full h-full object-cover pointer-events-none select-none"
              style={{
                /* ── Default state: duotone (Deep Plum shadows, Champagne Pearl highlights).
                   grayscale(1) desaturates; sepia pushes warm tones;
                   hue-rotate shifts to plum; contrast boosts tonal separation.
                   Result reads as a printed/processed photo, not a raw image. ── */
                filter: hovered
                  ? /* Hover: halftone effect step — raise contrast sharply so dots
                       interact with tonal structure rather than sitting on unchanged photo.
                       The dot overlay (Layer 3) provides the visible halftone pattern. */
                    'grayscale(1) sepia(0.4) hue-rotate(220deg) contrast(1.6) brightness(0.9)'
                  : /* Default: duotone — desaturate, warm sepia tone, hue-shift to plum, mild contrast boost */
                    'grayscale(1) sepia(0.5) hue-rotate(220deg) contrast(1.25) brightness(0.95)',
                transition: 'filter 200ms ease',
              }}
            />

            {/* ── LAYER 3: Halftone dot overlay ─────────────────────────────────
                Applied ONLY to the photo slot, not the ticket frame (see direction doc rule).
                Default: opacity 0 (invisible — duotone-only state).
                Hover:   opacity 1 — repeating dot grid fades in over the image.
                This is a CSS repeating-radial-gradient pattern, not a separate component.
                The dots are Aurora Violet at low opacity so they integrate with the
                plum-shifted duotone rather than sitting as pure black dots on top.
                NOTE: halftone on this thumbnail is correct per spec.
                      halftone on the stamp-card.png frame itself is explicitly forbidden. ── */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(138, 92, 255, 0.55) 1.5px, transparent 1.5px)',
                backgroundSize: '4px 4px',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 200ms ease',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        </div>

        {/* ── LAYER 2 (cont.): Main text zone ──────────────────────────────── */}
        <div
          className="relative flex-1 flex items-center px-5"
          style={{ zIndex: 2 }}
        >
          <span
            className="font-accent font-bold uppercase tracking-[0.15em]"
            style={{
              fontSize: '0.9rem',
              color: hovered ? '#1C0B46' : '#1C0B46',
              /* Deep Plum on both states — the ticket's champagne background gives
                 enough contrast. On hover, the lilac overlay darkens slightly,
                 Deep Plum remains legible. */
              transition: 'color 200ms ease',
            }}
          >
            {label}
          </span>
        </div>

        {/* ── LAYER 2 (cont.): Right denomination / postmark zone ─────────── */}
        <div
          className="relative flex-shrink-0 flex flex-col items-center justify-center pr-5 pl-2"
          style={{ zIndex: 2 }}
        >
          {/* Postmark circle — decorative, matches the asset's ornamental language */}
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <circle cx="14" cy="14" r="11" stroke="#1C0B46" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="3" y1="14" x2="25" y2="14" stroke="#1C0B46" strokeWidth="0.6" strokeOpacity="0.25" />
          </svg>
        </div>
      </button>
    </StampBurst>
  );
}
