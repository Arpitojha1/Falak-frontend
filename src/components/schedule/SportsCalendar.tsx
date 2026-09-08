// SportsCalendar — 9-day sports tournament timeline
// Horizontal scroll cards per day, each showing sports + stages

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SPORTS_SCHEDULE, type SportsDay } from '../../data/scheduleData';

// Sport → accent color
const SPORT_COLORS: Record<string, string> = {
  Cricket: '#C6FF00',
  Football: '#FF3D7F',
  Basketball: '#FF6A00',
  Volleyball: '#0057FF',
  'Lawn Tennis': '#8A5CFF',
  'Table Tennis': '#FF6A00',
  Badminton: '#C6FF00',
  Chess: '#8A5CFF',
  Squash: '#FF3D7F',
  Athletics: '#C6FF00',
};

// Stage → badge style
function stageBadgeColor(stage: string): string {
  const s = stage.toLowerCase();
  if (s.includes('finals') && !s.includes('semi')) return '#C6FF00';
  if (s.includes('semi')) return '#FF6A00';
  if (s.includes('knockout')) return '#FF3D7F';
  return 'rgba(192,192,192,0.3)';
}

function DayCard({ sportsDay, isActive, onClick }: { key?: string; sportsDay: SportsDay; isActive: boolean; onClick: () => void }) {
  const isFinals = sportsDay.dayTag.includes('Finals');

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex-shrink-0 flex flex-col items-center px-3.5 py-3 rounded transition-all duration-200 min-w-[76px]"
      style={{
        background: isActive
          ? isFinals ? '#FF3D7F' : 'rgba(255,255,255,0.18)'
          : 'rgba(255,255,255,0.06)',
        border: `1.5px solid ${isActive ? (isFinals ? '#FF3D7F' : '#C6FF00') : 'rgba(255,255,255,0.12)'}`,
        boxShadow: isActive ? '0 0 20px rgba(198,255,0,0.2)' : 'none',
      }}
    >
      {/* Day tag */}
      <span
        className="text-[10px] font-mono uppercase tracking-[0.15em] leading-none font-bold"
        style={{ color: isActive ? (isFinals ? '#fff' : '#C6FF00') : 'rgba(255,255,255,0.7)' }}
      >
        {sportsDay.dayTag.replace(' — Finals', '')}
      </span>
      {/* Date */}
      <span
        className="text-xs font-mono mt-1 leading-none font-bold text-white"
      >
        {sportsDay.dateLabel.split(', ')[1]}
      </span>
      {/* Sport count */}
      <span
        className="text-[9px] font-mono mt-1.5 px-1.5 py-0.5 rounded leading-none font-bold"
        style={{
          background: isActive ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)',
          color: isActive ? '#fff' : 'rgba(255,255,255,0.8)',
        }}
      >
        {sportsDay.events.length} sport{sportsDay.events.length !== 1 ? 's' : ''}
      </span>
      {/* Finals badge */}
      {isFinals && (
        <span
          className="absolute -top-2 -right-1 text-[7px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded font-black shadow"
          style={{ background: '#C6FF00', color: '#0B0F2B' }}
        >
          FINALS
        </span>
      )}
      {/* Active bar */}
      {isActive && (
        <motion.div
          layoutId="sports-day-active"
          className="absolute bottom-0 left-2 right-2 h-1 rounded-full"
          style={{ background: isFinals ? '#C6FF00' : '#FF3D7F' }}
        />
      )}
    </motion.button>
  );
}

