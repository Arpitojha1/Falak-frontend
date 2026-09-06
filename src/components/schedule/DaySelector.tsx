// DaySelector — Torn-label sticker style day tabs
// Switches between Day 1 (Oct 15), Day 2 (Oct 16), Day 3 (Oct 17)

import { motion } from 'motion/react';
import { DAY_LABELS } from '../../data/scheduleData';

interface DaySelectorProps {
  activeDay: 1 | 2 | 3;
  onDayChange: (day: 1 | 2 | 3) => void;
}

const DAY_ACCENT_COLORS = {
  1: '#0057FF',  // cobalt-blue
  2: '#FF3D7F',  // convergence-magenta
  3: '#C6FF00',  // acid-lime
};

export function DaySelector({ activeDay, onDayChange }: DaySelectorProps) {
  return (
    <div className="flex items-stretch gap-0 w-full md:w-auto">
      {([1, 2, 3] as const).map((day) => {
        const info = DAY_LABELS[day];
        const isActive = activeDay === day;
        const accent = DAY_ACCENT_COLORS[day];

        return (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className="relative flex-1 md:flex-none md:w-44 flex flex-col items-center justify-center py-3 px-4 transition-all duration-300 group overflow-hidden"
            style={{
              background: isActive ? '#EDE4D3' : 'transparent',
              borderTop: `3px solid ${isActive ? accent : 'rgba(192,192,192,0.2)'}`,
              borderRight: day !== 3 ? '1px solid rgba(192,192,192,0.1)' : 'none',
              clipPath: isActive
                ? 'polygon(0 0, 100% 0, 100% 85%, 96% 100%, 0 100%)'
                : 'none',
            }}
          >
            {/* Tape strip on active */}
            {isActive && (
              <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 rounded-sm pointer-events-none z-10"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                style={{
                  background: 'rgba(255,255,255,0.3)',
                  transform: 'translateX(-50%) rotate(-1.5deg)',
                }}
              />
            )}

            {/* Day label */}
            <span
              className="text-[10px] font-mono uppercase tracking-[0.2em] transition-colors"
              style={{
                color: isActive ? 'rgba(11,15,43,0.6)' : 'rgba(192,192,192,0.5)',
                fontFamily: '"Space Mono", monospace',
              }}
            >
              {info.day} · {info.date}
            </span>

            <span
              className="text-xl md:text-2xl uppercase leading-none mt-0.5 transition-colors"
              style={{
                fontFamily: '"Anton", sans-serif',
                color: isActive ? '#0B0F2B' : 'rgba(192,192,192,0.7)',
                letterSpacing: '-0.02em',
              }}
            >
              {info.label}
            </span>

            {/* Active accent bar at bottom */}
            {isActive && (
              <motion.div
                layoutId="day-active-bar"
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: accent }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}

            {/* Hover background for inactive */}
            {!isActive && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
