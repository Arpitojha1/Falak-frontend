import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

export function CultureFooter() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/schedule' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Passes', href: '/schedule' },
    { name: 'Support', href: '#' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <footer className="w-full bg-midnight-indigo pt-20 pb-24 md:pb-16 px-6 md:px-12 relative overflow-hidden border-t-2 border-aurora-violet/40">
      {/* Carpet-weave subtle texture overlay (replaces Sports' halftone) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(138,92,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(138,92,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        {/* Left side: Logo + tagline + socials */}
        <div className="lg:col-span-7 flex flex-col items-start gap-8">
          <Link
            to="/cultural"
            className="inline-block transition-opacity hover:opacity-80 p-4 border border-aurora-violet/30 rounded-lg shadow-[0_4px_20px_rgba(138,92,255,0.15)]"
          >
            <img
              src="/assets/logo-transparent/falak_transparent-7.png"
              alt="Falak Culture"
              className="h-12 md:h-16 object-contain"
            />
          </Link>

          <p className="font-accent font-bold text-champagne-pearl text-3xl md:text-5xl leading-tight max-w-lg mt-4">
            Heritage alive. <br />
            <span className="text-aurora-violet">Spirit ablaze.</span>
          </p>

          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-aurora-violet text-midnight-indigo rounded-full
                border border-champagne-pearl/30
                hover:bg-soft-lilac hover:scale-105
                transition-all duration-300
                shadow-[0_2px_12px_rgba(138,92,255,0.3)]"
              aria-label="Instagram"
            >
              <Instagram size={22} strokeWidth={2.5} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-aurora-violet text-midnight-indigo rounded-full
                border border-champagne-pearl/30
                hover:bg-soft-lilac hover:scale-105
                transition-all duration-300
                shadow-[0_2px_12px_rgba(138,92,255,0.3)]"
              aria-label="Twitter / X"
            >
              <Twitter size={22} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Right side: Navigation links */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:items-end">
          <div className="flex flex-col gap-2 w-full lg:w-auto border-l-2 lg:border-l-0 lg:border-r-2 border-aurora-violet/40 pl-6 lg:pl-0 lg:pr-6 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-accent font-bold text-champagne-pearl hover:text-aurora-violet
                  hover:translate-x-2 lg:hover:-translate-x-2
                  transition-all duration-300
                  uppercase tracking-widest text-2xl lg:text-right py-2
                  border-b border-champagne-pearl/10 last:border-0"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-6 border-t border-champagne-pearl/20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-aurora-violet font-accent font-bold text-xl tracking-widest uppercase">
            {/* Mandala rosette accent (replaces Sports' star-burst) */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-[spin_12s_linear_infinite]">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1" />
              <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="0.6" />
              <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            </svg>
            <span>संस्कृति</span>
          </div>
          <p className="font-sans font-medium tracking-widest text-silver/60 text-xs uppercase">
            © 2026 FALAK FESTIVAL. ALL RIGHTS RESERVED.
          </p>
        </div>

        <div
          className="font-accent font-extrabold text-7xl text-champagne-pearl/[0.06] select-none tracking-tighter leading-none -mb-4 hidden md:block"
        >
          FALAK '26
        </div>
      </div>
    </footer>
  );
}
