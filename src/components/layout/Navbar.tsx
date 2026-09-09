import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { User, Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const accountRef = useRef<HTMLDivElement | null>(null);

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
      const threshold = location.pathname === '/' ? (window.innerWidth < 768 ? 40 : window.innerHeight * 0.8) : 20;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setAccountMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTrackNavigation = (route: string) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (typeof (window as any).__triggerTrackTransition === 'function') {
      (window as any).__triggerTrackTransition(route);
    } else {
      navigate(route);
    }
  };

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 flex items-center justify-between px-4 xs:px-6 md:px-12 py-2.5 xs:py-3 md:py-4 transition-[background-color,backdrop-filter,border-color] duration-300 ease-out ${
          scrolled || mobileMenuOpen ? 'bg-midnight-indigo/90 backdrop-blur-md border-b border-silver/10 shadow-lg' : 'bg-midnight-indigo/0 backdrop-blur-none border-b border-transparent'
        }`}
        initial={false}
      >
        {/* Left (Desktop): Events, Schedule, Profile */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {/* EVENTS Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="font-mono text-xs md:text-sm uppercase tracking-widest text-silver hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 py-1"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <span>Events</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-white' : 'text-silver/60'}`} 
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="w-64 bg-midnight-indigo/95 backdrop-blur-xl border border-silver/15 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_0_1px_rgba(192,192,192,0.06)] rounded-lg p-2 flex flex-col gap-1"
                  >
                    <div className="px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-silver/40 border-b border-silver/10 mb-0.5">
                      Festival Tracks
                    </div>

                    {/* Cultural Option */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleTrackNavigation('/cultural'); }}
                      className="flex items-center justify-between p-2.5 rounded-md hover:bg-aurora-violet/10 border border-transparent hover:border-aurora-violet/30 transition-all duration-200 text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-aurora-violet shadow-[0_0_8px_#8A5CFF]" />
                        <div className="flex flex-col">
                          <span className="font-sans font-bold text-sm text-silver group-hover:text-white uppercase transition-colors">
                            Cultural
                          </span>
                          <span className="font-mono text-[11px] text-silver/50 group-hover:text-aurora-violet/80 transition-colors">
                            Stage, Arts & Performance
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-silver/30 group-hover:text-aurora-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </button>

                    {/* Sports Option */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleTrackNavigation('/sports'); }}
                      className="flex items-center justify-between p-2.5 rounded-md hover:bg-electric-orange/10 border border-transparent hover:border-electric-orange/30 transition-all duration-200 text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-electric-orange shadow-[0_0_8px_#FF6A00]" />
                        <div className="flex flex-col">
                          <span className="font-sans font-bold text-sm text-silver group-hover:text-white uppercase transition-colors">
                            Sports
                          </span>
                          <span className="font-mono text-[11px] text-silver/50 group-hover:text-electric-orange/80 transition-colors">
                            Athletics, Arena & Esports
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-silver/30 group-hover:text-electric-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Schedule Link */}
          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `font-mono text-xs md:text-sm uppercase tracking-widest transition-colors duration-200 py-1 ${
                isActive ? 'text-white font-medium' : 'text-silver hover:text-white'
              }`
            }
          >
            Schedule
          </NavLink>

          {/* Profile Icon with Dropdown */}
          <div className="relative" ref={accountRef}>
            <button 
              className="text-silver hover:text-white transition-colors duration-200 flex items-center p-1 cursor-pointer"
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              aria-label="Account Menu"
            >
              {avatar ? (
                <div 
                  className="w-8 h-8 rounded-full border border-silver/40 flex items-center justify-center bg-deep-plum/80 text-sm font-display shadow-[0_0_8px_rgba(0,0,0,0.3)] overflow-hidden"
                >
                  {avatar.length <= 1 ? avatar : <img src={avatar} alt="Profile" className="w-full h-full object-cover" />}
                </div>
              ) : (
                <User size={20} strokeWidth={1.5} />
              )}
            </button>
            
            <AnimatePresence>
              {accountMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-3 w-48 bg-midnight-indigo/95 backdrop-blur-xl border border-silver/15 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(192,192,192,0.06)] rounded-md overflow-hidden flex flex-col p-1.5 z-50"
                >
                  <NavLink 
                    to="/profile" 
                    onClick={() => setAccountMenuOpen(false)} 
                    className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-silver hover:text-white hover:bg-white/5 rounded transition-colors text-left"
                  >
                    Profile
                  </NavLink>
                  <NavLink 
                    to="/passes" 
                    onClick={() => setAccountMenuOpen(false)} 
                    className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-silver hover:text-white hover:bg-white/5 rounded transition-colors text-left"
                  >
                    Passes
                  </NavLink>
                  <button 
                    onClick={() => setAccountMenuOpen(false)} 
                    className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-silver/60 hover:text-white hover:bg-white/5 rounded transition-colors text-left cursor-pointer"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Left: Menu Toggle */}
        <div className="flex items-center md:hidden">
          <button 
            className="w-10 h-10 -ml-1.5 flex items-center justify-center rounded-lg text-silver hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={1.75} /> : <Menu size={24} strokeWidth={1.75} />}
          </button>
        </div>

        {/* Right (Desktop & Mobile): Logo & Quick Action */}
        <div className="flex items-center gap-2.5 xs:gap-3">
          {/* Quick Passes pill on mobile */}
          {!mobileMenuOpen && (
            <NavLink
              to="/passes"
              className="md:hidden font-mono text-[10px] xs:text-[11px] uppercase tracking-wider text-convergence-magenta border border-convergence-magenta/40 px-2.5 py-1 rounded-full bg-convergence-magenta/10 active:bg-convergence-magenta/25 transition-all font-semibold"
            >
              Passes
            </NavLink>
          )}

          <NavLink
            to="/"
            aria-label="Go to the Falak 26 home page"
            title="Falak 26 home"
            className="flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-convergence-magenta"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LogoImage className="h-10 xs:h-11 md:h-12 transition-transform active:scale-95" />
          </NavLink>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay / Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-midnight-indigo/98 backdrop-blur-2xl flex flex-col pt-18 xs:pt-20 px-4 xs:px-6 pb-8 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 xs:gap-5 max-w-md w-full mx-auto my-auto py-2">
              {/* Profile Bar in Mobile */}
              <div className="flex items-center justify-between p-3 xs:p-4 bg-white/[0.03] border border-silver/10 rounded-xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 xs:w-10 xs:h-10 rounded-full border border-silver/30 flex items-center justify-center bg-deep-plum/80 text-sm font-display text-silver overflow-hidden shrink-0">
                    {avatar ? (
                      avatar.length <= 1 ? avatar : <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={18} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-xs uppercase tracking-wider text-silver truncate">Account</span>
                    <span className="font-sans text-[11px] text-silver/50 truncate">Falak '26 Attendee</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <NavLink
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-mono text-xs uppercase tracking-wider px-2.5 xs:px-3 py-1.5 bg-silver/10 hover:bg-silver/20 text-silver hover:text-white rounded-md transition-colors"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/passes"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-mono text-xs uppercase tracking-wider px-2.5 xs:px-3 py-1.5 bg-convergence-magenta/15 hover:bg-convergence-magenta/25 text-convergence-magenta border border-convergence-magenta/30 rounded-md transition-colors font-medium"
                  >
                    Passes
                  </NavLink>
                </div>
              </div>

              {/* Tracks Section */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-silver/40 px-1">Festival Tracks</span>
                
                {/* Cultural */}
                <button
                  onClick={() => handleTrackNavigation('/cultural')}
                  className="flex items-center justify-between p-3.5 xs:p-4 bg-white/[0.02] hover:bg-aurora-violet/10 border border-silver/10 hover:border-aurora-violet/40 rounded-xl transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-aurora-violet shadow-[0_0_10px_#8A5CFF] shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-lg xs:text-xl text-silver group-hover:text-white uppercase transition-colors">
                        Cultural
                      </span>
                      <span className="font-mono text-[11px] text-silver/50 group-hover:text-aurora-violet/80 transition-colors">
                        Stage, Arts & Performance
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-silver/40 group-hover:text-aurora-violet group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </button>

                {/* Sports */}
                <button
                  onClick={() => handleTrackNavigation('/sports')}
                  className="flex items-center justify-between p-3.5 xs:p-4 bg-white/[0.02] hover:bg-electric-orange/10 border border-silver/10 hover:border-electric-orange/40 rounded-xl transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-electric-orange shadow-[0_0_10px_#FF6A00] shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-sans font-bold text-lg xs:text-xl text-silver group-hover:text-white uppercase transition-colors">
                        Sports
                      </span>
                      <span className="font-mono text-[11px] text-silver/50 group-hover:text-electric-orange/80 transition-colors">
                        Athletics, Arena & Esports
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="text-silver/40 group-hover:text-electric-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </button>
              </div>

              {/* Program & Passes Section */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-silver/40 px-1">Program & Access</span>
                
                <div className="grid grid-cols-2 gap-2 xs:gap-3">
                  <NavLink
                    to="/schedule"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex flex-col p-3.5 rounded-xl border transition-all ${
                        isActive 
                          ? 'bg-silver/10 border-silver/30 text-white' 
                          : 'bg-white/[0.02] border-silver/10 text-silver hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <span className="font-sans font-bold text-base uppercase">Schedule</span>
                    <span className="font-mono text-[10px] text-silver/40 mt-0.5">Timeline & Stages</span>
                  </NavLink>

                  <NavLink
                    to="/passes"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex flex-col p-3.5 rounded-xl border transition-all ${
                        isActive 
                          ? 'bg-convergence-magenta/20 border-convergence-magenta/40 text-white' 
                          : 'bg-convergence-magenta/[0.06] border-convergence-magenta/25 text-silver hover:text-white hover:bg-convergence-magenta/15'
                      }`
                    }
                  >
                    <span className="font-sans font-bold text-base uppercase text-convergence-magenta">Passes</span>
                    <span className="font-mono text-[10px] text-convergence-magenta/60 mt-0.5">Tickets & Entry</span>
                  </NavLink>
                </div>
              </div>

              {/* Footer info in drawer */}
              <div className="mt-2 pt-3 border-t border-silver/10 flex items-center justify-between text-silver/40 font-mono text-[10px] uppercase tracking-widest px-1">
                <span>Oct 12–14, 2026</span>
                <span>MIT Bengaluru</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
