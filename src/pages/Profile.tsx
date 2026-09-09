import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockProfileData, Registration, Pass } from '../data/mockProfile';
import { Scan, CheckCircle2, AlertCircle, Clock3 } from 'lucide-react';

const StatusBadge = ({ status }: { status: 'paid' | 'pending' | 'failed' }) => {
  const isPaid = status === 'paid';
  const isPending = status === 'pending';

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${isPaid ? 'border-silver' : isPending ? 'border-silver/60' : 'border-silver/40'} text-[10px] sm:text-xs font-mono font-medium text-silver backdrop-blur-sm bg-midnight-indigo/40`}>
      {isPaid ? <CheckCircle2 size={12} /> : isPending ? <Clock3 size={12} /> : <AlertCircle size={12} />}
      <span className="uppercase tracking-wider">{status}</span>
    </div>
  );
};

const ProfileEventCard: React.FC<{ event: Registration }> = ({ event }) => {
  const isCultural = event.track.toLowerCase() === 'cultural';
  const isSports = event.track.toLowerCase() === 'sports';

  // Desktop (landscape): crossfade between base + track-specific art — unchanged
  const AVATAR_OPTIONS = [
    '/assets/profile/Neon%20Violet%20Anime%20Icon.png',
    '/assets/profile/Joyful%20Retro%20Singer%20Avatar.png',
    '/assets/profile/Elegant%20Purple%20Indian%20Portrait%20Emblem.png'
  ];
  const desktopBaseAsset = '/assets/Landing/ticketsBase.png';
  const desktopHoverAsset = isCultural
    ? '/assets/culturalAssets/CulturalTicketsBase.png'
    : isSports
      ? '/assets/sportsAssets/SportsTicketsBase.png'
      : '/assets/Landing/ticketsBase.png';

  // Mobile (portrait): correctly proportioned 3:4 assets — object-cover, no letterbox
  const mobileAsset = isCultural
    ? '/assets/culturalAssets/cultural_ticket_portrait.jpg'
    : isSports
      ? '/assets/Landing/sports_ticket_portrait.jpg'
      : '/assets/Landing/generic_ticket_portrait.jpg';

  // Zone proportions per art brief: top-stub 15% | main-body 55% | qr-band 30%

  return (
    <>
      {/* ── MOBILE portrait card (hidden md+) ──
          3:4 container. Portrait art fills it with object-cover.
          Content anchored to band percentages so it stays aligned
          at any card width (320px, 375px, 414px). */}
      <div
        className="relative md:hidden w-full max-w-[300px] mx-auto mb-4 rounded-md overflow-hidden"
        style={{ aspectRatio: '3 / 4' }}
      >
        {/* Portrait art — object-cover, correct proportion, no empty space */}
        <img
          src={mobileAsset}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          draggable="false"
        />

        {/* TOP BAND: track label (top 0–15%)
            Sits inside the header stub band of the art. */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
          style={{ top: '3%', height: '12%' }}
        >
          <span
            className={`font-mono uppercase tracking-widest text-[9px] font-semibold px-2.5 py-0.5 rounded-sm ${isSports
              ? 'text-midnight-indigo bg-electric-orange/80'
              : 'text-champagne-pearl bg-aurora-violet/50'
              }`}
          >
            {event.track} Track
          </span>
        </div>

        {/* MIDDLE BAND: event name + venue + date (15%–70%)
            Negative-space zone in the art — text sits over the open crackle/halftone surface.
            ZONE CHECK: if realistic event name + venue overflows into bottom 30%,
            stop and flag — do not shrink below 10px or truncate silently. */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center justify-center gap-1.5 px-4 pointer-events-none"
          style={{ top: '15%', height: '55%' }}
        >
          <h3
            className={`font-sans font-bold text-center leading-snug ${isSports ? 'text-midnight-indigo' : 'text-deep-plum'
              }`}
            style={{ fontSize: 'clamp(0.85rem, 5vw, 1.15rem)' }}
          >
            {event.eventName}
          </h3>
          <div
            className={`w-8 h-px ${isSports ? 'bg-midnight-indigo/30' : 'bg-aurora-violet/35'}`}
          />
          <p
            className={`font-sans text-[11px] text-center leading-snug ${isSports ? 'text-midnight-indigo/70' : 'text-deep-plum/70'
              }`}
          >
            {event.venue}
          </p>
          <p
            className={`font-mono text-[10px] uppercase tracking-wider ${isSports ? 'text-midnight-indigo/55' : 'text-aurora-violet/80'
              }`}
          >
            {event.date}
          </p>
          {event.teamMembers && event.teamMembers.length > 0 && (
            <p
              className={`font-mono text-[9px] uppercase tracking-wider ${isSports ? 'text-midnight-indigo/45' : 'text-deep-plum/45'
                }`}
            >
              Team · {event.teamMembers.length} members
            </p>
          )}
        </div>

        {/* BOTTOM BAND: QR placeholder + status badge (70%–100%)
            QR sized to ~55% of band height so the art's starburst/seal
            decorative element (sports: 8-pt starburst; cultural: wax-seal circle)
            remains visibly framed around the QR edges. */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center justify-center gap-1.5"
          style={{ top: '70%', height: '30%' }}
        >
          <div
            className="border border-silver/40 rounded-sm bg-midnight-indigo/20 flex items-center justify-center relative"
            style={{ width: '20%', aspectRatio: '1 / 1' }}
            aria-label="QR code placeholder"
          >
            <div className="absolute inset-1 border border-silver/20 border-dashed rounded-sm" />
            <Scan size={12} className="text-silver/50" />
          </div>
          <StatusBadge status={event.paymentStatus} />
        </div>
      </div>

      {/* ── DESKTOP landscape card (md+ only) — completely unchanged from original ── */}
      <div
        className="relative hidden md:block w-full max-w-[700px] aspect-[3/1] group focus-within:outline-none focus-visible:ring-2 focus-visible:ring-silver/50 rounded-lg shrink-0 mb-4 @container"
        tabIndex={0}
      >
        {/* Background Images - Crossfade on hover/focus */}
        <img
          src={desktopBaseAsset}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ease-in-out group-hover:opacity-0 group-focus:opacity-0"
          alt="Ticket Base"
        />

        {desktopHoverAsset !== desktopBaseAsset && (
          <img
            src={desktopHoverAsset}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 group-focus:opacity-100"
            alt="Ticket Hover"
          />
        )}

        {/* Overlay Text Zones */}

        {/* Stub Number Zone: Left Side. Aligning to the '- - - -' area in the asset */}
        <div className="absolute top-[20%] left-[3%] w-[20%] flex flex-col pointer-events-none pr-1">
          <h3 className="font-sans font-bold text-champagne-pearl leading-[1.15]" style={{ fontFamily: 'Archivo, sans-serif', fontSize: '2.8cqw' }}>
            {event.eventName}
          </h3>
          <span className="font-mono uppercase tracking-widest text-silver/70 mt-[1cqw]" style={{ fontSize: '1.2cqw' }}>
            {event.track}
          </span>
        </div>

        {/* Date Zone: Top right corner stamp-disc zone */}
        <div className="absolute top-[10%] right-[3%] w-[12%] aspect-square flex flex-col items-center justify-center pointer-events-none">
          <span className="font-sans font-bold text-silver/90 text-center uppercase leading-tight" style={{ fontFamily: 'Archivo, sans-serif', fontSize: '2cqw' }}>
            {event.date.split(' ').slice(0, 2).join('\n')}
          </span>
        </div>

        {/* Status badge - bottom right out of the way of the mascot arch */}
        <div className="absolute bottom-[10%] right-[3%]">
          <StatusBadge status={event.paymentStatus} />
        </div>
      </div>
    </>
  );
};

const ProfilePassCard: React.FC<{ pass: Pass }> = ({ pass }) => {
  // Passes are always generic (not track-specific) — use the generic portrait asset
  // which carries the Culture palette + single Magenta starburst per /profile rules.
  const mobileAsset = '/assets/Landing/generic_ticket_portrait.jpg';

  return (
    <>
      {/* ── MOBILE portrait pass card (hidden md+) ──
          generic_ticket_portrait.jpg has a centered Magenta starburst in the
          bottom 30% with an open circle interior. QR is sized to ~55% of band height
          so starburst spike tips remain visible around the QR edges. */}
      <div
        className="relative md:hidden w-full max-w-[300px] mx-auto mb-4 rounded-md overflow-hidden"
        style={{ aspectRatio: '3 / 4' }}
      >
        {/* Portrait art — object-cover, correct proportion, no empty space */}
        <img
          src={mobileAsset}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          draggable="false"
        />

        {/* TOP BAND: pass label (top 0–15%) */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center pointer-events-none"
          style={{ top: '3%', height: '12%' }}
        >
          <span className="font-mono uppercase tracking-widest text-[9px] font-semibold text-champagne-pearl bg-aurora-violet/50 px-2.5 py-0.5 rounded-sm">
            Falak &apos;26 Pass
          </span>
        </div>

        {/* MIDDLE BAND: pass name + status (15%–70%) */}
        <div
          className="absolute left-0 right-0 flex flex-col items-center justify-center gap-2 px-4 pointer-events-none"
          style={{ top: '15%', height: '55%' }}
        >
          <h3
            className="font-sans font-bold text-deep-plum text-center leading-snug"
            style={{ fontSize: 'clamp(0.85rem, 5vw, 1.15rem)' }}
          >
            {pass.passName}
          </h3>
          <div className="w-8 h-px bg-aurora-violet/35" />
          <StatusBadge status={pass.paymentStatus} />
        </div>

        {/* BOTTOM BAND: QR placeholder inside the Magenta starburst open circle (70%–100%)
            Width ~22% of card = ~66px at 300px card width — starburst points visible at edges. */}
        <div
          className="absolute left-0 right-0 flex items-center justify-center"
          style={{ top: '70%', height: '30%' }}
        >
          <div
            className="border border-silver/40 rounded-sm bg-midnight-indigo/25 flex items-center justify-center relative"
            style={{ width: '22%', aspectRatio: '1 / 1' }}
            aria-label="QR code placeholder"
          >
            <div className="absolute inset-1 border border-silver/20 border-dashed rounded-sm" />
            <Scan size={12} className="text-silver/40" />
          </div>
        </div>
      </div>

      {/* ── DESKTOP plain card (md+ only) — completely unchanged from original ── */}
      <div className="relative hidden md:flex w-full max-w-[700px] rounded-md border border-silver/20 bg-deep-plum/40 overflow-hidden backdrop-blur-sm p-5 items-start gap-4 sm:gap-6 group mb-4">
        {/* QR Notch language on right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-between py-3 pr-3 opacity-30 group-hover:opacity-60 transition-opacity">
          <div className="w-3 h-3 border-t-2 border-r-2 border-silver self-end"></div>
          <div className="w-3 h-3 border-b-2 border-r-2 border-silver self-end"></div>
        </div>

        {/* QR Placeholder Box */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 border border-silver/40 rounded bg-midnight-indigo/60 flex items-center justify-center p-2 relative">
          <div className="absolute inset-1 border border-silver/20 border-dashed rounded-sm"></div>
          <Scan size={24} className="text-silver/40" />
        </div>

        <div className="flex-1 flex flex-col justify-between min-h-[64px] sm:min-h-[80px] py-1">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-silver/60">
              Falak &apos;26 Pass
            </span>
            <h3 className="font-sans font-bold text-soft-lilac text-sm sm:text-base leading-tight mt-1 mb-3 pr-6">
              {pass.passName}
            </h3>
          </div>
          <div>
            <StatusBadge status={pass.paymentStatus} />
          </div>
        </div>
      </div>
    </>
  );
};

const AVATAR_OPTIONS = [
  '/assets/profile/Neon%20Violet%20Anime%20Icon.png',
  '/assets/profile/Joyful%20Retro%20Singer%20Avatar.png',
  '/assets/profile/Elegant%20Purple%20Indian%20Portrait%20Emblem.png'
];

export function Profile() {
  const [profile, setProfile] = useState(mockProfileData);
  const [showStampSelector, setShowStampSelector] = useState(false);

  // Sync initial avatar from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('falak_avatar');
    if (saved && AVATAR_OPTIONS.includes(saved)) {
      setProfile(prev => ({ ...prev, stampVariation: saved as any }));
    } else {
      if (!saved) {
        localStorage.setItem('falak_avatar', AVATAR_OPTIONS[0]);
        window.dispatchEvent(new Event('falak_avatar_changed'));
      }
      setProfile(prev => ({ ...prev, stampVariation: AVATAR_OPTIONS[0] as any }));
    }
  }, []);

  const handleStampSelect = (variation: string) => {
    setProfile(prev => ({ ...prev, stampVariation: variation as any }));
    localStorage.setItem('falak_avatar', variation);
    window.dispatchEvent(new Event('falak_avatar_changed'));
    setShowStampSelector(false);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 flex justify-center">

      {/* BACKGROUND - Full page, absolute to avoid mobile viewport fixed-position bugs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/Landing/BackgroundProfile.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Soft overlay gradient to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-plum/60 via-deep-plum/40 to-deep-plum/90" />
      </div>

      {/* Layout Container: Stacked on mobile, 2-column on desktop */}
      <div className="w-full max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-start mt-8">

        {/* LEFT COLUMN - Identity Card */}
        <div className="w-full md:w-[320px] lg:w-[360px] shrink-0 md:sticky top-32">
          <div className="relative bg-deep-plum/80 border border-silver/20 rounded-xl p-8 backdrop-blur-md flex flex-col items-center text-center overflow-hidden">

            {/* Stamp Starburst/Glow from existing touchpoints */}
            <div
              className="absolute top-16 left-1/2 -translate-x-1/2 w-[180px] h-[180px] rounded-full blur-[50px] pointer-events-none z-0"
              style={{ backgroundColor: '#FF3D7F', opacity: 0.12 }}
            />

            <div className="relative z-10 w-full mb-8">
              {/* Active Stamp */}
              <div className="mx-auto relative w-32 h-32 rounded-full flex items-center justify-center bg-deep-plum border-[1.5px] border-silver shadow-[0_0_15px_rgba(255,61,127,0.15)] group overflow-hidden">
                <div className="absolute inset-0 rounded-full border border-silver opacity-30 z-10 pointer-events-none"></div>
                <img src={profile.stampVariation} alt="Profile Avatar" className="w-full h-full object-cover" />
              </div>

              <button
                className="mt-6 text-xs font-mono uppercase tracking-widest text-aurora-violet hover:text-soft-lilac transition-colors px-4 py-1.5 border border-aurora-violet/30 rounded-full hover:bg-aurora-violet/10 cursor-pointer"
                onClick={() => setShowStampSelector(!showStampSelector)}
              >
                Change Avatar
              </button>

              {/* Selector Expansion */}
              <AnimatePresence>
                {showStampSelector && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex justify-center gap-4 overflow-hidden"
                  >
                    {AVATAR_OPTIONS.map((variation, idx) => {
                      const isSelected = profile.stampVariation === variation;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleStampSelect(variation)}
                          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors cursor-pointer overflow-hidden ${isSelected ? 'ring-2 ring-silver' : 'ring-1 ring-silver/40 hover:ring-silver'}`}
                        >
                          <img src={variation} alt={`Avatar option ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full border-t border-silver/10 pt-6">
              <h1 className="font-display text-2xl text-silver uppercase tracking-wider mb-1">My Falak</h1>
              <p className="font-accent font-bold text-champagne-pearl text-xl mt-4">{profile.name}</p>
              <p className="font-sans text-soft-lilac/70 text-sm mt-1">{profile.email}</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Holdings */}
        <div className="flex-1 min-w-0 flex flex-col gap-12">

          {/* TICKETS SECTION */}
          <section>
            <h2 className="font-display text-xl text-silver uppercase tracking-widest mb-6 border-b border-silver/10 pb-4">
              Registered Events
            </h2>
            {profile.registrations.length > 0 ? (
              <div className="flex flex-col gap-6">
                {profile.registrations.map(reg => (
                  <ProfileEventCard key={reg.id} event={reg} />
                ))}
              </div>
            ) : (
              <p className="text-silver/50 font-sans text-sm">No events registered yet.</p>
            )}


          </section>

          {/* PASSES SECTION */}
          <section>
            <h2 className="font-display text-xl text-silver uppercase tracking-widest mb-6 border-b border-silver/10 pb-4">
              Passes & Access
            </h2>
            {profile.passes.length > 0 ? (
              <div className="flex flex-col gap-4">
                {profile.passes.map(pass => (
                  <ProfilePassCard key={pass.id} pass={pass} />
                ))}
              </div>
            ) : (
              <p className="text-silver/50 font-sans text-sm">No passes purchased yet.</p>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
