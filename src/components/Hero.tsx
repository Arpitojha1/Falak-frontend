import * as motion from 'motion/react-client';
import { LogoImage } from './LogoImage';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-midnight-indigo pt-16 md:pt-24">
      {/* Kite Motif Background - Fine animated line-art strings drifting */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-hidden">
        <svg className="absolute w-[200vw] h-[200vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" xmlns="http://www.w3.org/2000/svg">
          {[...Array(8)].map((_, i) => (
             <motion.path
               key={`line-${i}`}
               d={`M 0 ${400 + i * 200} Q ${800 + i * 100} ${100 - i * 150} 3000 ${300 + i * 100}`}
               stroke={i % 3 === 0 ? "#FF3D7F" : "#C0C0C0"}
               strokeWidth={i % 3 === 0 ? "1" : "0.5"}
               fill="none"
               strokeDasharray="4 12"
               initial={{ strokeDashoffset: 0 }}
               animate={{ strokeDashoffset: -160 }}
               transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
             />
          ))}
          {[...Array(6)].map((_, i) => (
             <motion.path
               key={`line-rev-${i}`}
               d={`M 3000 ${500 + i * 150} Q ${1500 - i * 100} ${800 + i * 100} 0 ${200 + i * 200}`}
               stroke="#C0C0C0"
               strokeWidth="0.5"
               fill="none"
               strokeDasharray="2 8"
               initial={{ strokeDashoffset: 0 }}
               animate={{ strokeDashoffset: 100 }}
               transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
             />
          ))}
        </svg>
      </div>

      {/* Floating Kites Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[
          { left: '15%', top: '60%', scale: 1.2, delay: 0 },
          { left: '75%', top: '30%', scale: 0.7, delay: 2 },
          { left: '35%', top: '85%', scale: 0.9, delay: 5 },
          { left: '85%', top: '70%', scale: 0.5, delay: 1 },
          { left: '50%', top: '20%', scale: 0.6, delay: 3 },
          { left: '10%', top: '15%', scale: 0.4, delay: 4 },
        ].map((pos, i) => (
          <motion.div
            key={`kite-${i}`}
            className="absolute"
            style={{ left: pos.left, top: pos.top }}
            initial={{ y: 0, x: 0, rotate: -15, opacity: 0.05 }}
            animate={{ 
              y: [-20, -120, -20],
              x: [-10, 40, -10],
              rotate: [-15, 10, -15],
              opacity: [0.05, 0.25, 0.05]
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pos.delay
            }}
          >
            <svg width={100 * pos.scale} height={180 * pos.scale} viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10 L80 60 L50 110 L20 60 Z" stroke={i % 2 === 0 ? "#FF3D7F" : "#C0C0C0"} strokeWidth="1.5" fill="none" />
              <line x1="50" y1="10" x2="50" y2="110" stroke={i % 2 === 0 ? "#FF3D7F" : "#C0C0C0"} strokeWidth="1" />
              <line x1="20" y1="60" x2="80" y2="60" stroke={i % 2 === 0 ? "#FF3D7F" : "#C0C0C0"} strokeWidth="1" />
              <path d="M50 110 Q 70 130 50 150 T 50 180" stroke={i % 2 === 0 ? "#FF3D7F" : "#C0C0C0"} strokeWidth="1" fill="none" strokeDasharray="3 4" />
            </svg>
          </motion.div>
        ))}
      </div>
      
      {/* Grain overlay for vintage feel */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      ></div>

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
          <p className="font-accent text-2xl md:text-3xl text-silver/90 tracking-wide text-center max-w-lg px-6">
            The Convergence Awaits.
          </p>
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
