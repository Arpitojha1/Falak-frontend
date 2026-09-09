// DaySelector — Torn-label sticker style day tabs
// Switches between Day 1 (Oct 15), Day 2 (Oct 16), Day 3 (Oct 17)
// Street ticket buttons with brutalist shadows and clean active states.

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
    <div className="grid grid-cols-3 gap-2 md:flex md:items-stretch md:gap-3 w-full md:w-auto pb-1">
      {([1, 2, 3] as const).map((day) => {
        const info = DAY_LABELS[day];
        const isActive = activeDay === day;
        const accent = DAY_ACCENT_COLORS[day];

        return (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className="relative flex-1 md:flex-none md:w-48 min-w-[88px] flex flex-col items-center justify-center py-2 sm:py-2.5 px-2 sm:px-4 rounded-sm transition-all duration-200 group cursor-pointer select-none"
            style={{
              background: isActive ? '#F2EBD9' : 'rgba(255,255,255,0.06)',
              border: isActive ? '2px solid #000000' : '1.5px solid rgba(255,255,255,0.12)',
              boxShadow: isActive ? `3px 3px 0px #000000, 5px 5px 0px ${accent}` : 'none',
            }}
          >
            {/* Street tape on active */}
            {isActive && (
              <div
                className="absolute -top-2.5 left-2 sm:left-3 px-1.5 py-0.5 text-[7px] font-mono font-black uppercase text-black pointer-events-none shadow-sm"
                style={{
                  background: 'repeating-linear-gradient(45deg, #FFD700 0px, #FFD700 6px, #000 6px, #000 12px)',
                  transform: 'rotate(-2.5deg)',
                  border: '1px solid #000',
                }}
              >
                <span className="bg-[#FFD700] text-black px-0.5">ACTIVE</span>
              </div>
            )}

            {/* Day label */}
            <span
              className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-bold transition-colors whitespace-nowrap"
              style={{
                color: isActive ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
                fontFamily: '"Space Mono", monospace',
              }}
            >
              {info.day} · {info.date}
            </span>

            {/* Day name */}
            <span
              className="text-lg sm:text-xl md:text-2xl uppercase leading-none mt-1 font-black transition-colors"
              style={{
                fontFamily: '"Anton", sans-serif',
                color: isActive ? '#000000' : '#FFFFFF',
                letterSpacing: '0.02em',
              }}
            >
              {info.label}
            </span>

            {/* Active accent bar at bottom */}
            {isActive && (
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: accent }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
