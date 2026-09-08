import { useEffect, useRef } from 'react';

interface DesktopSwipeOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  disabled?: boolean;
  /** Accumulated horizontal delta (px) needed to fire via trackpad wheel */
  wheelThreshold?: number;
  /** Drag distance (px) needed to fire via click-drag */
  dragThreshold?: number;
  /** Cooldown after a successful trigger so continuous wheel deltas don't re-fire mid-animation */
  cooldownMs?: number;
}

export function useDesktopTrackNavigation({
  onSwipeLeft,
  onSwipeRight,
  disabled = false,
  wheelThreshold = 80,
  dragThreshold = 90,
  cooldownMs = 2400
}: DesktopSwipeOptions) {
  const accumulatedDeltaX = useRef(0);
  const lockedUntil = useRef(0);
  const wheelResetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);

  useEffect(() => {
    if (disabled) return;

    const isLocked = () => Date.now() < lockedUntil.current;
    const lock = () => {
      lockedUntil.current = Date.now() + cooldownMs;
    };

    // --- Trackpad two-finger horizontal swipe ---
    const handleWheel = (e: WheelEvent) => {
      if (isLocked()) return;
      // Ignore events that are dominantly vertical (normal page scroll)
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        accumulatedDeltaX.current = 0;
        return;
      }

      accumulatedDeltaX.current += e.deltaX;

      if (wheelResetTimer.current) clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = setTimeout(() => {
        accumulatedDeltaX.current = 0;
      }, 250);

      if (accumulatedDeltaX.current > wheelThreshold) {
        accumulatedDeltaX.current = 0;
        lock();
        onSwipeRight();
      } else if (accumulatedDeltaX.current < -wheelThreshold) {
        accumulatedDeltaX.current = 0;
        lock();
        onSwipeLeft();
      }
    };

    // --- Click-and-drag horizontal swipe (plain mouse fallback) ---
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || isLocked()) return;
      
      const target = e.target as HTMLElement;
      if (target?.closest?.('button, a, input, [data-no-swipe]')) return;

      dragging.current = true;
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      if (isLocked()) return;

      const dx = e.clientX - dragStartX.current;
      const dy = e.clientY - dragStartY.current;
      if (Math.abs(dx) < dragThreshold) return;
      if (Math.abs(dx) < Math.abs(dy) * 1.5) return; // not dominantly horizontal

      lock();
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      if (wheelResetTimer.current) clearTimeout(wheelResetTimer.current);
    };
  }, [onSwipeLeft, onSwipeRight, disabled, wheelThreshold, dragThreshold, cooldownMs]);
}
