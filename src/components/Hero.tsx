import * as motion from 'motion/react-client';
import { LogoImage } from './LogoImage';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-midnight-indigo pt-16 md:pt-24">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center md:bg-center"
        style={{
          backgroundImage: "url('/assets/Landing/Landing_Hero_BG.png')"
        }}
      />
      {/* Subtle Scrim for contrast */}
      <div className="absolute inset-0 z-0 bg-midnight-indigo/30 mix-blend-multiply" />


      <div className="relative z-10 flex flex-col items-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <LogoImage className="h-28 md:h-52 lg:h-72" />
        </motion.div>
        
        <motion.div 
          className="mt-6 md:mt-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-[1px] w-24 bg-vermillion-red/50"></div>
          {/* Tagline: Culture headline role — Baloo 2 */}
          <p className="font-accent text-2xl md:text-3xl text-silver/90 tracking-wide text-center max-w-lg px-6">
            The Convergence Awaits.
          </p>
          {/* Data label: tag/timestamp role — Space Mono */}
          <p className="font-mono text-sm text-silver/60 uppercase tracking-[0.3em]">
            Est. 2026
          </p>
        </motion.div>
      </div>

      {/* Jaali fine linework borders on the edge */}
      <div className="absolute left-4 top-4 bottom-4 w-4 border-l border-t border-b border-silver/20 hidden md:block"
           style={{ borderImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(192, 192, 192, 0.2) 5px, rgba(192, 192, 192, 0.2) 10px) 1' }}></div>
      <div className="absolute right-4 top-4 bottom-4 w-4 border-r border-t border-b border-silver/20 hidden md:block"
           style={{ borderImage: 'repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(192, 192, 192, 0.2) 5px, rgba(192, 192, 192, 0.2) 10px) 1' }}></div>
    </section>
  );
}
