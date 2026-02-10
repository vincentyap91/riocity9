import React, { useState } from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PAGE_ACCENT } from '../config/themeTokens';
import { GameSearchBar } from '../components/shared/GameSearchBar';
import { GameModal } from '../components/shared/GameModal';
import { useAuth } from '../contexts/AuthContext';
import { LoginRequiredModal } from '../components/shared/LoginRequiredModal';

// New Banner
import imgSportsBanner from "@/assets/e807beb4ab61c26c4afaecc32f24c795ff679981.png";

type SportsProvider = {
  id: string | number;
  name: string;
  img: string;
  banner?: string;
  startGamePath?: string;
};

const sportsProviders: SportsProvider[] = [
  {
    id: 'fb-sport',
    name: "FB Sport",
    img: "https://pksoftcdn.azureedge.net/media/fbsports_sports-202601130904031723.png",
    banner: "https://pksoftcdn.azureedge.net/media/fbsports_cam88_providerbanner_1029pxx420px-202601130904038494.jpg",
    startGamePath: '/sports/fb-sport',
  },
  { id: 2, name: "AFB1188 Sport", img: "https://pksoftcdn.azureedge.net/media/200x200_providerbanner_afbsport-202408191304551165.png" },
  { id: 3, name: "World Entertainment Sport", img: "https://pksoftcdn.azureedge.net/media/worldent_sports-202509081530460143.png" },
  { id: 4, name: "SBO Sports", img: "https://riocity-cdn.azureedge.net/riocity/10-202401241600164363.png" },
  { id: 5, name: "SV388 Cock Fight", img: "https://riocity-cdn.azureedge.net/riocity/200x200_providebanner_sv388-202404090912392908.png" },
  { id: 6, name: "Lucky Sport", img: "https://pksoftcdn.azureedge.net/media/200x200_providerbanner_luckysport-202407260917076261-202408060821509512-202410241125136236.png" },
  { id: 7, name: "SABA Sport", img: "https://pksoftcdn.azureedge.net/media/200x200_providerbanner_sabasports-202408050953363658-202408060824400114.png" },
  { id: 8, name: "CMD Sport", img: "https://pksoftcdn.azureedge.net/media/200x200_providerbanner_cmd-202408081430158831.png" },
  { id: 9, name: "9Wicket", img: "https://pksoftcdn.azureedge.net/media/9wicket-202412051339309915.png" },
  { id: 10, name: "M8Bet", img: "https://pksoftcdn.azureedge.net/media/200x200_providerbanner_m8bet-202410231016035133.png" },
  { id: 11, name: "United Gaming", img: "https://pksoftcdn.azureedge.net/media/200x200_providerbanner_ug-202411150810288002.png" },
  { id: 12, name: "Ws Sports", img: "https://pksoftcdn.azureedge.net/media/200x200px_provider_icon_ws-sports-202412051335234986.png" },
  { id: 13, name: "Dream Exchange", img: "https://pksoftcdn.azureedge.net/media/dreamexch-202505190755470879.png" },
  { id: 14, name: "CR Sport", img: "https://pksoftcdn.azureedge.net/media/crown sports-202505190757384729.png" },
  { id: 15, name: "RCB998", img: "https://pksoftcdn.azureedge.net/media/200x200px_provider_icon_horseracing (1)-202510131036418324.png" },
];

export function Sports() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<SportsProvider | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredProviders = sportsProviders.filter((provider) =>
    provider.name.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">
        
        {/* Hero Section */}
        <InsidePageHero image={imgSportsBanner} />

        {/* Simple Title Section – color from provider / banner */}
        <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6">
            <h2 className={PAGE_ACCENT.sports.pageTitleClass}>
                {t('sports')}
            </h2>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
            {/* Search Bar */}
            <GameSearchBar value={searchQuery} onChange={setSearchQuery} accent="orange" className="mb-12" />

            {/* Sports Providers Grid */}
            <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
                        {filteredProviders.map((provider) => (
                        <div
                            key={provider.id}
                            onClick={() => {
                                if (!isAuthenticated) {
                                    setShowLoginModal(true);
                                    return;
                                }
                                setSelectedProvider(provider);
                            }}
                            className="flex flex-col items-start gap-2 md:gap-3 group w-full max-w-[214px] cursor-pointer"
                        >
                            <div 
                                className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
                            >
                                <img 
                                    src={provider.img} 
                                    alt={provider.name} 
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-[#00bc7d] flex items-center justify-center shadow-[0_0_20px_rgba(0,188,125,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                        <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Provider Name */}
                            <div className="flex flex-col gap-1">
                                <span className="text-xs md:text-sm font-bold text-white group-hover:text-emerald-500 transition-colors">
                                    {provider.name}
                                </span>
                                <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-wider">Sports</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <GameModal
            isOpen={!!selectedProvider}
            onClose={() => setSelectedProvider(null)}
            title={selectedProvider?.name || ''}
            bannerImage={selectedProvider?.banner || ''}
            startGamePath={selectedProvider?.startGamePath}
        />
        <LoginRequiredModal isOpen={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}
