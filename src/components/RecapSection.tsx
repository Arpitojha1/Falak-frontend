import * as motion from 'motion/react-client';
import { useState } from 'react';
import MorphSlider from './MorphSlider';

const CAROUSEL_SLIDES = [
  {
    id: '01',
    year: '2025',
    title: 'Neon Garba Nights',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1549556204-7a30cf7f4577?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: '02',
    year: '2025',
    title: 'Midnight Gully Cricket',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1624526267942-ab0f0b644a49?auto=format&fit=crop&q=80&w=1600'
  },
  {
    id: '03',
    year: '2024',
    title: 'Sufi Echoes',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1600'
  }
];

export function RecapSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = CAROUSEL_SLIDES[activeIndex];

  const sliderItems = CAROUSEL_SLIDES.map(s => ({ image: s.image, caption: s.title }));

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 z-20 flex flex-col justify-center">
      {/* Dusk Gradient Wash Backdrop (Plum to Violet) */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-plum via-[#2D1B4E] to-midnight-indigo -z-10"></div>
      
      {/* Jaali Latticework Background Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none -z-10"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M20 0L40 20L20 40L0 20Z\' fill=\'none\' stroke=\'%23FFFFFF\' stroke-width=\'1\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'8\' fill=\'none\' stroke=\'%23FFFFFF\' stroke-width=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '40px 40px'
        }}
      ></div>

      {/* Background grain */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay -z-10"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      ></div>

      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-convergence-magenta"></div>
              {/* Eyebrow label: tag/data-label role — Space Mono */}
              <span className="font-mono text-convergence-magenta uppercase tracking-widest text-sm">Flashback</span>
            </div>
            {/* Section headline: Sports headline role — Anton */}
            <h2 className="font-display text-5xl md:text-7xl uppercase text-silver">
              Last Falak
            </h2>
          </div>
          {/* Body copy — Barlow */}
          <p className="font-sans text-silver/70 max-w-sm">
            Glimpses from the previous editions. The convergence of energy, art, and motion.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto w-full"
        >
          {/* Ganjifa-card Layout: Single large bordered frame */}
          <div className="relative aspect-[4/5] md:aspect-[21/9] p-3 md:p-4 border-2 border-silver/30 bg-midnight-indigo/70 backdrop-blur-md transition-all duration-500 hover:border-convergence-magenta/50 overflow-hidden shadow-2xl">
            
            {/* Subtle 'Jaali' (Latticework) SVG Overlay Texture - Background of Carousel Card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-25">
              <svg 
                className="w-full h-full text-silver" 
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <pattern id="card-jaali-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                    {/* Central 8-pointed star (Mughal Khatam Jaali) */}
                    <path 
                      d="M24 6 L29 19 L42 24 L29 29 L24 42 L19 29 L6 24 L19 19 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="0.8" 
                    />
                    
                    {/* Interlocking 45-degree diamond frame */}
                    <rect 
                      x="15" 
                      y="15" 
                      width="18" 
                      height="18" 
                      transform="rotate(45 24 24)" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="0.6" 
                      strokeOpacity="0.7" 
                    />
                    
                    {/* Central floral rosette motif */}
                    <circle cx="24" cy="24" r="4" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="24" cy="24" r="1.5" fill="currentColor" />

                    {/* Geometric strapwork connecting neighboring tiles */}
                    <line x1="24" y1="0" x2="24" y2="6" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="24" y1="42" x2="24" y2="48" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="0" y1="24" x2="6" y2="24" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="42" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="0.8" />

                    {/* Diagonal connector bars */}
                    <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="48" y1="0" x2="38" y2="10" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="48" y1="48" x2="38" y2="38" stroke="currentColor" strokeWidth="0.75" />
                    <line x1="0" y1="48" x2="10" y2="38" stroke="currentColor" strokeWidth="0.75" />

                    {/* Corner rosettes at tile intersections */}
                    <circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="48" cy="0" r="4" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="48" cy="48" r="4" fill="none" stroke="currentColor" strokeWidth="0.75" />
                    <circle cx="0" cy="48" r="4" fill="none" stroke="currentColor" strokeWidth="0.75" />

                    <circle cx="0" cy="0" r="1.5" fill="currentColor" />
                    <circle cx="48" cy="0" r="1.5" fill="currentColor" />
                    <circle cx="48" cy="48" r="1.5" fill="currentColor" />
                    <circle cx="0" cy="48" r="1.5" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#card-jaali-lattice)" />
              </svg>
            </div>

            {/* Inner decorative frame (Jaali inspired border) */}
            <div className="absolute inset-3 md:inset-4 z-20 pointer-events-none border border-silver/30" style={{
               boxShadow: 'inset 0 0 20px rgba(11, 15, 43, 0.7)'
            }}></div>

            {/* Truck art frame stamp - Top Left */}
            <div className="absolute top-0 left-0 -translate-x-2 -translate-y-2 md:-translate-x-4 md:-translate-y-4 w-12 h-12 md:w-16 md:h-16 bg-midnight-indigo border border-convergence-magenta flex items-center justify-center rotate-3 z-30 shadow-lg transition-all duration-300">
              <div className="border border-silver/30 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transform -rotate-3">
                {/* Year stamp: data label — Space Mono */}
                <span className="font-mono text-xs md:text-sm text-convergence-magenta">{activeSlide.year}</span>
              </div>
            </div>

            {/* Category stamp: data label — Space Mono */}
            <div className="absolute bottom-0 right-0 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 px-4 py-2 md:px-6 md:py-3 bg-midnight-indigo border border-vermillion-red z-30 shadow-lg transform -rotate-2 transition-all duration-300">
              <span className="font-mono text-xs md:text-sm text-silver uppercase tracking-wider">{activeSlide.category}</span>
            </div>

            {/* Centered Artwork with MorphSlider */}
            <div className="relative w-full h-full overflow-hidden group z-10">
              <div className="absolute inset-0 z-0 grayscale-[20%] contrast-110 brightness-90 transition-all duration-700">
                <MorphSlider
                  items={sliderItems}
                  transition="melt"
                  intensity={0.65}
                  aberration={0.5}
                  drift={0.4}
                  autoplay={false}
                  showCaptions={false}
                  showControls={true}
                  showIndicators={true}
                  overlayColor="#0B0F2B"
                  onIndexChange={setActiveIndex}
                />
              </div>

              {/* Subtle Jaali (Latticework) Screen overlay over the slider image */}
              <div className="absolute inset-0 pointer-events-none z-12 mix-blend-overlay opacity-20">
                <svg className="w-full h-full text-silver" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="100%" height="100%" fill="url(#card-jaali-lattice)" />
                </svg>
              </div>

              {/* Heavy Grain overlay on the slider */}
              <div className="absolute inset-0 mix-blend-overlay z-15 pointer-events-none opacity-30"
                   style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
              </div>

              {/* Bottom Gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-indigo/90 via-midnight-indigo/20 to-transparent pointer-events-none z-10"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-20 pointer-events-none flex flex-col justify-end h-full">
                {/* Slide counter: data label — Space Mono */}
                <motion.span 
                  key={`id-${activeSlide.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-mono text-silver/70 text-sm md:text-base mb-2 block"
                >
                  {activeSlide.id} / 03
                </motion.span>
                {/*
                  Event title: role-aware headline.
                  Sports / Esports category → Anton (--font-headline-sports)
                  Culture / Music / other  → Baloo 2 (--font-headline-culture)
                */}
                <motion.h3 
                  key={`title-${activeSlide.title}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`text-4xl md:text-6xl text-silver leading-tight drop-shadow-lg ${
                    activeSlide.category === 'Sports' || activeSlide.category === 'Esports'
                      ? 'font-display uppercase'
                      : 'font-accent'
                  }`}
                >
                  {activeSlide.title}
                </motion.h3>
              </div>
            </div>

          </div>
        </motion.div>
        
        {/* Decorative divider */}
        <div className="mt-24 md:mt-32 flex justify-center opacity-30">
           <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
             <line x1="0" y1="10" x2="80" y2="10" stroke="#C0C0C0" strokeWidth="1" strokeDasharray="4 4" />
             <rect x="90" y="5" width="10" height="10" transform="rotate(45 90 5)" border="1" stroke="#C0C0C0" strokeWidth="1" />
             <line x1="120" y1="10" x2="200" y2="10" stroke="#C0C0C0" strokeWidth="1" strokeDasharray="4 4" />
           </svg>
        </div>

      </div>
    </section>
  );
}
