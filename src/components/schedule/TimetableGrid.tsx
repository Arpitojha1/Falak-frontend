// TimetableGrid — Main schedule grid component
// Shows events in a time-based list grouped by time slots
// Torn-paper cards, category color-coded, GSAP reveal animations

import { useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  type FalakEvent,
  EVENTS_BY_DAY,
  timeToMinutes,
} from '../../data/scheduleData';
import { EventCard } from './EventCard';

gsap.registerPlugin(ScrollTrigger);

interface TimetableGridProps {
  activeDay: 1 | 2 | 3;
  activeCategory: string;
}

// Group events into time buckets (rounded to nearest hour for display)
function groupEventsByHour(events: FalakEvent[]) {
  const buckets: Record<string, FalakEvent[]> = {};

  // Separate all-day events
  const allDay = events.filter((e) => e.isAllDay);
  const timed = events.filter((e) => !e.isAllDay);

  if (allDay.length > 0) {
    buckets['ALL_DAY'] = allDay;
  }

  // Group by start hour
  timed.forEach((event) => {
    const hour = event.startTime.split(':')[0];
    const key = `${hour}:00`;
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(event);
  });

  return buckets;
}

function TimeLabel({ time }: { time: string }) {
  if (time === 'ALL_DAY') {
    return (
      <div className="flex flex-col items-end justify-start pt-1 pr-4 min-w-[72px] w-[72px] flex-shrink-0">
        <span
          className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C6FF00]"
          style={{ writingMode: 'horizontal-tb' }}
        >
          ALL DAY
        </span>
      </div>
    );
  }

  const [h] = time.split(':');
  const hourNum = parseInt(h);
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  const display12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;

  return (
    <div className="flex flex-col items-end justify-start pt-1 pr-4 min-w-[72px] w-[72px] flex-shrink-0">
      <span
        className="text-xl leading-none font-bold"
        style={{
          fontFamily: '"Anton", sans-serif',
          color: 'rgba(192,192,192,0.9)',
          letterSpacing: '-0.02em',
        }}
      >
        {String(display12).padStart(2, '0')}
      </span>
      <span
        className="text-[9px] font-mono uppercase tracking-[0.15em] mt-0.5"
        style={{ color: 'rgba(192,192,192,0.4)' }}
      >
        {ampm}
      </span>
    </div>
  );
}

export function TimetableGrid({ activeDay, activeCategory }: TimetableGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const prevDayRef = useRef(activeDay);

  const dayEvents = EVENTS_BY_DAY[activeDay];

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') return dayEvents;
    return dayEvents.filter((e) => e.category === activeCategory);
  }, [dayEvents, activeCategory]);

  const groupedEvents = useMemo(() => groupEventsByHour(filteredEvents), [filteredEvents]);

  const sortedBuckets = useMemo(() => {
    const keys = Object.keys(groupedEvents);
    return keys.sort((a, b) => {
      if (a === 'ALL_DAY') return -1;
      if (b === 'ALL_DAY') return 1;
      return timeToMinutes(a) - timeToMinutes(b);
    });
  }, [groupedEvents]);

  // GSAP: reveal cards on scroll (batch for performance)
  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.timetable-event-card');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.04,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [activeDay, activeCategory]);

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div
          className="text-6xl md:text-8xl text-[#FF3D7F]/20 uppercase leading-none mb-4"
          style={{ fontFamily: '"Anton", sans-serif' }}
        >
          EMPTY
        </div>
        <p className="font-mono text-sm text-silver/40 mt-4 uppercase tracking-widest">
          No events in this category today
        </p>
      </div>
    );
  }

  return (
    <div ref={gridRef} className="relative">
      {/* Vertical time-ruler line */}
      <div
        className="absolute left-[72px] top-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'rgba(192,192,192,0.1)' }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeDay}-${activeCategory}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {sortedBuckets.map((bucketKey) => {
            const events = groupedEvents[bucketKey];
            const anchorEvents = events.filter((e) => e.isAnchor);
            const regularEvents = events.filter((e) => !e.isAnchor);

            return (
              <div key={bucketKey} className="flex items-start min-h-[64px] mb-2">
                {/* Time label */}
                <TimeLabel time={bucketKey} />

                {/* Events in this bucket */}
                <div className="flex-1 flex flex-col gap-2 py-1 pl-4 border-t border-white/5">
                  {/* Anchor events first (full width) */}
                  {anchorEvents.map((event) => (
                    <div key={event.id} className="timetable-event-card w-full">
                      <EventCard event={event} />
                    </div>
                  ))}

                  {/* Regular events in a responsive grid */}
                  {regularEvents.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {regularEvents.map((event) => (
                        <div key={event.id} className="timetable-event-card">
                          <EventCard event={event} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Bottom ghost text */}
          <div className="pt-16 pb-8 flex justify-center">
            <div
              className="text-[120px] md:text-[180px] leading-none uppercase text-center select-none pointer-events-none"
              style={{
                fontFamily: '"Anton", sans-serif',
                color: 'rgba(255,61,127,0.04)',
                letterSpacing: '-0.04em',
              }}
            >
              FALAK
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
