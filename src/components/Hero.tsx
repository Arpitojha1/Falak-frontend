import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { LogoImage } from './LogoImage';
import { useHeroEntrance } from '../hooks/useHeroEntrance';

// ─────────────────────────────────────────────────────────────────────────────
// Landing hero palette (per design.md — shared/convergence layer only):
//   Midnight Indigo #0B0F2B | Silver #C0C0C0
// NO track-specific colors (no Sports orange/lime, no Culture violet/plum).
// NO Magenta in the animation — Magenta (#FF3D7F) stays on the countdown pill
// as a static UI element (existing, not animated). Center settle = crossfade.
//
// The "both sides" metaphor on the centered layout:
//   RIGHT: Logo image (enters from right)
//   LEFT:  Tagline text block (enters from left)
//   RIGHT: Countdown pill (enters from right, last — echoes the opening beat)
// ─────────────────────────────────────────────────────────────────────────────

const ITEM_FROM_RIGHT = {
  hidden: { x: 56, opacity: 0, filter: 'blur(3px)' },
  visible: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const ITEM_FROM_LEFT = {
  hidden: { x: -56, opacity: 0, filter: 'blur(3px)' },
  visible: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const [daysRemaining, setDaysRemaining] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const targetDate = new Date('2026-10-12T00:00:00');
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setDaysRemaining(days > 0 ? days : 0);
  }, []);

  const { animationKey, entryDelay } = useHeroEntrance({
    heroRef,
    dragThreshold: 60,
    fromNavDelay: 620,
  });

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center bg-midnight-indigo pt-16 md:pt-24 overflow-hidden cursor-grab active:cursor-grabbing"
    >
      {/* Background Image Layer — static, untouched */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-[position:center_top] md:bg-center"
        style={{ backgroundImage: "url('/assets/Landing/Landing_background.png')" }}
      />
      {/* Subtle Scrim for contrast */}
      <div className="absolute inset-0 z-0 bg-midnight-indigo/40 md:bg-midnight-indigo/30 mix-blend-multiply" />

      {/* Animated content overlay — parent is this <section>, not viewport */}
      <div
        key={`landing-hero-${animationKey}`}
        className="relative z-10 flex flex-col items-center pointer-events-none w-full px-4"
      >
        {/* Logo — enters from RIGHT (leads the bilateral stagger) */}
        <motion.div
          variants={ITEM_FROM_RIGHT}
          initial={reduce ? false : 'hidden'}
          animate="visible"
          transition={{ delay: entryDelay }}
          className="w-full flex justify-center"
        >
          <LogoImage className="h-16 xs:h-20 sm:h-28 md:h-52 lg:h-72 max-w-full object-contain" />
        </motion.div>

        {/* Tagline block — enters from LEFT (follows 0.1s later) */}
        <motion.div
          variants={ITEM_FROM_LEFT}
          initial={reduce ? false : 'hidden'}
          animate="visible"
          transition={{ delay: entryDelay + 0.1 }}
          className="mt-6 md:mt-12 flex flex-col items-center gap-3 md:gap-4 w-full"
        >
          <div className="h-[1px] w-16 xs:w-24 bg-vermillion-red/50" />
          {/* Tagline */}
          <p className="font-accent text-lg xs:text-xl sm:text-2xl md:text-3xl text-silver/90 tracking-wide text-center max-w-lg px-4 xs:px-6">
            The Convergence Awaits.
          </p>
          {/* Data label */}
          <p className="font-mono text-[10px] xs:text-xs sm:text-sm text-silver/60 uppercase tracking-[0.3em]">
            Est. 2026
          </p>
        </motion.div>

        {/* Countdown pill — enters from RIGHT (echoes the opening beat, 0.22s after logo) */}
        <motion.p
          variants={ITEM_FROM_RIGHT}
          initial={reduce ? false : 'hidden'}
          animate="visible"
          transition={{ delay: entryDelay + 0.22 }}
          className="pointer-events-auto mt-1 md:mt-2 font-mono text-[10px] xs:text-xs sm:text-sm text-[#FF3D7F] uppercase tracking-widest border border-[#FF3D7F]/30 px-3 xs:px-4 py-1.5 md:py-2 rounded-full bg-midnight-indigo/50 backdrop-blur-sm whitespace-nowrap"
        >
          {daysRemaining} Days to Falak
        </motion.p>
      </div>

      {/* Jaali fine linework borders — static decorative, untouched */}
      <div
        className="absolute left-2 md:left-4 top-2 md:top-4 bottom-2 md:bottom-4 w-2 md:w-4 border-l border-t border-b border-silver/20"
        style={{ borderImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(192, 192, 192, 0.2) 5px, rgba(192, 192, 192, 0.2) 10px) 1' }}
      />
      <div
        className="absolute right-2 md:right-4 top-2 md:top-4 bottom-2 md:bottom-4 w-2 md:w-4 border-r border-t border-b border-silver/20"
        style={{ borderImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(192, 192, 192, 0.2) 5px, rgba(192, 192, 192, 0.2) 10px) 1' }}
      />
    </section>
  );
}
