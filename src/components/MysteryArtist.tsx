import { motion } from 'framer-motion';

export function MysteryArtist({ revealImage }: { revealImage?: string }) {
  return (
    <div className="relative w-full max-w-[280px] h-[320px] flex items-center justify-center">
      {/* Pulsing glow behind the whole collage */}
      {!revealImage && (
        <motion.div 
          className="absolute inset-0 bg-silver rounded-full mix-blend-screen blur-3xl z-0"
          initial={{ opacity: 0.1 }}
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      {revealImage ? (
        <img src={revealImage} alt="Mystery Artist" className="w-full h-full object-cover object-bottom z-10 relative" />
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Collage Image with torn edge (clip-path) and drop shadow */}
          <div className="relative w-[85%] h-[90%] -rotate-[5deg] drop-shadow-xl z-10">
            <img 
              src="/assets/footerimg.jpg" 
              alt="Mystery Artist Silhouette" 
              className="w-full h-full object-cover object-center"
              style={{
                // Jagged, hand-drawn-feeling polygon for a torn edge look
                clipPath: 'polygon(5% 2%, 25% 0%, 50% 4%, 75% 1%, 95% 5%, 100% 20%, 96% 40%, 98% 60%, 95% 80%, 90% 98%, 70% 95%, 45% 100%, 20% 96%, 4% 98%, 0% 80%, 3% 60%, 0% 40%, 4% 20%)'
              }}
            />
          </div>

          {/* Scattered Question Marks */}
          {/* 1. Top left, small */}
          <div className="absolute top-[8%] left-[2%] -rotate-[20deg] text-2xl font-mono text-silver z-20 font-bold drop-shadow-md">
            ?
          </div>
          
          {/* 2. Top right, medium, with sticker backing */}
          <div className="absolute top-[12%] right-[0%] rotate-[15deg] z-20">
             <div className="absolute inset-0 bg-champagne-pearl scale-150 rotate-[5deg] skew-x-6 drop-shadow-sm" style={{ clipPath: 'polygon(10% 0, 100% 10%, 90% 100%, 0 90%)' }}></div>
             <div className="relative text-3xl font-mono text-midnight-indigo font-bold">?</div>
          </div>
          
          {/* 3. Middle left, large */}
          <div className="absolute top-[45%] left-[-8%] rotate-[40deg] text-4xl font-mono text-champagne-pearl z-20 font-bold drop-shadow-md">
            ?
          </div>
          
          {/* 4. Bottom right, medium-small */}
          <div className="absolute bottom-[22%] right-[-5%] -rotate-[10deg] text-xl font-mono text-silver z-20 font-bold drop-shadow-md">
            ?
          </div>
          
          {/* 5. Bottom left, with sticker backing */}
          <div className="absolute bottom-[10%] left-[10%] rotate-[25deg] z-20">
             <div className="absolute inset-0 bg-silver scale-[1.6] -rotate-[12deg] skew-y-3 drop-shadow-sm" style={{ clipPath: 'polygon(0 15%, 85% 0, 100% 85%, 15% 100%)' }}></div>
             <div className="relative text-2xl font-mono text-midnight-indigo font-bold">?</div>
          </div>

          {/* Flavor text */}
          <div className="absolute -right-6 top-1/3 font-mono text-xs uppercase tracking-widest text-silver/60 rotate-90 origin-left z-0">
            Reveals soon.
          </div>
        </div>
      )}
    </div>
  );
}
