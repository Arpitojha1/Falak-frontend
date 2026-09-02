export function CultureHero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center bg-deep-plum overflow-hidden pt-20 pb-16">

      {/* ═══════════════════════════════════════════════════════
          LAYER 0 — Base gradient: Deep Plum → Midnight Indigo
          ═══════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #1C0B46 0%, #0B0F2B 100%)',
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          LAYER 1 — Darbar Carpet: radial medallion pattern
          Aurora Violet line-art at 8-12% opacity
          Central medallion clear-zone shifted right (behind SWIRLA slot)
          ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Outer border band — thin ornamental frame along viewport edges */}
        <div
          className="absolute inset-4 border border-aurora-violet/[0.12] rounded-sm"
          style={{
            boxShadow: 'inset 0 0 0 1px rgba(138,92,255,0.06)',
          }}
        />
        <div
          className="absolute inset-8 border border-aurora-violet/[0.08]"
        />

        {/* Central medallion — radial gradient simulating carpet rosette, positioned right-of-center behind SWIRLA */}
        <div
          className="absolute w-[80vh] h-[80vh] top-1/2 -translate-y-1/2 right-[5%]"
          style={{
            background: `
              radial-gradient(circle at 50% 50%,
                rgba(138,92,255,0.10) 0%,
                rgba(138,92,255,0.06) 20%,
                rgba(138,92,255,0.03) 40%,
                transparent 60%
              )
            `,
          }}
        />

        {/* Carpet field pattern — repeating floral/geometric tile */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 50% 50%, rgba(138,92,255,0.8) 0%, transparent 50%),
              radial-gradient(ellipse at 0% 0%, rgba(138,92,255,0.4) 0%, transparent 40%),
              radial-gradient(ellipse at 100% 100%, rgba(138,92,255,0.4) 0%, transparent 40%)
            `,
            backgroundSize: '200px 200px, 100px 100px, 100px 100px',
            backgroundPosition: 'center, top left, bottom right',
          }}
        />

        {/* Fine ornamental grid — subtle cross-hatch simulating carpet weave */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(138,92,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(138,92,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Corner spandrel accents — triangular glow in corners (carpet-style) */}
        <div
          className="absolute top-0 left-0 w-[30vw] h-[30vh] opacity-[0.06]"
          style={{
            background: 'radial-gradient(ellipse at 0% 0%, rgba(230,223,246,0.6) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[30vw] h-[30vh] opacity-[0.06]"
          style={{
            background: 'radial-gradient(ellipse at 100% 100%, rgba(230,223,246,0.6) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 2 — Jaali Screen: perforated latticework arch
          Reframed as a partial arch / side panel around left headline block
          Aurora Violet stroke at 15-20% opacity
          ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Left-side jaali arch frame — cusped arch shape wrapping the headline zone */}
        <svg
          className="absolute left-0 top-0 h-full opacity-[0.15]"
          width="55%"
          height="100%"
          viewBox="0 0 600 800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer arch border */}
          <path
            d="M 20 800 L 20 250 Q 20 100 150 50 Q 300 0 450 50 Q 550 90 560 250 L 560 800"
            stroke="#8A5CFF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
          {/* Inner arch border */}
          <path
            d="M 50 800 L 50 260 Q 50 130 170 80 Q 300 30 430 80 Q 530 120 530 260 L 530 800"
            stroke="#8A5CFF"
            strokeWidth="0.8"
            fill="rgba(230,223,246,0.03)"
            opacity="0.6"
          />
          {/* Jaali lattice lines — horizontal */}
          {Array.from({ length: 12 }, (_, i) => (
            <line
              key={`h-${i}`}
              x1="50"
              y1={200 + i * 50}
              x2="530"
              y2={200 + i * 50}
              stroke="#8A5CFF"
              strokeWidth="0.4"
              opacity="0.25"
            />
          ))}
          {/* Jaali lattice lines — vertical */}
          {Array.from({ length: 8 }, (_, i) => (
            <line
              key={`v-${i}`}
              x1={90 + i * 60}
              y1="80"
              x2={90 + i * 60}
              y2="800"
              stroke="#8A5CFF"
              strokeWidth="0.4"
              opacity="0.2"
            />
          ))}
          {/* Decorative star medallions at lattice intersections */}
          {[150, 300, 450].map((x) =>
            [200, 400, 600].map((y) => (
              <circle
                key={`star-${x}-${y}`}
                cx={x}
                cy={y}
                r="4"
                fill="none"
                stroke="#8A5CFF"
                strokeWidth="0.5"
                opacity="0.3"
              />
            ))
          )}
          {/* Cusped arch keystone ornament */}
          <circle
            cx="300"
            cy="40"
            r="8"
            fill="none"
            stroke="#E6DFF6"
            strokeWidth="0.6"
            opacity="0.4"
          />
        </svg>

        {/* Right side — lighter vertical jaali border stripe */}
        <div
          className="absolute right-0 top-0 w-px h-full opacity-[0.08]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #8A5CFF 20%, #8A5CFF 80%, transparent 100%)',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════
          LAYER 3 — Ornamental border accents
          Silver at 20-30% for filigree; Champagne Pearl for bead-line highlights
          ═══════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        {/* Top ornamental border — chevron/truck-art inspired running pattern */}
        <div
          className="absolute top-0 left-0 w-full h-3 opacity-[0.2]"
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
          className="absolute bottom-0 left-0 w-full h-3 opacity-[0.2]"
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
