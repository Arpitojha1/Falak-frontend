import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function StoryChapters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={containerRef} className="flex flex-col bg-[#0B0F2B] text-[#C0C0C0] w-full overflow-hidden">
      {/* Chapter 1 — The Split */}
      <section className="relative min-h-[80vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        {/* Left Side: Sports */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[#0B0F2B] border-r border-white/10 flex flex-col items-center justify-center p-8 z-10">
          <div className="w-full max-w-md">
            <h2 className="font-sans font-black text-5xl md:text-7xl text-[#FF6A00] uppercase mb-8">
              Raw Power
            </h2>
            <div className="w-full aspect-[4/3] bg-white/5 border border-[#FF6A00]/20 flex items-center justify-center relative overflow-hidden">
              <span className="font-mono text-[#FF6A00]/50 tracking-widest">[ ZUUM PLACEHOLDER ]</span>
              <div className="absolute inset-0 bg-[#FF6A00]/10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
            </div>
          </div>
        </div>

        {/* Right Side: Culture */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#0B0F2B] flex flex-col items-center justify-center p-8 z-10">
          <div className="w-full max-w-md text-right flex flex-col items-end">
            <h2 className="font-serif italic text-5xl md:text-7xl text-[#8A5CFF] mb-8">
              Pure Expression
            </h2>
            <div className="w-full aspect-[4/3] bg-white/5 border border-[#8A5CFF]/20 flex items-center justify-center relative overflow-hidden">
              <span className="font-mono text-[#8A5CFF]/50 tracking-widest">[ SWIRLA PLACEHOLDER ]</span>
              <div className="absolute inset-0 bg-[#8A5CFF]/10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(138,92,255,0.2) 0, transparent 2px)', backgroundSize: '12px 12px' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 2 — The Numbers */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center p-8 border-b border-white/5">
        <div className="text-center mb-12">
          <h2 className="font-mono text-sm uppercase tracking-widest text-white/50 mb-4">The Scale</h2>
          <div className="w-16 h-px bg-[#FF3D7F] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl">
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-6xl md:text-8xl text-white mb-2">{"{{EVENT_COUNT}}"}</span>
            <span className="font-mono text-sm text-[#FF3D7F] uppercase tracking-widest">Events</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-6xl md:text-8xl text-white mb-2">{"{{FOOTFALL}}"}</span>
            <span className="font-mono text-sm text-[#FF3D7F] uppercase tracking-widest">Footfall</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-6xl md:text-8xl text-white mb-2">{"{{DAY_COUNT}}"}</span>
            <span className="font-mono text-sm text-[#FF3D7F] uppercase tracking-widest">Days</span>
          </div>
        </div>
      </section>

      {/* Chapter 3 — Convergence */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5 p-8">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-[80vw] md:w-[40vw] aspect-square rounded-full bg-[#FF6A00] opacity-20 blur-[100px] absolute -translate-x-1/4"></div>
          <div className="w-[80vw] md:w-[40vw] aspect-square rounded-full bg-[#8A5CFF] opacity-20 blur-[100px] absolute translate-x-1/4"></div>
          <div className="w-[40vw] md:w-[20vw] aspect-square rounded-full bg-[#FF3D7F] opacity-40 blur-[80px] absolute mix-blend-screen"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-2xl">
          <h2 className="font-sans font-bold text-4xl md:text-6xl text-white mb-6">
            Where Worlds Collide
          </h2>
          <p className="font-mono text-sm text-[#C0C0C0] leading-relaxed">
            Experience the unprecedented fusion of athletic dominance and artistic brilliance.
          </p>
        </div>
      </section>

      {/* Chapter 4 — CTA handoff */}
      <section className="relative py-24 flex flex-col items-center justify-center text-center px-6">
        <h3 className="font-serif italic text-3xl md:text-5xl text-white mb-8">
          Ready to dive in?
        </h3>
        <p className="font-mono text-sm text-white/50 mb-12 max-w-md">
          Explore the individual tracks or grab your pass to witness the convergence.
        </p>
        <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
      </section>
    </div>
  );
}
