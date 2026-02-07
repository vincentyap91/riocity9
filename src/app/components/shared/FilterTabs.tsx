import React from "react";
import { useHorizontalDragScroll } from "../../hooks/useHorizontalDragScroll";
import { DraggableScrollbar } from "./DraggableScrollbar";

export interface FilterTabItem {
  id: string;
  label: React.ReactNode;
}

interface FilterTabsProps {
  items: FilterTabItem[];
  activeId: string;
  onSelect: (id: string) => void;
  baseButtonClassName?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  scrollable?: boolean;
  scrollAmount?: number;
  scrollContainerClassName?: string;
  scrollbarClassName?: string;
  buttonRole?: React.AriaRole;
  useAriaSelected?: boolean;
}

const DEFAULT_BASE_BUTTON_CLASS =
  "shrink-0 px-6 h-10 rounded-xl text-sm font-bold transition-all border";
const DEFAULT_ACTIVE_CLASS = "border-[#00bc7d] bg-[#00bc7d]/10 text-[#00bc7d]";
const DEFAULT_INACTIVE_CLASS =
  "border-white/5 bg-[#0f151f] text-gray-400 hover:text-white hover:bg-white/5";
const DEFAULT_SCROLL_CONTAINER_CLASS =
  "flex items-center gap-3 overflow-x-auto overflow-y-hidden pb-2 no-scrollbar select-none cursor-grab active:cursor-grabbing";
const DEFAULT_SCROLLBAR_CLASS = "mt-[-6px]";

export function FilterTabs({
  items,
  activeId,
  onSelect,
  baseButtonClassName = DEFAULT_BASE_BUTTON_CLASS,
  activeClassName = DEFAULT_ACTIVE_CLASS,
  inactiveClassName = DEFAULT_INACTIVE_CLASS,
  scrollable = false,
  scrollAmount = 240,
  scrollContainerClassName,
  scrollbarClassName = DEFAULT_SCROLLBAR_CLASS,
  buttonRole,
  useAriaSelected = false,
}: FilterTabsProps) {
  const { scrollRef, handlers: dragHandlers } = useHorizontalDragScroll();

  const scrollTabs = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const tabButtons = items.map((item) => {
    const isActive = activeId === item.id;
    return (
      <button
        key={item.id}
        type="button"
        role={buttonRole}
        aria-selected={useAriaSelected ? isActive : undefined}
        onClick={() => onSelect(item.id)}
        className={`${baseButtonClassName} ${isActive ? activeClassName : inactiveClassName}`}
      >
        {item.label}
      </button>
    );
  });

  if (!scrollable) {
    return <>{tabButtons}</>;
  }

  return (
    <>
      <div
        ref={scrollRef}
        className={`${DEFAULT_SCROLL_CONTAINER_CLASS}${scrollContainerClassName ? ` ${scrollContainerClassName}` : ""}`}
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          willChange: "scroll-position",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        {...dragHandlers}
      >
        {tabButtons}
      </div>

      <DraggableScrollbar containerRef={scrollRef} className={scrollbarClassName}>
        <button
          onClick={() => scrollTabs("left")}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors active:scale-90"
          aria-label="Scroll tabs left"
          type="button"
        >
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-r-[7px] border-r-current border-b-[5px] border-b-transparent" />
        </button>
        <button
          onClick={() => scrollTabs("right")}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors active:scale-90"
          aria-label="Scroll tabs right"
          type="button"
        >
          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[7px] border-l-current border-b-[5px] border-b-transparent" />
        </button>
      </DraggableScrollbar>
    </>
  );
}
