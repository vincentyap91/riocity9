import React, { useState, useRef, useEffect } from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { Grid, ArrowRight, RefreshCw, DollarSign } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { PAGE_ACCENT, SECTION_HEADER_TITLE_CLASS } from '../config/themeTokens';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';
import { DraggableScrollbar } from '../components/shared/DraggableScrollbar';
import { GameSearchBar } from '../components/shared/GameSearchBar';
import { LoginRequiredModal } from '../components/shared/LoginRequiredModal';

// --- Assets ---
import imgImagePromo from "@/assets/dba5dfffa741345e0ad70e36cafba5ab8b533760.png";
import imgNaga from "@/assets/6b1dbe5f8682d87860590e12ac192c13ee0316b6.png";
import imgPgsoft from "@/assets/c4ed9e638af884183ad6172c08a9077e70aee17e.png";
import img918Kaya from "@/assets/e8e00410b6f7e4aa1e71ae21ba2aacd7bd1996ab.png";
import img918Kiss from "@/assets/4526e6a0725d5d1c294963aae88c5b9ef75c43a8.png";
import imgPussy888 from "@/assets/0d7ab7156e0f52e104b06b57351033f6537c5b3d.png";
import imgMega888 from "@/assets/4472637a8ced7a5731b4801ea990f3d576719b63.png";
import imgGameplay from "@/assets/109b7e624aae662fe8221a8a065db2d742b0f77e.png";
import imgProviderMore from "@/assets/eb03145494843462f9d63197b64c7b0a60455691.png";
import imgRoyalSlot from "@/assets/royal-slot.png";

import imgImageAdventuresOfCaramelo from "@/assets/Adventures-Of-Caramelo.jpg";
import imgImageFortuneOx from "@/assets/8e1075cfac0bd1d05382c5095edcd2f1a5bd507a.png";
import imgImageWealthCoins from "@/assets/81347083c6b516fc13a5326b892d354f85d6f6de.png";
import imgImageMoneySage from "@/assets/2afb22dc11db27ee90b86a3c947f6a5c6fdaa11b.png";
import imgImageChickenPirate from "@/assets/9a1b3e7518d73d110198647fb78496c68bf98989.png";
import imgImageGodsOfPlinko from "@/assets/2418bc2c045aad154537667e97671f335cc2fac1.png";
import imgImageTropicana from "@/assets/e83451fcc84c43838279e53175fc0af19c01cec7.png";
import imgImageCrimeEmpire from "@/assets/266973d0069e1e97febe0eb32e9c1235a19e30ca.png";
import imgImageSerengetiSunrise from "@/assets/d574af8ba2fd8b7ecf5979e71152932b8e202392.png";
import imgImageCoinCraze from "@/assets/013cc7012de98486ae8ee22af3d11a3f5947ac65.png";
import imgImageCaishenGold from "@/assets/2808862987e1de6b44acb2f707202e972f0643ee.png";
import imgImageMoneyBooster from "@/assets/ce19eb21819d0b440f45198fa31d716e1e6360c4.png";
import imgImageLeBandit from "@/assets/4edf617eacdcd51770b6d345d3b9d62c067fb39e.png";
import imgImageTransformers from "@/assets/987eb60cc9b88d1ff2815abff6e98d4d3c7dd923.png";
import imgImageMineSlot from "@/assets/d909753b8baae2fa48d96e4d681c374439ab7912.png";
import imgImageTheLuxe from "@/assets/fd8815a8c3ad775972343be04dd119eaa9c583d9.png";
import imgImageGatesOfOlympus from "@/assets/8fb99beace6c78475545798f7458eacaad6bea25.png";
import imgImageSugarRush1000 from "@/assets/7056bef438bbf39437c2cda420b161734ab54e8e.png";
import imgImageSweetBonanza from "@/assets/b6552c9dab008f009bad47f48fa007ccef169c4a.png";
import imgImageGates1000 from "@/assets/e7fb1cf0de54bfef4c5b040e789790c437112a46.png";

// Constants
const providers = [
    { id: 1, name: "NAGA", image: imgNaga },
    { id: 9, name: "Royal Slot Gaming", image: imgRoyalSlot },
    { id: 2, name: "PG Soft", image: imgPgsoft },
    { id: 3, name: "918Kaya", image: img918Kaya },
    { id: 4, name: "918Kiss", image: img918Kiss, maintenance: true },
    { id: 5, name: "Pussy888", image: imgPussy888 },
    { id: 6, name: "Mega888", image: imgMega888, maintenance: true },
    { id: 7, name: "Gameplay", image: imgGameplay },
    { id: 8, name: "More", image: imgProviderMore },
];

