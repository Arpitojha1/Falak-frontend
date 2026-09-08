// Passes Page — Falak '26
// MAHE / NON-MAHE pass system
// Early bird pricing + locked regular prices

import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { PassCard } from '../components/passes/PassCard';
import { CompareTable } from '../components/passes/CompareTable';
import {
  MAHE_PASSES,
  NON_MAHE_PASSES,
  SPORTS_ENTRY_FEES,
  PASSES_FINE_PRINT,
} from '../data/passesData';

gsap.registerPlugin(ScrollTrigger);

export function Passes() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [feesOpen, setFeesOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'mahe' | 'non-mahe'>('mahe');

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

  // Group sports fees by category
  const feesByCategory = SPORTS_ENTRY_FEES.reduce(
    (acc, fee) => {
      if (!acc[fee.category]) acc[fee.category] = [];
      acc[fee.category].push(fee);
      return acc;
    },
    {} as Record<string, typeof SPORTS_ENTRY_FEES>
  );

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
        className="fixed top-1/4 -left-32 w-96 h-96 rounded-full pointer-events-none z-0 blur-[120px] opacity-25"
        style={{ background: '#FF3D7F' }}
      />
      <div
        className="fixed top-2/3 -right-32 w-96 h-96 rounded-full pointer-events-none z-0 blur-[120px] opacity-20"
        style={{ background: '#C6FF00' }}
      />

      {/* ── Massive Ghost Typography Background (Subtle Street Mural Backdrop) ── */}
      <div
        className="fixed top-0 left-0 w-full h-screen flex items-end justify-end pointer-events-none select-none z-0 overflow-hidden p-8"
        aria-hidden="true"
      >
        <div
          className="text-[32vw] font-black leading-none uppercase"
          style={{
            fontFamily: '"Anton", sans-serif',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.06)',
            letterSpacing: '0.04em',
            transform: 'rotate(4deg)',
          }}
        >
          PASS
        </div>
      </div>

      {/* Top stripe */}
      <div className="w-full overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="w-full h-1.5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, #FF3D7F 0px, #FF3D7F 8px, transparent 8px, transparent 12px, #8A5CFF 12px, #8A5CFF 20px, transparent 20px, transparent 24px, #C6FF00 24px, #C6FF00 32px, transparent 32px, transparent 36px)',
          }}
        />
      </div>

      <div className="relative z-10 pt-28 md:pt-32 pb-24">

        {/* ── HERO HEADER ── */}
        <div ref={headerRef} className="px-4 sm:px-6 md:px-12 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#C6FF00]" />
            <span className="passes-meta text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#C6FF00]">
              Falak &apos;26 · MIT Bengaluru
            </span>
          </div>

          <h1
            className="passes-heading-en text-5xl sm:text-6xl md:text-8xl lg:text-[9.5rem] uppercase leading-none text-white font-black"
            style={{ fontFamily: '"Anton", sans-serif', letterSpacing: '0.04em' }}
          >
            PASSES
          </h1>

          <div className="passes-meta mt-5 max-w-2xl">
            <p
              className="text-lg md:text-xl text-white/90 font-bold"
              style={{ fontFamily: '"Barlow", sans-serif', fontStyle: 'italic' }}
            >
              One pass. The whole Falak.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3">
              {['OCT 15–17', 'MIT BENGALURU', 'MAHE & NON-MAHE', 'EARLY BIRD LIVE'].map((label) => (
                <span
                  key={label}
                  className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/80 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] inline-block shadow-sm" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAHE / NON-MAHE TOGGLE (Street Neo-Brutalist) ── */}
        <div className="px-4 sm:px-6 md:px-12 mb-12">
          <div
            className="inline-flex p-1.5 rounded-sm"
            style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '4px 4px 0px rgba(0,0,0,0.6)',
            }}
          >
            <button
              onClick={() => setActiveTab('mahe')}
              className="relative px-8 py-3 text-sm md:text-base font-black uppercase tracking-widest transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: '"Anton", sans-serif',
                color: activeTab === 'mahe' ? '#000000' : '#FFFFFF',
              }}
            >
              {activeTab === 'mahe' && (
                <motion.div
                  layoutId="pass-tab-bg"
                  className="absolute inset-0 rounded-sm"
                  style={{
                    background: '#C6FF00',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0px #000',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">MAHE Students</span>
            </button>
            <button
              onClick={() => setActiveTab('non-mahe')}
              className="relative px-8 py-3 text-sm md:text-base font-black uppercase tracking-widest transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: '"Anton", sans-serif',
                color: activeTab === 'non-mahe' ? '#000000' : '#FFFFFF',
              }}
            >
              {activeTab === 'non-mahe' && (
                <motion.div
                  layoutId="pass-tab-bg"
                  className="absolute inset-0 rounded-sm"
                  style={{
                    background: '#FF3D7F',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0px #000',
                  }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">NON-MAHE Students</span>
            </button>
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'mahe' ? (
            <motion.div
              key="mahe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="px-6 md:px-12 mb-20"
            >
              {/* MAHE pass cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {MAHE_PASSES.map((pass, i) => (
                  <PassCard pass={pass} delay={i * 0.12} key={pass.id} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="non-mahe"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="px-6 md:px-12 mb-16"
            >
              {/* NON-MAHE pass cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {NON_MAHE_PASSES.map((pass, i) => (
                  <PassCard pass={pass} delay={i * 0.12} key={pass.id} />
                ))}
              </div>

              {/* ── Sports Entry Fees (expandable) ── */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  onClick={() => setFeesOpen(!feesOpen)}
                  className="w-full flex items-center justify-between px-6 py-4 rounded-sm transition-all group cursor-pointer"
                  style={{
                    background: 'rgba(198,255,0,0.08)',
                    border: '1.5px dashed rgba(198,255,0,0.6)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: '#C6FF00', boxShadow: '0 0 8px #C6FF00' }}
                    />
                    <div className="text-left">
                      <span className="font-mono text-xs md:text-sm text-[#C6FF00] font-black uppercase tracking-wider">
                        Sports Entry Fees (Non-MAHE)
                      </span>
                      <p className="font-mono text-xs text-white/80 mt-0.5 font-medium">
                        Entry fees vary per event — click to view full breakdown
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: feesOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-[#C6FF00]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {feesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-2 px-6 py-6 rounded-sm"
                        style={{
                          background: 'rgba(0, 0, 0, 0.5)',
                          border: '2px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[540px]">
                            <thead>
                              <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}>
                                <th className="text-left py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-bold" style={{ width: '25%' }}>
                                  Sport
                                </th>
                                <th className="text-left py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-bold" style={{ width: '30%' }}>
                                  Event
                                </th>
                                <th className="text-right py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-bold" style={{ width: '15%' }}>
                                  Fee (₹)
                                </th>
                                <th className="text-center py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-bold" style={{ width: '15%' }}>
                                  Team Size
                                </th>
                                <th className="text-center py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-white/90 font-bold" style={{ width: '15%' }}>
                                  Type
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(feesByCategory).map(([category, fees]) => (
                                fees.map((fee, idx) => (
                                  <tr
                                    key={`${category}-${fee.event}`}
                                    className="group hover:bg-white/[0.04] transition-colors"
                                    style={{ borderTop: idx === 0 ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.06)' }}
                                  >
                                    <td className="py-3">
                                      {idx === 0 && (
                                        <span className="text-xs font-mono uppercase tracking-wider text-white font-black">
                                          {category}
                                        </span>
                                      )}
                                    </td>
                                    <td className="py-3">
                                      <span className="text-xs font-mono text-amber-200/95 font-bold">
                                        {fee.event}
                                      </span>
                                    </td>
                                    <td className="py-3 text-right">
                                      <span className="text-xs md:text-sm font-mono text-[#C6FF00] font-black">
                                        ₹{fee.entryFee.toLocaleString()}
                                      </span>
                                    </td>
                                    <td className="py-3 text-center">
                                      <span className="text-xs font-mono text-white/90 font-semibold">
                                        {fee.teamSize}
                                      </span>
                                    </td>
                                    <td className="py-3 text-center">
                                      <span
                                        className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                                        style={{
                                          background: fee.feeType === 'Team' ? 'rgba(255,61,127,0.2)' : 'rgba(138,92,255,0.2)',
                                          color: fee.feeType === 'Team' ? '#FF3D7F' : '#A78BFA',
                                          borderColor: fee.feeType === 'Team' ? 'rgba(255,61,127,0.5)' : 'rgba(138,92,255,0.5)',
                                        }}
                                      >
                                        {fee.feeType}
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── COMPARE TABLE CONTAINER ── */}
        <div
          className="mt-10 mx-3 sm:mx-6 md:mx-12 p-3.5 sm:p-6 md:p-10 rounded-sm"
          style={{
            background: 'rgba(0, 0, 0, 0.45)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '6px 6px 0px rgba(0,0,0,0.6)',
          }}
        >
          <CompareTable />
        </div>

        {/* ── Early Bird Notice ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 mx-6 md:mx-12 flex items-center gap-3 p-4 rounded-sm"
          style={{
            border: '2px dashed #C6FF00',
            background: 'rgba(198,255,0,0.08)',
          }}
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 animate-ping"
            style={{ background: '#C6FF00' }}
          />
          <div>
            <p className="font-mono text-xs md:text-sm text-[#C6FF00] font-black uppercase tracking-widest">
              ⚡ EARLY BIRD PASSES ARE ACTIVE
            </p>
            <p className="font-mono text-xs text-white/80 mt-0.5 font-medium">
              Grab your passes before the early bird quota closes. Regular tier prices locked!
            </p>
          </div>
        </motion.div>

        {/* ── Fine Print ── */}
        <div className="mt-8 mx-6 md:mx-12 pt-4 border-t border-white/10">
          <p className="font-mono text-xs text-white/70 uppercase tracking-wider">
            {PASSES_FINE_PRINT}
          </p>
        </div>

        {/* ── BACK LINK ── */}
        <div className="mt-8 px-6 md:px-12 flex justify-center">
          <Link
            to="/schedule"
            className="font-mono text-xs text-white/70 hover:text-white uppercase tracking-[0.2em] transition-colors flex items-center gap-2 font-bold"
          >
            ← Back to Schedule
          </Link>
        </div>

      </div>
    </div>
  );
}
