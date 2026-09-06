import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export function StoryChapters() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Chapter 1
  const chapter1Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: chapter1Progress } = useScroll({
    target: chapter1Ref,
    offset: ['start end', 'end start'],
  });

  // Sports easing: punchier
  const sportsScrub = useSpring(chapter1Progress, { stiffness: 400, damping: 25 });
  // Culture easing: softer
  const cultureScrub = useSpring(chapter1Progress, { stiffness: 40, damping: 25 }); 

  const sportsX = useTransform(sportsScrub, [0, 0.35, 0.65, 1], ['-100%', '0%', '0%', '-50%']);
  const sportsOpacity = useTransform(sportsScrub, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);

  const cultureX = useTransform(cultureScrub, [0, 0.35, 0.65, 1], ['100%', '0%', '0%', '50%']);
  const cultureOpacity = useTransform(cultureScrub, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);

  // Chapter 2
  const chapter2Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: chapter2Progress } = useScroll({
    target: chapter2Ref,
    offset: ['start end', 'end start'],
  });
  const numbersY = useTransform(chapter2Progress, [0, 0.35, 0.65, 1], [150, 0, 0, -150]);
  const numbersOpacity = useTransform(chapter2Progress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);

  // Chapter 3
  const chapter3Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: chapter3Progress } = useScroll({
    target: chapter3Ref,
    offset: ['start end', 'end start'],
  });
  
  const orangeX = useTransform(chapter3Progress, [0, 0.45, 0.55, 1], ['-80%', '0%', '0%', '80%']);
  const violetX = useTransform(chapter3Progress, [0, 0.45, 0.55, 1], ['80%', '0%', '0%', '-80%']);
  const magentaOpacity = useTransform(chapter3Progress, [0.35, 0.45, 0.55, 0.65], [0, 0.8, 0.8, 0]);
  const textScale = useTransform(chapter3Progress, [0, 0.35, 0.65, 1], [0.85, 1, 1, 1.15]);
  const textOpacity = useTransform(chapter3Progress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);

  // Chapter 4
  const chapter4Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: chapter4Progress } = useScroll({
    target: chapter4Ref,
    offset: ['start end', 'end start'],
  });
  const ctaY = useTransform(chapter4Progress, [0, 0.5], [100, 0]);
  const ctaOpacity = useTransform(chapter4Progress, [0, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="flex flex-col bg-[#0B0F2B] text-[#C0C0C0] w-full overflow-hidden">
      {/* Chapter 1 — The Split */}
      <section ref={chapter1Ref} className="relative h-[100vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        {/* Left Side: Sports */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[#0B0F2B] border-r border-white/10 flex flex-col items-center justify-center p-8 z-10 overflow-hidden">
          <motion.div 
            className="w-full max-w-md"
            style={{ x: sportsX, opacity: sportsOpacity }}
          >
            <h2 className="font-sans font-black text-6xl md:text-8xl tracking-tighter leading-[0.9] text-[#FF6A00] uppercase mb-8">
              Raw<br/>Power
            </h2>
            <div className="w-full aspect-[4/3] bg-white/5 border border-[#FF6A00]/20 flex items-center justify-center relative overflow-hidden">
              <span className="font-mono text-[#FF6A00]/50 tracking-widest text-center">[ ZUUM PLACEHOLDER ]</span>
              <div className="absolute inset-0 bg-[#FF6A00]/10 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Culture */}
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[#0B0F2B] flex flex-col items-center justify-center p-8 z-10 overflow-hidden">
          <motion.div 
            className="w-full max-w-md text-right flex flex-col items-end"
            style={{ x: cultureX, opacity: cultureOpacity }}
          >
            <h2 className="font-serif italic text-6xl md:text-8xl tracking-tight leading-[1.1] text-[#8A5CFF] mb-8">
              Pure<br/>Expression
            </h2>
            <div className="w-full aspect-[4/3] bg-white/5 border border-[#8A5CFF]/20 flex items-center justify-center relative overflow-hidden">
              <span className="font-mono text-[#8A5CFF]/50 tracking-widest text-center">[ SWIRLA PLACEHOLDER ]</span>
              <div className="absolute inset-0 bg-[#8A5CFF]/10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(138,92,255,0.2) 0, transparent 2px)', backgroundSize: '12px 12px' }}></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2 — The Numbers */}
      <section ref={chapter2Ref} className="relative h-[80vh] flex flex-col items-center justify-center p-8 border-b border-white/5">
        <motion.div 
          className="text-center mb-16"
          style={{ y: numbersY, opacity: numbersOpacity }}
        >
          <h2 className="font-mono text-sm uppercase tracking-widest text-white/50 mb-6">The Scale</h2>
          <div className="w-16 h-px bg-[#FF3D7F] mx-auto"></div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full max-w-5xl"
          style={{ y: numbersY, opacity: numbersOpacity }}
        >
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-8xl md:text-[10rem] tracking-tighter leading-[0.9] text-white mb-4">{"{{EVENT_COUNT}}"}</span>
            <span className="font-mono text-sm text-[#FF3D7F] uppercase tracking-widest">Events</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-8xl md:text-[10rem] tracking-tighter leading-[0.9] text-white mb-4">{"{{FOOTFALL}}"}</span>
            <span className="font-mono text-sm text-[#FF3D7F] uppercase tracking-widest">Footfall</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans font-black text-8xl md:text-[10rem] tracking-tighter leading-[0.9] text-white mb-4">{"{{DAY_COUNT}}"}</span>
            <span className="font-mono text-sm text-[#FF3D7F] uppercase tracking-widest">Days</span>
          </div>
        </motion.div>
      </section>

      {/* Chapter 3 — Convergence */}
      <section ref={chapter3Ref} className="relative h-[100vh] flex items-center justify-center overflow-hidden border-b border-white/5 p-8">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div 
            className="w-[120vw] md:w-[60vw] aspect-square rounded-full bg-[#FF6A00] opacity-20 blur-[100px] absolute"
            style={{ x: orangeX }}
          ></motion.div>
          <motion.div 
            className="w-[120vw] md:w-[60vw] aspect-square rounded-full bg-[#8A5CFF] opacity-20 blur-[100px] absolute"
            style={{ x: violetX }}
          ></motion.div>
          <motion.div 
            className="w-[60vw] md:w-[30vw] aspect-square rounded-full bg-[#FF3D7F] blur-[80px] absolute mix-blend-screen"
            style={{ opacity: magentaOpacity }}
          ></motion.div>
        </div>
        
        <motion.div 
          className="relative z-10 text-center max-w-2xl"
          style={{ scale: textScale, opacity: textOpacity }}
        >
          <h2 className="font-sans font-black tracking-tight leading-[1] text-5xl md:text-7xl text-white mb-8 uppercase">
            Where Worlds Collide
          </h2>
          <p className="font-mono text-sm md:text-base text-[#C0C0C0] leading-relaxed max-w-md mx-auto">
            Experience the unprecedented fusion of athletic dominance and artistic brilliance.
          </p>
        </motion.div>
      </section>

      {/* Chapter 4 — CTA handoff */}
      <section ref={chapter4Ref} className="relative py-32 flex flex-col items-center justify-center text-center px-6">
        <motion.div style={{ y: ctaY, opacity: ctaOpacity }} className="flex flex-col items-center">
          <h3 className="font-serif italic tracking-tight text-4xl md:text-6xl text-white mb-8">
            Ready to dive in?
          </h3>
          <p className="font-mono text-sm text-white/50 mb-12 max-w-md">
            Explore the individual tracks or grab your pass to witness the convergence.
          </p>
          <div className="w-px h-32 bg-gradient-to-b from-white/20 to-transparent"></div>
        </motion.div>
      </section>
    </div>
  );
}
