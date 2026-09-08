// PassCard — Falak '26
// Desi Maximalism + Street Style Festival Pass
// Slapped street ticket aesthetic: Duct tape, rubber stamps, brutalist shadows,
// heavy borders, ticket notches, neon highlights, and high-contrast typography.

import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import type { PassTier } from '../../data/passesData';

// Perforated ticket tear line with physical circular punch notches
function TearLine({ color }: { color: string }) {
  return (
    <div className="relative w-full py-2 my-1 flex items-center select-none">
      {/* Left circular cutout notch */}
      <div
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#161438] z-20"
        style={{
          border: '3px solid #000',
          clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
        }}
      />

      {/* Dashed tear line with street ticket stamp */}
      <div className="flex-1 flex items-center mx-3 relative">
        <div
          className="w-full h-0.5"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, #000 0px, #000 6px, transparent 6px, transparent 12px)`,
          }}
        />
        <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none">
          <span
            className="px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest bg-black text-white"
            style={{ transform: 'rotate(-0.5deg)' }}
          >
            ✂ TEAR HERE ✂
          </span>
        </div>
      </div>

      {/* Right circular cutout notch */}
      <div
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#161438] z-20"
        style={{
          border: '3px solid #000',
          clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
        }}
      />
    </div>
  );
}

