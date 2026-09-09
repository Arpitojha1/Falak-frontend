import { useState } from 'react';
import { motion } from 'framer-motion';

export function MysteryArtist() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHoverCount((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Hover 1 -> Image 2
  // Hover 2 -> Image 1
  // Alternates thereafter on each new hover
  const activeHoverImage = hoverCount % 2 === 1 ? 2 : 1;

  return (
    <div className="relative w-full flex-1 min-h-[200px] md:min-h-[300px] z-0">
      <div
        className="
          absolute 
          bottom-[-100px] 
          md:bottom-[-160px] 
          left-[-40px] 
          md:left-[-80px] 
          w-[320px] 
          sm:w-[450px] 
          md:w-[600px] 
          lg:w-[750px] 
          h-[400px] 
          sm:h-[550px] 
          md:h-[700px] 
          lg:h-[850px] 
          cursor-pointer
        "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        tabIndex={0}
        role="img"
        aria-label="Mystery Artist"
      >
        <motion.img
          src="/assets/footer/MysteryArtist-3.png"
          alt="Mystery Artist"
          className="absolute inset-0 w-full h-full object-contain object-left-bottom pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />

        <motion.img
          src="/assets/footer/MysteryArtist-2.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain object-left-bottom pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && activeHoverImage === 2 ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />

        <motion.img
          src="/assets/footer/MysteryArtist-1.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain object-left-bottom pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered && activeHoverImage === 1 ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