const games = [
    { id: 1, provider: "NAGA", title: "Adventures Of Caramelo", rtp: "96.95%", image: imgImageAdventuresOfCaramelo, trend: 'up', slug: 'adventures-of-caramelo' },
    { id: 2, provider: "NAGA", title: "Fortune Ox", rtp: "96.75%", image: imgImageFortuneOx, trend: 'down' },
    { id: 3, provider: "NAGA", title: "Wealth Coins", rtp: "95.00%", image: imgImageWealthCoins, trend: 'up' },
    { id: 4, provider: "NAGA", title: "Money Sage", rtp: "96.00%", image: imgImageMoneySage, trend: 'up' },
    { id: 5, provider: "NAGA", title: "Chicken Pirate", rtp: "94.89%", image: imgImageChickenPirate, trend: 'down' },
    { id: 6, provider: "NAGA", title: "Gods of Plinko", rtp: "94.20%", image: imgImageGodsOfPlinko, trend: 'up' },
    { id: 7, provider: "NAGA", title: "Tropicana", rtp: "94.00%", image: imgImageTropicana, trend: 'down' },
    { id: 8, provider: "NAGA", title: "Crime Empire", rtp: "94.89%", image: imgImageCrimeEmpire, trend: 'up' },
    { id: 9, provider: "NAGA", title: "Serengeti Sunrise", rtp: "94.89%", image: imgImageSerengetiSunrise, trend: 'up' },
    { id: 10, provider: "NAGA", title: "Coin Craze", rtp: "94.20%", image: imgImageCoinCraze, trend: 'down' },
    { id: 11, provider: "NAGA", title: "Caishen Gold", rtp: "94.00%", image: imgImageCaishenGold, trend: 'up' },
    { id: 12, provider: "NAGA", title: "Money Booster", rtp: "94.89%", image: imgImageMoneyBooster, trend: 'down' },
    { id: 13, provider: "NAGA", title: "Le Bandit", rtp: "94.89%", image: imgImageLeBandit, trend: 'up' },
    { id: 14, provider: "NAGA", title: "Transformers", rtp: "94.20%", image: imgImageTransformers, trend: 'up' },
    { id: 15, provider: "NAGA", title: "Mine Slot", rtp: "94.00%", image: imgImageMineSlot, trend: 'down' },
    { id: 16, provider: "NAGA", title: "The Luxe", rtp: "94.89%", image: imgImageTheLuxe, trend: 'up' },
    { id: 17, provider: "NAGA", title: "Gates of Olympus", rtp: "94.89%", image: imgImageGatesOfOlympus, trend: 'up' },
    { id: 18, provider: "NAGA", title: "Sugar Rush 1000", rtp: "94.20%", image: imgImageSugarRush1000, trend: 'down' },
    { id: 19, provider: "NAGA", title: "Sweet Bonanza", rtp: "94.00%", image: imgImageSweetBonanza, trend: 'up' },
    { id: 20, provider: "NAGA", title: "Gates 1000", rtp: "94.89%", image: imgImageGates1000, trend: 'up' },
    { id: 21, provider: "Royal Slot Game", title: "Fortune Thai", rtp: "92.99%", image: "https://pksoftcdn.azureedge.net/games/RSG/FortuneThai.png", trend: 'down' },
    { id: 22, provider: "Royal Slot Game", title: "Jungle", rtp: "91.73%", image: "https://pksoftcdn.azureedge.net/games/RSG/Jungle.png", trend: 'down' },
    { id: 23, provider: "Royal Slot Game", title: "Roma", rtp: "76.26%", image: "https://pksoftcdn.azureedge.net/games/RSG/Roma.png", trend: 'down' },
    { id: 24, provider: "Royal Slot Game", title: "Captain Hook", rtp: "91.25%", image: "https://pksoftcdn.azureedge.net/games/RSG/CaptainHook.png", trend: 'down' },
    { id: 25, provider: "Royal Slot Game", title: "Happy Farm", rtp: "94.11%", image: "https://pksoftcdn.azureedge.net/games/RSG/HappyFarm.png", trend: 'up' },
    { id: 26, provider: "Royal Slot Game", title: "Power of Thor", rtp: "90.60%", image: "https://pksoftcdn.azureedge.net/games/RSG/PowerofThor.png", trend: 'up' },
    { id: 27, provider: "Royal Slot Game", title: "Chin Shi Huang", rtp: "93.22%", image: "https://pksoftcdn.azureedge.net/games/RSG/ChinShiHuang.png", trend: 'up' },
    { id: 28, provider: "Royal Slot Game", title: "Caishen Fortunes", rtp: "94.11%", image: "https://pksoftcdn.azureedge.net/games/RSG/CaishenFortunes.png", trend: 'up' },
    { id: 29, provider: "Royal Slot Game", title: "FortuneOfAztecs", rtp: "91.08%", image: "https://pksoftcdn.azureedge.net/games/RSG/FortuneOfAztecs.png", trend: 'down' },
    { id: 30, provider: "Royal Slot Game", title: "Rich Mahjong", rtp: "92.19%", image: "https://pksoftcdn.azureedge.net/games/RSG/RichMahjong.png", trend: 'down' },
    { id: 31, provider: "Royal Slot Game", title: "RichMahjong2", rtp: "93.74%", image: "https://pksoftcdn.azureedge.net/games/RSG/RichMahjong2.png", trend: 'up' },
    { id: 32, provider: "Royal Slot Game", title: "Dragon Legend", rtp: "90.58%", image: "https://pksoftcdn.azureedge.net/games/RSG/DragonLegend.png", trend: 'up' },
    { id: 33, provider: "PlayTech Slots", title: "Lockdown Loot TM", rtp: "90.40%", image: "https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg", trend: 'down' },
    { id: 34, provider: "PlayTech Slots", title: "3 Card Brag", rtp: "79.93%", image: "https://riocity-cdn.azureedge.net/riocity/playtech/3cb.jpg", trend: 'down' },
];

