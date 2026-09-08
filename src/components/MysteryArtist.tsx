import { motion } from 'framer-motion';

export function MysteryArtist({ revealImage }: { revealImage?: string }) {
  return (
    <div className="relative w-full max-w-[280px] h-[320px] flex items-end">
      {revealImage ? (
        <img src={revealImage} alt="Mystery Artist" className="w-full h-full object-cover object-bottom" />
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-end">
          {/* Silhouette cropped/bleeding off the frame edge */}
          <div className="absolute inset-x-0 bottom-0 top-12 bg-[#0B0F2B] rounded-t-full border-t border-silver/30 overflow-hidden flex items-end justify-center">
             {/* Actual silhouette shape placeholder */}
             <svg className="w-[85%] h-[90%] text-[#0B0F2B] drop-shadow-md" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor">
               <path d="M20,100 C20,70 35,50 50,50 C65,50 80,70 80,100 Z" stroke="rgba(192,192,192,0.4)" strokeWidth="1.5"/>
               <circle cx="50" cy="30" r="15" stroke="rgba(192,192,192,0.4)" strokeWidth="1.5" />
             </svg>
          </div>
          {/* Question mark with pulsing glow */}
          <motion.div 
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-mono text-silver z-10"
            animate={{ 
              textShadow: [
                "0px 0px 4px rgba(192,192,192,0)", 
                "0px 0px 20px rgba(192,192,192,0.8)", 
                "0px 0px 4px rgba(192,192,192,0)"
              ] 
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            ?
          </motion.div>
          
          {/* Flavor text */}
          <div className="absolute -right-4 top-1/4 font-mono text-xs uppercase tracking-widest text-silver/60 rotate-90 origin-left">
            Reveals soon.
          </div>
        </div>
      )}
    </div>
  );
}
