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
  const hoverAsset = isCultural 
    ? '/assets/culturalAssets/CulturalTicketsBase.png' 
    : isSports 
      ? '/assets/sportsAssets/SportsTicketsBase.png' 
      : '/assets/Landing/ticketsBase.png';
                     
  return (
    <div className="relative w-[500px] sm:w-[600px] md:w-full md:max-w-[700px] aspect-[3/1] group focus-within:outline-none focus-visible:ring-2 focus-visible:ring-silver/50 rounded-lg shrink-0 mb-4 @container" tabIndex={0}>
       {/* Background Images - Crossfade on hover/focus */}
       <img 
         src="/assets/Landing/ticketsBase.png" 
         className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ease-in-out group-hover:opacity-0 group-focus:opacity-0" 
         alt="Ticket Base" 
       />
       
       {hoverAsset !== '/assets/Landing/ticketsBase.png' && (
         <img 
           src={hoverAsset} 
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
  );
};

const ProfilePassCard: React.FC<{ pass: Pass }> = ({ pass }) => {
  return (
    <div className="relative w-[500px] sm:w-[600px] md:w-full md:max-w-[700px] rounded-md border border-silver/20 bg-deep-plum/40 overflow-hidden backdrop-blur-sm p-5 flex items-start gap-4 sm:gap-6 group mb-4">
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
            Falak '26 Pass
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
  );
};

export function Profile() {
  const [profile, setProfile] = useState(mockProfileData);
  const [showStampSelector, setShowStampSelector] = useState(false);

  // Sync initial avatar from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('falak_avatar');
    if (saved && ['A', 'B', 'C'].includes(saved)) {
      setProfile(prev => ({ ...prev, stampVariation: saved as any }));
    } else {
      // Set default 'A' if not present
      if (!saved) {
        localStorage.setItem('falak_avatar', 'A');
        window.dispatchEvent(new Event('falak_avatar_changed'));
      }
      setProfile(prev => ({ ...prev, stampVariation: 'A' }));
    }
  }, []);

  const handleStampSelect = (variation: 'A' | 'B' | 'C') => {
    setProfile(prev => ({ ...prev, stampVariation: variation }));
    localStorage.setItem('falak_avatar', variation);
    window.dispatchEvent(new Event('falak_avatar_changed'));
    setShowStampSelector(false);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 flex justify-center">
      
      {/* BACKGROUND - Full page, fixed so it doesn't scroll with content */}
      <div className="fixed inset-0 z-[-1] bg-deep-plum pointer-events-none">
        <img 
          src="/assets/Landing/BackgroundProfile.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-80 mix-blend-screen" 
        />
        {/* Soft overlay gradient to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-plum/60 via-transparent to-deep-plum/90" />
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
              <div className="mx-auto relative w-32 h-32 rounded-full flex items-center justify-center bg-deep-plum border-[1.5px] border-silver shadow-[0_0_15px_rgba(255,61,127,0.15)] group"
                   style={{ maskImage: `radial-gradient(circle at 4px 4px, transparent 2px, black 2.5px)`, maskSize: '8px 8px', maskPosition: '-4px -4px' }}>
                  <div className="absolute inset-0 rounded-full border border-silver opacity-30"></div>
                  <span className="font-display text-silver text-4xl">{profile.stampVariation}</span>
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
                    {(['A', 'B', 'C'] as const).map((variation) => {
                      const isSelected = profile.stampVariation === variation;
                      return (
                        <button
                          key={variation}
                          onClick={() => handleStampSelect(variation)}
                          className={`relative w-12 h-12 rounded-full flex items-center justify-center font-display text-lg transition-colors cursor-pointer ${
                            isSelected ? 'bg-silver text-deep-plum' : 'bg-deep-plum/80 border border-silver/40 text-silver hover:border-silver'
                          }`}
                        >
                          {variation}
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
              <div className="flex flex-col gap-6 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar">
                <div className="flex flex-col gap-6 min-w-max md:min-w-0">
                  {profile.registrations.map(reg => (
                    <ProfileEventCard key={reg.id} event={reg} />
                  ))}
                </div>
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
              <div className="flex flex-col gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar">
                <div className="flex flex-col gap-4 min-w-max md:min-w-0">
                  {profile.passes.map(pass => (
                    <ProfilePassCard key={pass.id} pass={pass} />
                  ))}
                </div>
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
