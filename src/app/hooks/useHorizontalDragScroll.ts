import { useRef, useCallback, useEffect } from 'react';

/**
 * Hook for horizontal drag-to-scroll on a container (mouse + touch).
 * Use on the scroll element; pass ref and handlers to the scroll container.
 * Optionally pass a callback to suppress click when user dragged (e.g. didDragRef).
 */
export function useHorizontalDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const didDragRef = useRef(false);
  const startRef = useRef({ x: 0, scrollLeft: 0 });
  const touchActiveRef = useRef(false);

  const handlePointerDown = useCallback((clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;
    didDragRef.current = false;
    startRef.current = { x: clientX, scrollLeft: el.scrollLeft };
  }, []);

  const handlePointerMove = useCallback((clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const dx = clientX - startRef.current.x;
    if (Math.abs(dx) > 5) didDragRef.current = true;
    el.scrollLeft = startRef.current.scrollLeft - dx;
  }, []);

  const handlePointerDownCapture = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0 || !scrollRef.current) return;
    handlePointerDown(e.clientX);
    scrollRef.current.setPointerCapture(e.pointerId);
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  }, [handlePointerDown]);

  const handlePointerMoveCapture = useCallback((e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    handlePointerMove(e.clientX);
  }, [handlePointerMove]);

  const handlePointerUpCapture = useCallback((e: React.PointerEvent) => {
    if (scrollRef.current) scrollRef.current.releasePointerCapture(e.pointerId);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    setTimeout(() => { didDragRef.current = false; }, 0);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    touchActiveRef.current = true;
    handlePointerDown(e.touches[0].clientX);
  }, [handlePointerDown]);

  const handleTouchEnd = useCallback(() => {
    touchActiveRef.current = false;
    setTimeout(() => { didDragRef.current = false; }, 0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    const onTouchMove = (e: TouchEvent) => {
      if (!touchActiveRef.current || !el || e.touches.length !== 1) return;
      e.preventDefault();
      handlePointerMove(e.touches[0].clientX);
    };
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => document.removeEventListener('touchmove', onTouchMove);
  }, [handlePointerMove]);

  const suppressClickIfDragged = useCallback((e: React.MouseEvent) => {
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  return {
    scrollRef,
    didDragRef,
    handlers: {
      onPointerDownCapture: handlePointerDownCapture,
      onPointerMove: handlePointerMoveCapture,
      onPointerUp: handlePointerUpCapture,
      onPointerCancel: handlePointerUpCapture,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
    },
    suppressClickIfDragged,
  };
}
