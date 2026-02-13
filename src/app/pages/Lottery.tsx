import React, { useState } from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { useLanguage } from '../contexts/LanguageContext';
import { PAGE_ACCENT } from '../config/themeTokens';
import { EmptyState } from '../components/shared/EmptyState';
import { GameSearchBar } from '../components/shared/GameSearchBar';
import { useAuth } from '../contexts/AuthContext';
import { LoginRequiredModal } from '../components/shared/LoginRequiredModal';
import { SlotsGameHoverOverlay } from '../components/shared/SlotsGameHoverOverlay';

// Banner
import imgLotteryBanner from "@/assets/b18479f8e5e33aa224b895a9f36e7daacafa6f8b.png";

// First provider (Gameplay) – game assets
import imgKeno from "@/assets/c3e1f6dd2540a448e576e508365a39b42c0f9233.png";
import imgLucky6 from "@/assets/6018f5c05dbb4a11b804de6d1749571ae91ebb42.png";

const PROVIDER_GAMEPLAY_LOGO = "https://pksoftcdn.azureedge.net/media/gameplay-202511180733318039.png";
const PROVIDER_93CONNECT_LOGO = "https://riocity-cdn.azureedge.net/riocity/93connect-202402021532267517.png";

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
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const normalizedSearch = searchQuery.trim().toLowerCase();

  // Filter games by search and provider
  const filteredGames = lotteryGames.filter((game) => {
    const providerName = game.provider?.toLowerCase() ?? '';
    const matchesSearch =
      game.title.toLowerCase().includes(normalizedSearch) ||
      providerName.includes(normalizedSearch);
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

      {/* Simple Title Section – color from provider / banner */}
      <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6">
        <h2 className={PAGE_ACCENT.lottery.pageTitleClass}>
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
        <GameSearchBar value={searchQuery} onChange={setSearchQuery} accent="purple" className="mb-12" />

        {/* Game Grid – same layout as Fishing page */}
        {filteredGames.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => {
                    if (!isAuthenticated) setShowLoginModal(true);
                  }}
                  className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]"
                >
                  <div
                    className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-500 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]"
                  >
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Hover Overlay – same as Fishing */}
                    <SlotsGameHoverOverlay />
                  </div>

                  {/* Content – same as Fishing: title + provider line */}
                  <div className="flex flex-col gap-1 mt-1 md:mt-2 w-full">
                    <h3 className="text-white group-hover:text-emerald-500 font-bold text-xs md:text-sm lg:text-base transition-colors w-full px-0.5">
                      {game.title}
                    </h3>
                    {game.provider && (
                      <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-wider">{game.provider}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <EmptyState message="No games found" />
          </div>
        )}

      </div>
      <LoginRequiredModal isOpen={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}
