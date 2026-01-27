import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

export interface PageNavItem {
    id: string;
    label: string;
    icon?: React.ElementType;
    isActive?: boolean;
}

interface InsidePageHeaderProps {
    title: string;
    navItems: PageNavItem[];
    iconColor?: string; // For the decorative glow color
}

const activeColorMap: Record<string, string> = {
    "text-pink-500": "bg-pink-600 shadow-[0_0_15px_-5px_rgba(236,72,153,0.8)]",
    "text-blue-500": "bg-blue-600 shadow-[0_0_15px_-5px_rgba(59,130,246,0.8)]",
    "text-orange-500": "bg-orange-600 shadow-[0_0_15px_-5px_rgba(249,115,22,0.8)]",
    "text-cyan-500": "bg-cyan-600 shadow-[0_0_15px_-5px_rgba(6,182,212,0.8)]",
    "text-purple-500": "bg-purple-600 shadow-[0_0_15px_-5px_rgba(147,51,234,0.8)]",
    "text-green-500": "bg-green-600 shadow-[0_0_15px_-5px_rgba(34,197,94,0.8)]",
    "text-emerald-500": "bg-emerald-600 shadow-[0_0_15px_-5px_rgba(16,185,129,0.8)]",
};

const titleShadowMap: Record<string, string> = {
    "text-pink-500": "drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]",
    "text-blue-500": "drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]",
    "text-orange-500": "drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]",
    "text-cyan-500": "drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]",
    "text-purple-500": "drop-shadow-[0_0_15px_rgba(147,51,234,0.5)]",
    "text-green-500": "drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]",
    "text-emerald-500": "drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]",
};

export function InsidePageHeader({ title, navItems, iconColor = "text-pink-500" }: InsidePageHeaderProps) {
  const activeClass = activeColorMap[iconColor] || activeColorMap["text-pink-500"];
  const titleShadow = titleShadowMap[iconColor] || titleShadowMap["text-pink-500"];
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center gap-6 py-6 relative">
        
        {/* Floating Decorative Glows (Placeholder for the 3D icons in screenshot) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className={`w-24 h-24 rounded-full bg-current opacity-20 blur-[50px] ${iconColor}`}></div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className={`w-24 h-24 rounded-full bg-current opacity-20 blur-[50px] ${iconColor}`}></div>
        </div>

        {/* Page Title */}
        <h2 className={`text-4xl font-bold tracking-tight ${iconColor} ${titleShadow}`}>
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
                                ? `${activeClass} text-white` 
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
                    className="w-full h-14 bg-[#16202c] border border-transparent hover:border-white/10 focus:border-pink-500/50 rounded-full pl-6 pr-14 text-transparent focus:text-white transition-all outline-none cursor-pointer focus:cursor-text"
                    placeholder={t("searchPlaceholder")}
                  />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600/20 rounded-full text-blue-400">
                    <Search className="w-5 h-5" />
                </div>
            </div>

        </div>
    </div>
  );
}
