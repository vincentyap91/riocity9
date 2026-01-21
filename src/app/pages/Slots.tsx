import React from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { InsidePageHeader, PageNavItem } from '../components/shared/InsidePageHeader';
import { Grid, Gamepad2, Star, Zap, Trophy, History, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// --- Assets from RiocitySlots.tsx & Mn.tsx ---
// Hero
import imgImagePromo from "@/assets/dba5dfffa741345e0ad70e36cafba5ab8b533760.png";

// Providers (Mn.tsx assets)
import imgNaga from "@/assets/6b1dbe5f8682d87860590e12ac192c13ee0316b6.png";
import imgPgsoft from "@/assets/c4ed9e638af884183ad6172c08a9077e70aee17e.png";
import img918Kaya from "@/assets/e8e00410b6f7e4aa1e71ae21ba2aacd7bd1996ab.png";
import img918Kiss from "@/assets/4526e6a0725d5d1c294963aae88c5b9ef75c43a8.png";
import imgPussy888 from "@/assets/0d7ab7156e0f52e104b06b57351033f6537c5b3d.png";
import imgMega888 from "@/assets/4472637a8ced7a5731b4801ea990f3d576719b63.png";
import imgGameplay from "@/assets/109b7e624aae662fe8221a8a065db2d742b0f77e.png";
import imgProviderMore from "@/assets/eb03145494843462f9d63197b64c7b0a60455691.png";

// Games
import imgImageMahjongWays2 from "@/assets/a5141a5758a77173e729427c79c3d2aeef12bebc.png";
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
    { id: 1, name: "NAGA", image: imgNaga, active: true },
    { id: 2, name: "PG Soft", image: imgPgsoft },
    { id: 3, name: "918Kaya", image: img918Kaya },
    { id: 4, name: "918Kiss", image: img918Kiss },
    { id: 5, name: "Pussy888", image: imgPussy888 },
    { id: 6, name: "Mega888", image: imgMega888 },
    { id: 7, name: "Gameplay", image: imgGameplay },
    { id: 8, name: "More", image: imgProviderMore },
];

const games = [
    { id: 1, title: "Mahjong Ways 2", rtp: "96.95%", image: imgImageMahjongWays2 },
    { id: 2, title: "Fortune Ox", rtp: "96.75%", image: imgImageFortuneOx },
    { id: 3, title: "Wealth Coins", rtp: "95.00%", image: imgImageWealthCoins },
    { id: 4, title: "Money Sage", rtp: "96.00%", image: imgImageMoneySage },
    { id: 5, title: "Chicken Pirate", rtp: "94.89%", image: imgImageChickenPirate },
    { id: 6, title: "Gods of Plinko", rtp: "94.20%", image: imgImageGodsOfPlinko },
    { id: 7, title: "Tropicana", rtp: "94.00%", image: imgImageTropicana },
    { id: 8, title: "Crime Empire", rtp: "94.89%", image: imgImageCrimeEmpire },
    { id: 9, title: "Serengeti Sunrise", rtp: "94.89%", image: imgImageSerengetiSunrise },
    { id: 10, title: "Coin Craze", rtp: "94.20%", image: imgImageCoinCraze },
    { id: 11, title: "Caishen Gold", rtp: "94.00%", image: imgImageCaishenGold },
    { id: 12, title: "Money Booster", rtp: "94.89%", image: imgImageMoneyBooster },
    { id: 13, title: "Le Bandit", rtp: "94.89%", image: imgImageLeBandit },
    { id: 14, title: "Transformers", rtp: "94.20%", image: imgImageTransformers },
    { id: 15, title: "Mine Slot", rtp: "94.00%", image: imgImageMineSlot },
    { id: 16, title: "The Luxe", rtp: "94.89%", image: imgImageTheLuxe },
    { id: 17, title: "Gates of Olympus", rtp: "94.89%", image: imgImageGatesOfOlympus },
    { id: 18, title: "Sugar Rush 1000", rtp: "94.20%", image: imgImageSugarRush1000 },
    { id: 19, title: "Sweet Bonanza", rtp: "94.00%", image: imgImageSweetBonanza },
    { id: 20, title: "Gates 1000", rtp: "94.89%", image: imgImageGates1000 },
];

