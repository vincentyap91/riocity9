import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { MOBILE, NAV_ACTIVE_CLASS } from '../../config/themeTokens';

export interface SegmentTabsItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SegmentTabsProps {
  items: SegmentTabsItem[];
  activeId: string;
  onSelect: (id: string) => void;
  /** Wrapper class (e.g. for padding) */
  className?: string;
  /** Max width of the tab strip, default max-w-[400px] */
  maxWidth?: string;
}

/**
 * Reusable two-segment tab strip matching Profile/input design:
 * contiguous segment, no gap, input-like bg (#0f151f), rounded-xl, active green.
 * Use for Profile (Personal | Bank E-wallet), Deposit/Withdraw, Referral/My Rewards.
 */
export function SegmentTabs({ items, activeId, onSelect, className = '', maxWidth = 'max-w-[400px]' }: SegmentTabsProps) {
  if (items.length === 0) return null;

  return (
    <div className={`flex justify-center px-4 md:px-6 pb-2 ${className}`}>
      <div
        className={`flex flex-1 flex-nowrap bg-[#0f151f] p-0 rounded-xl border border-white/10 w-full ${maxWidth} overflow-hidden`}
        role="tablist"
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const isFirst = index === 0;
          const isLast = index === items.length - 1;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(item.id)}
              className={`flex-1 min-w-0 px-4 py-3 md:px-6 md:py-3 ${MOBILE.label} transition-all whitespace-nowrap flex items-center justify-center ${MOBILE.gapXs} ${
                isFirst ? 'rounded-l-xl rounded-r-none' : 'rounded-r-xl rounded-l-none'
              } ${
                isActive
                  ? `${NAV_ACTIVE_CLASS}`
                  : 'bg-transparent text-[#A9AAB0] hover:text-white'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-current'}`}
                aria-hidden
              />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
