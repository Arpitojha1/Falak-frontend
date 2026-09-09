import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useHeroEntrance } from '../../hooks/useHeroEntrance';

// ─────────────────────────────────────────────────────────────────────────────
// Sports hero palette (per design.md — no cross-contamination):
//   Electric Orange #FF6A00 | Acid Lime #C6FF00 | Cobalt Blue #0057FF
//   Midnight Indigo #0B0F2B | Silver #C0C0C0
// NO Magenta — zero. Center settle is a plain opacity/x crossfade.
// ─────────────────────────────────────────────────────────────────────────────

// Stagger variants — shared between both sides
const CONTAINER_VARIANTS = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.1, delayChildren: delay },
  }),
};

const ITEM_FROM_RIGHT = {
  hidden: { x: 72, opacity: 0, filter: 'blur(4px)' },
  visible: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const ITEM_FROM_LEFT = {
  hidden: { x: -72, opacity: 0, filter: 'blur(4px)' },
  visible: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function SportsHero() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { animationKey, entryDelay } = useHeroEntrance({
    heroRef,
    dragThreshold: 60,
    fromNavDelay: 620,
  });

  // RIGHT GROUP leads (enters first, delay = entryDelay)
  // LEFT GROUP follows (delay = entryDelay + 0.1s stagger head-start)
  const rightDelay = entryDelay;
  const leftDelay = entryDelay + 0.1;

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[95vh] flex items-center bg-midnight-indigo overflow-hidden pt-20 pb-16 cursor-grab active:cursor-grabbing"
    >
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center md:bg-center"
        style={{ backgroundImage: "url('/assets/sportsAssets/Sport_Hero_BG.png')" }}
      />
      {/* Subtle Scrim for contrast */}
      <div className="absolute inset-0 z-0 bg-midnight-indigo/20 mix-blend-multiply" />

      {/* Layer 3: Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-0 mt-10">

        {/* ── LEFT GROUP: Mascot slot (follows at +0.1s) ── */}
        {/* Wrapped in motion.div with animationKey so drag-replay re-mounts variants */}
        <motion.div
          key={`sports-left-${animationKey}`}
          className="w-full lg:w-5/12 order-2 lg:order-1 relative group mt-16 lg:mt-0 flex justify-center items-center"
          variants={CONTAINER_VARIANTS}
          custom={leftDelay}
          initial={reduce ? false : 'hidden'}
          animate="visible"
        >
          <div className="relative flex justify-center items-center w-full max-w-sm mt-12">

            {/* The Box */}
            <motion.div
              variants={ITEM_FROM_LEFT}
              className="w-48 h-64 md:w-56 md:h-72 bg-electric-orange border-4 border-midnight-indigo shadow-[8px_8px_0_0_rgba(11,15,43,1)] rotate-3 transition-transform duration-300 group-hover:rotate-6"
            />

            {/* The Character — no overflow hidden, overlaps box */}
            <motion.img
              variants={ITEM_FROM_LEFT}
              src="/assets/sportsAssets/SportsCharacter.png"
              alt="ZUUM Sports Mascot"
              className="absolute w-96 md:w-[448px] max-w-none bottom-[-10%] md:bottom-[-15%] -left-6 md:-left-8 z-10 drop-shadow-[12px_12px_0_rgba(11,15,43,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2 pointer-events-none"
            />
          </div>
        </motion.div>

        {/* ── RIGHT GROUP: Headline + CTA (leads, enters first) ── */}
        <motion.div
          key={`sports-right-${animationKey}`}
          className="w-full lg:w-7/12 order-1 lg:order-2 flex flex-col items-start lg:-ml-10"
          variants={CONTAINER_VARIANTS}
          custom={rightDelay}
          initial={reduce ? false : 'hidden'}
          animate="visible"
        >
          {/* Falak logo */}
          <motion.img
            variants={ITEM_FROM_RIGHT}
            src="/assets/logo-transparent/falak_transparent-7.png"
            alt="Falak 26"
            className="h-20 md:h-28 object-contain mb-8 -rotate-2 drop-shadow-[4px_4px_0_rgba(11,15,43,1)]"
          />

          {/* Headline */}
          <motion.h1
            variants={ITEM_FROM_RIGHT}
            className="font-display text-[22vw] sm:text-[18vw] lg:text-[160px] leading-[0.8] uppercase flex flex-col relative z-20 text-silver drop-shadow-[8px_8px_0_rgba(11,15,43,1)]"
          >
            <span className="block transform -rotate-2 origin-bottom-left tracking-tighter">GAME</span>
            <span className="block text-acid-lime transform rotate-2 origin-top-left tracking-tighter sm:ml-12 mt-[-0.1em] relative z-30">
              ON
              {/* Spinning star-burst — Electric Orange, not Magenta */}
              <svg
                className="absolute -right-4 md:-right-12 -top-8 w-16 h-16 md:w-24 md:h-24 text-electric-orange animate-[spin_8s_linear_infinite]"
                viewBox="0 0 100 100"
              >
                <path
                  fill="currentColor"
                  d="M50 0 L56 36 L92 18 L70 48 L100 70 L64 74 L80 100 L50 78 L20 100 L36 74 L0 70 L30 48 L8 18 L44 36 Z"
                />
              </svg>
            </span>
          </motion.h1>

          {/* CTA */}
          <motion.div
            variants={ITEM_FROM_RIGHT}
            className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-30 w-full sm:w-auto -rotate-1"
          >
            <a
              href="#events"
              data-no-swipe
              className="group flex items-center justify-center px-10 py-5 bg-electric-orange text-midnight-indigo font-headline-sports-section uppercase text-xl tracking-widest border-4 border-midnight-indigo shadow-[6px_6px_0_0_rgba(198,255,0,1)] hover:shadow-[2px_2px_0_0_rgba(198,255,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              EXPLORE EVENTS
              <span className="ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
