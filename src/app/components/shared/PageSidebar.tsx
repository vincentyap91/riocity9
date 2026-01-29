import React, { useCallback, useState, useRef, useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';
import { NAV_ACTIVE_CLASS } from '../../config/themeTokens';

export interface PageSidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
}

const SCROLL_AMOUNT = 120;
const SCROLL_THRESHOLD = 2;

interface PageSidebarProps {
  items: PageSidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

function useScrollVisibility(scrollRef: React.RefObject<HTMLDivElement | null>) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > SCROLL_THRESHOLD);
    setCanScrollRight(maxScroll > SCROLL_THRESHOLD && scrollLeft < maxScroll - SCROLL_THRESHOLD);
  }, [scrollRef]);

  const handleScroll = useCallback(() => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      update();
    });
  }, [update]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', handleScroll, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollRef, handleScroll, update]);

  return { canScrollLeft, canScrollRight };
}

export function PageSidebar({ items, activeId, onSelect }: PageSidebarProps) {
  const { scrollRef, didDragRef, handlers } = useHorizontalDragScroll();
  const { canScrollLeft, canScrollRight } = useScrollVisibility(scrollRef);

  const handleTabClick = useCallback((id: string) => (e: React.MouseEvent) => {
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      onSelect(id);
    }
  }, [onSelect]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  }, [scrollRef]);

  return (
    <>
      {/* Mobile/Tablet: Full-width tabs; left/right buttons overlay and only show when scrollable */}
      <div className="lg:hidden mb-0 min-w-0 w-full bg-[#1a2230] rounded-2xl border border-white/5 p-3 relative">
        <div
          ref={scrollRef}
          data-tab-strip
          className="w-full overflow-x-auto overflow-y-hidden no-scrollbar touch-scroll-x select-none cursor-grab active:cursor-grabbing"
          style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x', overflowX: 'auto' }}
          {...handlers}
        >
          <div className="flex items-center gap-3 min-w-max px-1 touch-pan-x">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={handleTabClick(item.id)}
                  type="button"
                  className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-3 group shrink-0 touch-pan-x ${
                    isActive
                      ? NAV_ACTIVE_CLASS
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'
                  }`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        {/* Left button: overlay, only visible after scrolling right */}
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll tabs left"
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-xl bg-[#1a2230]/95 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 active:scale-95 ${
            canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        {/* Right button: overlay, only visible when more content to the right */}
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll tabs right"
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-xl bg-[#1a2230]/95 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 active:scale-95 ${
            canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Desktop: Vertical Sidebar */}
      <div className="hidden lg:flex w-[280px] bg-[#1a2230] rounded-2xl border border-white/5 p-4 flex-col gap-2 shrink-0">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full px-5 py-4 rounded-xl text-sm font-bold text-left transition-all flex items-center gap-4 group ${
                isActive
                  ? NAV_ACTIVE_CLASS
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${
                isActive ? 'text-black' : 'text-gray-500 group-hover:text-white'
              }`} />
              {item.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
