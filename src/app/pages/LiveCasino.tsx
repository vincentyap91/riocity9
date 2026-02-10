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

import imgEzugiLiveCasino2025120510392605481 from "@/assets/ezugi_live casino-202601301129516752.png";
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
        id: 'ezugi',
        name: 'Ezugi',
        img: imgEzugiLiveCasino2025120510392605481,
        banner: 'https://pksoftcdn.azureedge.net/media/ezugi_cam88_providerbanner_1029pxx420px-202601301129537731.jpg',
        startGamePath: '/live-casino/ezugi-casino'
    },
    {
        id: 'pragmatic',
        name: 'Pragmatic Play Casino',
        img: img32023122015043915551,
        banner: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity_banner-202408051021306684.jpg',
        maintenance: true
    },
    {
        id: 'gameplay',
        name: 'GamePlay Casino',
        img: imgGameplayLiveCasino2025120510392605481,
        banner: 'https://pksoftcdn.azureedge.net/media/gameplay_cam88_providerbanner_1029pxx420px-202512051039282501.jpg',
        startGamePath: '/live-casino/gameplay-casino'
    },
    {
        id: 'marbula',
        name: 'Marbula2',
        img: imgKh168Marbula2Providericon200X200Px2025101310310355541,
        banner: 'https://pksoftcdn.azureedge.net/media/kh168_marbula2_providerbanner_200x200px-202510131031055962.jpg'
    },
    { id: 'verygood', name: 'Very Good Bet', img: imgVerygoodbet2025090815305832881, banner: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity_banner-202408051021306684.jpg' },
    { id: 'sexy', name: 'Sexy Baccarat', img: img200X200ProviderbannerSexybaccarat2024040909120601271, banner: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity_banner-202408051021306684.jpg' },
    { id: 'sagaming', name: 'SA Gaming', img: img200X200ProviderbannerSaGaming2024072516231037371, banner: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity_banner-202408051021306684.jpg' },
    { id: 'wcasino', name: 'WCasino', img: img200X200ProviderbannerWcasino2024081509230919411, banner: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity_banner-202408051021306684.jpg' },
    { id: 'afb', name: 'AFB Gaming Casino', img: img200X200ProviderbannerAfbcasino2024081510241738152024081512002860141, banner: 'https://pksoftcdn.azureedge.net/media/1029x420_providerbanner_afbcasino-202408151024208680-202408151200309656.jpg' },
    {
        id: 'biggaming',
        name: 'Big Gaming',
        img: img200X200ProviderbannerBiggaming2024082612421850671,
        banner: 'https://pksoftcdn.azureedge.net/media/1029x420_providerbanner_bggaming-202408261242208334.jpg'
    },
    { id: 'ct855', name: 'CT855', img: imgCopyOf200X200ProvidebannerCt8552024090210313059951, banner: 'https://pksoftcdn.azureedge.net/media/1029x420_providerbanner_ct855-202409021036566678.jpg' },
    { id: 'yeebet', name: 'Yee Bet', img: img200X200ProviderbannerYeebet2024112009250169211, banner: 'https://pksoftcdn.azureedge.net/media/placeholder_riocity_banner-202408051021306684.jpg' },
    { id: 'allbet', name: 'AllBet', img: img200X200ProviderbannerAllbet2024120609214312891, banner: 'https://pksoftcdn.azureedge.net/media/1029x420_providerbanner_allbet-202412060921461241.jpg' },
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
                                onClick={() => {
                                    if (provider.maintenance) return;
                                    setSelectedProvider(provider);
                                }}
                                className={`flex flex-col items-start gap-2 md:gap-3 group w-full max-w-[214px] ${provider.maintenance ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <div
                                    className={`relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500 bg-[#1a2536] ${provider.maintenance ? '' : 'group-hover:ring-[#39ff88]/30 group-hover:shadow-[0_0_30px_-5px_rgba(57,255,136,0.2)]'}`}
                                >
                                    <img
                                        src={provider.img}
                                        alt={provider.name}
                                        className={`w-full h-full object-cover transform transition-transform duration-700 ${provider.maintenance ? 'opacity-50 grayscale' : 'group-hover:scale-110'}`}
                                    />
                                    {provider.maintenance ? (
                                        <div className="absolute inset-0 bg-black/55 z-20 flex flex-col items-center justify-center gap-2 pointer-events-none">
                                            <svg className="h-10 w-10 fill-emerald-400 drop-shadow" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                                                <g clipPath="url(#clip0_1031_6568_live_casino)">
                                                    <path d="M148.878 18.7427C148.334 16.9377 146.058 16.3699 144.73 17.6977L136.061 26.3672H123.633V13.9389L132.303 5.26523C133.637 3.93047 133.058 1.6626 131.267 1.11797C128.813 0.372363 126.267 0.0541992 123.658 0.0541992C116.59 0.0541992 109.964 2.73779 104.99 7.72471C98.896 13.8144 96.1667 22.522 97.6772 31.0233L98.0806 33.2763L33.276 98.0807C30.6583 97.6128 29.0818 97.2694 26.4009 97.2694C19.4399 97.2694 12.6293 100.085 7.7197 104.99C0.790989 111.923 -1.65091 122.075 1.11648 131.257C1.66199 133.066 3.93367 133.633 5.26433 132.302L13.9344 123.633H26.4258V136.066L17.6953 144.737C16.362 146.069 16.9371 148.341 18.7333 148.886C21.1816 149.626 23.7243 150 26.3282 150C42.7409 150 55.2035 135.192 52.3221 118.976L51.9187 116.723L116.719 51.919C119.293 52.379 120.936 52.7332 123.594 52.7259C130.568 52.7259 137.374 49.9148 142.275 45.0097C149.209 38.0798 151.647 27.9305 148.878 18.7427Z"></path>
                                                    <path d="M143.576 112.489L112.755 81.9729C110.699 79.9204 108.143 78.3135 105.343 77.1926L76.9005 105.635C78.0211 108.436 79.6295 110.994 81.6841 113.052L112.501 143.564C121.066 152.13 134.97 152.161 143.576 143.564C152.142 134.994 152.142 121.055 143.576 112.489ZM131.049 131.037C129.332 132.754 126.551 132.754 124.835 131.037L103.241 109.748C101.524 108.031 101.524 105.25 103.241 103.534C104.957 101.817 107.738 101.817 109.455 103.534L131.049 124.823C132.765 126.54 132.765 129.32 131.049 131.037Z"></path>
                                                    <path d="M37.5822 25.1538L37.5757 25.1558L41.539 21.1925C42.6877 20.0426 42.4463 18.1251 41.0583 17.2925L14.2299 0.62641C12.5011 -0.410992 10.2878 -0.138531 8.86246 1.28735L1.28746 8.86235C-0.139008 10.2888 -0.410883 12.5031 0.627692 14.2322L17.3052 41.0476C18.1408 42.4374 20.0632 42.6692 21.2046 41.5266L25.1518 37.58L53.2507 65.6789L65.6791 53.2506L37.5822 25.1538Z"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1031_6568_live_casino">
                                                        <rect width="150" height="150" fill="white"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-[#39ff88] flex items-center justify-center shadow-[0_0_20px_rgba(57,255,136,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                                <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                                            </div>
                                        </div>
                                    )}
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
                startGamePath={selectedProvider?.startGamePath}
            />

        </div>
    );
}
