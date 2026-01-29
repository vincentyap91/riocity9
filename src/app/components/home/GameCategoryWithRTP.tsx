import React, { useRef, useState, useEffect } from 'react';
import { Flame, Gamepad2, Trophy, Dices, Club, Fish, Plane, Crown, ArrowRightLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';

const games = [
  {
    name: 'Zombie Outbreak',
    provider: 'PGSoft',
    rtp: '94.89%',
    providerLogo: 'PG POCKET GAMES SOFT',
    color: 'bg-orange-600',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80'
  },
  {
    name: 'KTV',
    provider: 'Pragmatic Play Slot',
    rtp: '95.00%',
    providerLogo: 'PRAGMATIC PLAY',
    color: 'bg-indigo-900',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&q=80'
  },
  {
    name: 'SWORD OF ARES',
    provider: 'FaChai Slot',
    rtp: '94.94%',
    providerLogo: 'FC FA CHAI',
    color: 'bg-zinc-800',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80'
  },
  {
    name: 'Anaconda Wild',
    provider: 'PlayTech Slots',
    rtp: '94.98%',
    providerLogo: 'playtech',
    color: 'bg-blue-800',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&q=80'
  },
  {
    name: 'Xtra 10 Liner',
    provider: 'Imperium Games',
    rtp: '95.00%',
    providerLogo: 'IMPERIUM GAMES',
    color: 'bg-blue-600',
    image: 'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=800&q=80'
  },
  {
    name: 'Nian Nian You Yu',
    provider: '888King',
    rtp: '94.96%',
    providerLogo: '888 KING',
    color: 'bg-purple-900',
    image: 'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800&q=80'
  },
];

export function GameCategoryWithRTP() {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollRef: scrollContainerRef, handlers: dragScrollHandlers } = useHorizontalDragScroll();
  
  const categories = [
    { nameKey: 'hotGames', icon: Flame, active: false },
    { nameKey: 'allGames', icon: Gamepad2, active: false },
    { nameKey: 'sports', icon: Trophy, active: false },
    { nameKey: 'liveCasino', icon: Dices, active: false },
    { nameKey: 'slots', icon: Dices, active: true },
    { nameKey: 'fishHunt', icon: Fish, active: false },
    { nameKey: 'lottery', icon: Dices, active: false },
    { nameKey: 'exchange', icon: ArrowRightLeft, active: false },
    { nameKey: 'poker', icon: Club, active: false },
    { nameKey: 'crash', icon: Plane, active: false },
  ];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress((scrollLeft / maxScroll) * 100);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full">
      <SectionHeader
        title={<span><span className="text-white">All</span> <span className="text-[#fb2c36]">Games</span></span>}
        icon={
            <div className="p-1.5 bg-red-500/10 rounded-lg border border-red-500/20">
                <Flame className="text-red-500 w-5 h-5" />
            </div>
        }
        action={null}
      />

      <div className="space-y-6">
        {/* Categories Nav */}
        <div>
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex items-center gap-2 overflow-x-auto overflow-y-hidden pb-4 no-scrollbar mask-gradient-right scroll-smooth touch-scroll-x select-none cursor-grab active:cursor-grabbing"
            style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
            {...dragScrollHandlers}
          >
            {categories.map((cat, i) => (
              <Button
                key={i}
                variant="ghost"
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 h-10 transition-all border
                  ${cat.active 
                    ? 'bg-red-600 text-white border-red-600 font-bold hover:bg-red-500 shadow-lg shadow-red-500/20' 
                    : 'bg-[#0f1923] text-gray-400 border-white/5 hover:text-white hover:bg-white/10 hover:border-white/10'
                  }`}
              >
                <cat.icon className={`w-4 h-4 ${cat.active ? 'text-white' : 'text-current'}`} />
                {t(cat.nameKey as any)}
              </Button>
            ))}
          </div>

          {/* Custom Scrollbar (Mobile Only Design) */}
          <div className="flex items-center gap-3 px-1 md:hidden">
            <button 
              onClick={() => scroll('left')} 
              className="text-gray-500 hover:text-white transition-colors active:scale-90"
            >
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-current border-b-[6px] border-b-transparent" />
            </button>
            <div className="flex-1 h-2.5 bg-[#1f2937] rounded-sm relative overflow-hidden">
               <div 
                 className="absolute top-0 bottom-0 w-1/4 bg-[#6b7280] rounded-sm transition-all duration-150 ease-out"
                 style={{ left: `${scrollProgress * 0.75}%` }}
               />
            </div>
            <button 
              onClick={() => scroll('right')} 
              className="text-gray-500 hover:text-white transition-colors active:scale-90"
            >
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[8px] border-l-current border-b-[6px] border-b-transparent" />
            </button>
          </div>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {games.map((game, i) => (
            <div key={i} className="group bg-[#0f1923] rounded-xl overflow-hidden border border-white/5 hover:border-red-500/50 hover:shadow-[0_0_15px_-5px_rgba(239,68,68,0.4)] transition-all cursor-pointer">
              {/* Top Image Area */}
              <div className={`h-24 md:h-32 ${game.color} relative overflow-hidden flex items-center justify-center p-2 md:p-4`}>
                  <div className="absolute inset-0 bg-black/20 z-0"></div>
                  <img src={game.image} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" />
                  
                  {/* Provider Logo Simulation */}
                  <div className="z-10 text-center font-black text-white text-[10px] md:text-base uppercase tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity leading-tight">
                    {game.providerLogo}
                  </div>
              </div>

              {/* Bottom Details Area */}
              <div className="p-2 md:p-3 flex items-start gap-2 md:gap-3 bg-[#16222d]">
                {/* Thumbnail Mini */}
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-md overflow-hidden shrink-0 border border-white/10 relative group-hover:border-red-500/30 transition-colors">
                  <img src={game.image} className="w-full h-full object-cover" />
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-400 rounded-br-md flex items-center justify-center">
                      <Crown className="w-1.5 h-1.5 md:w-2 md:h-2 text-black" />
                  </div>
                </div>

                <div className="flex flex-col min-w-0 justify-center h-8 md:h-10">
                  <div className="text-xs md:text-sm text-white font-medium truncate w-full group-hover:text-red-400 transition-colors leading-tight" title={game.name}>
                    {game.name}
                  </div>
                  <div className="text-[10px] md:text-[11px] text-yellow-400 font-bold mt-0.5">
                    RTP {game.rtp}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