// Street barcode strip
function BarcodeStrip({ color }: { color: string }) {
  const bars = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 4, 1];
  return (
    <div className="flex items-end gap-0.5 h-7">
      {bars.map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}px`,
            height: `${14 + (i % 4) * 3}px`,
            background: '#000000',
            opacity: 0.85 + (i % 2) * 0.15,
          }}
        />
      ))}
    </div>
  );
}

interface PassCardProps {
  key?: string;
  pass: PassTier;
  delay?: number;
}

export function PassCard({ pass, delay = 0 }: PassCardProps) {
  const isLight = pass.accentColor === '#C6FF00' || pass.accentColor === '#FF6A00';
  const hasPrice = pass.earlyBirdPrice !== null;
  const isFeatured = pass.isFeatured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, rotate: 0.5, scale: 1.015 }}
      className="relative cursor-pointer group select-none"
    >
      {/* ── Street Duct Tape / Hazard Strip (Centered, clear of badges) ── */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 px-3 py-1 text-[8px] font-mono font-black uppercase tracking-wider text-black flex items-center gap-1 shadow-md pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(-45deg, #FFD700 0px, #FFD700 10px, #000 10px, #000 20px)',
          transform: 'translateX(-50%) rotate(-2deg)',
          border: '1.5px solid #000',
          boxShadow: '2px 2px 0px rgba(0,0,0,0.5)',
        }}
      >
        <span className="bg-[#FFD700] text-black px-1 font-bold">/// FALAK &apos;26 PASS ///</span>
      </div>

      {/* ── Featured Street Sticker / Starburst ── */}
      {isFeatured && (
        <div
          className="absolute -top-4 -right-3 z-30 px-3 py-1.5 text-[9px] font-mono font-black uppercase tracking-widest text-black shadow-lg"
          style={{
            background: '#C6FF00',
            border: '2px solid #000',
            transform: 'rotate(8deg)',
            boxShadow: '3px 3px 0px #000',
          }}
        >
          ⚡ BAAP PASS ⚡
        </div>
      )}

      {/* ── Outer Brutalist Card Shell ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: '#F2EBD9',
          border: '3.5px solid #000000',
          boxShadow: `7px 7px 0px #000000, 12px 12px 0px ${pass.accentColor}`,
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        }}
      >
        {/* Newspaper / Halftone Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)',
            backgroundSize: '12px 12px',
          }}
        />

        {/* Paper Grunge Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-40"
          style={{
            backgroundImage: 'url(/assets/texture-grunge.png)',
            backgroundSize: '200px 200px',
            mixBlendMode: 'multiply',
          }}
        />

        {/* ── Top Street Header Bar ── */}
        <div
          className="relative z-10 px-4 py-2.5 flex items-center justify-between border-b-[3px] border-black"
          style={{ background: pass.accentColor }}
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span
              className="text-[9px] font-mono uppercase tracking-[0.2em] font-black px-2 py-0.5 bg-black rounded-none"
              style={{ color: pass.accentColor }}
            >
              {pass.badgeLabel}
            </span>
          </div>
          <span className="text-[8px] font-mono font-black uppercase tracking-widest text-black/80">
            ADMIT ONE // 2026
          </span>
        </div>

        {/* ── Main Content Area ── */}
        <div className="relative z-10 px-5 pt-4 pb-2">
          {/* Circular Street Rubber Stamp (Positioned in background behind perks, clear of title) */}
          <div
            className="absolute bottom-2 right-3 pointer-events-none select-none z-0 opacity-30"
            style={{
              transform: 'rotate(-12deg)',
            }}
          >
            <div
              className="w-20 h-20 rounded-full border-2 border-dashed flex flex-col items-center justify-center text-center p-1"
              style={{
                borderColor: pass.accentColor === '#C6FF00' ? '#D7263D' : pass.accentColor,
                color: pass.accentColor === '#C6FF00' ? '#D7263D' : pass.accentColor,
              }}
            >
              <span className="text-[7px] font-mono font-black tracking-widest uppercase">★ FALAK ★</span>
              <span className="text-[8px] font-black tracking-tighter uppercase leading-none my-0.5">OFFICIAL</span>
              <span className="text-[6px] font-mono font-black uppercase">ENTRY PASS</span>
            </div>
          </div>

          {/* Pass Title — Completely unobstructed with clean line-height */}
          <h3
            className="text-2xl md:text-3xl lg:text-[2rem] uppercase leading-[1.1] text-black font-black"
            style={{
              fontFamily: '"Anton", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            {pass.name}
          </h3>

          {/* Tagline */}
          <p
            className="text-xs mt-2 text-black/80 font-bold leading-relaxed max-w-[90%]"
            style={{ fontFamily: '"Barlow", sans-serif', fontStyle: 'italic' }}
          >
            {pass.tagline}
          </p>

          {/* Street Motto Strip */}
          <div className="mt-3 py-1 px-2 bg-black text-[#C6FF00] inline-block text-[8px] font-mono font-black uppercase tracking-widest">
            ⚡ FULL ACCESS ENTRY // DHAMAKA GUARANTEED
          </div>

          {/* Perks List (High-Contrast Street Bulleting) */}
          <ul className="mt-4 flex flex-col gap-2">
            {pass.perks.map((perk, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-0.5 w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center text-[9px] font-black text-white bg-black rounded-none shadow-sm"
                  style={{ border: '1px solid #000' }}
                >
                  ✔
                </span>
                <span
                  className="text-xs text-black font-extrabold leading-tight tracking-tight"
                  style={{ fontFamily: '"Barlow", sans-serif' }}
                >
                  {perk}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Perforated Tear Line ── */}
        <TearLine color={pass.accentColor} />

        {/* ── Bottom Section: Price + CTA + Barcode ── */}
        <div className="relative z-10 px-5 pt-1 pb-4 flex items-end justify-between gap-2">
          <div>
            {hasPrice ? (
              <>
                {/* Early Bird Price */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl md:text-4xl lg:text-5xl leading-none font-black text-black"
                    style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '-0.02em' }}
                  >
                    ₹{pass.earlyBirdPrice}
                  </span>
                  <span
                    className="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-[#C6FF00] text-black border border-black shadow-sm"
                  >
                    EARLY BIRD
                  </span>
                </div>

                {/* Regular price — Locked */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className="px-1.5 py-0.5 bg-black/10 border border-black/20 text-[9px] font-mono font-bold text-black/70 uppercase tracking-wider flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5 text-black" />
                    REGULAR: ₹??? [LOCKED]
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-2xl md:text-3xl leading-none font-black text-black"
                    style={{ fontFamily: '"Anton", sans-serif' }}
                  >
                    VARIES
                  </span>
                  <span className="text-[9px] font-mono font-black uppercase tracking-wider px-2 py-0.5 bg-[#FF6A00] text-black border border-black">
                    PER EVENT
                  </span>
                </div>
                {pass.remarks && (
                  <p className="text-[9px] text-black/75 mt-1 font-mono font-bold">{pass.remarks}</p>
                )}
              </>
            )}

            {/* Neo-brutalist Action Button */}
            <motion.a
              href={pass.buyLink}
              whileHover={{ x: 2, y: 2 }}
              whileTap={{ x: 4, y: 4 }}
              className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-black uppercase tracking-widest transition-all"
              style={{
                background: pass.accentColor,
                color: isLight ? '#000000' : '#FFFFFF',
                border: '2.5px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                fontFamily: '"Space Mono", monospace',
              }}
            >
              CLAIM PASS ➔
            </motion.a>
          </div>

          {/* Barcode Strip & Serial Number */}
          <div className="flex flex-col items-center gap-1">
            <BarcodeStrip color={pass.accentColor} />
            <span className="text-[7px] font-mono font-black text-black/80 tracking-widest uppercase">
              FLK-26-{pass.id.toUpperCase().slice(0, 7)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
