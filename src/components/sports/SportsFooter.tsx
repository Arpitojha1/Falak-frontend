import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

export function SportsFooter() {
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/schedule' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Passes', href: '/schedule' },
    { name: 'Support', href: '#' },
    { name: 'Profile', href: '/profile' },
  ];

  return (
    <footer className="w-full bg-midnight-indigo border-t border-silver/10 pt-16 pb-24 md:pb-16 px-6 md:px-12 relative overflow-hidden">
      {/* Halftone dot texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        {/* Left side: Logo + Socials */}
        <div className="flex flex-col items-start gap-4">
          <Link to="/sports" className="inline-block transition-opacity hover:opacity-90">
            <img
              src="/assets/logo-transparent/falak_transparent-7.png"
              alt="Falak Sports"
              className="h-16 object-contain"
            />
          </Link>
          <p className="font-sans text-silver/60 max-w-sm text-sm">
            The high-octane sports arena of Falak '26. Rise above, push past your limits, and claim victory.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver hover:text-electric-orange transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver hover:text-electric-orange transition-colors"
              aria-label="Twitter / X"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Right side: Navigation links */}
        <div className="flex flex-col md:items-end justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-label-sports text-silver hover:text-electric-orange uppercase tracking-wider text-sm transition-colors py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-silver/10 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
        <p className="font-mono text-silver/40 text-xs">
          © 2026 FALAK FESTIVAL. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-2 text-electric-orange/80 font-mono text-xs tracking-widest uppercase">
          {/* Subtle star-burst accent SVG */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
          <span>// GAME ON</span>
        </div>
      </div>
    </footer>
  );
}
