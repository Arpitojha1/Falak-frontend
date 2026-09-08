import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ROUTE_TRANSITION_PALETTES } from '../lib/routeTransitionPalettes';
import './RouteTransitionOverlay.css';

export interface RouteTransitionOverlayHandle {
  /**
   * Plays the full wipe: cover -> onMidpoint (swap route here) -> reveal.
   * direction: 'left' means content appears to travel from the right edge
   * inward (i.e. user is heading toward the LEFT-side track / Sports).
   */
  play: (targetPath: string, direction: 'left' | 'right', onMidpoint: () => void) => Promise<void>;
  isBusy: () => boolean;
}

const RouteTransitionOverlay = forwardRef<RouteTransitionOverlayHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const layerElsRef = useRef<HTMLDivElement[]>([]);
  const busyRef = useRef(false);
  const flashElRef = useRef<HTMLDivElement | null>(null);

  useImperativeHandle(ref, () => ({
    isBusy: () => busyRef.current,
    play: (targetPath, direction, onMidpoint) => {
      return new Promise<void>(resolve => {
        if (busyRef.current) {
          resolve();
          return;
        }
        busyRef.current = true;

        const colors = ROUTE_TRANSITION_PALETTES[targetPath] ?? ROUTE_TRANSITION_PALETTES['/'];
        const layers = layerElsRef.current.slice(0, colors.length);
        layers.forEach((el, i) => {
          el.style.background = colors[i];
        });
        const flashEl = flashElRef.current;

        const enterFrom = direction === 'left' ? 100 : -100;
        const exitTo = direction === 'left' ? -100 : 100;

        gsap.set(layers, { xPercent: enterFrom, scale: 1.04, filter: 'blur(6px)' });
        if (flashEl) gsap.set(flashEl, { opacity: 0, scale: 0.6 });

        const tl = gsap.timeline({
          onComplete: () => {
            busyRef.current = false;
            resolve();
          }
        });

        // Sweep in — slower, staggered further apart so each layer is individually perceptible
        layers.forEach((el, i) => {
          tl.to(
            el,
            { xPercent: 0, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power4.out' },
            i * 0.12
          );
        });

        // Magenta accent flash at the exact moment of full coverage — the "wow" beat
        if (flashEl) {
          tl.to(flashEl, { opacity: 0.85, scale: 1.15, duration: 0.28, ease: 'power2.out' }, '>-0.15');
          tl.to(flashEl, { opacity: 0, duration: 0.4, ease: 'power2.in' }, '>+0.05');
        }

        // Hold fully covered so the eye registers the destination palette before it moves on
        tl.to({}, { duration: 0.35 });

        // Swap the route underneath while still fully covered
        tl.call(() => {
          onMidpoint();
        });

        tl.to({}, { duration: 0.15 });

        // Sweep out, continuing the same direction, staggered — reveals the new route
        layers.forEach((el, i) => {
          tl.to(
            el,
            { xPercent: exitTo, scale: 1.04, filter: 'blur(4px)', duration: 0.75, ease: 'power4.in' },
            `>-${0.5 - i * 0.1}`
          );
        });
      });
    }
  }));

  const setLayerRef = (el: HTMLDivElement | null, i: number) => {
    if (el) layerElsRef.current[i] = el;
  };

  return createPortal(
    <div ref={containerRef} className="route-transition-overlay" aria-hidden="true">
      {[0, 1, 2, 3].map(i => (
        <div key={i} ref={el => setLayerRef(el, i)} className="route-transition-layer" />
      ))}
      <div ref={flashElRef} className="route-transition-flash" aria-hidden="true" />
    </div>,
    document.body
  );
});

RouteTransitionOverlay.displayName = 'RouteTransitionOverlay';
export default RouteTransitionOverlay;
