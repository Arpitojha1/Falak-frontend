import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Echoes of the Past — Convergence Asset Configuration
 * ─────────────────────────────────────────────────────────────────────────────
 * DESIGN.MD CHANGELOG CANDIDATES / ARCHITECTURAL NOTES:
 *
 * 1. Convergence Magenta (#FF3D7F) Usage Pattern:
 *    Convergence Magenta is strictly scoped in this section to outline accents
 *    on exactly 2 of the 7 assets (Asset 3 and Asset 7). It does not dominate the
 *    visual space, preserving the balance alongside Aurora Violet (#8A5CFF),
 *    Cobalt Blue (#0057FF), Electric Orange (#FF6A00), Acid Lime (#C6FF00),
 *    and Soft Lilac (#E6DFF6) in accordance with the locked festival palette.
 * ─────────────────────────────────────────────────────────────────────────────
 */
interface EchoAsset {
  id: string;
  src: string;
  alt: string;
  className: string;
  rotation: string;
  outlineColor: string;
  zIndex: number;
}

const ECHO_ASSETS: EchoAsset[] = [
  {
    id: 'echo-1',
    src: '/assets/Landing/echoes/mohitCh1WithoutBG.png',
    alt: 'Falak performer silhouette - Vocals and stage energy',
    // Mobile unchanged. Desktop: Large upper-left, pulled out to flank to keep center empty.
    className: 'top-0 left-0 w-48 h-64 xs:w-56 xs:h-72 md:-top-[5%] md:-left-[5%] lg:-top-[8%] lg:-left-[5%] md:w-[30rem] md:h-[40rem] lg:w-[34rem] lg:h-[46rem]',
    rotation: '-rotate-6 hover:-rotate-3',
    outlineColor: '#8A5CFF', // Aurora Violet
    zIndex: 12,
  },
  {
    id: 'echo-2',
    src: '/assets/Landing/echoes/mohitch2WithoutBG.png',
    alt: 'Falak stage moment - Performance dynamics',
    // Mobile unchanged. Desktop: Lower-left, pulled out to flank.
    className: 'bottom-0 left-0 w-56 h-72 xs:w-64 xs:h-80 md:bottom-[5%] md:-left-[5%] lg:bottom-[10%] lg:-left-[2%] md:w-[26rem] md:h-[34rem] lg:w-[30rem] lg:h-[38rem]',
    rotation: 'rotate-3 hover:rotate-6',
    outlineColor: '#FF6A00', // Electric Orange
    zIndex: 14,
  },
  {
    id: 'echo-3',
    src: '/assets/Landing/echoes/PranavSharmawithoutBG.png',
    alt: 'Falak athlete action - High-velocity athletic capture',
    // Mobile unchanged. Desktop: Upper-right, pulled out to flank.
    className: 'top-4 right-0 w-56 h-48 xs:w-72 xs:h-56 md:top-[8%] md:-right-[2%] lg:top-[10%] lg:-right-[5%] md:w-[20rem] md:h-[16rem] lg:w-[24rem] lg:h-[18rem]',
    rotation: 'rotate-6 hover:rotate-2',
    outlineColor: '#FF3D7F', // Convergence Magenta
    zIndex: 12,
  },
  {
    id: 'echo-4',
    src: '/assets/Landing/echoes/mohitCh5WithoutBG.png',
    alt: 'Falak live concert - Crowd resonance and artist expression',
    // Mobile unchanged. Desktop: Mid-right element, pushed back to the right flank to clear the text.
    className: 'top-[35%] right-[10%] w-48 h-64 xs:w-56 xs:h-72 md:top-[35%] md:-right-[10%] lg:top-[40%] lg:-right-[12%] md:w-[30rem] md:h-[40rem] lg:w-[34rem] lg:h-[44rem]',
    rotation: '-rotate-4 hover:-rotate-1',
    outlineColor: '#C6FF00', // Acid Lime
    zIndex: 13,
  },
  {
    id: 'echo-5',
    src: '/assets/Landing/echoes/mohitchWithoutBG.png',
    alt: 'Falak center-stage presence - Full-body festival scale',
    // Mobile unchanged. Desktop: Mid-left element, pushed back to the left flank to clear the text.
    className: 'top-[25%] left-[10%] w-48 h-72 xs:w-56 xs:h-80 md:top-[50%] md:-left-[10%] lg:top-[55%] lg:-left-[8%] md:w-[20rem] md:h-[28rem] lg:w-[24rem] lg:h-[32rem]',
    rotation: 'rotate-2 hover:rotate-4',
    outlineColor: '#0057FF', // Cobalt Blue
    zIndex: 11,
  },
  {
    id: 'echo-6',
    src: '/assets/Landing/echoes/mohitchWithoutBG2.png',
    alt: 'Falak musical rhythm - Expressive stage gesture',
    // Mobile unchanged. Desktop: Lower-right anchor, pulled out to flank.
    className: 'bottom-0 right-0 w-56 h-72 xs:w-64 xs:h-80 md:bottom-[5%] md:-right-[5%] lg:bottom-[8%] lg:-right-[2%] md:w-[28rem] md:h-[36rem] lg:w-[32rem] lg:h-[42rem]',
    rotation: '-rotate-6 hover:-rotate-3',
    outlineColor: '#E6DFF6', // Soft Lilac
    zIndex: 14,
  },
  {
    id: 'echo-7',
    src: '/assets/Landing/echoes/PranavSharmawithoutBG2.png',
    alt: 'Falak convergence celebration - Team spirit and victory',
    // Mobile unchanged. Desktop: Small floating accent in the lower-right flank (not center).
    className: 'bottom-4 left-1/2 -translate-x-1/2 w-64 h-48 xs:w-72 xs:h-56 md:bottom-auto md:top-[70%] md:left-auto md:right-[15%] md:translate-x-0 lg:top-[75%] lg:right-[18%] md:w-[16rem] md:h-[12rem] lg:w-[18rem] lg:h-[14rem]',
    rotation: 'rotate-2 hover:-rotate-1',
    outlineColor: '#FF3D7F', // Convergence Magenta outline
    zIndex: 30,
  },
];

export function StoryChapters() {
  const numberRef1 = useRef<HTMLSpanElement>(null);
  const numberRef2 = useRef<HTMLSpanElement>(null);
  const numberRef3 = useRef<HTMLSpanElement>(null);
  const numberRef4 = useRef<HTMLSpanElement>(null);
  const numbersSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refs = [
      { ref: numberRef1, target: 50, suffix: '+' },
      { ref: numberRef2, target: 120, suffix: 'k+' },
      { ref: numberRef3, target: 30, suffix: '+' },
      { ref: numberRef4, target: 72, suffix: '+' }
    ];
    
    const ctx = gsap.context(() => {
      refs.forEach(({ ref, target, suffix }) => {
        if (!ref.current) return;
        
        const counter = { val: 0 };
        
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: numbersSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            if (ref.current) {
              ref.current.innerText = Math.floor(counter.val) + suffix;
            }
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col w-full bg-midnight-indigo overflow-hidden">
      
      {/* SECTION 1: Echoes of Past (Real Cutouts with Locked Palette Outlines & Dominant Scale) */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center p-8 overflow-visible border-b border-silver/10 z-10">
        
        {/* Background Layer */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "url('/assets/Landing/echoesofpast.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Subtle overlay for legibility */}
        <div className="absolute inset-0 z-0 bg-midnight-indigo/50 pointer-events-none" />

        {/* 7 Cutout Collage Assets */}
        {ECHO_ASSETS.map((asset) => {
          // Sharp contour outline in locked palette color + offset shadow for stamped collage effect.
          // Note: Tone correction and overlays were removed per addendum.
          const outlineFilter = `drop-shadow(2px 0 0 ${asset.outlineColor}) drop-shadow(-2px 0 0 ${asset.outlineColor}) drop-shadow(0 2px 0 ${asset.outlineColor}) drop-shadow(0 -2px 0 ${asset.outlineColor}) drop-shadow(4px 6px 0 rgba(11, 15, 43, 0.75))`;

          return (
            <div
              key={asset.id}
              className={`absolute ${asset.className} ${asset.rotation} transition-all duration-300 ease-out hover:scale-105 pointer-events-auto select-none`}
              style={{ zIndex: asset.zIndex }}
            >
              <div className="relative w-full h-full">
                {/* Base cutout with contour outline */}
                <img
                  src={asset.src}
                  alt={asset.alt}
                  loading="lazy"
                  className="w-full h-full object-contain"
                  style={{
                    filter: outlineFilter,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Focal Content */}
        <div className="relative z-20 text-center max-w-2xl px-6 pointer-events-none">
          <h2 className="font-accent text-5xl md:text-7xl text-silver mb-6 drop-shadow-xl">
            Echoes of the Past
          </h2>
          <p className="font-mono text-sm md:text-base text-silver/90 max-w-md mx-auto leading-relaxed drop-shadow-md">
            A look back at last year's convergence. The scale, the energy, the moments that defined us.
          </p>
        </div>
      </section>

      {/* SECTION 2: Numbers */}
      <section ref={numbersSectionRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center p-8 border-b border-silver/10 overflow-hidden">
        
        {/* Background Layer */}
        <div 
          className="absolute inset-0 z-0"
          style={{ 
            backgroundImage: "url('/assets/Landing/FortheNumbers.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Subtle overlay for legibility */}
        <div className="absolute inset-0 z-0 bg-midnight-indigo/50 pointer-events-none" />

        <div className="relative z-10 text-center mb-16 md:mb-24">
          <h2 className="font-mono text-sm md:text-base uppercase tracking-widest text-[#FF3D7F] mb-4 drop-shadow-md">By The Numbers</h2>
          <div className="w-16 h-px bg-silver/50 mx-auto"></div>
        </div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-6xl px-4">
          <div className="flex flex-col items-center text-center">
            <span ref={numberRef1} style={{ fontFamily: 'Archivo, sans-serif' }} className="font-black text-5xl xs:text-6xl md:text-8xl tracking-tighter text-silver mb-2 drop-shadow-lg">0+</span>
            <span className="font-mono text-[10px] xs:text-xs md:text-sm text-silver/80 uppercase tracking-widest drop-shadow-md">Events</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span ref={numberRef2} style={{ fontFamily: 'Archivo, sans-serif' }} className="font-black text-5xl xs:text-6xl md:text-8xl tracking-tighter text-silver mb-2 drop-shadow-lg">0k+</span>
            <span className="font-mono text-[10px] xs:text-xs md:text-sm text-[#FF3D7F] uppercase tracking-widest drop-shadow-md">Attendees</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span ref={numberRef3} style={{ fontFamily: 'Archivo, sans-serif' }} className="font-black text-5xl xs:text-6xl md:text-8xl tracking-tighter text-silver mb-2 drop-shadow-lg">0+</span>
            <span className="font-mono text-[10px] xs:text-xs md:text-sm text-silver/80 uppercase tracking-widest drop-shadow-md">Colleges</span>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <span ref={numberRef4} style={{ fontFamily: 'Archivo, sans-serif' }} className="font-black text-5xl xs:text-6xl md:text-8xl tracking-tighter text-silver mb-2 drop-shadow-lg">0+</span>
            <span className="font-mono text-[10px] xs:text-xs md:text-sm text-[#FF3D7F] uppercase tracking-widest drop-shadow-md">Hours</span>
          </div>
        </div>
      </section>



    </div>
  );
}
