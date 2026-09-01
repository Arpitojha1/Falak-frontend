export function SportsHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-midnight-indigo py-16 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Mascot Placeholder */}
        <div className="flex justify-center lg:justify-start w-full">
          {/* TODO: Sports mascot asset goes here */}
          <div className="aspect-[4/5] w-full max-w-md bg-silver/10 border-2 border-dashed border-electric-orange/50 flex items-center justify-center">
            <span className="text-electric-orange font-mono text-sm">TODO: Mascot Asset</span>
          </div>
        </div>

        {/* Right Side: Typography & CTA */}
        <div className="flex flex-col items-start">
          <img
            src="/assets/logo-transparent/falak_transparent-7.png"
            alt="Falak 26 Logo"
            className="h-16 md:h-20 object-contain mb-6"
          />

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-silver uppercase tracking-tight leading-[0.9] flex flex-col mb-4">
            <span>GAME</span>
            <span className="text-electric-orange">ON</span>
          </h1>

          <p className="font-sans text-silver/70 text-base md:text-lg max-w-lg mb-8">
            The arena is set. Six championships, infinite adrenaline. Step onto the field and claim your legacy at Falak '26.
          </p>

          <a
            href="#events"
            className="inline-flex items-center justify-center px-8 py-4 bg-electric-orange text-midnight-indigo font-headline-sports-section uppercase text-base md:text-lg tracking-wider transition-transform active:scale-95"
          >
            EXPLORE EVENTS ↓
          </a>
        </div>
      </div>
    </section>
  );
}
