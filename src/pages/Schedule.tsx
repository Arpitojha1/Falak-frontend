export function Schedule() {
  return (
    <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center">
      <h1 className="font-display text-4xl md:text-6xl text-silver uppercase tracking-wider mb-8">Schedule</h1>
      
      {/* Segmented Control Placeholder */}
      <div className="flex gap-4 border-b border-silver/20 pb-4 w-full max-w-md mb-12">
        <button className="font-mono text-convergence-magenta uppercase tracking-widest text-sm flex-1 text-left">Events</button>
        <button className="font-mono text-silver/50 hover:text-silver uppercase tracking-widest text-sm flex-1 text-center transition-colors">Schedule</button>
        <button className="font-mono text-silver/50 hover:text-silver uppercase tracking-widest text-sm flex-1 text-right transition-colors">Passes</button>
      </div>

      <div className="font-accent text-silver/60 text-xl text-center max-w-md">
        This section is coming soon. The convergence is being scheduled.
      </div>
    </div>
  );
}
