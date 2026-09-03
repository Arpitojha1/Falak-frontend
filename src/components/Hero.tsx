import * as motion from 'motion/react-client';
import { LogoImage } from './LogoImage';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-midnight-indigo pt-16 md:pt-24">
      {/*
        ─── Kite Motif Background ──────────────────────────────────────────────
        All elements are pointer-events-none / z-0 — they never block the
        wordmark or CTA layer above (z-10).

        Each motion.div carries the same "breathing" language as the removed
        inline SVG floaters: slow looping translateY + rotate + opacity pulse.

        prefers-reduced-motion: Motion's built-in reducedMotion="user" prop
        (set on the provider in main.tsx) will freeze these to their initial
        snapshot. The static initial values are set so the scene reads fine
        even without animation.

        Assets used:
          falak kite.png  — hero kite, large feature element, right-of-centre
          kite-1.png      — single kite, small bg accent, top-left
          kite-2.png      — wide multi-kite composition, bottom-left
          kite-3.png      — tall multi-kite composition, top-right edge
          kite-4.png      — tall multi-kite composition, bottom-right
          kite-5.png      — wide multi-kite composition, mid-left
      ───────────────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">

        {/* ── Hero kite: large feature, right-of-centre, slow majestic drift ── */}
        <motion.div
          className="absolute"
          style={{ right: '-5%', top: '5%', width: '55vw', maxWidth: '680px', minWidth: '260px' }}
          initial={{ y: 0, rotate: -6, opacity: 0 }}
          animate={{ y: [-18, -48, -18], rotate: [-6, -2, -6], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        >
          <img
            src="/assets/kite/falak kite.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── kite-1: small accent, upper-left, quicker bob ── */}
        <motion.div
          className="absolute"
          style={{ left: '2%', top: '8%', width: '22vw', maxWidth: '240px', minWidth: '100px' }}
          initial={{ y: 0, rotate: 8, opacity: 0 }}
          animate={{ y: [-10, -38, -10], rotate: [8, 14, 8], opacity: [0.30, 0.50, 0.30] }}
          transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        >
          <img
            src="/assets/kite/kite-1.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── kite-2: wide multi-kite composition, bottom-left, gentle rise ── */}
        <motion.div
          className="absolute"
          style={{ left: '-8%', bottom: '0%', width: '58vw', maxWidth: '700px', minWidth: '280px' }}
          initial={{ y: 0, rotate: 4, opacity: 0 }}
          animate={{ y: [-12, -40, -12], rotate: [4, 8, 4], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <img
            src="/assets/kite/kite-2.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── kite-3: tall multi-kite, right-edge cluster, slow climb ── */}
        <motion.div
          className="absolute hidden md:block"
          style={{ right: '-4%', bottom: '5%', width: '28vw', maxWidth: '320px' }}
          initial={{ y: 0, rotate: -10, opacity: 0 }}
          animate={{ y: [-8, -32, -8], rotate: [-10, -5, -10], opacity: [0.28, 0.45, 0.28] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        >
          <img
            src="/assets/kite/kite-3.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── kite-4: tall stack, mid-left upper area, drift ── */}
        <motion.div
          className="absolute hidden md:block"
          style={{ left: '28%', top: '3%', width: '22vw', maxWidth: '260px' }}
          initial={{ y: 0, rotate: 5, opacity: 0 }}
          animate={{ y: [-14, -44, -14], rotate: [5, 11, 5], opacity: [0.22, 0.38, 0.22] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
        >
          <img
            src="/assets/kite/kite-4.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {/* ── kite-5: wide sprawl, far bottom-right, slowest drift ── */}
        <motion.div
          className="absolute hidden lg:block"
          style={{ right: '30%', bottom: '2%', width: '34vw', maxWidth: '420px' }}
          initial={{ y: 0, rotate: -3, opacity: 0 }}
          animate={{ y: [-6, -28, -6], rotate: [-3, 2, -3], opacity: [0.20, 0.35, 0.20] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 12 }}
        >
          <img
            src="/assets/kite/kite-5.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain"
          />
        </motion.div>

      </div>

      
      {/* Grain overlay for vintage feel */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <LogoImage className="h-28 md:h-52 lg:h-72" />
        </motion.div>
        
        <motion.div 
          className="mt-6 md:mt-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-[1px] w-24 bg-vermillion-red/50"></div>
          {/* Tagline: Culture headline role — Baloo 2 */}
          <p className="font-accent text-2xl md:text-3xl text-silver/90 tracking-wide text-center max-w-lg px-6">
            The Convergence Awaits.
          </p>
          {/* Data label: tag/timestamp role — Space Mono */}
          <p className="font-mono text-sm text-silver/60 uppercase tracking-[0.3em]">
            Est. 2026
          </p>
        </motion.div>
      </div>

      {/* Jaali fine linework borders on the edge */}
      <div className="absolute left-4 top-4 bottom-4 w-4 border-l border-t border-b border-silver/20 hidden md:block"
           style={{ borderImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(192, 192, 192, 0.2) 5px, rgba(192, 192, 192, 0.2) 10px) 1' }}></div>
      <div className="absolute right-4 top-4 bottom-4 w-4 border-r border-t border-b border-silver/20 hidden md:block"
           style={{ borderImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(192, 192, 192, 0.2) 5px, rgba(192, 192, 192, 0.2) 10px) 1' }}></div>
    </section>
  );
}
