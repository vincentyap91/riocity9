import React, { useState, useEffect } from 'react';
import { Flame, Loader2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { SectionHeader } from './SectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';
import { useHorizontalDragScroll } from '../../hooks/useHorizontalDragScroll';
import { INITIAL_SLOTS, MOCK_CATEGORIES, GAME_CATEGORIES } from '../../config/gameData';
import { DraggableScrollbar } from '../shared/DraggableScrollbar';
import { GameModal } from '../shared/GameModal';
import { SPORTS_PROVIDERS } from '../../pages/Sports';
import { LIVE_CASINO_PROVIDERS } from '../../pages/LiveCasino';

export function GameCategoryWithRTP() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { scrollRef: scrollContainerRef, handlers: dragScrollHandlers } = useHorizontalDragScroll();

  const [activeCategory, setActiveCategory] = useState('hotGames');
  const [gamesData, setGamesData] = useState<any[]>(INITIAL_SLOTS);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{ title: string; bannerImage: string; startGamePath?: string } | null>(null);
  const [showAllDesktopItems, setShowAllDesktopItems] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const isSlotsCardLayout = activeCategory === 'slots' || activeCategory === 'allGames';
  const activeCategoryLabel = t((GAME_CATEGORIES.find((cat) => cat.id === activeCategory)?.nameKey || 'allGames') as any);
  const MIXABLE_CATEGORY_IDS = ['liveCasino', 'sports', 'fishHunt', 'lottery'];
  const DESKTOP_VISIBLE_ITEMS = 7;

  const normalizeProviderName = (value: unknown) => String(value || '').trim().toLowerCase();
  const toSlug = (value: unknown) =>
    String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  const PROVIDER_ROUTE_MAP: Record<string, string> = {
    naga: '/providers/naga-game-slots',
    'naga game slots': '/providers/naga-game-slots',
    'royal slot gaming': '/providers/royal-slot-gaming',
    playtech: '/providers/playtech-slot',
    'playtech slot': '/providers/playtech-slot',
    'playtech slots': '/providers/playtech-slot',
  };

  const getGameRoute = (game: any) => {
    const providerName = normalizeProviderName(game?.provider);
    return PROVIDER_ROUTE_MAP[providerName] ?? null;
  };
  const isUnderMaintenance = (game: any) => {
    if (typeof game?.maintenance === 'boolean') return game.maintenance;
    return normalizeProviderName(game?.provider) === 'pragmatic play';
  };
  const renderMaintenanceOverlay = (clipId: string, cardIndex: number) => {
    const resolvedClipId = `${clipId}_${cardIndex}`;
    return (
    <div className="absolute inset-0 bg-black/55 z-20 flex flex-col items-center justify-center gap-2 pointer-events-none">
      <svg className="h-10 w-10 fill-emerald-400 drop-shadow" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <g clipPath={`url(#${resolvedClipId})`}>
          <path d="M148.878 18.7427C148.334 16.9377 146.058 16.3699 144.73 17.6977L136.061 26.3672H123.633V13.9389L132.303 5.26523C133.637 3.93047 133.058 1.6626 131.267 1.11797C128.813 0.372363 126.267 0.0541992 123.658 0.0541992C116.59 0.0541992 109.964 2.73779 104.99 7.72471C98.896 13.8144 96.1667 22.522 97.6772 31.0233L98.0806 33.2763L33.276 98.0807C30.6583 97.6128 29.0818 97.2694 26.4009 97.2694C19.4399 97.2694 12.6293 100.085 7.7197 104.99C0.790989 111.923 -1.65091 122.075 1.11648 131.257C1.66199 133.066 3.93367 133.633 5.26433 132.302L13.9344 123.633H26.4258V136.066L17.6953 144.737C16.362 146.069 16.9371 148.341 18.7333 148.886C21.1816 149.626 23.7243 150 26.3282 150C42.7409 150 55.2035 135.192 52.3221 118.976L51.9187 116.723L116.719 51.919C119.293 52.379 120.936 52.7332 123.594 52.7259C130.568 52.7259 137.374 49.9148 142.275 45.0097C149.209 38.0798 151.647 27.9305 148.878 18.7427Z"></path>
          <path d="M143.576 112.489L112.755 81.9729C110.699 79.9204 108.143 78.3135 105.343 77.1926L76.9005 105.635C78.0211 108.436 79.6295 110.994 81.6841 113.052L112.501 143.564C121.066 152.13 134.97 152.161 143.576 143.564C152.142 134.994 152.142 121.055 143.576 112.489ZM131.049 131.037C129.332 132.754 126.551 132.754 124.835 131.037L103.241 109.748C101.524 108.031 101.524 105.25 103.241 103.534C104.957 101.817 107.738 101.817 109.455 103.534L131.049 124.823C132.765 126.54 132.765 129.32 131.049 131.037Z"></path>
          <path d="M37.5822 25.1538L37.5757 25.1558L41.539 21.1925C42.6877 20.0426 42.4463 18.1251 41.0583 17.2925L14.2299 0.62641C12.5011 -0.410992 10.2878 -0.138531 8.86246 1.28735L1.28746 8.86235C-0.139008 10.2888 -0.410883 12.5031 0.627692 14.2322L17.3052 41.0476C18.1408 42.4374 20.0632 42.6692 21.2046 41.5266L25.1518 37.58L53.2507 65.6789L65.6791 53.2506L37.5822 25.1538Z"></path>
        </g>
        <defs>
          <clipPath id={resolvedClipId}>
            <rect width="150" height="150" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
    );
  };

  const buildMixedGames = () => {
    const mixedPool = [
      ...INITIAL_SLOTS,
      ...MIXABLE_CATEGORY_IDS.flatMap((categoryId) => MOCK_CATEGORIES[categoryId] || []),
    ];
    const seen = new Set<string>();
    return mixedPool.filter((game) => {
      const key = `${normalizeProviderName(game?.provider)}|${String(game?.name || game?.title || '').trim().toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const buildSportsGames = () =>
    SPORTS_PROVIDERS.map((provider) => ({
      title: provider.name,
      provider: 'Sports',
      providerLogo: provider.img,
      image: provider.img,
      banner: provider.banner || provider.img,
      startGamePath: provider.startGamePath,
      color: 'bg-slate-700',
    }));

  const buildLiveCasinoGames = () =>
    LIVE_CASINO_PROVIDERS.map((provider) => ({
      title: provider.name,
      provider: 'Live Casino',
      providerLogo: provider.img,
      image: provider.img,
      banner: provider.banner || provider.img,
      startGamePath: provider.startGamePath,
      maintenance: provider.maintenance,
      color: 'bg-slate-700',
    }));

  useEffect(() => {
    setShowAllDesktopItems(false);
  }, [activeCategory]);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (activeCategory === 'slots') {
        setGamesData(INITIAL_SLOTS);
        setIsLoading(false);
        return;
      }

      if (activeCategory === 'allGames') {
        setGamesData(buildMixedGames().slice(0, 7));
        setIsLoading(false);
        return;
      }

      if (activeCategory === 'hotGames') {
        setGamesData(buildMixedGames().slice(0, 7));
        setIsLoading(false);
        return;
      }

      if (activeCategory === 'sports') {
        setGamesData(buildSportsGames());
        setIsLoading(false);
        return;
      }

      if (activeCategory === 'liveCasino') {
        setGamesData(buildLiveCasinoGames());
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const endpoint = `/${activeCategory.replace(/([A-Z])/g, '-$1').toLowerCase()}`;

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

  const visibleGames = isDesktop && !showAllDesktopItems
    ? gamesData.slice(0, DESKTOP_VISIBLE_ITEMS)
    : gamesData;
  const shouldShowViewMore = isDesktop && gamesData.length > DESKTOP_VISIBLE_ITEMS;
  const openSharedModal = (game: any) => {
    const title = game.title || game.name || 'Game';
    const bannerImage = game.banner || game.image || game.providerLogo || '';
    const startGamePath = game.startGamePath || getGameRoute(game);
    setSelectedGame({ title, bannerImage, startGamePath });
  };
  const getHotGameDetailPath = (game: any) => {
    const providerSlug = toSlug(game?.provider || 'slots');
    const gameSlug = toSlug(game?.title || game?.name || 'game');
    return `/slots/${providerSlug}/${gameSlug}`;
  };
  const handleGameClick = (game: any) => {
    if (isUnderMaintenance(game)) return;
    if (activeCategory === 'hotGames') {
      navigate(getHotGameDetailPath(game));
      return;
    }
    openSharedModal(game);
  };

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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {visibleGames.map((game, i) => (
              isSlotsCardLayout ? (
                <div
                  key={i}
                  className={`group relative bg-[#0f1923] rounded-xl overflow-hidden border border-white/5 transition-all duration-500 flex flex-col ${isUnderMaintenance(game) ? 'cursor-not-allowed' : 'cursor-pointer hover:border-[#39ff88]/30'}`}
                  onClick={() => handleGameClick(game)}
                >
                  {/* Top Section: Provider Header */}
                  <div className={`relative overflow-hidden flex items-center justify-center ${game.color || 'bg-blue-600'}`}>
                    <div className="absolute inset-0 bg-black/10" />

                    {game.providerLogo ? (
                      <img
                        src={game.providerLogo}
                        alt={game.provider || 'Provider logo'}
                        className={`relative z-10 h-full w-full object-contain transition-transform duration-700 ${
                          isUnderMaintenance(game) ? 'opacity-50 grayscale' : 'group-hover:scale-110'
                        }`}
                      />
                    ) : (
                      <span className="relative z-10 text-white font-black text-[10px] md:text-[11px] uppercase tracking-widest text-center px-2 drop-shadow-md">
                        {game.provider || 'PROVIDER'}
                      </span>
                    )}

                    {isUnderMaintenance(game) && renderMaintenanceOverlay('clip0_maintenance', i)}
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
                      <h3 className="text-white text-sm md:text-sm font-extrabold truncate leading-tight transition-colors group-hover:text-[#39ff88]">
                        {game.title || game.name}
                      </h3>
                      <span className="text-[#ffbb33] text-xs md:text-xs font-black uppercase tracking-tight mt-0.5">
                        RTP {game.rtp || '95.00%'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={i}
                  className={`group relative bg-[#0f1923] rounded-xl overflow-hidden border border-white/5 transition-all duration-500 flex flex-col ${isUnderMaintenance(game) ? 'cursor-not-allowed' : 'cursor-pointer hover:border-[#39ff88]/30'}`}
                  onClick={() => handleGameClick(game)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title || game.name}
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isUnderMaintenance(game) ? 'opacity-50 grayscale' : 'group-hover:scale-110'
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    {isUnderMaintenance(game) && renderMaintenanceOverlay('clip0_maintenance_b', i)}
                  </div>

                  <div className="p-2.5 bg-[#121b28] flex flex-col gap-0.5">
                    <h3 className="text-white text-sm font-extrabold truncate leading-tight transition-colors group-hover:text-[#39ff88]">
                      {game.title || game.name}
                    </h3>
                    <span className="text-[11px] text-gray-400 font-semibold truncate uppercase tracking-wide">
                      {game.provider || activeCategoryLabel}
                    </span>
                  </div>
                </div>
              )
            ))}
          </div>

          {shouldShowViewMore && (
            <div className="mt-5 flex justify-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowAllDesktopItems((prev) => !prev)}
                className="h-10 px-6 rounded-full border border-white/10 bg-[#0f1923] text-white hover:bg-white/10"
              >
                {showAllDesktopItems ? 'View Less' : 'View More'}
              </Button>
            </div>
          )}
        </div>
      </div>
      <GameModal
        isOpen={!!selectedGame}
        onClose={() => setSelectedGame(null)}
        title={selectedGame?.title || ''}
        bannerImage={selectedGame?.bannerImage || ''}
        startGamePath={selectedGame?.startGamePath}
      />
    </section>
  );
}