function SportRow({ entry }: { key?: string; entry: { sport: string; time: string; venue: string; stage: string } }) {
  const color = SPORT_COLORS[entry.sport] || '#C6FF00';
  const badgeColor = stageBadgeColor(entry.stage);
  const isFinals = entry.stage.toLowerCase().includes('finals') && !entry.stage.toLowerCase().includes('semi');

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 12 }}
      className="py-3 border-b border-white/10 group transition-colors hover:bg-white/[0.03]"
    >
      {/* ── Mobile & Tablet Layout (< lg): 2 cleanly separated rows, zero collision ── */}
      <div className="lg:hidden flex flex-col gap-1.5">
        {/* Row 1: Sport Name + Finals badge + Stage badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap min-w-0 flex-1">
            <div
              className="w-1.5 h-5 rounded-full flex-shrink-0"
              style={{ background: color, boxShadow: `0 0 10px ${color}60` }}
            />
            <span
              className="text-base sm:text-lg font-bold uppercase tracking-wider text-white"
              style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.025em' }}
            >
              {entry.sport}
            </span>
            {isFinals && (
              <span
                className="flex-shrink-0 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded font-black shadow-sm"
                style={{ background: '#C6FF00', color: '#0B0F2B' }}
              >
                🏆 FINALS
              </span>
            )}
          </div>
          <div
            className="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase tracking-wider text-center"
            style={{
              background: `${badgeColor}25`,
              color: badgeColor === 'rgba(192,192,192,0.3)' ? '#E2E8F0' : badgeColor,
              border: `1.5px solid ${badgeColor === 'rgba(192,192,192,0.3)' ? 'rgba(255,255,255,0.3)' : badgeColor}`,
            }}
          >
            {entry.stage}
          </div>
        </div>

        {/* Row 2: Venue (Left) & Time (Right) */}
        <div className="flex items-center justify-between gap-2 pl-3.5 text-xs font-mono">
          <span className="text-white/80 font-bold uppercase tracking-wider truncate flex items-center gap-1 min-w-0">
            <span className="text-[#FF3D7F] flex-shrink-0">📍</span>
            <span className="truncate">{entry.venue}</span>
          </span>
          <span className="flex-shrink-0 text-[#C6FF00] font-black tracking-wider text-right">
            {entry.time}
          </span>
        </div>
      </div>

      {/* ── Desktop Layout (>= lg): Generous 5-column row with ample breathing room ── */}
      <div className="hidden lg:flex items-center gap-5 py-1">
        {/* Sport color indicator */}
        <div
          className="w-1.5 h-8 rounded-full flex-shrink-0"
          style={{ background: color, boxShadow: `0 0 10px ${color}60` }}
        />

        {/* Sport name + Finals */}
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <span
            className="text-lg md:text-xl font-bold uppercase text-white group-hover:text-[#C6FF00] transition-colors"
            style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.025em' }}
          >
            {entry.sport}
          </span>
          {isFinals && (
            <span
              className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-black animate-pulse shadow-sm"
              style={{ background: '#C6FF00', color: '#0B0F2B' }}
            >
              🏆 FINALS
            </span>
          )}
        </div>

        {/* Venue */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-white/80 font-bold uppercase tracking-wider min-w-[160px]">
          <span className="text-[#FF3D7F]">📍</span> {entry.venue}
        </div>

        {/* Time */}
        <div className="text-sm font-mono text-[#C6FF00] font-black tracking-wider min-w-[130px] text-right">
          {entry.time}
        </div>

        {/* Stage badge */}
        <div
          className="flex-shrink-0 px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase tracking-wider text-center min-w-[90px]"
          style={{
            background: `${badgeColor}25`,
            color: badgeColor === 'rgba(192,192,192,0.3)' ? '#E2E8F0' : badgeColor,
            border: `1.5px solid ${badgeColor === 'rgba(192,192,192,0.3)' ? 'rgba(255,255,255,0.3)' : badgeColor}`,
            boxShadow: `0 0 10px ${badgeColor}30`,
          }}
        >
          {entry.stage}
        </div>
      </div>
    </motion.div>
  );
}

export function SportsCalendar() {
  const [activeIndex, setActiveIndex] = useState(SPORTS_SCHEDULE.length - 1); // Default to Finals day
  const activeDay = SPORTS_SCHEDULE[activeIndex];

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="hidden md:flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5"
              style={{
                background: i === 1 ? '#FF6A00' : 'rgba(255,106,0,0.5)',
                transform: `rotate(45deg) scale(${i === 1 ? 1.2 : 0.8})`,
              }}
            />
          ))}
        </div>
        <div>
          <h2
            className="text-3xl md:text-5xl uppercase leading-[1.1] text-white font-black"
            style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.03em' }}
          >
            SPORTS SCHEDULE
          </h2>
          <p className="font-mono text-xs text-white/70 uppercase tracking-[0.2em] mt-1 font-semibold">
            Oct 9–17 · 9 days · 10 sports · MIT Bengaluru
          </p>
        </div>
        <div className="flex-1 h-px bg-white/15" />
      </div>

      {/* Day selector — horizontal scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {SPORTS_SCHEDULE.map((day, idx) => (
          <DayCard
            key={day.date}
            sportsDay={day}
            isActive={idx === activeIndex}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>

      {/* Active day header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span
            className="text-2xl md:text-3xl uppercase leading-none text-white font-black"
            style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.025em' }}
          >
            {activeDay.dateLabel}
          </span>
          <span
            className="text-xs font-mono font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded"
            style={{
              background: activeDay.dayTag.includes('Finals') ? 'rgba(198,255,0,0.2)' : 'rgba(255,255,255,0.1)',
              color: activeDay.dayTag.includes('Finals') ? '#C6FF00' : '#FFFFFF',
              border: `1.5px solid ${activeDay.dayTag.includes('Finals') ? '#C6FF00' : 'rgba(255,255,255,0.2)'}`,
            }}
          >
            {activeDay.dayTag}
          </span>
        </div>
        <span className="font-mono text-xs text-white/80 font-bold uppercase tracking-widest">
          {activeDay.events.length} event{activeDay.events.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Events list */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        <div className="px-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay.date}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeDay.events.map((entry, idx) => (
                <SportRow key={`${entry.sport}-${idx}`} entry={entry} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
