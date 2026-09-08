import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoImage } from './LogoImage';
import { MysteryArtist } from './MysteryArtist';

const navItems = [
  { num: '01', label: 'Passes', route: '/passes', icon: TicketIcon },
  { num: '02', label: 'Support', route: '/support#faq', icon: SupportIcon },
  { num: '03', label: 'Contact', route: '/support#contact', icon: ContactIcon },
  { num: '04', label: 'About', route: '/about', icon: AboutIcon },
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
    <footer className="bg-midnight-indigo border-t border-silver/10 pt-16 pb-24 md:pb-16 px-6 md:px-12 mt-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 relative z-10">
        
        {/* Left side ??" Mystery Artist block */}
        <div className="flex flex-col">
          <div className="opacity-80 mb-12">
            <LogoImage className="h-16 md:h-20" />
          </div>
          <MysteryArtist />
        </div>
        
        {/* Right side ??" Nav list */}
        <div className="flex flex-col justify-end w-full max-w-md ml-auto">
          <ul className="flex flex-col w-full" role="navigation">
            {navItems.map((item, i) => {
              const isHovered = hoveredIndex === i;
              const isAnyHovered = hoveredIndex !== null;
              const dimClass = isAnyHovered && !isHovered ? 'opacity-60' : 'opacity-100';
              
              return (
                <li key={item.num} className={`relative block border-b border-silver/20 transition-opacity duration-300 ${dimClass}`}>
                  <Link 
                    to={item.route}
                    className="group relative flex items-center w-full py-6 outline-none"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(i)}
                    onBlur={() => setHoveredIndex(null)}
                  >
                    <span className="font-mono text-silver/40 w-12 text-sm z-10 relative">{item.num}</span>
                    
                    <div className="relative flex-1 flex items-center h-12 px-4">
                      {/* Pill Background */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            className="absolute inset-y-0 left-[-1rem] right-[-1rem] bg-champagne-pearl rounded-full z-0"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        )}
                      </AnimatePresence>
                      
                      {/* Label */}
                      <span 
                        className="relative z-10 font-sans text-3xl md:text-4xl transition-colors duration-300 font-medium tracking-wide" 
                        style={{ color: isHovered ? primary : '#C0C0C0', fontFamily: 'Archivo, sans-serif' }}
                      >
                        {item.label}
                      </span>

                      {/* Icon */}
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute right-0 z-10 flex items-center justify-center pointer-events-none"
                            style={{ color: primary }}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 10, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
                          >
                            <item.icon detailColor={detail} />
                          </motion.div>
                        )}
                      </AnimatePresence>
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

function TicketIcon({ detailColor }: { detailColor: string }) {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
      <path d="M4 12c1.5 0 1.5-4 0-4M20 12c-1.5 0-1.5-4 0-4" />
      <rect x="7" y="7" width="3" height="3" fill={detailColor} stroke="none" />
      <rect x="14" y="14" width="3" height="3" fill={detailColor} stroke="none" />
    </svg>
  );
}

function SupportIcon({ detailColor }: { detailColor: string }) {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      <text x="12" y="15" fontSize="11" fontFamily="monospace" textAnchor="middle" fill={detailColor} stroke="none">?</text>
    </svg>
  );
}

function ContactIcon({ detailColor }: { detailColor: string }) {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
      <circle cx="11" cy="13" r="2.5" fill={detailColor} stroke="none" />
    </svg>
  );
}

function AboutIcon({ detailColor }: { detailColor: string }) {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 12L12 22L22 12L12 2Z" />
      <path d="M2 12H22M12 2V22" stroke={detailColor} strokeDasharray="2 2" />
    </svg>
  );
}
