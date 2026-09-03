'use client';
/**
 * HeroCircles.tsx — Falak '26 Convergence Hero
 * ─────────────────────────────────────────────────────────────────────────────
 * Wrapper that composes both convergence circles and owns the full-hero
 * swipe gesture zone.
 *
 * Layout
 *   Renders as `absolute inset-0` relative to the hero section wrapper in
 *   Home.tsx. The swipe zone covers the entire hero area (pointer-events-auto),
 *   while the circles themselves sit at the left and right edges.
 *
 *   Cultural circle — left edge (Floral.png, halftone/duotone treatment)
 *   Sports circle   — right edge (Basketball.png, grunge treatment)
 *   (They face each other — converging on the centre, matching the event name)
 *
 * Swipe detection
 *   Uses Framer Motion's onPanEnd with an offset/velocity threshold.
 *   No additional gesture library introduced — Framer Motion's PanInfo
 *   gives us both offset.x and velocity.x in one callback, sufficient
 *   for a clean swipe-left / swipe-right discriminator.
 *
 *   Thresholds (tuned for desktop mouse drag):
 *     |offset.x|  > SWIPE_OFFSET_THRESHOLD  (60px)
 *     OR
 *     |velocity.x| > SWIPE_VELOCITY_THRESHOLD (300px/s)
 *   The direction of the dominant axis determines the target route.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useNavigate }       from 'react-router-dom';
import { motion, PanInfo }   from 'motion/react';
import { HeroCircle }        from './HeroCircle';

/* ── Swipe thresholds ─────────────────────────────────────────────────────── */
const SWIPE_OFFSET_THRESHOLD   = 60;   // pixels — minimum drag distance
const SWIPE_VELOCITY_THRESHOLD = 300;  // px/s   — fast flick counts as swipe

/* ── Asset paths (verified on disk: Basketball.png, Floral.png) ───────────── */
const SPORTS_ASSET  = '/assets/sportsAssets/Basketball.png';
const CULTURE_ASSET = '/assets/culturalAssets/Floral.png';

/* ── Component ─────────────────────────────────────────────────────────────── */
export function HeroCircles() {
  const navigate = useNavigate();

  const handlePanEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;

    // Determine if this qualifies as a meaningful horizontal swipe
    const isSignificantSwipe =
      Math.abs(offset.x) > SWIPE_OFFSET_THRESHOLD ||
      Math.abs(velocity.x) > SWIPE_VELOCITY_THRESHOLD;

    if (!isSignificantSwipe) return;

    if (offset.x > 0) {
      // Swipe right → Sports
      navigate('/sports');
    } else {
      // Swipe left → Cultural
      navigate('/cultural');
    }
  };

  return (
    /*
     * Wrapper: covers the entire hero area.
     * pointer-events-none on the wrapper itself so it doesn't block
     * the logo / tagline in the hero centre.
     * The motion.div inside gets pointer-events-auto to capture pans.
     */
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      {/* ── Full-hero swipe zone ────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
        onPanEnd={handlePanEnd}
      />

      {/*
        ── Cultural circle — anchored LEFT ──────────────────────────────────
        Left circle = Cultural (halftone/duotone — Floral.png).
        Positioned so roughly half the circle bleeds off the left edge.
        pointer-events-auto so hover and click work through the transparent
        swipe zone above it.
      */}
      <div style={{ pointerEvents: 'auto' }}>
        <HeroCircle
          side="left"
          asset={CULTURE_ASSET}
          route="/cultural"
          treatment="halftone"
        />
      </div>

      {/*
        ── Sports circle — anchored RIGHT ───────────────────────────────────
        Right circle = Sports (grunge — Basketball.png).
        Positioned so roughly half the circle bleeds off the right edge.
      */}
      <div style={{ pointerEvents: 'auto' }}>
        <HeroCircle
          side="right"
          asset={SPORTS_ASSET}
          route="/sports"
          treatment="grunge"
        />
      </div>
    </div>
  );
}
