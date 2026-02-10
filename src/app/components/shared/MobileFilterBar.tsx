import React from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface MobileFilterBarProps {
  onOpenFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount?: number;
  chips?: string[];
  onClearAll?: () => void;
  clearAllLabel?: string;
  className?: string;
}

export function MobileFilterBar({
  onOpenFilters,
  hasActiveFilters,
  activeFilterCount = 0,
  chips = [],
  onClearAll,
  clearAllLabel = 'Clear all',
  className = '',
}: MobileFilterBarProps) {
  return (
    <div className={`md:hidden ${className}`}>
      <div className="flex items-center justify-between gap-3 pb-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className={`h-10 px-3.5 rounded-xl border text-sm font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98] ${
            hasActiveFilters
              ? 'bg-[#0f1f1a] border-[#00bc7d]/50 text-[#ddfff1] hover:border-[#00bc7d]/70 hover:bg-[#122721] active:bg-[#0d1b17]'
              : 'bg-[#0f151f] border-white/20 text-white hover:border-white/35 hover:bg-[#141d2a] active:bg-[#0d141e]'
          }`}
        >
          <SlidersHorizontal className={`w-4 h-4 ${hasActiveFilters ? 'text-[#00d492]' : 'text-gray-300'}`} />
          <span>{hasActiveFilters ? `Filter (${activeFilterCount})` : 'Filter'}</span>
          <ChevronDown className={`w-4 h-4 ${hasActiveFilters ? 'text-[#00d492]' : 'text-gray-400'}`} />
          {hasActiveFilters && (
            <span className="h-2 w-2 rounded-full bg-[#00d492] shadow-[0_0_0_2px_rgba(0,188,125,0.18)]" />
          )}
        </button>
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            disabled={!hasActiveFilters}
            className={`text-sm font-medium transition-colors ${
              hasActiveFilters
                ? 'text-[#60a5fa] hover:text-[#93c5fd] active:text-[#3b82f6]'
                : 'text-[#64748b] cursor-not-allowed'
            }`}
          >
            {clearAllLabel}
          </button>
        )}
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {chips.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-[#0f151f] border border-white/10 text-gray-300"
            >
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
