import React from 'react';
import { PassConfig, Track } from '../../data/passes.config';

interface TicketShellProps {
  pass: PassConfig;
}

const SKIN_THEMES = {
  A: {
    base: '#0B0F2B',
    stubBase: '#0B0F2B',
    pop: '#FF3D7F',
    secondary: '#C0C0C0',
    headlineFont: '"Baloo 2", sans-serif',
    bodyFont: '"Barlow", sans-serif',
    tierFont: '"Fraunces", serif',
    tagStripFont: '"Barlow", sans-serif'
  },
  B: {
    base: '#0B0F2B',
    stubBase: 'linear-gradient(135deg, #0B0F2B 0%, #1C0B46 100%)',
    pop: '#FF3D7F',
    secondary: '#8A5CFF', // Gold #FFB627 also used
    accent: '#FFB627',
    headlineFont: '"Baloo 2", sans-serif',
    bodyFont: '"Barlow", sans-serif',
    tierFont: '"Fraunces", serif',
    tagStripFont: '"Barlow", sans-serif'
  },
  C: {
    base: '#0B0F2B',
    stubBase: '#0B0F2B',
    pop: '#FF6A00',
    secondary: '#0057FF',
    accent: '#D7263D',
    headlineFont: '"Anton", sans-serif',
    bodyFont: '"Barlow", sans-serif',
    tierFont: '"Barlow", sans-serif',
    tagStripFont: '"Space Mono", monospace'
  },
  D: {
    base: '#1C0B46',
    stubBase: '#1C0B46',
    pop: '#8A5CFF',
    secondary: '#0057FF',
    accent: '#EDE4D3',
    headlineFont: '"Baloo 2", sans-serif',
    bodyFont: '"Barlow", sans-serif',
    tierFont: '"Oxanium", sans-serif',
    tagStripFont: '"Oxanium", sans-serif'
  },
  E: {
    base: '#0B0F2B',
    stubBase: '#0B0F2B',
    pop: '#FF3D7F',
    secondary: '#8A5CFF', // Will be dynamic for dots
    headlineFont: '"Baloo 2", sans-serif',
    bodyFont: '"Barlow", sans-serif',
    tierFont: '"Fraunces", serif',
    tagStripFont: '"Space Mono", monospace'
  }
};

const DOT_COLORS: Record<Track, string> = {
  proshow: '#FF3D7F',
  cultural: '#8A5CFF',
  sports: '#FF6A00',
  esports: '#8A5CFF'
};

const TRACK_ICONS: Record<Track, string> = {
  proshow: '★',
  cultural: '🎭',
  sports: '🎯',
  esports: '🎮'
};

function MarqueeTicker({ text, color }: { text: string; color: string }) {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-1 border-y border-opacity-20 flex items-center" style={{ backgroundColor: color, borderColor: '#fff' }}>
      <div className="inline-block animate-[marquee_10s_linear_infinite] text-[8px] font-mono font-black uppercase tracking-[0.3em] text-white">
        {Array(10).fill(`${text} ▸ `).join('')}
      </div>
    </div>
  );
}

