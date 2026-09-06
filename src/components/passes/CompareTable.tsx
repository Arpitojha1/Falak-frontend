// CompareTable — "COMPARE KAR LE" feature comparison table
// Brutalist grid with desi maximalism styling

import { motion } from 'motion/react';
import { Check, X, Minus } from 'lucide-react';
import { PASS_FEATURES, PASS_TIERS, PASSES_FINE_PRINT, PASSES_FINE_PRINT_HINDI } from '../../data/passesData';

function CellValue({
  value,
  accentColor,
}: {
  value: string | boolean;
  accentColor: string;
}) {
  if (value === true) {
    return (
      <span
        className="inline-flex items-center justify-center w-6 h-6 rounded-full"
        style={{ background: accentColor }}
      >
        <Check size={12} strokeWidth={2.5} color={accentColor === '#C6FF00' ? '#0B0F2B' : '#fff'} />
      </span>
    );
  }
  if (value === false) {
    return <X size={14} strokeWidth={2} color="rgba(192,192,192,0.3)" />;
  }
  // String value
  return (
    <span
      className="text-[11px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-sm font-bold"
      style={{ background: `${accentColor}20`, color: accentColor }}
    >
      {value}
    </span>
  );
}

export function CompareTable() {
  const tiers = PASS_TIERS;

  return (
    <div className="w-full">
      {/* Section heading */}
      <div className="mb-8">
        <div
          className="text-3xl md:text-5xl uppercase leading-none text-white mb-1"
          style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '-0.02em' }}
        >
          COMPARE KAR LE
        </div>
        <div
          className="text-lg text-silver/50"
          style={{ fontFamily: '"Baloo Devanagari 2", sans-serif' }}
        >
          तुलना करो
        </div>
        {/* Rangoli-inspired divider */}
        <div className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-white/10" />
          <div
            className="w-2 h-2 rotate-45"
            style={{ background: '#FF3D7F' }}
          />
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>

      {/* Table */}
      <div
        className="w-full overflow-x-auto"
        style={{ scrollbarWidth: 'none' }}
      >
        <table className="w-full min-w-[560px]" style={{ borderCollapse: 'collapse' }}>
          {/* Header row */}
          <thead>
            <tr>
              <th
                className="text-left py-3 pr-6 text-[11px] font-mono uppercase tracking-[0.2em] text-silver/40"
                style={{ width: '40%', borderBottom: '1px solid rgba(192,192,192,0.1)' }}
              >
                Feature / फ़ीचर
              </th>
              {tiers.map((tier) => (
                <th
                  key={tier.id}
                  className="py-3 px-3 text-center"
                  style={{ borderBottom: `2px solid ${tier.accentColor}` }}
                >
                  <div
                    className="text-sm uppercase leading-tight"
                    style={{
                      fontFamily: '"Anton", sans-serif',
                      color: tier.accentColor,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {tier.name.split(' ')[0]}
                  </div>
                  <div
                    className="text-[9px] mt-0.5"
                    style={{
                      fontFamily: '"Baloo Devanagari 2", sans-serif',
                      color: `${tier.accentColor}80`,
                    }}
                  >
                    {tier.nameHindi}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Feature rows */}
          <tbody>
            {PASS_FEATURES.map((feature, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group"
                style={{ borderBottom: '1px solid rgba(192,192,192,0.06)' }}
              >
                <td className="py-3.5 pr-6">
                  <div className="font-mono text-[11px] uppercase tracking-wide text-silver/80 group-hover:text-silver transition-colors">
                    {feature.label}
                  </div>
                  <div
                    className="text-[10px] text-silver/30 mt-0.5"
                    style={{ fontFamily: '"Baloo Devanagari 2", sans-serif' }}
                  >
                    {feature.labelHindi}
                  </div>
                </td>
                <td className="py-3.5 px-3 text-center">
                  <CellValue value={feature.gully} accentColor={tiers[0].accentColor} />
                </td>
                <td className="py-3.5 px-3 text-center">
                  <CellValue value={feature.fullFalak} accentColor={tiers[1].accentColor} />
                </td>
                <td className="py-3.5 px-3 text-center">
                  <CellValue value={feature.star} accentColor={tiers[2].accentColor} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fine print */}
      <div className="mt-8 pt-4 border-t border-white/10">
        <p className="font-mono text-[11px] text-silver/40 uppercase tracking-widest">
          {PASSES_FINE_PRINT}
        </p>
        <p
          className="text-sm text-silver/30 mt-1"
          style={{ fontFamily: '"Baloo Devanagari 2", sans-serif' }}
        >
          {PASSES_FINE_PRINT_HINDI}
        </p>
      </div>
    </div>
  );
}
