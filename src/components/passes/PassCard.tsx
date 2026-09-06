// PassCard — Physical ticket-styled pass card
// Torn-paper aesthetic with perforated tear line, barcode, stamp, tape

import { motion } from 'motion/react';
import type { PassTier } from '../../data/passesData';

interface PassCardProps {
  pass: PassTier;
  delay?: number;
  key?: string;
}

// Barcode visual (pure CSS)
function BarcodeStrip({ color }: { color: string }) {
  // 20 alternating thin/thick bars
  const bars = [3, 1, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3];
  return (
    <div className="flex items-end gap-px h-10">
      {bars.map((width, i) => (
        <div
          key={i}
          className="flex-shrink-0"
          style={{
            width: width,
            height: i % 3 === 0 ? '100%' : '70%',
            background: color === '#C6FF00' ? '#0B0F2B' : '#0B0F2B',
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

// Perforated tear line
function TearLine({ color }: { color: string }) {
  return (
    <div className="flex items-center w-full overflow-hidden">
      {/* Left half-circle */}
      <div
        className="w-4 h-8 rounded-r-full flex-shrink-0 -ml-2"
        style={{ background: '#0B0F2B' }}
      />
      {/* Dashes */}
      <div
        className="flex-1 border-t-2 border-dashed mx-1"
        style={{ borderColor: `${color}60` }}
      />
      {/* Right half-circle */}
      <div
        className="w-4 h-8 rounded-l-full flex-shrink-0 -mr-2"
        style={{ background: '#0B0F2B' }}
      />
    </div>
  );
}

export function PassCard({ pass, delay = 0 }: PassCardProps) {
  const isLight = pass.accentColor === '#C6FF00'; // acid-lime needs dark text

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -1 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6, rotate: 0.5, scale: 1.01 }}
      className="relative flex-1 min-w-[280px] max-w-[360px] cursor-pointer"
      style={{
        filter: pass.isFeatured ? 'drop-shadow(0 8px 32px rgba(255,61,127,0.35))' : 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))',
      }}
    >
      {/* Featured starburst badge */}
      {pass.isFeatured && (
        <div
          className="absolute -top-5 -right-3 z-20 w-16 h-16 flex items-center justify-center text-center"
          style={{
            background: '#FF3D7F',
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        >
          <span
            className="text-[7px] font-mono uppercase tracking-[0.1em] text-white leading-tight"
            style={{ textAlign: 'center' }}
          >
            BEST<br />VALUE
          </span>
        </div>
      )}

      {/* Tape strip at top */}
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-4 rounded-sm z-10"
        style={{
          background: 'rgba(237,228,211,0.4)',
          transform: 'translateX(-50%) rotate(-1.5deg)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      />

      {/* Card body */}
      <div
        className="relative overflow-hidden"
        style={{
          background: pass.bgColor,
          borderTop: `4px solid ${pass.accentColor}`,
          boxShadow: '3px 5px 20px rgba(0,0,0,0.5)',
        }}
      >
        {/* Scan-line overlay for texture */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
          }}
        />

        {/* Top stub: tier info */}
        <div className="relative z-10 px-5 pt-5 pb-4">
          {/* Tier badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[9px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded-sm"
              style={{
                background: pass.accentColor,
                color: isLight ? '#0B0F2B' : '#fff',
                fontFamily: '"Space Mono", monospace',
              }}
            >
              {pass.badgeLabel}
            </span>
          </div>

          {/* Pass name */}
          <div
            className="text-3xl md:text-4xl uppercase leading-none text-[#0B0F2B]"
            style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '-0.02em' }}
          >
            {pass.name}
          </div>

          {/* Tagline */}
          <p
            className="text-sm mt-3 text-[#0B0F2B]/70"
            style={{ fontFamily: '"Barlow", sans-serif', fontStyle: 'italic' }}
          >
            {pass.tagline}
          </p>

          {/* Includes list */}
          <ul className="mt-4 flex flex-col gap-1.5">
            {pass.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-0.5 w-3 h-3 rounded-full flex-shrink-0 flex items-center justify-center"
                  style={{ background: pass.accentColor }}
                >
                  <svg width="6" height="5" viewBox="0 0 6 5" fill="none">
                    <path d="M1 2.5L2.5 4L5 1" stroke={isLight ? '#0B0F2B' : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-xs text-[#0B0F2B]/75" style={{ fontFamily: '"Barlow", sans-serif' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Perforated tear line */}
        <TearLine color={pass.accentColor} />

        {/* Bottom stub: price + barcode + CTA */}
        <div className="relative z-10 px-5 py-4 flex items-end justify-between gap-4">
          <div>
            {/* Price */}
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-4xl md:text-5xl leading-none font-bold text-[#0B0F2B]"
                style={{ fontFamily: '"Anton", sans-serif' }}
              >
                {pass.price}
              </span>
            </div>
            <div
              className="text-[10px] font-mono uppercase tracking-widest mt-0.5"
              style={{ color: 'rgba(11,15,43,0.5)' }}
            >
              {pass.priceNote}
            </div>

            {/* CTA Button */}
            <motion.a
              href={pass.buyLink}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-widest rounded-sm transition-all"
              style={{
                background: pass.accentColor,
                color: isLight ? '#0B0F2B' : '#fff',
                boxShadow: `0 2px 12px ${pass.accentColor}50`,
                fontFamily: '"Space Mono", monospace',
              }}
            >
              GET {pass.name.split(' ')[0].toUpperCase()} PASS
              <span>→</span>
            </motion.a>
          </div>

          {/* Barcode */}
          <div className="flex flex-col items-center gap-1 opacity-60">
            <BarcodeStrip color={pass.accentColor} />
            <span
              className="text-[7px] font-mono text-[#0B0F2B]/50 tracking-widest"
            >
              FALAK-26-{pass.id.toUpperCase().replace('-', '')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
