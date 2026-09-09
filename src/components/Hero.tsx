import { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';
import { LogoImage } from './LogoImage';

export function Hero() {
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2026-10-12T00:00:00');
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    setDaysRemaining(days > 0 ? days : 0);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center bg-midnight-indigo pt-16 md:pt-24 overflow-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-[position:center_top] md:bg-center"
        style={{
          backgroundImage: "url('/assets/Landing/Landing_background.png')"
        }}
      />
      {/* Subtle Scrim for contrast */}
      <div className="absolute inset-0 z-0 bg-midnight-indigo/40 md:bg-midnight-indigo/30 mix-blend-multiply" />


      <div className="relative z-10 flex flex-col items-center pointer-events-none w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex justify-center"
        >
          <LogoImage className="h-16 xs:h-20 sm:h-28 md:h-52 lg:h-72 max-w-full object-contain" />
        </motion.div>

        <motion.div
          className="mt-6 md:mt-12 flex flex-col items-center gap-3 md:gap-4 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-[1px] w-16 xs:w-24 bg-vermillion-red/50"></div>
          {/* Tagline: Culture headline role — Baloo 2 */}
          <p className="font-accent text-lg xs:text-xl sm:text-2xl md:text-3xl text-silver/90 tracking-wide text-center max-w-lg px-4 xs:px-6">
            The Convergence Awaits.
          </p>
          {/* Data label: tag/timestamp role — Space Mono */}
          <p className="font-mono text-[10px] xs:text-xs sm:text-sm text-silver/60 uppercase tracking-[0.3em]">
            Est. 2026
          </p>
          <p className="font-mono text-[10px] xs:text-xs sm:text-sm text-[#FF3D7F] uppercase tracking-widest mt-1 md:mt-2 border border-[#FF3D7F]/30 px-3 xs:px-4 py-1.5 md:py-2 rounded-full bg-midnight-indigo/50 backdrop-blur-sm whitespace-nowrap">
            {daysRemaining} Days to Falak
          </p>
        </motion.div>
      </div>

      {/* Jaali fine linework borders on the edge */}
      <div className="absolute left-2 md:left-4 top-2 md:top-4 bottom-2 md:bottom-4 w-2 md:w-4 border-l border-t border-b border-silver/20"
        style={{ borderImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(192, 192, 192, 0.2) 5px, rgba(192, 192, 192, 0.2) 10px) 1' }}></div>
      <div className="absolute right-2 md:right-4 top-2 md:top-4 bottom-2 md:bottom-4 w-2 md:w-4 border-r border-t border-b border-silver/20"
        style={{ borderImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(192, 192, 192, 0.2) 5px, rgba(192, 192, 192, 0.2) 10px) 1' }}></div>
    </section>
  );
}
