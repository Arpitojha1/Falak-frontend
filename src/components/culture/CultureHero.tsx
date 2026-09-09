import * as motion from 'motion/react-client';
import { CulturalGateMotif } from './CulturalGateMotif';

export function CultureHero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center bg-deep-plum overflow-hidden pt-20 pb-16">

      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center md:bg-[center_top]"
        style={{
          backgroundImage: "url('/assets/culturalAssets/Cultural_Hero_BG.png')"
        }}
      />
      {/* Subtle Warm Scrim for contrast/richness */}
      <div className="absolute inset-0 z-0 bg-deep-plum/30 mix-blend-multiply" />


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

        {/* ── RIGHT ZONE: SWIRLA Mascot ── */}
        <div className="w-full lg:w-5/12 order-2 relative lg:self-end flex justify-center mt-16 lg:mt-0">
          <div className="relative flex justify-center items-end w-full max-w-sm lg:max-w-md lg:absolute lg:right-[-4vw] lg:bottom-0">
            
            {/* The Gate Motif (Behind) */}
            <CulturalGateMotif className="absolute bottom-0 w-full z-0" />

            {/* The Character (In Front) - scaled to fit gate proportions, centered, emerging through gate */}
            <img 
              src="/assets/culturalAssets/CulturalCharacter.png" 
              alt="SWIRLA Cultural Mascot"
              className="relative z-10 w-[85%] h-auto object-contain drop-shadow-[0_15px_35px_rgba(28,11,70,0.8)]"
              style={{
                 // Pulling character slightly down to ensure feet rest at/below the gate base line
                 marginBottom: '-2%'
              }}
            />
            
          </div>
        </div>

      </div>
    </section>
  );
}
