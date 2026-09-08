import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LogoImage } from '../LogoImage';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState(localStorage.getItem('falak_avatar') || null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setAvatar(localStorage.getItem('falak_avatar'));
    };
    window.addEventListener('falak_avatar_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('falak_avatar_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleTrackNavigation = (route: string, colorClass: string) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    (window as any).__triggerTrackTransition?.(route);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled || mobileMenuOpen ? 'bg-midnight-indigo/90 backdrop-blur-md border-b border-silver/10' : 'bg-midnight-indigo/0 backdrop-blur-none border-b border-transparent'
        }`}
        initial={false}
      >
        {/* Left: Logo */}
        <NavLink to="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
          <LogoImage className="h-8 md:h-10" />
        </NavLink>

        {/* Center-right: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-10 ml-auto mr-8">
          {/* EVENTS Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <button 
              className="font-mono text-sm uppercase tracking-widest text-silver hover:text-white transition-colors cursor-pointer"
            >
              Events
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-40 bg-[#0B0F2B] border border-silver/10 shadow-xl rounded-sm overflow-hidden flex flex-col"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); handleTrackNavigation('/cultural', 'bg-aurora-violet'); }}
                    className="px-4 py-3 font-mono text-sm text-[#C0C0C0] hover:text-[#8A5CFF] hover:bg-white/5 transition-all duration-200 text-left group"
                  >
                    <span className="group-hover:underline decoration-2 underline-offset-4 transition-all">Cultural</span>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleTrackNavigation('/sports', 'bg-electric-orange'); }}
                    className="px-4 py-3 font-mono text-sm text-[#C0C0C0] hover:text-[#FF6A00] hover:bg-white/5 transition-all duration-200 text-left group"
                  >
                    <span className="group-hover:underline decoration-2 underline-offset-4 transition-all">Sports</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `font-mono text-sm uppercase tracking-widest transition-colors duration-200 ${
                isActive ? 'text-convergence-magenta' : 'text-silver hover:text-white'
              }`
            }
          >
            Schedule
          </NavLink>
          
          <NavLink
            to="/passes"
            className={({ isActive }) =>
              `font-mono text-sm uppercase tracking-widest transition-colors duration-200 ${
                isActive ? 'text-convergence-magenta' : 'text-silver hover:text-white'
              }`
            }
          >
            Passes
          </NavLink>
        </div>

        {/* Right: Profile & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <button 
              className="text-silver hover:text-white transition-colors duration-200 flex items-center"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
            >
              {avatar ? (
                <div 
                  className="w-8 h-8 rounded-full border-[1.5px] border-silver flex items-center justify-center bg-deep-plum/80 text-sm font-display shadow-[0_0_8px_rgba(255,61,127,0.2)]"
                >
                  {avatar}
                </div>
              ) : (
                <User size={24} strokeWidth={1.5} />
              )}
            </button>
            
            <AnimatePresence>
              {accountMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full right-0 mt-4 w-48 bg-[#0B0F2B] border border-silver/10 shadow-xl rounded-sm overflow-hidden flex flex-col"
                >
                  <NavLink to="/profile" onClick={() => setAccountMenuOpen(false)} className="px-4 py-3 font-mono text-sm text-[#C0C0C0] hover:text-white hover:bg-white/5 transition-colors text-left">
                    Profile
                  </NavLink>
                  <NavLink to="/my-passes" onClick={() => setAccountMenuOpen(false)} className="px-4 py-3 font-mono text-sm text-[#C0C0C0] hover:text-white hover:bg-white/5 transition-colors text-left">
                    My Passes
                  </NavLink>
                  <button onClick={() => setAccountMenuOpen(false)} className="px-4 py-3 font-mono text-sm text-[#C0C0C0] hover:text-white hover:bg-white/5 transition-colors text-left">
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            className="md:hidden text-silver hover:text-white transition-colors duration-200 flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-midnight-indigo flex flex-col pt-24 px-8 pb-8 md:hidden"
          >
            <div className="flex flex-col gap-8 mt-8">
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-silver/50">Events</span>
                <button
                  onClick={() => handleTrackNavigation('/cultural', 'bg-aurora-violet')}
                  className="font-sans font-black text-4xl text-[#C0C0C0] hover:text-[#8A5CFF] text-left uppercase transition-colors"
                >
                  Cultural
                </button>
                <button
                  onClick={() => handleTrackNavigation('/sports', 'bg-electric-orange')}
                  className="font-sans font-black text-4xl text-[#C0C0C0] hover:text-[#FF6A00] text-left uppercase transition-colors"
                >
                  Sports
                </button>
              </div>

              <div className="h-px w-full bg-silver/10 my-4" />

              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `font-sans font-bold text-3xl uppercase transition-colors ${
                    isActive ? 'text-convergence-magenta' : 'text-silver hover:text-white'
                  }`
                }
              >
                Schedule
              </NavLink>
              
              <NavLink
                to="/passes"
                className={({ isActive }) =>
                  `font-sans font-bold text-3xl uppercase transition-colors ${
                    isActive ? 'text-convergence-magenta' : 'text-silver hover:text-white'
                  }`
                }
              >
                Passes
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
