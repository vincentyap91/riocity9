import React, { useState, useEffect } from 'react';
import { Flame, Loader2, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';
import { INITIAL_SLOTS, MOCK_CATEGORIES, GAME_CATEGORIES } from '../../config/gameData';
import { DraggableScrollbar } from '../shared/DraggableScrollbar';

export function GameCategoryWithRTP() {
  const { t } = useLanguage();
  const { scrollRef: scrollContainerRef, handlers: dragScrollHandlers } = useHorizontalDragScroll();

  const [activeCategory, setActiveCategory] = useState('slots');
  const [gamesData, setGamesData] = useState<any[]>(INITIAL_SLOTS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (activeCategory === 'slots' || activeCategory === 'allGames') {
        setGamesData(INITIAL_SLOTS);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const endpoint = activeCategory === 'liveCasino' ? '/live-casino' : `/${activeCategory.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

      try {
        const response = await fetch(endpoint);
        if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
          const data = await response.json();
          setGamesData(data.games || data);
        } else {
          setGamesData(MOCK_CATEGORIES[activeCategory] || INITIAL_SLOTS);
        }
      } catch (error) {
        console.warn(`Failed to fetch ${activeCategory} data, using mock fallback.`, error);
        setGamesData(MOCK_CATEGORIES[activeCategory] || INITIAL_SLOTS);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      }
    };

    fetchCategoryData();
  }, [activeCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
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
            className="flex items-center gap-2 overflow-x-auto overflow-y-hidden pb-4 no-scrollbar mask-gradient-right touch-scroll-x select-none cursor-grab active:cursor-grabbing"
            style={{
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-x',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              willChange: 'scroll-position',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden' as const
            }}
            {...dragScrollHandlers}
          >
            {GAME_CATEGORIES.map((cat) => (
              <Button
                key={cat.id}
                variant="ghost"
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 h-10 transition-all border
                  ${activeCategory === cat.id
                    ? 'bg-red-600 text-white border-red-600 font-bold hover:bg-red-500 shadow-lg shadow-red-500/20 active'
                    : 'bg-[#0f1923] text-gray-400 border-white/5 hover:text-white hover:bg-white/10 hover:border-white/10'
                  }`}
              >
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-white' : 'text-current'}`} />
                {t(cat.nameKey as any)}
              </Button>
            ))}
          </div>

          {/* Custom Scrollbar (Mobile Only) */}
          <DraggableScrollbar containerRef={scrollContainerRef} className="mt-[-8px]">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors active:scale-90"
            >
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-r-[7px] border-r-current border-b-[5px] border-b-transparent" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors active:scale-90"
            >
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[7px] border-l-current border-b-[5px] border-b-transparent" />
            </button>
          </DraggableScrollbar>
        </div>

        {/* Game Grid */}
        <div className="relative min-h-[160px]">
          {isLoading && (
            <div className="absolute inset-0 bg-[#02040a]/50 backdrop-blur-[2px] z-30 flex items-center justify-center rounded-xl">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            </div>
          )}

          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
            {gamesData.map((game, i) => (
              <div
                key={i}
                className="group bg-[#0f1923] rounded-xl overflow-hidden border border-white/5 hover:border-[#39ff88]/30 transition-all duration-500 cursor-pointer flex flex-col"
              >
                {/* Top Section: Provider Header */}
                <div className={`relative overflow-hidden flex items-center justify-center ${game.color || 'bg-blue-600'}`}>
                  <img
                    src={game.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale blur-[1px]"
                  />
                  <div className="absolute inset-0 bg-black/10" />

                  {game.providerLogo ? (
                    <img
                      src={game.providerLogo}
                      alt={game.provider || 'Provider logo'}
                      className="relative z-10 h-full w-full object-contain"
                    />
                  ) : (
                    <span className="relative z-10 text-white font-black text-[10px] md:text-[11px] uppercase tracking-widest text-center px-2 drop-shadow-md">
                      {game.provider || 'PROVIDER'}
                    </span>
                  )}
                </div>

                {/* Bottom Section: Game Info */}
                <div className="p-2 sm:p-2.5 flex items-center gap-2 bg-[#121b28]">
                  <div className="relative shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg overflow-hidden border border-white/10 shadow-lg">
                    <img
                      src={game.image}
                      alt={game.title || game.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0.5 left-0.5 w-3 h-3 bg-yellow-400 rounded-[2px] flex items-center justify-center shadow-sm">
                      <Star className="w-2 h-2 text-black fill-current" />
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="text-white text-[10px] md:text-[11px] font-extrabold truncate leading-tight">
                      {game.title || game.name}
                    </h3>
                    <span className="text-[#ffbb33] text-[9px] md:text-[10px] font-black uppercase tracking-tight mt-0.5">
                      RTP {game.rtp || '95.00%'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
