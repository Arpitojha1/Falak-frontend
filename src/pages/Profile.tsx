import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { mockProfileData, Registration, Pass } from '../data/mockProfile';
import { Ticket, Scan, CheckCircle2, AlertCircle, Clock3, MapPin, Calendar, Users, ChevronDown, ChevronUp } from 'lucide-react';

const StatusBadge = ({ status }: { status: 'paid' | 'pending' | 'failed' }) => {
  const isPaid = status === 'paid';
  const isPending = status === 'pending';
  
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${isPaid ? 'border-silver' : isPending ? 'border-silver/60' : 'border-silver/40'} text-[10px] sm:text-xs font-mono font-medium text-silver`}>
      {isPaid ? <CheckCircle2 size={12} /> : isPending ? <Clock3 size={12} /> : <AlertCircle size={12} />}
      <span className="uppercase tracking-wider">{status}</span>
    </div>
  );
};

const ProfileEventCard: React.FC<{ event: Registration }> = ({ event }) => {
  const [isTeamExpanded, setIsTeamExpanded] = useState(false);
  const isTeam = event.teamMembers && event.teamMembers.length > 0;

  return (
    <div className="relative w-full rounded-md border border-silver/20 bg-deep-plum/40 overflow-hidden backdrop-blur-sm group">
      {/* Ticket stub notch (left edge) */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-deep-plum border border-silver/20 z-10"></div>
      
      {/* Dashed perforation line */}
      <div className="absolute left-6 top-0 bottom-0 w-px border-l-2 border-dashed border-silver/10 z-0"></div>

      <div className="flex flex-col sm:flex-row relative z-10 pl-10 pr-4 py-5 gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-silver/70 border border-silver/20 px-2 py-0.5 rounded-sm">
              {event.track}
            </span>
            <div className="sm:hidden">
              <StatusBadge status={event.paymentStatus} />
            </div>
          </div>
          
          <h3 className="font-accent font-bold text-champagne-pearl text-lg sm:text-xl truncate mb-3">
            {event.eventName}
          </h3>
          
          <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-soft-lilac/80 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-silver/60" />
              {event.date}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-silver/60" />
              {event.venue}
            </div>
          </div>

          {isTeam && (
            <div className="mt-2">
              <button 
                onClick={() => setIsTeamExpanded(!isTeamExpanded)}
                className="flex items-center gap-2 text-xs font-sans text-aurora-violet hover:text-soft-lilac transition-colors"
              >
                <Users size={14} />
                <span>Team Roster ({event.teamMembers?.length})</span>
                {isTeamExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              
              <AnimatePresence>
                {isTeamExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-soft-lilac/70 pl-2 border-l-2 border-silver/10">
                      {event.teamMembers?.map((member, idx) => (
                        <li key={idx} className="truncate">• {member}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
        
        <div className="hidden sm:flex flex-col items-end justify-between border-l border-silver/10 pl-4 min-w-[120px]">
           <StatusBadge status={event.paymentStatus} />
        </div>
      </div>
    </div>
  );
};

const ProfilePassCard: React.FC<{ pass: Pass }> = ({ pass }) => {
  return (
    <div className="relative w-full rounded-md border border-silver/20 bg-transparent overflow-hidden backdrop-blur-sm p-5 flex items-start gap-4 sm:gap-6 group">
      {/* QR Notch language on right edge */}
      <div className="absolute right-0 top-0 bottom-0 w-8 flex flex-col justify-between py-3 pr-3 opacity-30 group-hover:opacity-60 transition-opacity">
        <div className="w-3 h-3 border-t-2 border-r-2 border-silver self-end"></div>
        <div className="w-3 h-3 border-b-2 border-r-2 border-silver self-end"></div>
      </div>

      {/* QR Placeholder Box */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 border border-silver/40 rounded bg-deep-plum/60 flex items-center justify-center p-2 relative">
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

  const handleStampSelect = (variation: 'A' | 'B' | 'C') => {
    setProfile(prev => ({ ...prev, stampVariation: variation }));
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 flex flex-col items-center">
      
      {/* BACKGROUND (Asset 2) */}
      <div className="fixed inset-0 z-[-1] bg-deep-plum flex items-center justify-center pointer-events-none">
        {/* Lattice pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0ZM20 2L4 20L20 38L36 20L20 2Z' fill='%238A5CFF' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Radial glow for stamp selector */}
        <div 
          className="absolute top-[15vh] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full blur-[80px]"
          style={{ backgroundColor: '#FF3D7F', opacity: 0.12 }}
        />
        {/* Vertical gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-plum via-deep-plum/80 to-deep-plum/20" />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        
        {/* HEADER & STAMP SELECTOR */}
        <header className="mb-16 text-center flex flex-col items-center">
          <h1 className="font-display text-3xl sm:text-4xl text-silver uppercase tracking-wider mb-2">My Falak</h1>
          <p className="font-sans text-soft-lilac/70 text-sm">{profile.email}</p>
          <p className="font-accent font-bold text-champagne-pearl text-xl sm:text-2xl mt-1 mb-8">{profile.name}</p>

          <div className="flex flex-col items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-silver/50">Select your Profile Stamp</span>
            <div className="flex gap-4 sm:gap-6">
              {(['A', 'B', 'C'] as const).map((variation) => {
                const isSelected = profile.stampVariation === variation;
                return (
                  <button
                    key={variation}
                    onClick={() => handleStampSelect(variation)}
                    className="relative rounded-full transition-all duration-300"
                    aria-label={`Select stamp variation ${variation}`}
                  >
                    {/* Glow ring when selected */}
                    {isSelected && (
                      <div className="absolute -inset-2 rounded-full border border-silver/80 z-0">
                         <div className="absolute inset-0 rounded-full bg-convergence-magenta opacity-[0.08] blur-[2px]"></div>
                      </div>
                    )}
                    
                    {/* Placeholder Stamp Circle */}
                    <div 
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-deep-plum transition-colors z-10 ${
                        isSelected ? 'border-[1.5px] border-silver shadow-[0_0_15px_rgba(255,61,127,0.15)]' : 'border border-silver/40 hover:border-silver/70'
                      }`}
                      style={{
                        // Perforated edge effect placeholder via CSS mask (or rough approximation)
                        maskImage: `radial-gradient(circle at 4px 4px, transparent 2px, black 2.5px)`,
                        maskSize: '8px 8px',
                        maskPosition: '-4px -4px'
                      }}
                    >
                       {/* The actual border is handled by the wrapper since mask will clip borders. 
                           Re-doing a clean circle border inside the masked area: */}
                       <div className="absolute inset-0 rounded-full border border-silver opacity-30"></div>
                       <span className="font-display text-silver text-xl">{variation}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* CTA BUTTONS ROW */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {/* Events CTA - Ticket Stub */}
          <button 
            className="group relative h-[48px] px-8 rounded-full bg-aurora-violet border border-silver text-champagne-pearl font-sans text-sm font-bold flex items-center justify-center gap-2 overflow-hidden transition-colors"
            style={{
              clipPath: 'polygon(10px 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)' // Rough angled notch as a stub placeholder
            }}
          >
            {/* Real stub notch using a pseudo-element style circle cutout at the left edge center */}
            <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-4 bg-deep-plum rounded-full border border-silver group-hover:border-silver/80"></div>
            
            <Ticket size={16} className="text-silver z-10" />
            <span className="z-10 tracking-wide font-[Archivo]">My Events</span>
            
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-[0.08] bg-convergence-magenta transition-opacity duration-300 z-0 pointer-events-none"></div>
          </button>

          {/* Passes CTA - Boarding Pass */}
          <button 
            className="group relative h-[48px] px-8 rounded-full bg-transparent border border-silver text-soft-lilac font-sans text-sm font-bold flex items-center justify-center gap-2 overflow-hidden transition-colors"
          >
             {/* QR Corner bracket notch on right edge */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-[6px] opacity-70">
              <div className="w-1.5 h-1.5 border-t border-r border-silver"></div>
              <div className="w-1.5 h-1.5 border-b border-r border-silver"></div>
            </div>

            <span className="z-10 tracking-wide font-[Archivo] pr-4">My Passes</span>
            <Scan size={16} className="text-silver z-10 mr-2" />
            
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-[0.08] bg-convergence-magenta transition-opacity duration-300 z-0 pointer-events-none"></div>
          </button>
        </div>

        <div className="space-y-16">
          {/* MY EVENTS SECTION */}
          <section>
            <h2 className="font-display text-2xl text-silver uppercase tracking-widest mb-6 border-b border-silver/10 pb-4">
              Registered Events
            </h2>
            {profile.registrations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.registrations.map(reg => (
                  <ProfileEventCard key={reg.id} event={reg} />
                ))}
              </div>
            ) : (
              <p className="text-silver/50 font-sans text-sm">No events registered yet.</p>
            )}
          </section>

          {/* MY PASSES SECTION */}
          <section>
            <h2 className="font-display text-2xl text-silver uppercase tracking-widest mb-6 border-b border-silver/10 pb-4">
              Passes & Access
            </h2>
            {profile.passes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
