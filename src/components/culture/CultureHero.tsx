import * as motion from 'motion/react-client';

export function CultureHero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center bg-deep-plum overflow-hidden pt-20 pb-16">

      {/* ═══════════════════════════════════════════════════════
          LAYER 0 — Base gradient & Surface Grain
          ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #1C0B46 0%, #0B0F2B 100%)',
        }}
      />
      
      {/* Fine surface grain (SVG noise) — gives material presence beyond a flat digital gradient */}
      <div className="absolute inset-0 z-[1] mix-blend-overlay opacity-[0.10] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.3 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — Darbar Carpet Field & Micro-weave
          ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        
        {/* Multi-band border (4 concentric strokes, referencing real carpet density) */}
        <div className="absolute inset-4 border-[3px] border-aurora-violet/[0.12] rounded-sm" />
        <div className="absolute inset-[22px] border border-aurora-violet/[0.08]" />
        <div className="absolute inset-[30px] border border-champagne-pearl/[0.04]" />
        <div className="absolute inset-[36px] border border-aurora-violet/[0.06]" />

        {/* Corner Ornaments (Truck-art/Carpet inspired finials replacing spandrel blobs) */}
        <svg className="absolute top-10 left-10 w-20 h-20 opacity-[0.25]" viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="16" fill="none" stroke="#8A5CFF" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill="#E6DFF6" />
          <path d="M 36 20 L 80 20 M 20 36 L 20 80" stroke="#8A5CFF" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 20 3 L 20 9 M 3 20 L 9 20" stroke="#E6DFF6" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-10 right-10 w-20 h-20 opacity-[0.25]" viewBox="0 0 100 100" style={{ transform: 'rotate(180deg)' }}>
          <circle cx="20" cy="20" r="16" fill="none" stroke="#8A5CFF" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="5" fill="#E6DFF6" />
          <path d="M 36 20 L 80 20 M 20 36 L 20 80" stroke="#8A5CFF" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M 20 3 L 20 9 M 3 20 L 9 20" stroke="#E6DFF6" strokeWidth="1" />
        </svg>

        {/* Micro-weave background pattern (tiny diamonds at 3-5%) under the main field */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #8A5CFF 25%, transparent 25%, transparent 75%, #8A5CFF 75%, #8A5CFF),
              linear-gradient(45deg, #8A5CFF 25%, transparent 25%, transparent 75%, #8A5CFF 75%, #8A5CFF)
            `,
            backgroundPosition: '0 0, 4px 4px',
            backgroundSize: '8px 8px',
          }}
        />

        {/* Carpet field pattern — breathing opacity via Framer Motion for subtle life */}
        <motion.div
          animate={{ opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 50%, rgba(138,92,255,0.8) 0%, transparent 50%),
              radial-gradient(ellipse at 0% 0%, rgba(138,92,255,0.4) 0%, transparent 40%),
              radial-gradient(ellipse at 100% 100%, rgba(138,92,255,0.4) 0%, transparent 40%)
            `,
            backgroundSize: '160px 160px, 120px 120px, 120px 120px',
            backgroundPosition: 'center, top left, bottom right',
          }}
        />

        {/* Central medallion — positioned right-of-center behind SWIRLA */}
        <div className="absolute w-[80vh] h-[80vh] top-1/2 -translate-y-1/2 right-[5%] flex items-center justify-center">
          
          {/* Halftone collage element masked to the center of the medallion */}
          <div 
            className="absolute inset-0 overflow-hidden rounded-full opacity-[0.35]"
            style={{
              maskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 60%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 20%, transparent 60%)',
            }}
          >
            <img 
              src="/assets/reference/cultural/ref_c-4.jpg" 
              alt=""
              className="w-full h-full object-cover mix-blend-screen"
              style={{
                filter: 'grayscale(1) sepia(0.5) hue-rotate(220deg) contrast(1.4) brightness(1.1)'
              }}
            />
            {/* Halftone dot overlay on the collage */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, #8A5CFF 1.5px, transparent 1.5px)',
                backgroundSize: '4px 4px',
                mixBlendMode: 'multiply',
                opacity: 0.8
              }}
            />
          </div>
          
          {/* Concentric rings acting as medallion linework (replaces soft radial blob) */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`ring-${i}`}
              className="absolute border rounded-full"
              style={{
                width: `${90 - i * 15}%`,
                height: `${90 - i * 15}%`,
                borderColor: 'rgba(138,92,255,0.12)',
                borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
                borderWidth: i === 0 ? '2px' : '1px',
                transform: `rotate(${i * 15}deg)`,
              }}
            />
          ))}
          
          {/* Central 16-point star/mandala core */}
          <svg viewBox="0 0 100 100" className="absolute w-[20%] h-[20%] opacity-[0.35]">
            <polygon points="50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40" fill="none" stroke="#E6DFF6" strokeWidth="0.8" />
            <polygon points="15,15 45,35 85,15 65,45 85,85 45,65 15,85 35,45" fill="none" stroke="#8A5CFF" strokeWidth="1" />
            <circle cx="50" cy="50" r="10" fill="none" stroke="#8A5CFF" strokeWidth="2" strokeDasharray="2 2" />
          </svg>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 2 — Jaali Screen: Dense perforated latticework arch
          ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Left-side jaali arch frame — wrapped around the headline zone */}
        <svg
          className="absolute left-0 top-0 h-full w-[100%] md:w-[65%] lg:w-[55%]"
          viewBox="0 0 600 800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="arch-clip">
              <path d="M 20 800 L 20 250 Q 20 100 150 50 Q 300 0 450 50 Q 550 90 560 250 L 560 800 Z" />
            </clipPath>
            <pattern id="arch-halftone" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="2.5" cy="2.5" r="1.5" fill="#8A5CFF" />
            </pattern>
          </defs>

          {/* Duotone collage inlay inside the arch bounds */}
          <g clipPath="url(#arch-clip)">
            <image 
              href="/assets/reference/cultural/ref_c-16.jpg" 
              width="600" 
              height="800" 
              preserveAspectRatio="xMidYMid slice" 
              opacity="0.12" 
              style={{ filter: 'grayscale(1) sepia(0.5) hue-rotate(220deg) contrast(1.5)' }} 
            />
            <rect width="600" height="800" fill="url(#arch-halftone)" opacity="0.6" style={{ mixBlendMode: 'multiply' }} />
          </g>

          {/* Outer arch border */}
          <path
            d="M 20 800 L 20 250 Q 20 100 150 50 Q 300 0 450 50 Q 550 90 560 250 L 560 800"
            stroke="#8A5CFF"
            strokeWidth="2.5"
            fill="none"
            opacity="0.4"
          />
          {/* Inner arch border */}
          <path
            d="M 50 800 L 50 260 Q 50 130 170 80 Q 300 30 430 80 Q 530 120 530 260 L 530 800"
            stroke="#8A5CFF"
            strokeWidth="1.5"
            fill="rgba(230,223,246,0.02)"
            opacity="0.35"
          />
          {/* Jaali lattice lines — horizontal (Dense) */}
          {Array.from({ length: 24 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="50"
              y1={200 + i * 25}
              x2="530"
              y2={200 + i * 25}
              stroke="#8A5CFF"
              strokeWidth="0.8"
              opacity="0.25"
            />
          ))}
          {/* Jaali lattice lines — vertical (Dense) */}
          {Array.from({ length: 16 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={65 + i * 30}
              y1="80"
              x2={65 + i * 30}
              y2="800"
              stroke="#8A5CFF"
              strokeWidth="0.8"
              opacity="0.2"
            />
          ))}
          {/* Decorative star medallions at dense intersections */}
          {[155, 245, 335, 425].map((x) =>
            [250, 400, 550, 700].map((y) => (
              <g key={`star-${x}-${y}`}>
                <circle cx={x} cy={y} r="2.5" fill="#8A5CFF" opacity="0.5" />
                <circle cx={x} cy={y} r="6" fill="none" stroke="#8A5CFF" strokeWidth="0.5" opacity="0.3" />
              </g>
            ))
          )}
          {/* Cusped arch keystone ornament (Mandala/Crown accent) */}
          <g transform="translate(300, 45)">
            <circle cx="0" cy="0" r="12" fill="none" stroke="#E6DFF6" strokeWidth="1" opacity="0.4" />
            <circle cx="0" cy="0" r="4" fill="#E6DFF6" opacity="0.6" />
            <path d="M 0 -18 L 5 -10 L 12 -10 L 7 -4 L 14 0 L 7 4 L 12 10 L 5 10 L 0 18 L -5 10 L -12 10 L -7 4 L -14 0 L -7 -4 L -12 -10 L -5 -10 Z" fill="none" stroke="#8A5CFF" strokeWidth="0.8" opacity="0.4" />
          </g>
        </svg>

        {/* Right side — lighter vertical jaali border stripe */}
        <div
          className="absolute right-0 top-0 w-[2px] h-full opacity-[0.15]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #8A5CFF 20%, #8A5CFF 80%, transparent 100%)',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 3 — Ornamental border accents
          ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {/* Top ornamental border — chevron/truck-art inspired running pattern */}
        <div
          className="absolute top-0 left-0 w-full h-3 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(135deg, #C0C0C0 25%, transparent 25%),
              linear-gradient(225deg, #C0C0C0 25%, transparent 25%)
            `,
            backgroundSize: '12px 12px',
            backgroundPosition: '0 0, 6px 0',
          }}
        />
        {/* Bottom ornamental border — mirror of top */}
        <div
          className="absolute bottom-0 left-0 w-full h-3 opacity-[0.25]"
          style={{
            backgroundImage: `
              linear-gradient(315deg, #C0C0C0 25%, transparent 25%),
              linear-gradient(45deg, #C0C0C0 25%, transparent 25%)
            `,
            backgroundSize: '12px 12px',
            backgroundPosition: '0 0, 6px 0',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 4 — Main Content: Asymmetric L-R Grid
          Left 55-60%: Headline block
          Right 40-45%: SWIRLA placeholder
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-0 mt-10">

        {/* ── LEFT ZONE: Headline Block (55-60%) ── */}
        <div className="w-full lg:w-7/12 order-1 flex flex-col items-start">

          {/* Falak logo */}
          <img
            src="/assets/logo-transparent/falak_transparent-7.png"
            alt="Falak '26"
            className="h-20 md:h-28 object-contain mb-8 drop-shadow-[0_2px_8px_rgba(138,92,255,0.3)]"
          />

          {/* Primary headline — Baloo 2 */}
          <h1
            className="font-accent font-extrabold uppercase leading-[0.85] text-champagne-pearl"
            style={{
               fontSize: 'clamp(4rem, 12vw, 10rem)',
               letterSpacing: '-0.02em',
               textShadow: '3px 4px 0 #1C0B46',
            }}
          >
            Culture
          </h1>

          {/* Devanagari echo — Baloo Devanagari 2 */}
          <p
            className="font-baloo-devanagari font-bold text-aurora-violet leading-tight mt-2"
            style={{
              fontSize: 'clamp(2.4rem, 7vw, 6rem)',
            }}
          >
            संस्कृति
          </p>

          {/* Tagline — Fraunces Italic */}
          <p
            className="font-fraunces italic text-soft-lilac/80 mt-6"
            style={{
              fontSize: '1.25rem',
              letterSpacing: '0.1em',
            }}
          >
            Where heritage meets the horizon
          </p>

          {/* Divider — mandala rosette accent (replaces Sports' star-burst) */}
          <div className="flex items-center gap-3 mt-8 mb-2 opacity-40">
            <div className="w-16 h-px bg-aurora-violet" />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6" stroke="#8A5CFF" strokeWidth="0.8" />
              <circle cx="8" cy="8" r="3" stroke="#8A5CFF" strokeWidth="0.5" />
              <circle cx="8" cy="8" r="1" fill="#8A5CFF" />
            </svg>
            <div className="w-16 h-px bg-aurora-violet" />
          </div>

          {/* CTA — pill/stamp-border, Aurora Violet fill */}
          <a
            href="#events"
            className="group inline-flex items-center justify-center px-10 py-4 mt-4
              bg-aurora-violet text-midnight-indigo font-accent font-bold uppercase
              text-base tracking-[0.15em] rounded-full
              border border-champagne-pearl/60
              shadow-[0_4px_20px_rgba(138,92,255,0.3)]
              hover:bg-soft-lilac hover:text-deep-plum
              hover:shadow-[0_4px_24px_rgba(230,223,246,0.4)]
              transition-all duration-300"
          >
            Explore Events
            <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>

        {/* ── RIGHT ZONE: SWIRLA Placeholder (40-45%) ── */}
        <div className="w-full lg:w-5/12 order-2 relative lg:self-end">
          {/* TODO: Culture mascot (SWIRLA) asset goes here — full-bleed off right edge, rising from bottom */}
          <div
            className="relative lg:absolute lg:right-[-8vw] lg:bottom-0 w-full max-w-md lg:max-w-none lg:w-[45vw] aspect-[3/4]"
          >
            {/* Placeholder silhouette — bounding outline in Soft Lilac at low opacity */}
            <div
              className="w-full h-full rounded-t-[40%] border-2 border-dashed border-soft-lilac/20
                flex flex-col items-center justify-center
                bg-gradient-to-t from-soft-lilac/[0.04] to-transparent"
            >
              {/* Placeholder label */}
              <div className="text-center px-8">
                <p className="font-accent font-bold text-soft-lilac/30 text-2xl uppercase tracking-widest">
                  SWIRLA
                </p>
                <p className="font-sans text-soft-lilac/20 text-sm mt-2 leading-relaxed">
                  Mascot asset placeholder
                  <br />
                  Full-bleed off right edge, rising from bottom
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