function AccessIconStrip({ includes, skin, popColor }: { includes: Track[], skin: string, popColor: string }) {
  const allTracks: Track[] = ['proshow', 'cultural', 'sports', 'esports'];

  return (
    <div className="flex gap-2 my-4">
      {allTracks.map(track => {
        const isIncluded = includes.includes(track);
        let activeColor = popColor;
        
        // Skin E specifies distinct dot colors for each track
        if (skin === 'E' && isIncluded) {
          activeColor = DOT_COLORS[track];
        }

        return (
          <div 
            key={track}
            className="flex flex-col items-center gap-1"
            style={{ opacity: isIncluded ? 1 : 0.3 }}
          >
            <div 
              className="w-8 h-8 rounded flex items-center justify-center text-sm"
              style={{ 
                backgroundColor: isIncluded ? activeColor : 'transparent',
                border: `1px solid ${isIncluded ? activeColor : '#ffffff55'}`,
                color: isIncluded ? '#fff' : '#ffffff88'
              }}
            >
              {TRACK_ICONS[track]}
            </div>
            <span className="text-[6px] uppercase font-mono tracking-wider text-white" style={{ opacity: isIncluded ? 0.9 : 0.5 }}>
              {track}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function BarcodeStrip() {
  const bars = [3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2, 4, 1];
  return (
    <div className="flex items-end gap-0.5 h-10 my-2">
      {bars.map((w, i) => (
        <div
          key={i}
          style={{
            width: `${w}px`,
            height: `${20 + (i % 4) * 4}px`,
            background: '#ffffff',
            opacity: 0.85 + (i % 2) * 0.15,
          }}
        />
      ))}
    </div>
  );
}

export function TicketShell({ pass }: TicketShellProps) {
  const theme = SKIN_THEMES[pass.skin];
  const isMahe = pass.audience === 'MAHE';

  return (
    <div 
      className="relative flex flex-col md:flex-row w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl select-none"
      style={{ fontFamily: theme.bodyFont, color: '#fff' }}
    >
      {/* ── Main Body Area ── */}
      <div 
        className="flex-1 relative p-6 flex flex-col justify-between"
        style={{ backgroundColor: theme.base }}
      >
        <MarqueeTicker text="FALAK '26" color={theme.base} />
        
        <div className="mt-6 mb-4 relative z-10">
          <div className="flex justify-between items-start mb-2">
            <span 
              className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/20"
              style={{ fontFamily: theme.tagStripFont, backgroundColor: isMahe ? theme.pop : 'transparent' }}
            >
              {pass.audience}
            </span>
            <span 
              className="text-[10px] font-mono tracking-widest"
              style={{ color: theme.secondary }}
            >
              // {pass.sku}
            </span>
          </div>

          <h3 
            className="text-4xl md:text-5xl uppercase font-black leading-[0.9] my-4"
            style={{ fontFamily: theme.headlineFont, color: theme.pop }}
          >
            {pass.displayName}
          </h3>

          <AccessIconStrip includes={pass.includes} skin={pass.skin} popColor={theme.pop} />
          
        </div>

        {/* Circular Stamp / Badge */}
        <div 
          className="absolute right-6 bottom-16 opacity-20 rotate-[-15deg] pointer-events-none"
          style={{ color: theme.pop }}
        >
          <div className="w-32 h-32 rounded-full border-4 flex items-center justify-center border-current p-2">
            <div className="w-full h-full rounded-full border border-dashed border-current flex items-center justify-center text-center">
               <span className="text-xl font-bold uppercase" style={{ fontFamily: theme.tierFont }}>
                 Valid<br/>{pass.validity.split(' ')[0]}
               </span>
            </div>
          </div>
        </div>

        <MarqueeTicker text="ADMIT ONE" color={theme.base} />
      </div>

      {/* ── Perforated Tear Line ── */}
      <div 
        className="relative flex flex-row md:flex-col items-center justify-center w-full md:w-8 h-8 md:h-auto z-20"
        style={{ background: theme.base }}
      >
        <div className="w-full h-0.5 md:w-0.5 md:h-full border-t-2 md:border-t-0 md:border-l-2 border-dashed border-white/30" />
        {/* Cutouts */}
        <div className="absolute top-1/2 -left-3 md:left-1/2 md:-top-3 w-6 h-6 rounded-full bg-black -translate-y-1/2 md:-translate-y-0 md:-translate-x-1/2 z-30" />
        <div className="absolute top-1/2 -right-3 md:left-1/2 md:-bottom-3 w-6 h-6 rounded-full bg-black -translate-y-1/2 md:-translate-y-0 md:-translate-x-1/2 z-30" />
      </div>

      {/* ── Stub Section ── */}
      <div 
        className="w-full md:w-64 p-6 flex flex-col justify-between items-center text-center"
        style={{ background: theme.stubBase }}
      >
        <div className="w-full">
           <p className="text-xs uppercase tracking-widest text-white/60 mb-1" style={{ fontFamily: theme.tagStripFont }}>Total Amount</p>
           <p className="text-4xl md:text-5xl font-black" style={{ fontFamily: theme.tierFont }}>{pass.price}</p>
        </div>

        <div className="my-6">
          <BarcodeStrip />
          <p className="text-[10px] font-mono tracking-widest text-white/50">{pass.sku}</p>
        </div>

        <div className="w-full mt-4">
           <button 
              className="w-full py-3 px-4 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: theme.pop, color: theme.base === '#EDE4D3' ? '#000' : '#fff', fontFamily: theme.tagStripFont }}
           >
             Purchase Pass
           </button>
        </div>
      </div>
    </div>
  );
}
