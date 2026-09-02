import type React from 'react';
import { StampBurst } from './StampBurst';

interface StampCTAProps {
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

// SVG-based scalloped border mask — repeating radial notches along all four edges
// rendered as an inline SVG background so the shape is true perforated-edge,
// not border-radius standing in for it.
function ScallopedEdge() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Perforated stamp edge: scalloped notches every 14px, 6px radius */}
        <clipPath id="stamp-clip" clipPathUnits="objectBoundingBox">
          {/* We approximate with a rounded-rect base; the scallops are done
              via the SVG border overlay below rather than a clip to keep the
              fill color intact */}
          <rect x="0" y="0" width="1" height="1" />
        </clipPath>
      </defs>

      {/* Outer champagne-pearl stroke following the content rect */}
      <rect
        x="2"
        y="2"
        width="calc(100% - 4px)"
        height="calc(100% - 4px)"
        fill="none"
        stroke="#EDE4D3"
        strokeWidth="1"
        strokeOpacity="0.5"
        rx="2"
      />

      {/* Scalloped / perforated edge lines on all four sides.
          We draw repeating small dashes that look like perforation holes. */}
      {/* Top edge */}
      <line
        x1="0" y1="0" x2="100%" y2="0"
        stroke="#EDE4D3"
        strokeWidth="5"
        strokeOpacity="0.3"
        strokeDasharray="6 8"
      />
      {/* Bottom edge */}
      <line
        x1="0" y1="100%" x2="100%" y2="100%"
        stroke="#EDE4D3"
        strokeWidth="5"
        strokeOpacity="0.3"
        strokeDasharray="6 8"
      />
      {/* Left edge */}
      <line
        x1="0" y1="0" x2="0" y2="100%"
        stroke="#EDE4D3"
        strokeWidth="5"
        strokeOpacity="0.3"
        strokeDasharray="6 8"
      />
      {/* Right edge */}
      <line
        x1="100%" y1="0" x2="100%" y2="100%"
        stroke="#EDE4D3"
        strokeWidth="5"
        strokeOpacity="0.3"
        strokeDasharray="6 8"
      />

      {/* Optional postmark-style cancellation circle in top-right corner */}
      <circle
        cx="calc(100% - 14px)"
        cy="14"
        r="8"
        fill="none"
        stroke="#C0C0C0"
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />
      <line
        x1="calc(100% - 22px)"
        y1="14"
        x2="calc(100% - 6px)"
        y2="14"
        stroke="#C0C0C0"
        strokeWidth="0.6"
        strokeOpacity="0.3"
      />
    </svg>
  );
}

export function StampCTA({ label = 'REGISTER', href, onClick }: StampCTAProps) {
  const inner = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
        if (href) window.open(href, '_blank', 'noopener,noreferrer');
      }}
      className="
        relative inline-flex items-center justify-center
        px-10 py-4
        bg-aurora-violet text-midnight-indigo
        font-accent font-bold small-caps tracking-[0.15em] uppercase
        text-base
        transition-all duration-300
        hover:bg-soft-lilac hover:text-deep-plum
        cursor-pointer
        select-none
        overflow-hidden
      "
      style={{
        /* Perforated stamp edge — repeating radial gradient creates the
           scalloped dot-hole effect along all four sides */
        backgroundImage: `
          radial-gradient(circle at 0px 50%, #0B0F2B 5px, transparent 5px),
          radial-gradient(circle at 100% 50%, #0B0F2B 5px, transparent 5px),
          radial-gradient(circle at 50% 0px, #0B0F2B 5px, transparent 5px),
          radial-gradient(circle at 50% 100%, #0B0F2B 5px, transparent 5px)
        `,
      }}
    >
      {/* Scalloped SVG overlay — border treatment */}
      <ScallopedEdge />

      {/* Label text — above the SVG overlay */}
      <span className="relative z-10">{label}</span>
    </button>
  );

  return (
    <StampBurst>
      {inner}
    </StampBurst>
  );
}
