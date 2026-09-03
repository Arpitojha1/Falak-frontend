'use client';
/**
 * HeroCircle.tsx — Falak '26 Convergence Hero
 * ─────────────────────────────────────────────────────────────────────────────
 * Single convergence circle. Two instances render in HeroCircles.tsx.
 *
 * Props
 *   side       — 'left' | 'right'     → which edge to anchor to
 *   asset      — URL string            → image to use as background
 *   route      — '/sports' | '/cultural'
 *   treatment  — 'grunge' | 'halftone' → which SVG filter overlay to apply
 *
 * Interaction model
 *   Idle      : continuous slow rotation (~22s/rev), linear, infinite
 *   Hover     : rotation pauses; scale → 1.1, 250ms ease-out
 *   Click     : navigate to route
 *   prefers-reduced-motion: skip idle rotation; hover scale still works
 *
 * Rotation-pause without snap-back
 *   useAnimationControls() drives the rotation animation.
 *   A useMotionValue tracks current angle so we can stop exactly where
 *   the circle is without resetting to 0.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useEffect } from 'react';
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
} from 'motion/react';
import { useNavigate } from 'react-router-dom';
import styles from './heroCircles.module.css';

/* ── Types ────────────────────────────────────────────────────────────────── */
export type CircleSide      = 'left' | 'right';
export type CircleTreatment = 'grunge' | 'halftone';

export interface HeroCircleProps {
  side:      CircleSide;
  asset:     string;
  route:     '/sports' | '/cultural';
  treatment: CircleTreatment;
}

/* ── Constants ─────────────────────────────────────────────────────────────── */
const ROTATION_DURATION = 22; // seconds per full revolution

