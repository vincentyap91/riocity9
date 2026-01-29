import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';
import { PAGE_TITLE_CLASS, NAV_ACTIVE_CLASS } from '../../config/themeTokens';

export interface PageNavItem {
    id: string;
    label: string;
    icon?: React.ElementType;
    isActive?: boolean;
}

interface InsidePageHeaderProps {
    title: string;
    navItems: PageNavItem[];
}

export function InsidePageHeader({ title, navItems }: InsidePageHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center gap-6 py-6 relative">
        
        {/* Floating Decorative Glows */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="w-24 h-24 rounded-full bg-emerald-500 opacity-20 blur-[50px]" />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="w-24 h-24 rounded-full bg-emerald-500 opacity-20 blur-[50px]" />
        </div>

        {/* Page Title */}
        <h2 className={PAGE_TITLE_CLASS}>
            {title}
        </h2>

        {/* Navigation & Search Container */}
        <div className="w-full max-w-5xl flex flex-col gap-4 px-4">
            
            {/* Nav Pill Bar */}
            <div className="w-full flex items-center justify-between gap-4 overflow-x-auto no-scrollbar bg-[#0f1923]/80 backdrop-blur-md border border-white/5 rounded-full p-2">
                <div className="flex items-center gap-2">
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={`rounded-full px-6 py-2 h-10 font-bold transition-all ${
                                item.isActive 
                                ? NAV_ACTIVE_CLASS 
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                            {item.label}
                        </Button>
                    ))}
                </div>
                
                {/* More Arrow (Visual Cue) */}
                <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-gray-400">
                    <span className="text-xs">&gt;</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
                <input 
                    type="text"
                    className="w-full h-14 bg-[#16202c] border border-transparent hover:border-white/10 focus:border-[#00bc7d]/50 rounded-full pl-6 pr-14 text-transparent focus:text-white transition-all outline-none cursor-pointer focus:cursor-text"
                    placeholder={t("searchPlaceholder")}
                  />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600/20 rounded-full text-emerald-400">
                    <Search className="w-5 h-5" />
                </div>
            </div>

        </div>
    </div>
  );
}
