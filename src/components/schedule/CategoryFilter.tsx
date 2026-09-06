// CategoryFilter — Horizontal scroll chip bar
// Color-coded category filter chips with desi sticker aesthetic

import { motion } from 'motion/react';
import { FILTER_CATEGORIES, CATEGORY_COLORS } from '../../data/scheduleData';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="relative">
      {/* Horizontal scroll container */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          const color =
            cat.key === 'all'
              ? '#C0C0C0'
              : CATEGORY_COLORS[cat.key as keyof typeof CATEGORY_COLORS] ?? '#C0C0C0';

          return (
            <motion.button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex-shrink-0 flex flex-col items-center px-3 py-1.5 rounded-sm transition-all duration-200"
              style={{
                background: isActive ? color : 'rgba(255,255,255,0.05)',
                border: `1px solid ${isActive ? color : 'rgba(192,192,192,0.15)'}`,
                boxShadow: isActive ? `0 0 12px ${color}40` : 'none',
              }}
            >
              <span
                className="text-[10px] font-mono uppercase tracking-[0.15em] font-bold leading-none"
                style={{
                  color: isActive
                    ? cat.key === 'music' || cat.key === 'business'
                      ? '#0B0F2B'
                      : '#fff'
                    : 'rgba(192,192,192,0.7)',
                }}
              >
                {cat.label}
              </span>
              <span
                className="text-[8px] leading-none mt-0.5"
                style={{
                  fontFamily: '"Baloo Devanagari 2", sans-serif',
                  color: isActive
                    ? cat.key === 'music' || cat.key === 'business'
                      ? 'rgba(11,15,43,0.6)'
                      : 'rgba(255,255,255,0.6)'
                    : 'rgba(192,192,192,0.4)',
                }}
              >
                {cat.hindi}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Fade edges for horizontal scroll hint */}
      <div className="absolute right-0 top-0 bottom-1 w-12 pointer-events-none bg-gradient-to-l from-[#0B0F2B] to-transparent md:hidden" />
    </div>
  );
}
