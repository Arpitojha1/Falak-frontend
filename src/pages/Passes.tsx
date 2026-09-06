// Passes Page — Falak '26
// 3-tier pass system: Gully, Full Falak, Star
// Physical ticket-card aesthetic

import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PassCard } from '../components/passes/PassCard';
import { CompareTable } from '../components/passes/CompareTable';
import { PASS_TIERS } from '../data/passesData';

gsap.registerPlugin(ScrollTrigger);

export function Passes() {
  const headerRef = useRef<HTMLDivElement>(null);

  // GSAP: header entrance
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.passes-heading-en',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.passes-meta',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.5 }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-midnight-indigo relative overflow-x-hidden">

      {/* ── Massive ghost background typography ── */}
      <div
        className="fixed top-0 left-0 w-full h-screen flex items-end justify-end pointer-events-none select-none z-0 overflow-hidden p-8"
        aria-hidden="true"
      >
        <div
          className="text-[30vw] leading-none uppercase"
          style={{
            fontFamily: '"Anton", sans-serif',
            color: 'rgba(198,255,0,0.02)',
            letterSpacing: '-0.04em',
            transform: 'rotate(4deg)',
          }}
        >
          PASS
        </div>
      </div>

      {/* ── Top stripe motif ── */}
      <div className="w-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-1"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #FF3D7F 0px, #FF3D7F 8px, transparent 8px, transparent 12px, #8A5CFF 12px, #8A5CFF 20px, transparent 20px, transparent 24px, #C6FF00 24px, #C6FF00 32px, transparent 32px, transparent 36px)',
          }}
        />
      </div>

      <div className="relative z-10 pt-28 md:pt-32 pb-24">

        {/* ── HERO HEADER ── */}
        <div ref={headerRef} className="px-6 md:px-12 mb-16">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#C6FF00]" />
            <span className="passes-meta text-[10px] font-mono uppercase tracking-[0.3em] text-silver/50">
              Falak &apos;26 · MIT Bengaluru
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="passes-heading-en text-6xl md:text-8xl lg:text-[10rem] uppercase leading-none text-white"
            style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '-0.03em' }}
          >
            PASSES
          </h1>

          {/* Subline */}
          <div className="passes-meta mt-5 max-w-2xl">
            <p
              className="text-base md:text-lg text-silver/70"
              style={{ fontFamily: '"Barlow", sans-serif', fontStyle: 'italic' }}
            >
              One pass. The whole Falak.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              {['15–17 OCT', 'MIT BENGALURU', '3 PASS TIERS', 'LIMITED EDITION'].map((label) => (
                <span
                  key={label}
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver/40 flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-silver/30 inline-block" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── PASS CARDS SECTION ── */}
        <div className="px-6 md:px-12">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1"
                  style={{
                    background: ['#FF3D7F', '#8A5CFF', '#C6FF00', '#8A5CFF', '#FF3D7F'][i],
                    transform: `rotate(45deg) scale(${i === 2 ? 1.2 : 0.8})`,
                  }}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver/40">
              Choose your tier
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Pass cards */}
          <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-4 lg:gap-6">
            {PASS_TIERS.map((pass, i) => {
              const delay = i * 0.15;
              return <PassCard pass={pass} delay={delay} key={pass.id} />;
            })}
          </div>

          {/* Price announcement note */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex items-center gap-3 p-4 rounded-sm"
            style={{
              border: '1px dashed rgba(198,255,0,0.3)',
              background: 'rgba(198,255,0,0.04)',
            }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0 animate-pulse"
              style={{ background: '#C6FF00' }}
            />
            <div>
              <p className="font-mono text-xs text-[#C6FF00] uppercase tracking-widest">
                Prices dropping soon
              </p>
              <p className="font-mono text-xs text-silver/50 mt-0.5 uppercase tracking-wide">
                Watch this space — releasing before Oct 1
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── COMPARE TABLE ── */}
        <div
          className="mt-20 mx-6 md:mx-12 p-6 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(192,192,192,0.08)',
          }}
        >
          <CompareTable />
        </div>

        {/* ── WHAT'S INCLUDED ── */}
        <div className="mt-16 px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: '🎟',
                title: 'Entry to all events',
                desc: '60+ cultural & sports events across 3 days at MIT Bengaluru.',
                color: '#FF3D7F',
              },
              {
                icon: '🎵',
                title: 'Pro nights included',
                desc: 'Battle of Bands + DJ nights — open for Full Falak & Star pass holders.',
                color: '#C6FF00',
              },
              {
                icon: '⭐',
                title: 'Star perks',
                desc: 'Priority lane, limited merch kit, backstage access. For real ones only.',
                color: '#8A5CFF',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-5 overflow-hidden"
                style={{
                  background: '#EDE4D3',
                  borderTop: `3px solid ${item.color}`,
                  clipPath: 'polygon(0 0, 100% 0, 100% 90%, 96% 100%, 0 100%)',
                  boxShadow: '2px 4px 12px rgba(0,0,0,0.35)',
                  transform: `rotate(${[-0.3, 0.4, -0.2][i]}deg)`,
                }}
              >
                {/* Tape */}
                <div
                  className="absolute -top-2 left-3 w-10 h-3 rounded-sm opacity-60"
                  style={{
                    background: 'rgba(255,255,255,0.4)',
                    transform: `rotate(${[-2, 1.5, -3][i]}deg)`,
                  }}
                />
                <div className="text-2xl mb-3 leading-none" aria-hidden="true">
                  {item.icon}
                </div>
                <h3
                  className="text-lg uppercase leading-tight text-[#0B0F2B]"
                  style={{ fontFamily: '"Anton", sans-serif' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs text-[#0B0F2B]/65 mt-3 leading-relaxed"
                  style={{ fontFamily: '"Barlow", sans-serif' }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA STRIP ── */}
        <div className="mt-20 mx-6 md:mx-12">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-0 overflow-hidden relative cursor-pointer group"
            style={{ border: '2px solid rgba(192,192,192,0.15)' }}
          >
            {/* Left: text block */}
            <div
              className="flex-1 px-6 md:px-10 py-7 md:py-8 flex flex-col justify-center relative"
              style={{ borderRight: '2px solid rgba(192,192,192,0.1)' }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.01) 3px, rgba(255,255,255,0.01) 4px)',
                }}
              />
              <div className="relative z-10">
                <div
                  className="text-2xl md:text-3xl uppercase leading-tight text-white"
                  style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '-0.02em' }}
                >
                  NOT SURE WHICH PASS?
                </div>
                <p className="font-mono text-xs text-silver/40 mt-3 uppercase tracking-widest">
                  Only coming for one day? Get the Gully Pass. Simple.
                </p>
              </div>
            </div>

            {/* Right: CTA block */}
            <div
              className="flex items-center justify-center px-8 py-6 md:py-0 gap-3 group-hover:bg-[#FF3D7F] transition-colors duration-300"
              style={{ background: 'rgba(255,61,127,0.12)', minWidth: '200px' }}
            >
              <div className="text-center">
                <div
                  className="text-xl md:text-2xl uppercase leading-none text-[#FF3D7F] group-hover:text-white transition-colors"
                  style={{ fontFamily: '"Anton", sans-serif' }}
                >
                  GET GULLY PASS
                </div>
                <div
                  className="text-3xl text-[#FF3D7F] group-hover:text-white group-hover:translate-x-2 transition-all duration-300 mt-2"
                  style={{ fontFamily: '"Anton", sans-serif' }}
                >
                  →
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BACK LINK ── */}
        <div className="mt-8 px-6 md:px-12 flex justify-center">
          <Link
            to="/schedule"
            className="font-mono text-xs text-silver/40 hover:text-silver/70 uppercase tracking-[0.2em] transition-colors flex items-center gap-2"
          >
            ← Back to Schedule
          </Link>
        </div>

      </div>
    </div>
  );
}
