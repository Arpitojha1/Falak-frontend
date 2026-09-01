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
      className={`relative w-full text-left p-6 md:p-8 cursor-pointer transition-all duration-300 border-2 border-midnight-indigo ${
        isExpanded
          ? 'bg-silver shadow-[8px_8px_0_0_rgba(11,15,43,1)] scale-[1.01] z-20'
          : 'bg-silver/90 hover:bg-silver hover:shadow-[4px_4px_0_0_rgba(11,15,43,1)] hover:-translate-y-1'
      }`}
    >
      {/* Background grain inside card */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-midnight-indigo) 1px, transparent 0)',
          backgroundSize: '4px 4px'
        }}
      />

      {/* Header / Summary Bar */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4 md:gap-6 w-full">
          {/* Icon Badge */}
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center border-2 border-midnight-indigo transition-transform ${isExpanded ? 'bg-electric-orange -rotate-6' : 'bg-acid-lime rotate-3 group-hover:-rotate-3'}`}>
            <IconComponent className="h-8 w-8 text-midnight-indigo" strokeWidth={2.5} />
          </div>
          <div className="pt-1 flex-1">
            <h3 className="font-headline-sports-section text-3xl md:text-4xl uppercase tracking-tighter text-midnight-indigo leading-none">
              {event.title}
            </h3>
            <p className="font-sans text-sm md:text-base text-midnight-indigo/80 mt-2 font-medium max-w-lg">
              {event.teaser}
            </p>
          </div>
        </div>

        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 p-3 bg-midnight-indigo text-silver border-2 border-midnight-indigo self-start mt-2"
        >
          <ChevronDown className="w-6 h-6" strokeWidth={3} />
        </motion.div>
      </div>

      {/* Expanded Details Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 pt-8 border-t-4 border-dashed border-midnight-indigo/20 relative z-10 overflow-hidden"
          >
            <p className="font-sans text-base md:text-lg text-midnight-indigo leading-relaxed mb-8 font-medium">
              {event.description}
            </p>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col p-4 bg-midnight-indigo text-silver border-2 border-midnight-indigo transform -rotate-1 shadow-[4px_4px_0_0_#FF6A00]">
                <div className="text-[10px] uppercase tracking-widest text-acid-lime font-label-sports mb-1">Date & Time</div>
                <div className="text-sm font-label-sports font-bold tracking-wide">{event.date}</div>
              </div>

              <div className="flex flex-col p-4 bg-midnight-indigo text-silver border-2 border-midnight-indigo transform rotate-1 shadow-[4px_4px_0_0_#C6FF00]">
                <div className="text-[10px] uppercase tracking-widest text-electric-orange font-label-sports mb-1">Venue</div>
                <div className="text-sm font-label-sports font-bold tracking-wide">{event.venue}</div>
              </div>

              <div className="flex flex-col p-4 bg-midnight-indigo text-silver border-2 border-midnight-indigo transform -rotate-1 shadow-[4px_4px_0_0_#FF6A00]">
                <div className="text-[10px] uppercase tracking-widest text-acid-lime font-label-sports mb-1">Format</div>
                <div className="text-sm font-label-sports font-bold tracking-wide">{event.format}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-6 mt-4 border-t-4 border-midnight-indigo pt-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="inline-flex items-center justify-center bg-electric-orange text-midnight-indigo font-headline-sports-section uppercase text-lg px-8 py-4 hover:bg-acid-lime border-2 border-midnight-indigo shadow-[4px_4px_0_0_rgba(11,15,43,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all cursor-pointer"
              >
                REGISTER NOW
              </button>

              {event.rulesLink && (
                <a
                  href={event.rulesLink}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center font-headline-sports-section text-sm uppercase tracking-wider text-midnight-indigo hover:text-electric-orange transition-colors decoration-4 underline-offset-4 hover:underline"
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