export function Slots() {
  const { t } = useLanguage();
  const slotNavItems: PageNavItem[] = [
      { id: 'lobby', label: t('lobby'), icon: Grid, isActive: true },
      { id: 'hot', label: t('hotGames'), icon: Zap },
      { id: 'new', label: "New", icon: Star },
      { id: 'jackpot', label: "Jackpot", icon: Trophy },
      { id: 'recent', label: "Recent", icon: History },
  ];

  return (
    <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">
        
        {/* Hero Section */}
        <InsidePageHero image={imgImagePromo} />

        {/* Header & Nav */}
        <div className="mt-[-20px] relative z-20">
            <InsidePageHeader title={t('slots')} navItems={slotNavItems} iconColor="text-pink-500" />
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
              
            {/* Provider Navigation */}
            <div className="w-full bg-[#0f1923]/80 backdrop-blur-md border border-white/5 rounded-xl p-2.5 mb-12">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {providers.map((p) => (
                        <div 
                            key={p.id} 
                            className={`
                                relative shrink-0 h-[60px] w-[140px] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300
                                ${p.active 
                                    ? 'bg-[#e60076]/5 border border-[#e60076]' 
                                    : 'bg-[#16202c] border border-transparent hover:bg-[#1e2a38]'
                                }
                            `}
                        >
                            <img src={p.image} alt={p.name} className="h-8 w-auto object-contain max-w-[80%]" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Section: NAGA GAME */}
            <div className="w-full flex flex-col gap-6">
                
                {/* Section Header */}
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#f6339a]/10 border border-[#f6339a]/20 flex items-center justify-center">
                        <Grid className="w-5 h-5 text-[#f6339a]" />
                    </div>
                    <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                        NAGA <span className="text-[#f6339a]">GAME</span>
                    </h2>
                </div>

                {/* Game Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {games.map((game) => (
                        <div key={game.id} className="flex flex-col items-start gap-3 group cursor-pointer">
                            <div 
                                className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500 bg-[#1a2536] group-hover:ring-[#fdc700]/30 group-hover:shadow-[0_0_30px_-5px_rgba(253,199,0,0.2)]"
                            >
                                <img 
                                    src={game.image} 
                                    alt={game.title} 
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
                                />

                                {/* Hover Overlay from Screenshot */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                        <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                                    </div>
                                </div>

                                {/* Enhanced Floating RTP Badge */}
                                <div className="absolute top-2 left-2 z-10 group/rtp">
                                    <div className="flex flex-col items-center bg-[#0a0f1a]/90 backdrop-blur-md border border-[#fdc700]/40 rounded-xl px-2 py-1.5 shadow-[0_0_15px_rgba(253,199,0,0.2)] group-hover:shadow-[0_0_20px_rgba(253,199,0,0.4)] transition-all duration-500">
                                        <div className="flex items-center gap-1.5">
                                            <div className="relative">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#fdc700] animate-ping absolute opacity-75"></div>
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#fdc700] relative"></div>
                                            </div>
                                            <span className="text-[11px] font-black text-[#fdc700] tracking-tight drop-shadow-[0_0_5px_rgba(253,199,0,0.6)]">
                                                {game.rtp}
                                            </span>
                                        </div>
                                        <div className="w-full h-[3px] bg-white/5 rounded-full mt-1.5 overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-[#f59e0b] via-[#fdc700] to-[#fcd34d] shadow-[0_0_8px_rgba(253,199,0,0.5)]" 
                                                style={{ width: `${parseFloat(game.rtp)}%` }}
                                            />
                                        </div>
                                        <span className="text-[7px] text-[#fdc700]/60 font-black uppercase tracking-[0.2em] mt-1 leading-none">Live RTP</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-1 mt-1">
                                <h3 className="text-white group-hover:text-emerald-500 font-bold text-[13px] truncate transition-colors w-full px-0.5">
                                    {game.title}
                                </h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest">NAGA</span>
                                    <div className="flex items-center gap-1 bg-[#fdc700]/5 px-1.5 py-0.5 rounded-full border border-[#fdc700]/10">
                                        <Zap className="w-2.5 h-2.5 text-[#fdc700] fill-[#fdc700]/20" />
                                        <span className="text-[#fdc700] text-[9px] font-black uppercase tracking-tighter">HOT</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    </div>
  );
}
