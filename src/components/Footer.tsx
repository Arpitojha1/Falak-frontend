import { Link } from 'react-router-dom';
import { LogoImage } from './LogoImage';

export function Footer() {
  return (
    <footer className="bg-midnight-indigo border-t border-silver/10 pt-16 pb-24 md:pb-16 px-6 md:px-12 mt-20 relative overflow-hidden">
      {/* Jaali subtle background pattern could be implemented via a CSS pattern or SVG. We'll keep it simple CSS for now or just an absolute div. */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '24px 24px'
      }}></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        <div>
          <div className="opacity-80 mb-6">
            <LogoImage className="h-16 md:h-24" />
          </div>
          <p className="font-sans text-silver/60 max-w-sm text-sm">
            The convergence of Sports and Culture. A festival where the sky is not the limit, it's just the beginning.
          </p>
        </div>
        
        <div className="flex flex-col md:items-end gap-4">
          <h3 className="font-mono text-silver uppercase tracking-widest text-sm mb-2 opacity-80">Support & Info</h3>
          <Link to="#" className="font-sans text-silver/60 hover:text-convergence-magenta transition-colors">FAQs</Link>
          <Link to="#" className="font-sans text-silver/60 hover:text-convergence-magenta transition-colors">Contact Us</Link>
          <Link to="#" className="font-sans text-silver/60 hover:text-convergence-magenta transition-colors">Code of Conduct</Link>
          <Link to="#" className="font-sans text-silver/60 hover:text-convergence-magenta transition-colors">Privacy Policy</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-silver/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
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
