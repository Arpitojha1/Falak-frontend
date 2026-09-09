import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { useLocation } from 'react-router-dom';

interface UseHeroEntranceOptions {
  /**
   * The hero section element ref. The drag listener is scoped to this element
   * so it does not interfere with the global track-navigation swipe.
   */
  heroRef: RefObject<HTMLElement | null>;
  /**
   * Horizontal drag distance (px) required to replay the animation.
   * Desktop pointer-drag only — touch polish is deferred site-wide.
   */
  dragThreshold?: number;
  /**
   * When arriving via a navbar nav-link, the wipe overlay needs a moment to
   * clear before the hero stagger plays. This delay (ms) covers that gap.
   */
  fromNavDelay?: number;
}

interface UseHeroEntranceReturn {
  /**
   * Increment this key on the animation root (or use it in a `key` prop on the
   * animated wrapper) to replay the entrance from scratch.
   */
  animationKey: number;
  /**
   * Whether the first play should be delayed (true when arrived via Navbar nav,
   * false on hard refresh / cold mount). Use this to set the `delay` on the
   * outermost animation so it does not clash with the wipe overlay exit.
   */
  isNavArrival: boolean;
  /** Manually trigger a replay (called internally by the drag listener). */
  triggerReplay: () => void;
  /**
   * Delay (seconds) to wait before starting the entrance when isNavArrival is true.
   * Pass this as the delay on your outermost stagger container.
   */
  entryDelay: number;
}

export function useHeroEntrance({
  heroRef,
  dragThreshold = 60,
  fromNavDelay = 600,
}: UseHeroEntranceOptions): UseHeroEntranceReturn {
  const location = useLocation();
  // fromNav is set by RouteTransitionController when the navigate call originates
  // from the Navbar Events dropdown (isWipe: true, fromNav: true).
  const isNavArrival = !!(location.state as Record<string, unknown> | null)?.fromNav;

  const [animationKey, setAnimationKey] = useState(0);

  const triggerReplay = useCallback(() => {
    setAnimationKey((k) => k + 1);
  }, []);

  // ------------------------------------------------------------------
  // Pointer-drag listener scoped to the hero section element.
  // Threshold: 60px horizontal drag. No directional constraint — any
  // horizontal swipe on the hero replays the entrance.
  // Desktop-only (pointerType === 'mouse' || 'pen'). Touch deferred.
  // ------------------------------------------------------------------
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  // Cooldown so a single slow drag does not fire twice
  const cooldownUntil = useRef(0);
  const COOLDOWN_MS = 1200;

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const isLocked = () => Date.now() < cooldownUntil.current;

    const onPointerDown = (e: PointerEvent) => {
      // Only mouse/pen — touch is deferred site-wide
      if (e.pointerType === 'touch') return;
      if (isLocked()) return;
      // Do not intercept clicks on interactive children
      const target = e.target as HTMLElement;
      if (target?.closest?.('button, a, input, [data-no-swipe]')) return;

      dragging.current = true;
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      if (isLocked()) return;

      const dx = e.clientX - dragStartX.current;
      const dy = e.clientY - dragStartY.current;

      // Must be dominantly horizontal
      if (Math.abs(dx) < dragThreshold) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.4) return;

      cooldownUntil.current = Date.now() + COOLDOWN_MS;
      triggerReplay();
    };

    const onPointerLeave = () => {
      dragging.current = false;
    };

    hero.addEventListener('pointerdown', onPointerDown);
    hero.addEventListener('pointerup', onPointerUp);
    hero.addEventListener('pointerleave', onPointerLeave);

    return () => {
      hero.removeEventListener('pointerdown', onPointerDown);
      hero.removeEventListener('pointerup', onPointerUp);
      hero.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [heroRef, dragThreshold, triggerReplay]);

  return {
    animationKey,
    isNavArrival,
    triggerReplay,
    // Convert ms to seconds for Motion
    entryDelay: isNavArrival ? fromNavDelay / 1000 : 0,
  };
}
