// Schedule Page — Falak '26
// Full unified schedule: Sports + Culture, 3 days, timetable format

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DaySelector } from '../components/schedule/DaySelector';
import { CategoryFilter } from '../components/schedule/CategoryFilter';
import { TimetableGrid } from '../components/schedule/TimetableGrid';

gsap.registerPlugin(ScrollTrigger);

export function Schedule() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  // GSAP: header entrance animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !headerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(
        '.schedule-heading-en',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8 }
      ).fromTo(
        '.schedule-meta',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-midnight-indigo relative overflow-x-hidden">
      {/* ── Massive ghost typography background ── */}
      <div
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="text-[22vw] leading-none uppercase"
          style={{
            fontFamily: '"Anton", sans-serif',
            color: 'rgba(255,61,127,0.025)',
            letterSpacing: '-0.04em',
            transform: 'rotate(-3deg)',
          }}
        >
          FALAK
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10 pt-28 md:pt-32 pb-24">

        {/* ── HERO HEADER ── */}
        <div ref={headerRef} className="px-6 md:px-12 mb-8">

          {/* Eyebrow tag */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: '#FF3D7F' }} />
            <span className="schedule-meta text-[10px] font-mono uppercase tracking-[0.3em] text-silver/50">
              Falak &apos;26 · MIT Bengaluru
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="schedule-heading-en text-6xl md:text-8xl lg:text-[10rem] uppercase leading-none text-white"
            style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '-0.03em' }}
          >
            SCHEDULE
          </h1>

          {/* Sub-meta */}
          <div className="schedule-meta flex flex-wrap items-center gap-4 mt-4">
            {[
              '15–17 OCT',
              'MIT BENGALURU',
              '3 DAYS',
              '60+ EVENTS',
              '2 TRACKS',
            ].map((label) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-silver/30" />
                <span className="font-mono text-xs text-silver/60 uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── STICKY CONTROLS (Day selector + Category filter) ── */}
        <div
          ref={controlsRef}
          className="sticky top-16 z-30 mb-6"
          style={{
            background: 'rgba(11,15,43,0.92)',
            backdropFilter: 'blur(16px)',
            borderTop: '1px solid rgba(192,192,192,0.08)',
            borderBottom: '1px solid rgba(192,192,192,0.08)',
          }}
        >
          {/* Day selector */}
          <div className="px-6 md:px-12 pt-3 pb-0">
            <DaySelector activeDay={activeDay} onDayChange={(d) => { setActiveDay(d); setActiveCategory('all'); }} />
          </div>

          {/* Category filter */}
          <div className="px-6 md:px-12 py-3">
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        {/* ── TIMETABLE GRID ── */}
        <div className="px-6 md:px-12">

          {/* Section header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="hidden md:flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5"
                  style={{
                    background: i === 1 ? '#FF3D7F' : 'rgba(255,61,127,0.3)',
                    transform: `rotate(45deg) scale(${i === 1 ? 1 : 0.7})`,
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-sm text-silver/50 uppercase tracking-widest">
              {activeCategory === 'all' ? 'All Events' : activeCategory.toUpperCase()}
              {' · '}
              {activeDay === 1 ? 'Thu 15 Oct' : activeDay === 2 ? 'Fri 16 Oct' : 'Sat 17 Oct'}
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <TimetableGrid activeDay={activeDay} activeCategory={activeCategory} />
        </div>

        {/* ── CTA STRIP ── */}
        <div className="mt-16 mx-6 md:mx-12">
          <Link to="/passes">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-between px-6 md:px-10 py-6 md:py-8 relative overflow-hidden group cursor-pointer"
              style={{ background: '#FF3D7F', borderLeft: '6px solid #fff' }}
            >
              {/* Scan-line texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
                }}
              />
              {/* Tape strips */}
              <div
                className="absolute top-0 left-12 w-14 h-4 rounded-b-sm opacity-60"
                style={{ background: 'rgba(255,255,255,0.35)', transform: 'rotate(0.5deg)' }}
              />
              <div
                className="absolute top-0 right-24 w-10 h-4 rounded-b-sm opacity-40"
                style={{ background: 'rgba(255,255,255,0.35)', transform: 'rotate(-1deg)' }}
              />

              <div className="relative z-10">
                <div
                  className="text-2xl md:text-4xl uppercase leading-none text-white"
                  style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '-0.02em' }}
                >
                  SEEN THE SCHEDULE?
                </div>
                <p className="font-mono text-xs text-white/60 mt-2 uppercase tracking-widest">
                  Get your pass now — single day &amp; full passes available
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-3">
                <div
                  className="text-white text-3xl md:text-4xl font-bold group-hover:translate-x-2 transition-transform duration-300"
                  style={{ fontFamily: '"Anton", sans-serif' }}
                >
                  →
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

      </div>
    </div>
  );
}
