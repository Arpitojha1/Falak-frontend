/**
 * CultureHalftoneOverlay.tsx — Falak '26 Convergence Hero
 * ─────────────────────────────────────────────────────────────────────────────
 * SVG treatment overlay for the Culture circle (Floral.png).
 *
 * Visual language: duotone risograph, halftone dot print, festival evening glow.
 * Stays strictly within the Culture locked palette:
 *   Aurora Violet #8A5CFF · Deep Plum #1C0B46 · Soft Lilac #E6DFF6
 *   Champagne Pearl #EDE4D3 · Silver #C0C0C0
 *
 * Layers (bottom → top):
 *   1. Deep-Plum color wash — mix-blend-mode: color  → maps image hues to plum
 *   2. SVG <pattern> halftone dots (Aurora Violet) — mix-blend-mode: multiply
 *   3. Champagne-Pearl radial highlight (top) — mix-blend-mode: screen
 *   4. Aurora-Violet vignette rim — mix-blend-mode: screen
 *   5. Soft-Lilac dashed rim stroke (static, no animation)
 *
 * Duotone approach rationale
 *   A true SVG feComponentTransfer duotone requires the source image to be
 *   embedded via <image> or feImage inside the filter — not possible on a
 *   CSS background-image without a canvas intermediary.
 *   Instead, we use a color-blend rect (Deep Plum at "color" blend mode),
 *   which maps every hue in the underlying image to the plum tone while
 *   preserving luminance — achieving the same shadow-plum → highlight-lilac
 *   duotone look without per-frame JS or a canvas element.
 *
 * All blends run on the GPU via mix-blend-mode (no per-frame JS).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import styles from './heroCircles.module.css';

export function CultureHalftoneOverlay() {
  return (
    <svg
      className={styles.rimSvg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/*
          ── Halftone dot pattern ─────────────────────────────────────────────
          A 4×4 cell with a 1px-radius dot.
          Dot area / cell area ≈ π(1)²/16 ≈ ~20% fill density.
          Aurora Violet (#8A5CFF) composited with multiply creates the
          characteristic halftone shadow in darker image areas — lighter areas
          have less ink density visible through the blend.
        */}
        <pattern
          id="culture-halftone"
          x="0" y="0"
          width="4" height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#8A5CFF" />
        </pattern>

        {/* Clip path — keeps all overlays inside the circle boundary */}
        <clipPath id="culture-clip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      {/*
        ── Layer 1: Deep-Plum color wash — mix-blend-mode: color ──────────
        "color" blend mode replaces hue + saturation of the underlying image
        with those of the blend color (Deep Plum), while preserving the
        image's luminance. This is the duotone engine:
          dark image pixels → Dark Plum (#1C0B46)
          light image pixels → Soft Lilac (Plum hue + high luminance ≈ #E6DFF6)
        Opacity 0.55 leaves enough original texture visible for the floral
        detail to read through.
      */}
      <rect
        x="0" y="0" width="100" height="100"
        fill="#1C0B46"
        clipPath="url(#culture-clip)"
        style={{ mixBlendMode: 'color' }}
        opacity="0.55"
      />

      {/*
        ── Layer 2: Halftone dot grid — mix-blend-mode: multiply ───────────
        Aurora Violet dots at 30% opacity — multiply means they only
        darken; light areas of the image remain unaffected, dark areas
        pick up the violet halftone characteristic of risograph printing.
      */}
      <rect
        x="0" y="0" width="100" height="100"
        fill="url(#culture-halftone)"
        clipPath="url(#culture-clip)"
        style={{ mixBlendMode: 'multiply' }}
        opacity="0.30"
      />

      {/*
        ── Layer 3: Champagne-Pearl radial highlight — mix-blend-mode: screen
        Offset to the upper-centre to simulate festival lighting from above.
        Screen blend means it only brightens — no hue pollution.
      */}
      <radialGradient id="culture-highlight" cx="50%" cy="30%" r="60%">
        <stop offset="0%"   stopColor="#EDE4D3" stopOpacity="0.20" />
        <stop offset="100%" stopColor="#EDE4D3" stopOpacity="0" />
      </radialGradient>
      <circle
        cx="50" cy="50" r="50"
        fill="url(#culture-highlight)"
        clipPath="url(#culture-clip)"
        style={{ mixBlendMode: 'screen' }}
      />

      {/*
        ── Layer 4: Aurora-Violet vignette rim — mix-blend-mode: screen ────
        Pulls the eye toward the centre, frames the circle as a glowing
        festival lantern from the inside edge. Gentle: 0% opacity at 65%
        radius, rising to 35% at the full rim.
      */}
      <radialGradient id="culture-rim" cx="50%" cy="50%" r="50%">
        <stop offset="65%" stopColor="#8A5CFF" stopOpacity="0" />
        <stop offset="100%" stopColor="#8A5CFF" stopOpacity="0.35" />
      </radialGradient>
      <circle
        cx="50" cy="50" r="50"
        fill="url(#culture-rim)"
        clipPath="url(#culture-clip)"
        style={{ mixBlendMode: 'screen' }}
      />

      {/*
        ── Layer 5: Soft-Lilac dashed rim stroke (static, no animation) ────
        A gentle dashed ring — the culture treatment deliberately avoids
        the animated torn-edge of Sports. Instead it reads as a delicate
        perforated ticket stub border (consistent with the EventCard system).
        strokeDasharray "6 3" = 6px on, 3px off → even, refined rhythm.
      */}
      <circle
        cx="50" cy="50" r="49"
        fill="none"
        stroke="#E6DFF6"
        strokeWidth="0.8"
        strokeDasharray="6 3"
        opacity="0.40"
      />
    </svg>
  );
}
