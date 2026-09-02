import type React from 'react';
import { StampBurst } from './StampBurst';

// Plain stamp-style CTA button — Aurora Violet fill, Champagne Pearl border,
// Soft Lilac hover. Wrapped in StampBurst for particle click effect.
// No ticket asset, no image slot, no halftone — those all live on EventCard.tsx.

interface StampCTAProps {
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export function StampCTA({ label = 'REGISTER', href, onClick }: StampCTAProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onClick?.(e);
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
  }

  return (
    <StampBurst>
      <button
        type="button"
        onClick={handleClick}
        className="
          group relative inline-flex items-center justify-center
          px-10 py-4
          bg-aurora-violet text-midnight-indigo
          font-accent font-bold uppercase tracking-[0.15em]
          text-base overflow-hidden
          transition-colors duration-200
          hover:bg-soft-lilac hover:text-deep-plum
          cursor-pointer select-none
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aurora-violet
        "
      >
        {/* Champagne Pearl scalloped / perforated edge SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          {/* Inner champagne-pearl stroke */}
          <rect
            x="3" y="3"
            width="calc(100% - 6px)"
            height="calc(100% - 6px)"
            fill="none"
            stroke="#EDE4D3"
            strokeWidth="1"
            strokeOpacity="0.45"
          />
          {/* Perforated dash lines on all four sides */}
          <line x1="0" y1="0"   x2="100%" y2="0"    stroke="#EDE4D3" strokeWidth="5" strokeOpacity="0.25" strokeDasharray="6 8" />
          <line x1="0" y1="100%" x2="100%" y2="100%" stroke="#EDE4D3" strokeWidth="5" strokeOpacity="0.25" strokeDasharray="6 8" />
          <line x1="0" y1="0"   x2="0"    y2="100%" stroke="#EDE4D3" strokeWidth="5" strokeOpacity="0.25" strokeDasharray="6 8" />
          <line x1="100%" y1="0" x2="100%" y2="100%" stroke="#EDE4D3" strokeWidth="5" strokeOpacity="0.25" strokeDasharray="6 8" />
          {/* Postmark-style cancellation mark, top-right corner */}
          <circle cx="calc(100% - 14px)" cy="14" r="8"
            fill="none" stroke="#C0C0C0" strokeWidth="0.7" strokeOpacity="0.3" />
          <line x1="calc(100% - 22px)" y1="14" x2="calc(100% - 6px)" y2="14"
            stroke="#C0C0C0" strokeWidth="0.5" strokeOpacity="0.25" />
        </svg>

        {/* Label — above the SVG overlay */}
        <span className="relative z-10">{label}</span>
      </button>
    </StampBurst>
  );
}
