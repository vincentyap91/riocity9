import React, { useState } from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PAGE_ACCENT } from '../config/themeTokens';
import { GameModal } from '../components/shared/GameModal';
import { GameSearchBar } from '../components/shared/GameSearchBar';

// Asset Imports
import imgKh168Marbula2Providericon200X200Px2025101310310355541 from "@/assets/f6a50bd7817f3011aaeb196648cadbe4a3ae53b3.png";

// New Banner
import imgLiveCasinoBanner from "@/assets/03eddcf1c2f25160add74dab60888b5e1fbcbf0c.png";

import imgGameplayLiveCasino2025120510392605481 from "@/assets/1b526547f23589a0effd96c6158392e2d6fb3935.png";
import imgVerygoodbet2025090815305832881 from "@/assets/e4f88b3752ff1601da28db10545c860015afa477.png";
import img200X200ProviderbannerAllbet2024120609214312891 from "@/assets/e7bffee978d2e07b7503abbca2bba3aa68d0f266.png";
import img200X200ProviderbannerYeebet2024112009250169211 from "@/assets/11b3a08ee3b214daab6882a4382a2db797b54ae5.png";
import imgCopyOf200X200ProvidebannerCt8552024090210313059951 from "@/assets/f63800b44ca9b6f3d38f0aac7dfd1f2ec040af43.png";
import img200X200ProviderbannerBiggaming2024082612421850671 from "@/assets/cb906b3bf03cc6acfcb7ea2ab7374623421bb8cc.png";
import img200X200ProviderbannerAfbcasino2024081510241738152024081512002860141 from "@/assets/8b952f4f8efc7ab9452d911891a11049cf045587.png";
import img200X200ProviderbannerWcasino2024081509230919411 from "@/assets/809fa51dd86ce47eaf28b331fe1d6bbd63e199cd.png";
import img200X200ProviderbannerSaGaming2024072516231037371 from "@/assets/f63292375b3d6510a02ecd0751e8fefb6c545a34.png";
import img200X200ProviderbannerSexybaccarat2024040909120601271 from "@/assets/0c18a14e6167ec42bcf217a4281816aa37029ff4.png";
import img32023122015043915551 from "@/assets/d962173d340d1f347cd214f08272d88852cf6e32.png";

const providers = [
    {
        id: 'pragmatic',
        name: 'Pragmatic Play Casino',
        img: img32023122015043915551,
        banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg'
    },
    {
        id: 'gameplay',
        name: 'GamePlay Casino',
        img: imgGameplayLiveCasino2025120510392605481,
        banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg'
    },
    {
        id: 'marbula',
        name: 'Marbula2',
        img: imgKh168Marbula2Providericon200X200Px2025101310310355541,
        banner: 'https://pksoftcdn.azureedge.net/media/kh168_marbula2_providerbanner_200x200px-202510131031055962.jpg'
    },
    { id: 'verygood', name: 'Very Good Bet', img: imgVerygoodbet2025090815305832881, banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg' },
    { id: 'sexy', name: 'Sexy Baccarat', img: img200X200ProviderbannerSexybaccarat2024040909120601271, banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg' },
    { id: 'sagaming', name: 'SA Gaming', img: img200X200ProviderbannerSaGaming2024072516231037371, banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg' },
    { id: 'wcasino', name: 'WCasino', img: img200X200ProviderbannerWcasino2024081509230919411, banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg' },
    { id: 'afb', name: 'AFB Gaming Casino', img: img200X200ProviderbannerAfbcasino2024081510241738152024081512002860141, banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg' },
    {
        id: 'biggaming',
        name: 'Big Gaming',
        img: img200X200ProviderbannerBiggaming2024082612421850671,
        banner: 'https://pksoftcdn.azureedge.net/media/1029x420_providerbanner_bggaming-202408261242208334.jpg'
    },
    { id: 'ct855', name: 'CT855', img: imgCopyOf200X200ProvidebannerCt8552024090210313059951, banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg' },
    { id: 'yeebet', name: 'Yee Bet', img: img200X200ProviderbannerYeebet2024112009250169211, banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg' },
    { id: 'allbet', name: 'AllBet', img: img200X200ProviderbannerAllbet2024120609214312891, banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg' },
];

export function LiveCasino() {
    const { t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProvider, setSelectedProvider] = useState<typeof providers[0] | null>(null);
    const normalizedSearch = searchQuery.trim().toLowerCase();

    const filteredProviders = providers.filter(p =>
        p.name.toLowerCase().includes(normalizedSearch)
    );

    return (
        <div className="flex flex-col gap-8 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500 bg-[#02040a]">

            {/* Hero Section */}
            <InsidePageHero image={imgLiveCasinoBanner} />

            {/* Simple Title Section */}
            <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6 pb-0">
                <h2 className={PAGE_ACCENT.liveCasino.pageTitleClass}>
                    {t('liveCasino')}
                </h2>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">

                {/* Search Bar */}
                <GameSearchBar value={searchQuery} onChange={setSearchQuery} accent="blue" className="mb-12" />

                {/* Providers Grid */}
                <div className="w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
                        {filteredProviders.map((provider) => (
                            <div
                                key={provider.id}
                                onClick={() => setSelectedProvider(provider)}
                                className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]"
                            >
                                <div
                                    className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500 bg-[#1a2536] group-hover:ring-[#39ff88]/30 group-hover:shadow-[0_0_30px_-5px_rgba(57,255,136,0.2)]"
                                >
                                    <img
                                        src={provider.img}
                                        alt={provider.name}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="w-12 h-12 rounded-full bg-[#39ff88] flex items-center justify-center shadow-[0_0_20px_rgba(57,255,136,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                            <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex flex-col gap-1 w-full px-1">
                                    <h3 className="text-white group-hover:text-[#39ff88] font-bold text-xs md:text-sm lg:text-base transition-colors truncate">
                                        {provider.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest truncate">Live Casino</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Game Modal */}
            <GameModal
                isOpen={!!selectedProvider}
                onClose={() => setSelectedProvider(null)}
                title={selectedProvider?.name || ''}
                bannerImage={selectedProvider?.banner || ''}
            />

        </div>
    );
}
