// CompareTable — Falak '26
// MAHE vs NON-MAHE pass comparison table with natural horizontal scroll peek on mobile

import { motion } from 'motion/react';
import { Check, X } from 'lucide-react';
import { PASS_FEATURES, MAHE_PASSES, NON_MAHE_PASSES, PASSES_FINE_PRINT } from '../../data/passesData';
import type { PassTier } from '../../data/passesData';

function CellValue({
  value,
  accentColor,
}: {
  value: string | boolean;
  accentColor: string;
}) {
  if (value === true) {
    return (
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center mx-auto shadow-sm"
        style={{
          background: `${accentColor}25`,
          border: `1.5px solid ${accentColor}`,
          boxShadow: `0 0 10px ${accentColor}40`,
        }}
      >
        <Check className="w-3.5 h-3.5 stroke-[3]" style={{ color: accentColor }} />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto bg-white/10 border border-white/20">
        <X className="w-3.5 h-3.5 text-white/50 stroke-[2.5]" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <span className="text-[9px] md:text-[10px] font-mono font-bold text-[#C6FF00] bg-[#C6FF00]/20 px-1.5 md:px-2 py-0.5 rounded border border-[#C6FF00]/50 uppercase tracking-wider">
        {value}
      </span>
    </div>
  );
}

function PassHeaderTitle({ name, accentColor }: { name: string; accentColor: string }) {
  if (name === 'Proshow + Cultural + Sports') {
    return (
      <div className="uppercase text-center leading-tight">
        <span
          className="block text-xs md:text-sm font-extrabold tracking-wide"
          style={{
            fontFamily: '"Barlow", sans-serif',
            color: accentColor,
            letterSpacing: '0.06em',
          }}
        >
          <span className="md:hidden">P+ CULTURAL</span>
          <span className="hidden md:inline">PROSHOW + CULTURAL</span>
        </span>
        <span className="block text-[10px] md:text-xs text-[#C6FF00] font-mono font-bold tracking-widest mt-1">
          + SPORTS
        </span>
      </div>
    );
  }

  if (name === 'Proshow + Cultural') {
    return (
      <div className="uppercase text-center leading-tight">
        <span
          className="block text-xs md:text-sm font-extrabold tracking-wide"
          style={{
            fontFamily: '"Barlow", sans-serif',
            color: accentColor,
            letterSpacing: '0.06em',
          }}
        >
          <span className="md:hidden">P+ CULTURAL</span>
          <span className="hidden md:inline">PROSHOW + CULTURAL</span>
        </span>
      </div>
    );
  }

  // Split two-word names for clean, balanced lines (e.g. ESPORTS PASS -> ESPORTS / PASS)
  const parts = name.split(' ');
  if (parts.length === 2) {
    return (
      <div
        className="uppercase text-center leading-tight"
        style={{
          fontFamily: '"Barlow", sans-serif',
          color: accentColor,
          letterSpacing: '0.06em',
        }}
      >
        <span className="block text-xs md:text-sm font-extrabold tracking-wide">
          {parts[0]}
        </span>
        <span className="block text-[10px] md:text-xs font-bold tracking-wider text-white/85 mt-0.5">
          {parts[1]}
        </span>
      </div>
    );
  }

  return (
    <div
      className="text-xs md:text-sm uppercase leading-tight font-extrabold text-center tracking-wide"
      style={{
        fontFamily: '"Barlow", sans-serif',
        color: accentColor,
        letterSpacing: '0.06em',
      }}
    >
      {name}
    </div>
  );
}

export function CompareTable() {
  // Map feature keys to pass IDs
  const featureKeyMap: Record<string, Record<string, string | boolean>> = {};
  PASS_FEATURES.forEach((f) => {
    featureKeyMap[f.label] = {
      'mahe-proshow-cultural': f.maheProshowCultural,
      'mahe-proshow-cultural-sports': f.maheProshowCulturalSports,
      'mahe-esports': f.maheEsports,
      'non-mahe-proshow-cultural': f.nonMaheProshowCultural,
      'non-mahe-sports': f.nonMaheSports,
      'non-mahe-proshow': f.nonMaheProshow,
      'non-mahe-esports': f.nonMaheEsports,
    };
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div
          className="text-3xl md:text-5xl uppercase leading-none text-white mb-2"
          style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.03em' }}
        >
          COMPARE PASSES
        </div>
        <p className="font-mono text-xs text-white/70 uppercase tracking-[0.2em]">
          All passes side by side — MAHE &amp; Non-MAHE
        </p>
        {/* Divider */}
        <div className="mt-4 flex items-center gap-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5"
              style={{
                background: ['#FF3D7F', '#C6FF00', '#8A5CFF', '#0057FF', '#8A5CFF', '#C6FF00', '#FF3D7F'][i],
                transform: `rotate(45deg) scale(${[0.6, 0.8, 1, 1.2, 1, 0.8, 0.6][i]})`,
                opacity: [0.7, 0.85, 1, 1, 1, 0.85, 0.7][i],
              }}
            />
          ))}
          <div className="flex-1 h-px bg-white/20" />
        </div>
      </div>

      {/* Table Container with Sticky Left Feature Column & Natural Edge Peek */}
      <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        <table className="w-full min-w-[724px] md:min-w-[860px]" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr>
              {/* Sticky Left Column: Pass Feature */}
              <th
                className="sticky left-0 z-20 text-left py-3.5 pr-3 pl-3 text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] md:tracking-[0.2em] text-white font-bold w-[120px] min-w-[120px] max-w-[120px] md:w-[20%] md:min-w-[170px] md:max-w-none align-bottom"
                style={{
                  background: '#1b1744',
                  borderBottom: '2px solid rgba(255,255,255,0.2)',
                  borderRight: '2px solid rgba(255,255,255,0.18)',
                  boxShadow: '4px 0px 10px rgba(0,0,0,0.5)',
                }}
              >
                Pass Feature
              </th>

              {/* MAHE header group — calibrated column width on mobile for natural peek */}
              {MAHE_PASSES.map((pass, idx) => (
                <th
                  key={pass.id}
                  className="w-[86px] min-w-[86px] max-w-[86px] md:w-auto md:min-w-[115px] md:max-w-none py-3 px-1 md:px-3 text-center align-bottom"
                  style={{
                    borderBottom: '2px solid rgba(255,255,255,0.15)',
                    borderLeft: idx === 0 ? '2px solid rgba(255,255,255,0.15)' : 'none',
                  }}
                >
                  <PassHeaderTitle name={pass.name} accentColor={pass.accentColor} />
                  <div className="mt-2">
                    <span className="inline-block text-[8px] md:text-[9px] font-mono font-black text-[#FF3D7F] bg-[#FF3D7F]/20 px-1.5 md:px-2 py-0.5 rounded border border-[#FF3D7F]/50 uppercase tracking-widest">
                      MAHE
                    </span>
                  </div>
                </th>
              ))}

              {/* NON-MAHE header group */}
              {NON_MAHE_PASSES.map((pass, idx) => (
                <th
                  key={pass.id}
                  className="w-[86px] min-w-[86px] max-w-[86px] md:w-auto md:min-w-[115px] md:max-w-none py-3 px-1 md:px-3 text-center align-bottom"
                  style={{
                    borderBottom: '2px solid rgba(255,255,255,0.15)',
                    borderLeft: idx === 0 ? '2px solid rgba(255,255,255,0.15)' : 'none',
                  }}
                >
                  <PassHeaderTitle name={pass.name} accentColor={pass.accentColor} />
                  <div className="mt-2">
                    <span className="inline-block text-[8px] md:text-[9px] font-mono font-black text-[#60A5FA] bg-[#0057FF]/25 px-1.5 md:px-2 py-0.5 rounded border border-[#60A5FA]/50 uppercase tracking-widest">
                      NON-MAHE
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PASS_FEATURES.map((feature, rowIdx) => {
              const values = featureKeyMap[feature.label];
              return (
                <motion.tr
                  key={feature.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: rowIdx * 0.04 }}
                  className="group hover:bg-white/[0.04] transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {/* Sticky left cell */}
                  <td
                    className="sticky left-0 z-10 py-3.5 pr-3 pl-3 transition-colors w-[120px] min-w-[120px] max-w-[120px] md:w-[22%] md:min-w-[180px] md:max-w-none"
                    style={{
                      background: '#16123b',
                      borderRight: '2px solid rgba(255,255,255,0.15)',
                      boxShadow: '4px 0px 10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="font-mono text-xs uppercase tracking-wide text-white/95 font-bold group-hover:text-[#C6FF00] transition-colors">
                      {feature.label}
                    </div>
                  </td>

                  {MAHE_PASSES.map((pass, idx) => (
                    <td
                      key={pass.id}
                      className="w-[86px] min-w-[86px] max-w-[86px] md:w-auto md:min-w-[105px] md:max-w-none py-3.5 px-1 md:px-2 text-center"
                      style={{ borderLeft: idx === 0 ? '2px solid rgba(255,255,255,0.08)' : 'none' }}
                    >
                      <CellValue
                        value={values?.[pass.id] ?? false}
                        accentColor={pass.accentColor}
                      />
                    </td>
                  ))}

                  {NON_MAHE_PASSES.map((pass, idx) => (
                    <td
                      key={pass.id}
                      className="w-[86px] min-w-[86px] max-w-[86px] md:w-auto md:min-w-[105px] md:max-w-none py-3.5 px-1 md:px-2 text-center"
                      style={{ borderLeft: idx === 0 ? '2px solid rgba(255,255,255,0.08)' : 'none' }}
                    >
                      <CellValue
                        value={values?.[pass.id] ?? false}
                        accentColor={pass.accentColor}
                      />
                    </td>
                  ))}
                </motion.tr>
              );
            })}

            {/* Price row */}
            <tr style={{ borderTop: '2px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.03)' }}>
              <td
                className="sticky left-0 z-10 py-4 pr-3 pl-3 w-[120px] min-w-[120px] max-w-[120px] md:w-[22%] md:min-w-[180px] md:max-w-none"
                style={{
                  background: '#181342',
                  borderRight: '2px solid rgba(255,255,255,0.15)',
                  boxShadow: '4px 0px 10px rgba(0,0,0,0.5)',
                }}
              >
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-wider text-[#C6FF00] font-black flex items-center gap-1.5 leading-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse flex-shrink-0" />
                  <span>Early Bird Price</span>
                </div>
              </td>

              {MAHE_PASSES.map((pass, idx) => (
                <td
                  key={pass.id}
                  className="w-[86px] min-w-[86px] max-w-[86px] md:w-auto md:min-w-[105px] md:max-w-none py-4 px-1 md:px-2 text-center"
                  style={{ borderLeft: idx === 0 ? '2px solid rgba(255,255,255,0.1)' : 'none' }}
                >
                  <span
                    className="text-base md:text-lg font-black"
                    style={{ fontFamily: '"Anton", sans-serif', color: pass.accentColor }}
                  >
                    {pass.earlyBirdPrice !== null ? `₹${pass.earlyBirdPrice}` : '—'}
                  </span>
                </td>
              ))}

              {NON_MAHE_PASSES.map((pass, idx) => (
                <td
                  key={pass.id}
                  className="w-[86px] min-w-[86px] max-w-[86px] md:w-auto md:min-w-[105px] md:max-w-none py-4 px-1 md:px-2 text-center"
                  style={{ borderLeft: idx === 0 ? '2px solid rgba(255,255,255,0.1)' : 'none' }}
                >
                  <span
                    className="text-base md:text-lg font-black"
                    style={{ fontFamily: '"Anton", sans-serif', color: pass.accentColor }}
                  >
                    {pass.earlyBirdPrice !== null ? `₹${pass.earlyBirdPrice}` : 'Varies'}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Fine print */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <p className="font-mono text-xs text-white/70 uppercase tracking-wider">
          {PASSES_FINE_PRINT}
        </p>
      </div>
    </div>
  );
}
