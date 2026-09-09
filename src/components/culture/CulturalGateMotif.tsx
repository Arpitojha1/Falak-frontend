import React from 'react';

export function CulturalGateMotif({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-end justify-center ${className}`}>
      <svg
        viewBox="0 0 320 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl"
      >
        {/* Outer Depth/Shadow - Deep Plum Fill, Aurora Violet Stroke */}
        <path
          d="M10 450 L10 160 C10 80 80 10 160 10 C240 10 310 80 310 160 L310 450 Z"
          fill="#1C0B46"
          stroke="#8A5CFF"
          strokeWidth="6"
        />
        
        {/* Inner Arch Layer - Champagne Pearl dotted/dashed border */}
        <path
          d="M25 450 L25 165 C25 90 85 30 160 30 C235 30 295 90 295 165 L295 450"
          stroke="#EDE4D3"
          strokeWidth="2"
          strokeDasharray="4 6"
        />

        {/* Inner Arch Solid Outline - Aurora Violet */}
        <path
          d="M40 450 L40 170 C40 105 95 50 160 50 C225 50 280 105 280 170 L280 450"
          stroke="#8A5CFF"
          strokeWidth="3"
        />

        {/* Jaali/Lattice Simple Geometry Pattern - Soft Lilac */}
        <g stroke="#E6DFF6" strokeWidth="1" opacity="0.4">
          {/* Vertical Lines */}
          <line x1="70" y1="90" x2="70" y2="450" />
          <line x1="100" y1="70" x2="100" y2="450" />
          <line x1="130" y1="60" x2="130" y2="450" />
          <line x1="190" y1="60" x2="190" y2="450" />
          <line x1="220" y1="70" x2="220" y2="450" />
          <line x1="250" y1="90" x2="250" y2="450" />
          
          {/* Horizontal Lines */}
          <line x1="45" y1="120" x2="275" y2="120" />
          <line x1="40" y1="170" x2="280" y2="170" />
          <line x1="40" y1="220" x2="280" y2="220" />
          <line x1="40" y1="270" x2="280" y2="270" />
          <line x1="40" y1="320" x2="280" y2="320" />
          <line x1="40" y1="370" x2="280" y2="370" />
          <line x1="40" y1="420" x2="280" y2="420" />

          {/* Cross / Diamond Highlights */}
          <circle cx="100" cy="170" r="2" fill="#E6DFF6" />
          <circle cx="220" cy="170" r="2" fill="#E6DFF6" />
          <circle cx="100" cy="220" r="2" fill="#E6DFF6" />
          <circle cx="220" cy="220" r="2" fill="#E6DFF6" />
          <circle cx="100" cy="270" r="2" fill="#E6DFF6" />
          <circle cx="220" cy="270" r="2" fill="#E6DFF6" />
          <circle cx="100" cy="320" r="2" fill="#E6DFF6" />
          <circle cx="220" cy="320" r="2" fill="#E6DFF6" />
          <circle cx="100" cy="370" r="2" fill="#E6DFF6" />
          <circle cx="220" cy="370" r="2" fill="#E6DFF6" />
        </g>
        
        {/* Base pillars / plinth details */}
        <rect x="5" y="450" width="310" height="10" fill="#8A5CFF" />
        <rect x="0" y="455" width="320" height="5" fill="#EDE4D3" />
      </svg>
    </div>
  );
}
