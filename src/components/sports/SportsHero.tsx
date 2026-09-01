export function SportsHero() {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center bg-midnight-indigo overflow-hidden pt-20 pb-16">
      {/* Layer 1: Grunge Grain & Halftone */}
      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-silver) 1.5px, transparent 0)',
          backgroundSize: '12px 12px'
        }}
      />
      
      {/* Layer 2: Massive Diagonal Orange Stripe (Torn poster vibe) */}
      <div className="absolute top-[10%] -right-[20%] w-[150%] h-[50vh] bg-electric-orange -rotate-12 opacity-90 z-0 border-y-8 border-midnight-indigo overflow-hidden shadow-2xl flex items-center">
        {/* Halftone inside the stripe */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, var(--color-midnight-indigo) 2px, transparent 0)',
            backgroundSize: '8px 8px'
          }}
        />
        {/* Marquee text in background */}
        <div className="whitespace-nowrap font-headline-sports-section text-[15rem] text-midnight-indigo/10 uppercase -translate-y-4">
          FALAK SPORTS FALAK SPORTS FALAK SPORTS
        </div>
      </div>

      {/* Layer 3: Main Content Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-0 mt-10">
        
        {/* Mascot Slot (Left on desktop, bottom on mobile visually but rendered first in DOM for tab order unless changed) */}
        <div className="w-full lg:w-5/12 order-2 lg:order-1 relative group mt-16 lg:mt-0">
          <div className="relative -rotate-3 transition-transform duration-300 group-hover:-rotate-1">
             {/* Acid Lime Offset Shadow / Border */}
             <div className="absolute inset-0 bg-acid-lime translate-x-4 translate-y-4 -z-10 border-4 border-midnight-indigo" />
             
             {/* TODO: Sports mascot asset goes here */}
             <div className="aspect-[4/5] w-full max-w-md bg-silver border-4 border-midnight-indigo flex flex-col items-center justify-center p-8 shadow-2xl relative overflow-hidden">
               {/* Masking tape effect */}
               <div className="absolute -top-6 right-8 w-32 h-12 bg-silver/60 rotate-6 backdrop-blur-sm shadow-sm" />
               <div className="absolute -bottom-6 left-8 w-32 h-12 bg-silver/60 -rotate-3 backdrop-blur-sm shadow-sm" />
               
               <h3 className="text-midnight-indigo font-headline-sports-section text-3xl uppercase text-center border-b-4 border-midnight-indigo pb-3">
                 MASCOT ASSET
               </h3>
               <p className="font-label-sports text-midnight-indigo/70 mt-4 text-center text-lg leading-tight uppercase">
                 Drop halftone player <br/> cutout here
               </p>
             </div>
          </div>
        </div>

        {/* Huge Asymmetric Typography (Right on desktop) */}
        <div className="w-full lg:w-7/12 order-1 lg:order-2 flex flex-col items-start lg:-ml-10">
          
          <img
            src="/assets/logo-transparent/falak_transparent-7.png"
            alt="Falak 26"
            className="h-20 md:h-28 object-contain mb-8 -rotate-2 drop-shadow-[4px_4px_0_rgba(11,15,43,1)]"
          />
          
          <h1 className="font-display text-[22vw] sm:text-[18vw] lg:text-[160px] leading-[0.8] uppercase flex flex-col relative z-20 text-silver drop-shadow-[8px_8px_0_rgba(11,15,43,1)]">
            <span className="block transform -rotate-2 origin-bottom-left tracking-tighter">GAME</span>
            <span className="block text-acid-lime transform rotate-2 origin-top-left tracking-tighter sm:ml-12 mt-[-0.1em] relative z-30">
              ON
              {/* Star-burst accent */}
              <svg className="absolute -right-4 md:-right-12 -top-8 w-16 h-16 md:w-24 md:h-24 text-electric-orange animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                <path fill="currentColor" d="M50 0 L56 36 L92 18 L70 48 L100 70 L64 74 L80 100 L50 78 L20 100 L36 74 L0 70 L30 48 L8 18 L44 36 Z" />
              </svg>
            </span>
          </h1>

          <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-30 w-full sm:w-auto -rotate-1">
            <a
              href="#events"
              className="group flex items-center justify-center px-10 py-5 bg-electric-orange text-midnight-indigo font-headline-sports-section uppercase text-xl tracking-widest border-4 border-midnight-indigo shadow-[6px_6px_0_0_rgba(198,255,0,1)] hover:shadow-[2px_2px_0_0_rgba(198,255,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              EXPLORE EVENTS
              <span className="ml-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
