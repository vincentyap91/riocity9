import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { InnerPageLayout } from "../components/shared/InnerPageLayout";
import { GAME_PAGE_LAYOUT, PAGE_ACCENT } from "../config/themeTokens";
import { GameSearchBar } from "../components/shared/GameSearchBar";
import { LoginRequiredModal } from "../components/shared/LoginRequiredModal";
import { SlotsGameHoverOverlay } from "../components/shared/SlotsGameHoverOverlay";

// Placeholder data - you can replace this with actual recent games data
const recentGames = [
  {
    id: "game1",
    name: "Game 1",
    img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png",
    category: "Slots",
    provider: "Slots",
  },
  {
    id: "game2",
    name: "Game 2",
    img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png",
    category: "Live Casino",
    provider: "Live Casino",
  },
  {
    id: "game3",
    name: "Game 3",
    img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png",
    category: "Poker",
    provider: "Poker",
  },
  {
    id: "game4",
    name: "Game 4",
    img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png",
    category: "Sports",
    provider: "Sports",
  },
  {
    id: "game5",
    name: "Game 5",
    img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png",
    category: "Fishing",
    provider: "Fishing",
  },
];

export function RecentGame() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  // Filter games based on search query
  const filteredGames = recentGames.filter(game =>
    game.name.toLowerCase().includes(normalizedSearch) ||
    game.provider.toLowerCase().includes(normalizedSearch)
  );

  return (
    <InnerPageLayout>
      <div className="flex flex-col gap-8 pt-10 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500">
        {/* Simple Title Section */}
        <div className={GAME_PAGE_LAYOUT.titleSection}>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="w-24 h-24 rounded-full bg-[#00bc7d] opacity-20 blur-[50px]"></div>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="w-24 h-24 rounded-full bg-[#00bc7d] opacity-20 blur-[50px]"></div>
          </div>

          <h2 className={PAGE_ACCENT.recentGame.pageTitleClass}>
            Recent Games
          </h2>
        </div>

        {/* Main Content Area */}
        <div className={GAME_PAGE_LAYOUT.contentContainer}>
          {/* Search Bar */}
          <GameSearchBar value={searchQuery} onChange={setSearchQuery} className={GAME_PAGE_LAYOUT.searchBarSpacing} />

          {/* Games Grid - same grid and spacing as Slots / LiveCasino */}
          <div className="w-full">
            <div className={GAME_PAGE_LAYOUT.cardGrid}>
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className={`${GAME_PAGE_LAYOUT.cardWrap} group cursor-pointer`}
                  onClick={() => {
                    if (isAuthenticated) return;
                    sessionStorage.setItem('redirectAfterLogin', `${location.pathname}${location.search}`);
                    setShowLoginModal(true);
                  }}
                >
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
                    <img
                      src={game.img}
                      alt={game.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <SlotsGameHoverOverlay />
                  </div>
                  <div className={GAME_PAGE_LAYOUT.cardTextBlock}>
                    <span className="text-white group-hover:text-emerald-500 font-bold text-xs md:text-sm transition-colors">
                      {game.name}
                    </span>
                    <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                      {game.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <LoginRequiredModal isOpen={showLoginModal} onOpenChange={setShowLoginModal} />
    </InnerPageLayout>
  );
}
