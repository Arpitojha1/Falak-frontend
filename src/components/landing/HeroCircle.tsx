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
import { SportsGrungeOverlay }    from './SportsGrungeOverlay';
import { CultureHalftoneOverlay } from './CultureHalftoneOverlay';
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


