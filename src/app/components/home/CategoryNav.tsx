import React, { useEffect, useState } from 'react';
import { 
    Home, Gamepad2, Dices, Trophy, Fish, Ticket, Star, Smartphone, 
    Gift, Sparkles, Club, ChevronDown, Box 
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useLanguage } from '../../contexts/LanguageContext';

export function CategoryNav() {
  const location = useLocation();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const categories = [
    { id: 'lobby', labelKey: 'lobby', icon: Home, path: '/' },
    { id: 'slots', labelKey: 'slots', icon: Gamepad2, path: '/slots' },
    { id: 'live', labelKey: 'liveCasino', icon: Dices, path: '/live-casino' },
    { id: 'sports', labelKey: 'sports', icon: Trophy, path: '/sports' },
    { id: 'fish', labelKey: 'fishing', icon: Fish, path: '/fishing' },
    { id: 'lottery', labelKey: 'lottery', icon: Ticket, path: '/lottery' },
    { id: 'poker', labelKey: 'poker', icon: Club, path: '/poker' },
    { 
        id: 'reward', 
        labelKey: 'rewardCentre', 
        icon: Sparkles, 
        path: '#',
        color: 'text-yellow-400',
        subItems: [
            { labelKey: "spinWheelBonus", path: "/bonus/wheel", icon: Dices },
            { labelKey: "voucherScratchBonus", path: "/bonus/scratch", icon: Ticket },
            { labelKey: "prizeBoxBonus", path: "/bonus/prize", icon: Box },
        ]
    },
    { id: 'vip', labelKey: 'vipClub', icon: Star, path: '/vip', color: 'text-yellow-400' },
    { id: 'promotions', labelKey: 'promotions', icon: Gift, path: '/promotions', color: 'text-pink-400' },
    { id: 'app', labelKey: 'app', icon: Smartphone, path: '/app', color: 'text-emerald-400' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
        className={`hidden lg:block sticky top-[80px] z-40 w-full border-b transition-all duration-300 ${
            isScrolled 
            ? 'bg-[#02040a]/95 backdrop-blur-xl border-white/10' 
            : 'bg-[#02040a]/60 backdrop-blur-md border-white/5'
        }`}
    >
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4">
        <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Scrollable Categories */}
            <div className="flex-1 overflow-x-auto custom-scrollbar flex items-center gap-2 md:gap-4 no-scrollbar">
                {categories.map((cat) => {
                    const isActive = location.pathname === cat.path || (cat.path === '/' && location.pathname === '');
                    
                    if (cat.subItems) {
                        return (
                            <DropdownMenu key={cat.id}>
                                <DropdownMenuTrigger className="outline-none">
                                    <div 
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all group cursor-pointer ${
                                            isActive 
                                            ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]' 
                                            : 'text-white hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                    >
                                        <cat.icon className={`w-4 h-4 ${cat.color || ''}`} />
                                        <span className="text-sm font-bold tracking-wide font-[Poppins]">{t(cat.labelKey as any)}</span>
                                        <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-[#1a2536] border-white/10 text-white min-w-[200px]">
                                    {cat.subItems.map((sub, idx) => (
                                        <DropdownMenuItem key={idx} asChild className="focus:bg-white/10 focus:text-white cursor-pointer">
                                            <Link to={sub.path} className="flex items-center gap-2 py-2.5">
                                                {sub.icon && <sub.icon className="w-4 h-4 text-emerald-400" />}
                                                <span className="font-medium">{t(sub.labelKey as any)}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    }

                    return (
                        <Link 
                            to={cat.path}
                            key={cat.id}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all group ${
                                isActive 
                                ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]' 
                                : 'text-white hover:text-white hover:bg-white/5 border border-transparent'
                            }`}
                        >
                            <cat.icon className={`w-4 h-4 ${cat.color || ''} ${isActive ? 'fill-current' : ''}`} />
                            <span className="text-sm font-bold tracking-wide font-[Poppins]">{t(cat.labelKey as any)}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
      </div>
      
      {/* Active Indicator Line (Optional aesthetic touch) */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-50"></div>
    </div>
  );
}
