import React, { useState, useRef } from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { Grid, ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sanitizeTextInput } from '../utils/security';
import { PAGE_ACCENT, SECTION_HEADER_TITLE_CLASS } from '../config/themeTokens';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';
import { DraggableScrollbar } from '../components/shared/DraggableScrollbar';

// New Banner
import imgFishingBanner from "@/assets/71667b097dc0233c71967c40c7e2dc37f4fa9f8c.png";

const fishingProviders = [
    { id: 1, name: "FaChai", image: "https://pksoftcdn.azureedge.net/media/fachai (1)-202411061132582635.png", active: true },
    { id: 2, name: "Provider 2", image: "https://pksoftcdn.azureedge.net/media/41-202408011552398054.png" },
    { id: 3, name: "FastSpin", image: "https://pksoftcdn.azureedge.net/media/fastspin-202411061313315880.png" },
    { id: 4, name: "Provider 4", image: "https://pksoftcdn.azureedge.net/media/59-202408260942492741.png" },
    { id: 5, name: "Provider 5", image: "https://pksoftcdn.azureedge.net/media/download-202410181407480566.png" },
    { id: 6, name: "Jili", image: "https://pksoftcdn.azureedge.net/media/jili-202411250941547931.png" },
    { id: 7, name: "CQ9", image: "https://pksoftcdn.azureedge.net/media/cq9-202411271102392284.png" },
    { id: 8, name: "JDB", image: "https://pksoftcdn.azureedge.net/media/jdb-202411281451409731.png" },
    { id: 9, name: "SpadeGaming", image: "https://pksoftcdn.azureedge.net/media/spadegaming-202412121058233583.png" },
];

const fishingGames = [
    {
        id: 1,
        title: "Fishing Game 21003",
        provider: "FaChai",
        image: "https://pksoftcdn.azureedge.net/games/FaChai/21003.png",
        tag: "Hot"
    },
    {
        id: 2,
        title: "Fishing Game 21004",
        provider: "FaChai",
        image: "https://pksoftcdn.azureedge.net/games/FaChai/21004.png",
        tag: "New"
    },
    {
        id: 3,
        title: "Fishing Game 21007",
        provider: "FaChai",
        image: "https://pksoftcdn.azureedge.net/games/FaChai/21007.png",
        tag: "Hot"
    },
    {
        id: 4,
        title: "Fishing Game 21008",
        provider: "FaChai",
        image: "https://pksoftcdn.azureedge.net/games/FaChai/21008.png",
        tag: "New"
    },
    {
        id: 5,
        title: "Fishing Game 21009",
        provider: "FCG1688",
        image: "https://agent-icon.fcg1688.net/icon/21009_200x200_en.png",
        tag: "Hot"
    },
];

export function Fishing() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    // Scrollbar Handlers
    const { scrollRef: scrollContainerRef, handlers: dragScrollHandlers, suppressClickIfDragged } = useHorizontalDragScroll();

    return (
        <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">

            {/* Hero Section */}
            <InsidePageHero image={imgFishingBanner} />

            {/* Simple Title Section – color from provider nav */}
            <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6 font-bold">
                <h2 className={PAGE_ACCENT.fishing.pageTitleClass}>
                    {t('fishingGamesTitle')}
                </h2>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">

                {/* Provider Navigation */}
                <div className="w-full max-w-5xl mb-12">
                    <div className="bg-[#0f1923]/80 backdrop-blur-md border border-white/5 rounded-xl p-2.5 mb-2">
                        <div
                            ref={scrollContainerRef}
                            {...dragScrollHandlers}
                            className="flex items-center gap-2 overflow-x-auto no-scrollbar touch-scroll-x select-none cursor-grab active:cursor-grabbing"
                            style={{
                                WebkitOverflowScrolling: 'touch',
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                willChange: 'scroll-position',
                                transform: 'translateZ(0)',
                                backfaceVisibility: 'hidden' as const
                            }}
                        >
                            {fishingProviders.map((p) => (
                                <div
                                    key={p.id}
                                    onClickCapture={suppressClickIfDragged}
                                    className={`
                                relative shrink-0 h-[60px] w-[140px] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300
                                ${p.active
                                            ? 'bg-[#06b6d4]/5 border border-[#06b6d4]'
                                            : 'bg-[#16202c] border border-transparent hover:bg-[#1e2a38]'
                                        }
                            `}
                                >
                                    <img src={p.image} alt={p.name} draggable="false" className="h-8 w-auto object-contain max-w-[80%] select-none pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Scrollbar */}
                    <DraggableScrollbar containerRef={scrollContainerRef} />
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-5xl mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(sanitizeTextInput(e.target.value).slice(0, 50))}
                            maxLength={50}
                            className="w-full h-14 bg-[#16202c] border border-transparent hover:border-white/10 focus:border-cyan-500/50 rounded-full pl-6 pr-14 text-white placeholder:text-gray-500 transition-all outline-none"
                            placeholder={t("searchPlaceholder")}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-600/20 rounded-full text-cyan-400">
                            <Search className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Section: FISHING GAME */}
                <div className="w-full flex flex-col gap-6">

                    {/* Section Header – same accent as provider nav */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={PAGE_ACCENT.fishing.sectionHeaderIconBoxClass}>
                            <Grid className={PAGE_ACCENT.fishing.sectionHeaderIconClass} />
                        </div>
                        <h2 className={SECTION_HEADER_TITLE_CLASS}>
                            Fa <span className={PAGE_ACCENT.fishing.sectionHeaderAccentClass}>CHAI</span>
                        </h2>
                    </div>

                    {/* Game Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
                        {fishingGames.map((game) => (
                            <div key={game.id} className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]">
                                <div
                                    className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
                                >
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                    />

                                    {/* Hover Overlay from Screenshot */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-[#00bc7d] flex items-center justify-center shadow-[0_0_20px_rgba(0,188,125,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                            <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col gap-1 mt-1 md:mt-2 w-full">
                                    <h3 className="text-white group-hover:text-emerald-500 font-bold text-xs md:text-sm lg:text-base transition-colors w-full px-0.5">
                                        {game.title}
                                    </h3>
                                    <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-wider">{game.provider}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </div>
    );
}