type SlotsProps = {
    heroImage?: string;
    pageTitle?: string;
    defaultProviderName?: string;
    lockedProviderName?: string;
    hideProviderNav?: boolean;
};

const normalizeProviderName = (value: string) => value.trim().toLowerCase();
const canonicalProviderName = (value: string) => {
    const normalized = normalizeProviderName(value);
    if (normalized === 'royal slot game') {
        return 'royal slot gaming';
    }
    if (normalized === 'playtech' || normalized === 'playtech slot') {
        return 'playtech slots';
    }
    return normalized;
};

const getProviderIdByName = (providerName?: string) => {
    if (!providerName) {
        return providers[0]?.id ?? 1;
    }
    const matchedProvider = providers.find((provider) => canonicalProviderName(provider.name) === canonicalProviderName(providerName));
    return matchedProvider?.id ?? providers[0]?.id ?? 1;
};

export function Slots({
    heroImage = imgImagePromo,
    pageTitle,
    defaultProviderName,
    lockedProviderName,
    hideProviderNav = false,
}: SlotsProps = {}) {
    const { t } = useLanguage();
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [walletBalance] = useState('966.24');
    const [guaranteedRebate] = useState('5.00%');
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [activeProviderId, setActiveProviderId] = useState(getProviderIdByName(defaultProviderName ?? lockedProviderName));
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const lockedProviderId = lockedProviderName ? getProviderIdByName(lockedProviderName) : null;
    const activeProviderName = providers.find((provider) => provider.id === activeProviderId)?.name ?? '';
    const selectedProviderName = lockedProviderName ?? (lockedProviderId
        ? (providers.find((provider) => provider.id === lockedProviderId)?.name ?? '')
        : activeProviderName);
    const filteredGames = games.filter((game) =>
        canonicalProviderName(game.provider) === canonicalProviderName(selectedProviderName) &&
        (
            game.title.toLowerCase().includes(normalizedSearch) ||
            game.provider.toLowerCase().includes(normalizedSearch)
        )
    );

    useEffect(() => {
        const nextProviderId = getProviderIdByName(defaultProviderName ?? lockedProviderName);
        setActiveProviderId(nextProviderId);
    }, [defaultProviderName, lockedProviderName]);

    // Scrollbar Handlers
    const { scrollRef: scrollContainerRef, handlers: dragScrollHandlers, suppressClickIfDragged } = useHorizontalDragScroll();

    return (
        <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">

            {/* Hero Section */}
            <InsidePageHero image={heroImage} />

            {/* Simple Title Section – color from provider nav */}
            <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6 font-bold">
                <h2 className={PAGE_ACCENT.slots.pageTitleClass}>
                    {pageTitle ?? t('slots')}
                </h2>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">

                {/* 3. Provider Navigation */}
                {!hideProviderNav && (
                <div className="w-full max-w-5xl mb-6">
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
                            {providers.map((p) => {
                                const isMaintenance = !!p.maintenance;
                                const isActiveProvider = p.id === (lockedProviderId ?? activeProviderId);
                                return (
                                    <div
                                        key={p.id}
                                        onClickCapture={suppressClickIfDragged}
                                        className={`
                                    relative shrink-0 h-[60px] w-[140px] rounded-lg flex items-center justify-center transition-all duration-300
                                    ${isActiveProvider
                                                ? 'bg-[#e60076]/5 border border-[#e60076]'
                                                : 'bg-[#16202c] border border-transparent hover:bg-[#1e2a38]'
                                            }
                                    ${isMaintenance || !!lockedProviderId ? 'bg-[#0b111b] border border-emerald-500/30 cursor-not-allowed' : 'cursor-pointer'}
                                `}
                                        title={isMaintenance ? 'Maintenance' : p.name}
                                        onClick={() => {
                                            if (!isMaintenance && !lockedProviderId) setActiveProviderId(p.id);
                                        }}
                                    >
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            draggable="false"
                                            onDragStart={(e) => e.preventDefault()}
                                            className={`h-8 w-auto object-contain max-w-[80%] select-none pointer-events-none [-webkit-user-drag:none] ${isMaintenance ? 'opacity-50 grayscale' : ''}`}
                                        />
                                        {isMaintenance && (
                                            <div className="absolute inset-0 rounded-lg bg-black/50 flex items-center justify-center">
                                                <svg
                                                    className="h-9 w-9 fill-emerald-400 drop-shadow"
                                                    viewBox="0 0 150 150"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                >
                                                    <g clipPath="url(#clip0_1031_6568)">
                                                        <path d="M148.878 18.7427C148.334 16.9377 146.058 16.3699 144.73 17.6977L136.061 26.3672H123.633V13.9389L132.303 5.26523C133.637 3.93047 133.058 1.6626 131.267 1.11797C128.813 0.372363 126.267 0.0541992 123.658 0.0541992C116.59 0.0541992 109.964 2.73779 104.99 7.72471C98.896 13.8144 96.1667 22.522 97.6772 31.0233L98.0806 33.2763L33.276 98.0807C30.6583 97.2694 29.0818 97.2694 26.4009 97.2694C19.4399 97.2694 12.6293 100.085 7.7197 104.99C0.790989 111.923 -1.65091 122.075 1.11648 131.257C1.66199 133.066 3.93367 133.633 5.26433 132.302L13.9344 123.633H26.4258V136.066L17.6953 144.737C16.362 146.069 16.9371 148.341 18.7333 148.886C21.1816 149.626 23.7243 150 26.3282 150C42.7409 150 55.2035 135.192 52.3221 118.976L51.9187 116.723L116.719 51.919C119.293 52.379 120.936 52.7332 123.594 52.7259C130.568 52.7259 137.374 49.9148 142.275 45.0097C149.209 38.0798 151.647 27.9305 148.878 18.7427Z"></path>
                                                        <path d="M143.576 112.489L112.755 81.9729C110.699 79.9204 108.143 78.3135 105.343 77.1926L76.9005 105.635C78.0211 108.436 79.6295 110.994 81.6841 113.052L112.501 143.564C121.066 152.13 134.97 152.161 143.576 143.564C152.142 134.994 152.142 121.055 143.576 112.489ZM131.049 131.037C129.332 132.754 126.551 132.754 124.835 131.037L103.241 109.748C101.524 108.031 101.524 105.25 103.241 103.534C104.957 101.817 107.738 101.817 109.455 103.534L131.049 124.823C132.765 126.54 132.765 129.32 131.049 131.037Z"></path>
                                                        <path d="M37.5822 25.1538L37.5757 25.1558L41.539 21.1925C42.6877 20.0426 42.4463 18.1251 41.0583 17.2925L14.2299 0.62641C12.5011 -0.410992 10.2878 -0.138531 8.86246 1.28735L1.28746 8.86235C-0.139008 10.2888 -0.410883 12.5031 0.627692 14.2322L17.3052 41.0476C18.1408 42.4374 20.0632 42.6692 21.2046 41.5266L25.1518 37.58L53.2507 65.6789L65.6791 53.2506L37.5822 25.1538Z"></path>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_1031_6568">
                                                            <rect width="150" height="150" fill="white"></rect>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile Scrollbar */}
                    <DraggableScrollbar containerRef={scrollContainerRef} />
                </div>
                )}

                {/* 4. Wallet + Guaranteed Rebate */}
                <div className="w-full max-w-5xl mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#16202c] border border-white/5 px-4 py-3 min-w-0 flex items-center justify-between gap-3">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[#ffbb33] text-xs font-bold uppercase tracking-wide">Wallet</span>
                            <span className="text-white text-xl md:text-2xl font-black tabular-nums leading-tight">{walletBalance}</span>
                        </div>
                        <button
                            type="button"
                            className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                            aria-label="Refresh wallet"
                        >
                            <RefreshCw className="w-5 h-5 text-white" />
                        </button>
                    </div>
                    <div className="rounded-xl bg-[#16202c] border border-white/5 px-4 py-3 min-w-0 flex items-center justify-between gap-3">
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-[#ffbb33] text-xs font-bold uppercase tracking-wide">Guaranteed Rebate</span>
                            <span className="text-white text-xl md:text-2xl font-black tabular-nums leading-tight">{guaranteedRebate}</span>
                        </div>
                        <button
                            type="button"
                            className="w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                            aria-label="Rebate details"
                        >
                            <DollarSign className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Search Bar - below wallet + rebate */}
                <GameSearchBar value={searchQuery} onChange={setSearchQuery} accent="pink" className="mb-12" />

                {/* 5. Section Header + 6. Game Grid */}
                <div className="w-full flex flex-col gap-6">
                    {/* Section Header – same accent as provider nav */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className={PAGE_ACCENT.slots.sectionHeaderIconBoxClass}>
                            <Grid className={PAGE_ACCENT.slots.sectionHeaderIconClass} />
                        </div>
                        <h2 className={SECTION_HEADER_TITLE_CLASS}>
                            {(selectedProviderName || 'NAGA').toUpperCase()} <span className={PAGE_ACCENT.slots.sectionHeaderAccentClass}>GAME</span>
                        </h2>
                    </div>

                    {/* Game Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
                        {filteredGames.map((game) => {
                            const Wrapper: any = game.slug ? Link : 'div';
                            const wrapperProps = game.slug ? { to: `/slots/${game.slug}` } : {};
                            return (
                                <Wrapper
                                    key={game.id}
                                    {...wrapperProps}
                                    className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]"
                                    onClick={(event: React.MouseEvent) => {
                                        if (isAuthenticated) {
                                            return;
                                        }
                                        event.preventDefault();
                                        sessionStorage.setItem('redirectAfterLogin', `${location.pathname}${location.search}`);
                                        setShowLoginModal(true);
                                    }}
                                >
                                    <div
                                        className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/5 transition-all duration-500 bg-[#0f1923] hover:border-white/10"
                                    >
                                        <img
                                            src={game.image}
                                            alt={game.title}
                                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                        />

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col gap-1.5 md:gap-2 mt-1 md:mt-2 w-full">
                                        <h3 className="text-white font-bold text-xs md:text-sm lg:text-base transition-colors w-full px-0.5 truncate">
                                            {game.title}
                                        </h3>

                                        {/* Updated RTP Badge: Only Arrow changes color to be subtle */}
                                        <div className="flex items-center gap-1.5 md:gap-2 bg-[#00bc7d]/10 rounded-xl px-2 py-1 md:px-3 md:py-1.5 w-fit border border-[#00bc7d]/20 shadow-[0_0_15px_-5px_rgba(0,188,125,0.1)]">
                                            <span className="text-emerald-500 font-black text-xs tracking-tight">
                                                RTP {game.rtp}
                                            </span>
                                            {game.trend === 'up' ? (
                                                <div className="w-0 h-0 border-l-[3px] md:border-l-[4px] border-l-transparent border-r-[3px] md:border-r-[4px] border-r-transparent border-b-[5px] md:border-b-[6px] border-b-emerald-500 mb-0.5 animate-pulse"></div>
                                            ) : (
                                                <div className="w-0 h-0 border-l-[3px] md:border-l-[4px] border-l-transparent border-r-[3px] md:border-r-[4px] border-r-transparent border-t-[5px] md:border-t-[6px] border-t-red-500 mt-0.5 animate-pulse"></div>
                                            )}
                                        </div>
                                    </div>
                                </Wrapper>
                            );
                        })}
                    </div>

                </div>

            </div>
            <LoginRequiredModal isOpen={showLoginModal} onOpenChange={setShowLoginModal} />
        </div>
    );
}
