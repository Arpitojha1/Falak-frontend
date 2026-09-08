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
import { SportsCalendar } from '../components/schedule/SportsCalendar';

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
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'radial-gradient(ellipse 110% 75% at 50% -10%, #231e5c 0%, #171540 45%, #100e2b 100%)',
      }}
    >
      {/* ── Street Texture Layer 1 (Tactile Paper Grain) ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'url(/assets/texture-paper.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '360px 360px',
          opacity: 0.36,
          mixBlendMode: 'screen',
        }}
      />

      {/* ── Street Texture Layer 2 (Distressed Grunge Grit) ── */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          backgroundImage: 'url(/assets/texture-grunge.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '460px 460px',
          opacity: 0.22,
          mixBlendMode: 'color-dodge',
        }}
      />

      {/* ── Street Halftone Print Grid ── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* ── Ambient Neon Street Glows ── */}
      <div
        className="fixed top-1/4 -right-32 w-96 h-96 rounded-full pointer-events-none z-0 blur-[120px] opacity-25"
        style={{ background: '#8A5CFF' }}
      />
      <div
        className="fixed top-3/4 -left-32 w-96 h-96 rounded-full pointer-events-none z-0 blur-[120px] opacity-20"
        style={{ background: '#FF3D7F' }}
      />

      {/* ── Massive Ghost Typography Background (Subtle Street Mural Backdrop) ── */}
      <div
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="text-[26vw] font-black leading-none uppercase"
          style={{
            fontFamily: '"Anton", sans-serif',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.06)',
            letterSpacing: '0.04em',
            transform: 'rotate(-3deg)',
          }}
        >
          FALAK
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10 pt-28 md:pt-32 pb-24">

        {/* ── HERO HEADER ── */}
        <div ref={headerRef} className="px-4 sm:px-6 md:px-12 mb-10 md:mb-14">

          {/* Eyebrow tag */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: '#FF3D7F' }} />
            <span className="schedule-meta text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#FF3D7F]">
              Falak &apos;26 · MIT Bengaluru
            </span>
          </div>

          {/* Main heading — spacious, readable typography */}
          <h1
            className="schedule-heading-en text-5xl sm:text-6xl md:text-8xl lg:text-[9.5rem] uppercase leading-none text-white font-black"
            style={{
              fontFamily: '"Anton", sans-serif',
              letterSpacing: '0.04em',
            }}
          >
            SCHEDULE
          </h1>

          {/* Sub-meta */}
          <div className="schedule-meta flex flex-wrap items-center gap-4 mt-5 md:mt-8">
            {[
              'OCT 9–17',
              'MIT BENGALURU',
              '9 DAYS SPORTS',
              '3 DAYS CULTURAL',
              '10 SPORTS · 25+ CULTURAL',
            ].map((label) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] shadow-sm" />
                <span className="font-mono text-xs font-bold text-white/90 uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FLOATING GLASS CONTROLS (Day selector + Category filter) ── */}
        <div
          ref={controlsRef}
          className="sticky top-20 z-30 mb-8 mx-3 sm:mx-6 md:mx-12 rounded-xl p-2.5 sm:p-3 md:p-4 transition-all duration-300"
          style={{
            background: 'rgba(28, 24, 68, 0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(255, 255, 255, 0.14)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.45)',
          }}
        >
          {/* Day selector */}
          <div className="mb-3">
            <DaySelector activeDay={activeDay} onDayChange={(d) => { setActiveDay(d); setActiveCategory('all'); }} />
          </div>

          {/* Category filter */}
          <div>
            <CategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        {/* ── TIMETABLE GRID ── */}
        <div className="px-4 sm:px-6 md:px-12">

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
            <span className="font-mono text-sm text-white/90 font-bold uppercase tracking-widest">
              {activeCategory === 'all' ? 'All Events' : activeCategory.toUpperCase()}
              {' · '}
              {activeDay === 1 ? 'Thu 15 Oct' : activeDay === 2 ? 'Fri 16 Oct' : 'Sat 17 Oct'}
            </span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <TimetableGrid activeDay={activeDay} activeCategory={activeCategory} />
        </div>
        {/* ── SPORTS SCHEDULE (separate 9-day section) ── */}
        <div className="mt-20 px-6 md:px-12">
          {/* Visual divider */}
          <div className="flex items-center gap-4 mb-10">
            <div
              className="h-px flex-1"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, #FF6A00 0px, #FF6A00 8px, transparent 8px, transparent 16px)',
              }}
            />
            <span className="font-mono text-xs text-white/80 font-bold uppercase tracking-[0.3em] flex-shrink-0">
              Sports Tournament
            </span>
            <div
              className="h-px flex-1"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, #FF6A00 0px, #FF6A00 8px, transparent 8px, transparent 16px)',
              }}
            />
          </div>

          <SportsCalendar />
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
