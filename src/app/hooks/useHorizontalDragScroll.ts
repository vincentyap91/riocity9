import { useRef, useEffect } from 'react';

/**
 * Hook for ultra-smooth vertical drag-to-scroll with momentum.
 * Uses direct DOM manipulation for instant 1:1 response and zero latency.
 */
export function useHorizontalDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const didDragRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startRef = useRef({ x: 0, scrollLeft: 0, time: 0 });
  const velocityRef = useRef(0);
  const momentumAnimationRef = useRef<number | null>(null);
  const lastMoveTimeRef = useRef(0);

  const cancelMomentum = () => {
    if (momentumAnimationRef.current !== null) {
      cancelAnimationFrame(momentumAnimationRef.current);
      momentumAnimationRef.current = null;
    }
  };

  const applyMomentum = (velocity: number) => {
    const el = scrollRef.current;
    if (!el || Math.abs(velocity) < 0.5) return;

    cancelMomentum();

    const friction = 0.95;
    let currentVelocity = velocity;

    const animate = () => {
      if (!el) return;
      currentVelocity *= friction;

      if (Math.abs(currentVelocity) < 0.1) {
        momentumAnimationRef.current = null;
        return;
      }

      el.scrollLeft -= currentVelocity;
      momentumAnimationRef.current = requestAnimationFrame(animate);
    };

    momentumAnimationRef.current = requestAnimationFrame(animate);
  };

  const handlePointerDownCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    // Left mouse button, touch, or pen
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (!scrollRef.current) return;

    cancelMomentum();
    isDraggingRef.current = true;
    didDragRef.current = false;
    velocityRef.current = 0;
    lastMoveTimeRef.current = Date.now();

    startRef.current = {
      x: e.clientX,
      scrollLeft: scrollRef.current.scrollLeft,
      time: Date.now(),
    };

    scrollRef.current.setPointerCapture(e.pointerId);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handlePointerMoveCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !scrollRef.current) return;

    const now = Date.now();
    const deltaX = e.clientX - startRef.current.x;
    const deltaTime = now - startRef.current.time;

    // Zero threshold for absolute instant feedback
    if (Math.abs(deltaX) > 0.5) {
      didDragRef.current = true;
    }

    if (didDragRef.current) {
      if (deltaTime > 0) {
        // High fidelity velocity tracking
        velocityRef.current = (deltaX / deltaTime) * 16.6;
      }

      // 1:1 Absolute instant scroll update
      scrollRef.current.scrollLeft = startRef.current.scrollLeft - deltaX;

      // Sync refs for cumulative debt-free movement
      startRef.current.x = e.clientX;
      startRef.current.scrollLeft = scrollRef.current.scrollLeft;
      startRef.current.time = now;
      lastMoveTimeRef.current = now;
    }
  };

  const handlePointerUpCapture = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    if (scrollRef.current) {
      scrollRef.current.releasePointerCapture(e.pointerId);
    }

    document.body.style.cursor = '';
    document.body.style.userSelect = '';

    const timeSinceLastMove = Date.now() - lastMoveTimeRef.current;

    // Only apply momentum if user was actually moving fast enough at release
    if (didDragRef.current && timeSinceLastMove < 100) {
      applyMomentum(velocityRef.current);
    }

    // didDragRef stays true just long enough to cancel the native click event
    if (didDragRef.current) {
      setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    }
  };

  const suppressClickIfDragged = (e: React.MouseEvent) => {
    // If we moved even a tiny bit, suppress the click
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    return () => cancelMomentum();
  }, []);

  return {
    scrollRef,
    didDragRef,
    handlers: {
      onPointerDownCapture: handlePointerDownCapture,
      onPointerMoveCapture: handlePointerMoveCapture,
      onPointerUpCapture: handlePointerUpCapture,
      onPointerCancelCapture: handlePointerUpCapture,
    },
    suppressClickIfDragged,
  };
}
