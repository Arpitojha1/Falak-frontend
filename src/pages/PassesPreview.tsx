import React from 'react';
import { PASSES_CONFIG } from '../data/passes.config';
import { TicketShell } from '../components/passes/TicketShell';

export function PassesPreview() {
  return (
    <div className="min-h-screen bg-black text-white p-8 pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-mono uppercase font-black tracking-widest text-[#FF3D7F] mb-4">Pass Ticket Shell Preview</h1>
          <p className="text-white/70 font-mono text-sm max-w-2xl">
            This is a standalone preview of the 5 skins and 7 passes driven by the new data config. 
            Review this against the Design Reference before wiring it into the live Passes page.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {PASSES_CONFIG.map(pass => (
            <div key={pass.id} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-mono uppercase font-bold tracking-widest text-[#FFB627]">Skin {pass.skin}</h2>
                <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-white/50">{pass.id}</span>
              </div>
              <TicketShell pass={pass} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
