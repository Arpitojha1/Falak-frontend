/**
 * SportsGrungeOverlay.tsx — Falak '26 Convergence Hero
 * ─────────────────────────────────────────────────────────────────────────────
 * SVG treatment overlay for the Sports circle (Basketball.png).
 *
 * Visual language: screen-print poster texture, grunge distress, torn edge.
 * Stays strictly within the Sports locked palette:
 *   Electric Orange #FF6A00 · Acid Lime #C6FF00 · Cobalt Blue #0057FF
 *   Midnight Indigo #0B0F2B · Silver #C0C0C0
 *
 * Layers (bottom → top):
 *   1. feTurbulence fractal noise grain — mix-blend-mode: overlay
 *   2. Electric-Orange tint wash — mix-blend-mode: multiply
 *   3. Acid-Lime edge radial glow — mix-blend-mode: screen
 *   4. Rim dash stroke (animated crawl via CSS rimCrawl keyframe) — torn edge
 *   5. Cobalt-Blue secondary rim dash (slower, reverse) — secondary texture
 *
 * The SVG filter is defined inline here — no external filter file needed.
 * All blends run on the GPU via mix-blend-mode (no per-frame JS).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import styles from './heroCircles.module.css';

export function SportsGrungeOverlay() {
  return (
    <svg
      className={styles.rimSvg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/* ── Filter 1: fractal noise grain ─────────────────────────────── */}
        <filter id="sports-grain" x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB">
          {/*
            feTurbulence generates the base noise texture.
            baseFrequency 0.65 → medium-coarse grain (not too fine, not too blocky).
            numOctaves 4 → richer, more layered distressed texture.
          */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="4"
            stitchTiles="stitch"
            result="noise"
          />
          {/*
            feColorMatrix: collapse to a low-alpha greyscale mask.
            The overlay blend mode then adds this as grain on top of the image.
          */}
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    1 0 0 0 0
                    1 0 0 0 0
                    0 0 0 0.22 0"
            result="grainMask"
          />
        </filter>

        {/* ── Filter 2: Electric-Orange tint ────────────────────────────── */}
        <filter id="sports-tint" x="0%" y="0%" width="100%" height="100%">
          <feFlood floodColor="#FF6A00" floodOpacity="0.18" result="tint" />
          <feComposite in="tint" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Clip path — keeps all overlays inside the circle boundary */}
        <clipPath id="sports-clip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      {/* ── Layer 1: Grain wash — mix-blend-mode: overlay ───────────────── */}
      <rect
        x="0" y="0" width="100" height="100"
        filter="url(#sports-grain)"
        clipPath="url(#sports-clip)"
        style={{ mixBlendMode: 'overlay' }}
        opacity="1"
      />

      {/* ── Layer 2: Orange tint wash — mix-blend-mode: multiply ────────── */}
      <rect
        x="0" y="0" width="100" height="100"
        filter="url(#sports-tint)"
        clipPath="url(#sports-clip)"
        style={{ mixBlendMode: 'multiply' }}
        opacity="0.6"
      />

      {/* ── Layer 3: Acid-Lime radial edge glow — mix-blend-mode: screen ── */}
      <radialGradient id="sports-edge-lime" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stopColor="#C6FF00" stopOpacity="0" />
        <stop offset="100%" stopColor="#C6FF00" stopOpacity="0.15" />
      </radialGradient>
      <circle
        cx="50" cy="50" r="50"
        fill="url(#sports-edge-lime)"
        style={{ mixBlendMode: 'screen' }}
      />

      {/*
        ── Layer 4: Primary rim dash — Electric Orange, animated crawl ────
        stroke-dasharray "3 1 6 2 2 3 8 1" creates the irregular gap pattern
        that reads as a hand-torn or scratchy screen-print edge.
        The rimCrawl CSS animation makes the dashes rotate around the rim.
        r="49" keeps the stroke just inside the circle edge.
      */}
      <circle
        className={styles.rimDash}
        cx="50"
        cy="50"
        r="49"
        fill="none"
        stroke="#FF6A00"
        strokeWidth="1.5"
        strokeDasharray="3 1 6 2 2 3 8 1"
        strokeLinecap="round"
        opacity="0.7"
      />

      {/*
        ── Layer 5: Secondary rim dash — Cobalt Blue, reverse direction ───
        A second, thinner ring running in the opposite direction creates
        the multi-layered ink-bleed texture of offset printing.
      */}
      <circle
        className={styles.rimDash}
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="#0057FF"
        strokeWidth="0.8"
        strokeDasharray="1 8 2 12"
        strokeLinecap="round"
        opacity="0.35"
        style={{ animationDuration: '28s', animationDirection: 'reverse' }}
      />
    </svg>
  );
}
