import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoImage } from './LogoImage';
import { MysteryArtist } from './MysteryArtist';

const navItems = [
  { num: '01', label: 'Passes', route: '/passes', id: 'passes' },
  { num: '02', label: 'Support', route: '/support#faq', id: 'support', image: '/assets/footer/supporticons.png' },
  { num: '03', label: 'Contact', route: '/support#contact', id: 'contact', image: '/assets/footer/contactIcons.png' },
  { num: '04', label: 'About', route: '/about', id: 'about', image: '/assets/footer/AboutIcons.png' },
];

const getRouteColors = (pathname: string) => {
  if (pathname.startsWith('/sports')) return { primary: '#FF6A00', detail: '#C6FF00' };
  if (pathname.startsWith('/cultural')) return { primary: '#8A5CFF', detail: '#E6DFF6' };
  return { primary: '#FF3D7F', detail: '#FF3D7F' }; // Default/Convergence
};

export function Footer() {
  const location = useLocation();
  const { primary, detail } = getRouteColors(location.pathname);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <footer className="bg-midnight-indigo border-t border-silver/10 pt-16 pb-24 md:pb-16 px-6 md:px-12 mt-20 relative overflow-visible">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 relative z-10 overflow-visible">

        {/* Left side ??" Mystery Artist block */}
        <div className="flex flex-col">
          <div className="opacity-80 mb-12">
            <LogoImage className="h-16 md:h-20" />
          </div>
          <MysteryArtist />
        </div>

        {/* Right side ??" Nav list */}
        <div className="flex flex-col justify-end w-full max-w-md ml-auto overflow-visible">
          <ul className="flex flex-col w-full overflow-visible" role="navigation">
            {navItems.map((item, i) => {
              const isHovered = hoveredIndex === i;
              const isAnyHovered = hoveredIndex !== null;
              const dimClass = isAnyHovered && !isHovered ? 'opacity-60' : 'opacity-100';
              const zClass = isHovered ? 'z-50' : 'z-10';

              return (
                <li key={item.num} className={`relative block border-b border-silver/20 transition-opacity duration-300 overflow-visible ${dimClass} ${zClass}`}>
                  <Link
                    to={item.route}
                    className="group relative flex items-center w-full py-6 outline-none overflow-visible"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(i)}
                    onBlur={() => setHoveredIndex(null)}
                  >
                    {/* Pill Background */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 bg-champagne-pearl rounded-full z-0"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      )}
                    </AnimatePresence>

                    <span className="font-mono text-silver/40 w-12 text-sm z-10 relative">{item.num}</span>

                    <div className="relative flex-1 flex items-center h-12 px-4 overflow-visible">
                      {/* Label */}
                      <span
                        className="relative z-10 font-sans text-3xl md:text-4xl transition-colors duration-300 font-medium tracking-wide"
                        style={{ color: isHovered ? primary : '#C0C0C0', fontFamily: 'Archivo, sans-serif' }}
                      >
                        {item.label}
                      </span>

                      {/* Asset Pop-out */}
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ease-out"
                        style={{
                          width: item.id === 'passes' ? '240px' : '160px',
                          height: item.id === 'passes' ? '240px' : '160px',
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? 'translateY(-50%) translateX(-24px)' : 'translateY(-50%) translateX(16px)',
                          zIndex: -1
                        }}
                      >
                        {item.id === 'passes' ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            {/* Sports ticket */}
                            <img
                              src="/assets/sportsAssets/SportsTicketsBase.png"
                              alt="Sports Ticket"
                              className="absolute w-28 md:w-36 transition-all duration-500 ease-out drop-shadow-2xl"
                              style={{
                                transform: isHovered ? 'translate(-40px, 20px) rotate(-16deg)' : 'translate(-10px, 0px) rotate(-8deg)',
                                transitionDelay: '0ms',
                                zIndex: 1
                              }}
                            />
                            {/* Cultural ticket */}
                            <img
                              src="/assets/culturalAssets/CulturalTicketsBase.png"
                              alt="Cultural Ticket"
                              className="absolute w-28 md:w-36 transition-all duration-500 ease-out drop-shadow-2xl"
                              style={{
                                transform: isHovered ? 'translate(40px, -20px) rotate(12deg)' : 'translate(10px, 0px) rotate(6deg)',
                                transitionDelay: '60ms',
                                zIndex: 2
                              }}
                            />
                            {/* Landing ticket */}
                            <img
                              src="/assets/Landing/ticketsBase.png"
                              alt="Convergence Ticket"
                              className="absolute w-28 md:w-36 transition-all duration-500 ease-out drop-shadow-2xl"
                              style={{
                                transform: isHovered ? 'translate(0px, 0px) rotate(0deg) scale(1.1)' : 'translate(0px, 0px) rotate(0deg)',
                                transitionDelay: '120ms',
                                zIndex: 3
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full p-4">
                            <DuotoneImage src={item.image!} color={primary} alt={item.label} />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-silver/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="font-mono text-silver/40 text-xs">
          © 2026 FALAK FESTIVAL. ALL RIGHTS RESERVED.
        </p>
        <div className="font-accent text-silver/40 text-sm">
          Made for the Convergence
        </div>
      </div>
    </footer>
  );
}

function DuotoneImage({ src, color, alt }: { src: string; color: string; alt: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-2xl"
        style={{ filter: 'grayscale(1) contrast(1.1)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: color, mixBlendMode: 'color' }}
      />
    </div>
  );
}
