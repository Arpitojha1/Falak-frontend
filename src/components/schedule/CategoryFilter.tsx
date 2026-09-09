// CategoryFilter — Horizontal scroll chip bar
// Color-coded category filter chips with street brutalist styling

import { motion } from 'motion/react';
import { FILTER_CATEGORIES, CATEGORY_COLORS } from '../../data/scheduleData';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="relative">
      {/* Wrapped chip bar without horizontal scroll */}
      <div className="flex items-center flex-wrap gap-2 pb-1 pt-1">
        {FILTER_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key;
          const color =
            cat.key === 'all'
              ? '#C6FF00'
              : CATEGORY_COLORS[cat.key as keyof typeof CATEGORY_COLORS] ?? '#C6FF00';

          return (
            <motion.button
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex-shrink-0 flex items-center px-3.5 py-1.5 rounded-sm transition-all duration-200 cursor-pointer select-none"
              style={{
                background: isActive ? color : 'rgba(255,255,255,0.07)',
                border: `1.5px solid ${isActive ? '#000000' : 'rgba(255,255,255,0.18)'}`,
                boxShadow: isActive ? `2px 2px 0px #000000, 0 0 12px ${color}60` : 'none',
              }}
            >
              <span
                className="text-[11px] font-mono uppercase tracking-[0.15em] font-black leading-none"
                style={{
                  color: isActive ? '#000000' : '#FFFFFF',
                }}
              >
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
