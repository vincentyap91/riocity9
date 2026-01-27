import React, { useState } from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Banner
import imgLotteryBanner from "@/assets/b18479f8e5e33aa224b895a9f36e7daacafa6f8b.png";

// First provider (Gameplay) – game assets
import imgKeno from "@/assets/c3e1f6dd2540a448e576e508365a39b42c0f9233.png";
import imgLucky6 from "@/assets/6018f5c05dbb4a11b804de6d1749571ae91ebb42.png";

const PROVIDER_GAMEPLAY_LOGO = "https://pksoftcdn.azureedge.net/media/gameplay-202511180733318039.png";
const PROVIDER_93CONNECT_LOGO = "https://riocity-cdn.azureedge.net/riocity/93connect-202402021532267517.png";
const EMPTY_STATE_IMAGE = "https://pksoftcdn.azureedge.net/media/placeholder_riocity-202408050928489215.jpg";

interface LotteryGame {
  id: number;
  title: string;
  image: string;
  provider?: string;
  provider_logo?: string;
}

const lotteryGames: LotteryGame[] = [
  { id: 1, title: "Keno Deluxe", image: imgKeno, provider: "Gameplay", provider_logo: PROVIDER_GAMEPLAY_LOGO },
  { id: 2, title: "Lucky 6", image: imgLucky6, provider: "Gameplay", provider_logo: PROVIDER_GAMEPLAY_LOGO },
  { id: 3, title: "2DLS", image: "https://pksoftcdn.azureedge.net/media/2dls_gameicon_200x200_en-202410231417234604.png", provider: "93Connect", provider_logo: PROVIDER_93CONNECT_LOGO },
  { id: 4, title: "7 Up 7 Down", image: "https://pksoftcdn.azureedge.net/media/7up7down_gamebanner_200x200_en_vn-202410231418075809.png", provider: "93Connect", provider_logo: PROVIDER_93CONNECT_LOGO },
  { id: 5, title: "Atom", image: "https://pksoftcdn.azureedge.net/media/atom_gameicon_en_200x200-202410231418460629.png", provider: "93Connect", provider_logo: PROVIDER_93CONNECT_LOGO },
  { id: 6, title: "Atom War", image: "https://pksoftcdn.azureedge.net/media/atomwar_gameicon_en_200x200-202410231419158717.png", provider: "93Connect", provider_logo: PROVIDER_93CONNECT_LOGO },
  { id: 7, title: "Dice", image: "https://pksoftcdn.azureedge.net/media/download-202410231420078860.png", provider: "93Connect", provider_logo: PROVIDER_93CONNECT_LOGO },
  { id: 8, title: "Bounty Dice", image: "https://pksoftcdn.azureedge.net/media/bountydice_gameicon_200x200_en-202410231420410546.png", provider: "93Connect", provider_logo: PROVIDER_93CONNECT_LOGO },
  { id: 9, title: "DD", image: "https://pksoftcdn.azureedge.net/media/dd_gameicon_200x200_en_id-202410231421225002.png", provider: "93Connect", provider_logo: PROVIDER_93CONNECT_LOGO },
];

export function Lottery() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Filter games by search and provider
  const filteredGames = lotteryGames.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProvider = !selectedProvider || game.provider === selectedProvider;
    return matchesSearch && matchesProvider;
  });

  // Extract unique providers from games
  const uniqueProviders = Array.from(
    new Set(lotteryGames.map((g) => g.provider).filter(Boolean))
  ).map((name, index) => ({
    id: index + 1,
    name: name || 'Unknown',
    image: lotteryGames.find((g) => g.provider === name)?.provider_logo || '',
    active: selectedProvider === name,
  }));

  return (
    <div className="flex flex-col flex-1 bg-[#02040a] min-h-screen overflow-x-hidden">
        
        {/* Hero Section */}
        <InsidePageHero image={imgLotteryBanner} />

        {/* Simple Title Section */}
        <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6">
            <h2 className="text-4xl font-bold tracking-tight text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                {t('lotteryKenoTitle')}
            </h2>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">

            {/* Provider Navigation */}
            {uniqueProviders.length > 0 && (
              <div className="w-full max-w-5xl bg-[#0f1923]/80 backdrop-blur-md border border-white/5 rounded-xl p-2.5 mb-6">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <div
                      onClick={() => setSelectedProvider(null)}
                      className={`
                        relative shrink-0 h-[60px] w-[140px] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300
                        ${!selectedProvider
                            ? 'bg-purple-500/5 border border-purple-500'
                            : 'bg-[#16202c] border border-transparent hover:bg-[#1e2a38]'
                        }
                      `}
                    >
                      <span className="text-white font-bold text-sm">All</span>
                    </div>
                    {uniqueProviders.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => setSelectedProvider(p.name === selectedProvider ? null : p.name)}
                            className={`
                            relative shrink-0 h-[60px] w-[140px] rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300
                            ${p.active
                                    ? 'bg-purple-500/5 border border-purple-500'
                                    : 'bg-[#16202c] border border-transparent hover:bg-[#1e2a38]'
                                }
                        `}
                        >
                            {p.image ? (
                              <img src={p.image} alt={p.name} className="h-8 w-auto object-contain max-w-[80%]" />
                            ) : (
                              <span className="text-white font-bold text-xs">{p.name}</span>
                            )}
                        </div>
                    ))}
                </div>
              </div>
            )}

            {/* Search Bar */}
            <div className="w-full max-w-5xl mb-12">
                <div className="relative">
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-14 bg-[#16202c] border border-transparent hover:border-white/10 focus:border-purple-500/50 rounded-full pl-6 pr-14 text-white placeholder:text-gray-500 transition-all outline-none"
                        placeholder={t("searchPlaceholder")}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-600/20 rounded-full text-purple-400">
                        <Search className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Game Grid */}
            {filteredGames.length > 0 ? (
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
                    {filteredGames.map((game) => (
                        <div key={game.id} className="flex flex-col items-start gap-3 group cursor-pointer">
                            <div 
                                className="relative w-[214px] h-[214px] rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500 bg-[#1a2536] group-hover:ring-purple-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.2)]"
                            >
                                <img 
                                    src={game.image} 
                                    alt={game.title} 
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" 
                                />

                                {/* Provider Logo Overlay */}
                                {game.provider_logo && (
                                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1.5">
                                    <img 
                                      src={game.provider_logo} 
                                      alt={game.provider} 
                                      className="h-4 w-auto object-contain max-w-[60px]" 
                                    />
                                  </div>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                        <ArrowRight className="w-6 h-6 text-white stroke-[3]" />
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col gap-2 mt-2 w-full">
                                <h3 className="text-white group-hover:text-purple-500 font-bold text-base transition-colors w-full px-0.5">
                                    {game.title}
                                </h3>
                                
                                {/* Provider Badge */}
                                {game.provider && (
                                  <div className="flex items-center gap-2 bg-purple-500/10 rounded-xl px-3 py-1.5 w-fit border border-purple-500/20 shadow-[0_0_15px_-5px_rgba(168,85,247,0.1)]">
                                    <span className="text-purple-400 font-black text-[12px] tracking-tight">
                                        {game.provider}
                                    </span>
                                  </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center py-20">
                <img src={EMPTY_STATE_IMAGE} alt="" className="w-48 h-48 object-contain mb-4 opacity-80" />
                <div className="text-gray-500 text-lg font-bold">No games found</div>
              </div>
            )}

        </div>
    </div>
  );
}
