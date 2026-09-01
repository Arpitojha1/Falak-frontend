import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import {
  Trophy,
  Dribbble,
  Flame,
  Zap,
  Goal,
  Crosshair,
  Calendar,
  MapPin,
  Layers,
  ChevronDown,
} from 'lucide-react';
import type React from 'react';
import type { SportsEvent } from './sportsData';

interface SportsEventCardProps {
  key?: React.Key;
  event: SportsEvent;
  isExpanded: boolean;
  onToggle: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  Dribbble,
  Flame,
  Zap,
  Goal,
  Crosshair,
};

export function SportsEventCard({ event, isExpanded, onToggle }: SportsEventCardProps) {
  const IconComponent = iconMap[event.iconName] || Trophy;

  return (
    <motion.div
      layout
      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      className={`relative w-full text-left rounded-xl p-6 md:p-8 cursor-pointer transition-colors duration-300 border-l-4 border-l-electric-orange border-t border-r border-b border-silver/10 ${
        isExpanded
          ? 'bg-silver/10 shadow-2xl shadow-midnight-indigo/50 ring-1 ring-electric-orange/30'
          : 'bg-silver/5 hover:bg-silver/10 hover:border-silver/20'
      }`}
    >
      {/* Header / Summary Bar */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 md:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-electric-orange/15 text-electric-orange">
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-headline-sports-section text-2xl uppercase tracking-wide text-silver">
              {event.title}
            </h3>
            <p className="font-sans text-sm md:text-base text-silver/60 mt-1">
              {event.teaser}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 p-2 rounded-lg bg-silver/5 text-silver/60 hover:text-electric-orange"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Expanded Details Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-silver/10"
          >
            <p className="font-sans text-sm md:text-base text-silver/80 leading-relaxed mb-6">
              {event.description}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6">
              <div className="flex items-center gap-3 bg-midnight-indigo/70 p-3.5 rounded-lg border border-silver/10">
                <Calendar className="w-5 h-5 text-electric-orange shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-silver/50 font-label-sports">
                    Date & Time
                  </div>
                  <div className="text-sm font-label-sports text-silver font-semibold mt-0.5">
                    {event.date}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-midnight-indigo/70 p-3.5 rounded-lg border border-silver/10">
                <MapPin className="w-5 h-5 text-electric-orange shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-silver/50 font-label-sports">
                    Venue
                  </div>
                  <div className="text-sm font-label-sports text-silver font-semibold mt-0.5">
                    {event.venue}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-midnight-indigo/70 p-3.5 rounded-lg border border-silver/10">
                <Layers className="w-5 h-5 text-electric-orange shrink-0" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-silver/50 font-label-sports">
                    Format
                  </div>
                  <div className="text-sm font-label-sports text-silver font-semibold mt-0.5">
                    {event.format}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  // No-op placeholder as per specification
                }}
                className="inline-flex items-center justify-center bg-electric-orange text-midnight-indigo font-headline-sports-section uppercase text-sm md:text-base px-6 py-3 rounded-lg hover:bg-electric-orange/90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-electric-orange/20"
              >
                REGISTER NOW
              </button>

              {event.rulesLink && (
                <a
                  href={event.rulesLink}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-label-sports text-xs uppercase tracking-wider text-silver/60 hover:text-electric-orange transition-colors px-4 py-3"
                >
                  Rulebook & Guidelines →
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
