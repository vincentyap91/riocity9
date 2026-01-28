import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface PageSidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
}

interface PageSidebarProps {
  items: PageSidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function PageSidebar({ items, activeId, onSelect }: PageSidebarProps) {
  return (
    <>
      {/* Mobile/Tablet: Horizontal Scrollable Sidebar */}
      <div className="lg:hidden mb-6">
        <div className="w-full bg-[#1a2230] rounded-2xl border border-white/5 p-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-3 min-w-max">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={`px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all flex items-center gap-3 group shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
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
                  ? 'bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 text-black shadow-lg'
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
