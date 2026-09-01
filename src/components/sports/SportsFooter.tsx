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
    <footer className="w-full bg-midnight-indigo pt-20 pb-24 md:pb-16 px-6 md:px-12 relative overflow-hidden border-t-8 border-electric-orange">
      {/* Halftone dot texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(192, 192, 192, 0.15) 1px, transparent 0)',
          backgroundSize: '12px 12px',
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        {/* Left side: Logo + Socials */}
        <div className="lg:col-span-7 flex flex-col items-start gap-8">
          <Link to="/sports" className="inline-block transition-opacity hover:opacity-80 bg-silver p-4 border-4 border-midnight-indigo shadow-[8px_8px_0_0_#FF6A00] -rotate-2">
            <img
              src="/assets/logo-transparent/falak_transparent-1.png"
              alt="Falak Sports"
              className="h-12 md:h-16 object-contain"
            />
          </Link>
          
          <p className="font-headline-sports-section text-silver uppercase text-3xl md:text-5xl tracking-tighter leading-none max-w-lg mt-4">
            Push past limits. <br />
            <span className="text-electric-orange">Claim victory.</span>
          </p>

          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-electric-orange text-midnight-indigo border-2 border-midnight-indigo hover:bg-acid-lime hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_rgba(11,15,43,1)]"
              aria-label="Instagram"
            >
              <Instagram size={24} strokeWidth={2.5} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 bg-electric-orange text-midnight-indigo border-2 border-midnight-indigo hover:bg-acid-lime hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_rgba(11,15,43,1)]"
              aria-label="Twitter / X"
            >
              <Twitter size={24} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* Right side: Navigation links */}
        <div className="lg:col-span-5 flex flex-col justify-start lg:items-end">
          <div className="flex flex-col gap-2 w-full lg:w-auto border-l-4 lg:border-l-0 lg:border-r-4 border-electric-orange pl-6 lg:pl-0 lg:pr-6 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="font-headline-sports-section text-silver hover:text-acid-lime hover:translate-x-2 lg:hover:-translate-x-2 transition-transform uppercase tracking-widest text-2xl lg:text-right py-2 border-b-2 border-silver/10 last:border-0"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-6 border-t-4 border-silver flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-electric-orange font-headline-sports-section text-xl tracking-widest uppercase">
            {/* Subtle star-burst accent SVG */}
            <svg className="w-5 h-5 fill-current animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <span>// GAME ON //</span>
          </div>
          <p className="font-label-sports font-bold tracking-widest text-silver/60 text-xs uppercase">
            © 2026 FALAK FESTIVAL. ALL RIGHTS RESERVED.
          </p>
        </div>
        
        <div className="font-display text-7xl text-silver/10 select-none tracking-tighter leading-none -mb-4 hidden md:block">
          FALAK '26
        </div>
      </div>
    </footer>
  );
}