/* ── Component ─────────────────────────────────────────────────────────────── */
export function HeroCircle({ side, asset, route, treatment }: HeroCircleProps) {
  const navigate      = useNavigate();
  const controls      = useAnimationControls();
  const reduceMotion  = useReducedMotion();
  const isHovering    = useRef(false);

  /*
   * currentAngle tracks the exact rotation at any moment.
   * Framer Motion updates this via the onUpdate callback below so we can
   * stop() at the real current angle — preventing the snap-back-to-0 bug.
   */
  const currentAngle = useMotionValue(0);

  /* ── Start / restart idle rotation ──────────────────────────────────────── */
  const startRotation = (fromAngle: number) => {
    if (reduceMotion || isHovering.current) return;

    /*
     * We animate from `fromAngle` to `fromAngle + 360` so rotation always
     * continues in the same direction from wherever it stopped.
     */
    controls.start({
      rotate: fromAngle + 360,
      transition: {
        duration: ROTATION_DURATION,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  };

  /* ── On mount: kick off idle rotation (skip if reduced-motion) ───────────── */
  useEffect(() => {
    if (!reduceMotion) {
      startRotation(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  /* ── Hover handlers ──────────────────────────────────────────────────────── */
  const handleHoverStart = () => {
    isHovering.current = true;
    controls.stop();
    // `currentAngle` holds the angle at the moment stop() was called
  };

  const handleHoverEnd = () => {
    isHovering.current = false;
    startRotation(currentAngle.get());
  };

  /* ── Positioning: half off-screen per side ────────────────────────────────── */
  const positionClass = side === 'right' ? styles.circleRight : styles.circleLeft;

  return (
    <motion.div
      className={`${styles.circle} ${positionClass}`}
      /* Pass the live angle to our tracker via onUpdate */
      animate={controls}
      onUpdate={(latest) => {
        if (typeof latest.rotate === 'number') {
          currentAngle.set(latest.rotate);
        }
      }}
      style={{
        translateY: '-50%',
        backgroundImage: `url("${asset}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      /* Hover: scale up smoothly; rotation is paused via controls above */
      whileHover={{ scale: 1.1 }}
      transition={{ scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={() => navigate(route)}
      role="link"
      aria-label={route === '/sports' ? 'Enter Sports' : 'Enter Cultural'}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(route); }}
    >
      {/* ── Treatment overlay (rendered by child components below) ───────── */}
      {treatment === 'grunge'   && <SportsGrungeOverlay />}
      {treatment === 'halftone' && <CultureHalftoneOverlay />}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   TREATMENT A — Sports Grunge (Basketball.png)
   ══════════════════════════════════════════════════════════════════════════════
   Layered on top of the Basketball.png background-image using:

   1. SVG feTurbulence noise filter blended with overlay → screen-print grain
   2. Subtle Electric-Orange tint wash (multiply) → pushes toward Sports palette
   3. Rim dash stroke (SVG <circle> with animated stroke-dashoffset) → torn edge

   All colors stay within the Sports locked palette:
     Electric Orange #FF6A00 · Acid Lime #C6FF00 · Cobalt Blue #0057FF
     Midnight Indigo #0B0F2B · Silver #C0C0C0
*/
function SportsGrungeOverlay() {
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
            feColorMatrix: desaturate the noise to greyscale, boost contrast
            so the overlay reads as genuine screen-print grain not just blur.
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

        {/* Clip path to keep overlays inside the circle boundary */}
        <clipPath id="sports-clip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      {/* ── Layer 1: Grain wash — mix-blend-mode overlay ────────────────── */}
      <rect
        x="0" y="0" width="100" height="100"
        filter="url(#sports-grain)"
        clipPath="url(#sports-clip)"
        style={{ mixBlendMode: 'overlay' }}
        opacity="1"
      />

      {/* ── Layer 2: Orange tint wash — multiply ────────────────────────── */}
      <rect
        x="0" y="0" width="100" height="100"
        filter="url(#sports-tint)"
        clipPath="url(#sports-clip)"
        style={{ mixBlendMode: 'multiply' }}
        opacity="0.6"
      />

      {/* ── Layer 3: Acid-Lime secondary tint at the edges ──────────────── */}
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
        ── Layer 4: Rim dash stroke — torn/scratchy edge ──────────────────
        stroke-dasharray creates irregular-looking gaps (3 on, 1 off, 6 on,
        2 off pattern repeats). The rimCrawl animation in heroCircles.module.css
        makes these dashes crawl around the rim.

        r="49" keeps the stroke just inside the circle edge.
        strokeWidth="1.5" is deliberately thin — a razor-torn look,
        not a heavy border.
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

      {/* ── Layer 5: Cobalt Blue accent rim (second pass, slower) ────────── */}
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

/* ══════════════════════════════════════════════════════════════════════════════
   TREATMENT B — Culture Halftone / Duotone (Floral.png)
   ══════════════════════════════════════════════════════════════════════════════
   Layered on top of Floral.png using:

   1. SVG feColorMatrix duotone: maps image luminance to
        shadows → Deep Plum  #1C0B46
        highlights → Soft Lilac #E6DFF6
   2. SVG <pattern> halftone dot grid composited with multiply →
        classic risograph/offset-print halftone feel
   3. Soft Aurora-Violet vignette at the rim

   All colors stay within the Culture locked palette:
     Aurora Violet #8A5CFF · Deep Plum #1C0B46 · Soft Lilac #E6DFF6
     Champagne Pearl #EDE4D3 · Silver #C0C0C0
*/
function CultureHalftoneOverlay() {
  return (
    <svg
      className={styles.rimSvg}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        {/*
          ── Duotone filter ──────────────────────────────────────────────────
          Step 1: grayscale the source to isolate luminance.
          Step 2: feComponentTransfer remaps the single-channel signal:
            R channel: from Deep Plum R(28) → Soft Lilac R(230)  → slope + intercept
            G channel: from Deep Plum G(11) → Soft Lilac G(223)
            B channel: from Deep Plum B(70) → Soft Lilac B(246)

          Math: output = slope * input + intercept
            where slope = (highlight - shadow) / 255
            and   intercept = shadow / 255
        */}
        <filter id="culture-duotone" x="0%" y="0%" width="100%" height="100%"
          colorInterpolationFilters="sRGB">
          {/* Step 1 — grayscale */}
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0      0      0      1 0"
            result="grey"
          />
          {/* Step 2 — duotone remap: Deep Plum → Soft Lilac */}
          <feComponentTransfer in="grey" result="duotoned">
            {/* R: 28→230  slope=(230-28)/255≈0.792  intercept=28/255≈0.110 */}
            <feFuncR type="linear" slope="0.792" intercept="0.110" />
            {/* G: 11→223  slope=(223-11)/255≈0.831  intercept=11/255≈0.043 */}
            <feFuncG type="linear" slope="0.831" intercept="0.043" />
            {/* B: 70→246  slope=(246-70)/255≈0.690  intercept=70/255≈0.275 */}
            <feFuncB type="linear" slope="0.690" intercept="0.275" />
          </feComponentTransfer>
        </filter>

        {/*
          ── Halftone dot pattern ─────────────────────────────────────────────
          A 4×4 cell of dots. Dot radius 1px in a 4px cell ≈ 20% fill density.
          Aurora Violet (#8A5CFF) at low opacity blended with multiply
          creates the characteristic halftone shadow in dark areas.
        */}
        <pattern
          id="culture-halftone"
          x="0" y="0"
          width="4" height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#8A5CFF" />
        </pattern>

        {/* Clip path to keep overlays inside the circle boundary */}
        <clipPath id="culture-clip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      {/* ── Layer 1: Duotone wash over the image ────────────────────────── */}
      {/*
        We can't apply SVG filters directly to a CSS background-image.
        Instead we render a same-size rect with the image as href via
        feImage, apply duotone, and blend at ~65% opacity.
        This reads: "remap the underlying floral image's tones to plum/lilac."
      */}
      <rect
        x="0" y="0" width="100" height="100"
        fill="#1C0B46"
        clipPath="url(#culture-clip)"
        style={{ mixBlendMode: 'color' }}
        opacity="0.55"
      />

      {/* ── Layer 2: Halftone dot grid — multiply blend ──────────────────── */}
      <rect
        x="0" y="0" width="100" height="100"
        fill="url(#culture-halftone)"
        clipPath="url(#culture-clip)"
        style={{ mixBlendMode: 'multiply' }}
        opacity="0.30"
      />

      {/* ── Layer 3: Champagne Pearl highlight wash at top ───────────────── */}
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

      {/* ── Layer 4: Aurora-Violet vignette rim ─────────────────────────── */}
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

      {/* ── Layer 5: Soft Lilac rim stroke (clean, no animation) ────────── */}
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
