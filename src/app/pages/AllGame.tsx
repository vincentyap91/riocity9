import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { InsidePageHero } from "../components/shared/InsidePageHero";
import { PAGE_ACCENT } from "../config/themeTokens";
import { GameSearchBar } from "../components/shared/GameSearchBar";
import { LoginRequiredModal } from "../components/shared/LoginRequiredModal";

const ALL_GAMES_BANNER =
  "https://pksoftcdn.azureedge.net/media/all-202406141221396060-202412171030459189.jpg";

// All games list (expand with real data as needed)
const allGames = [
  { id: "game1", name: "Game 1", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Slots", provider: "V8 Poker" },
  { id: "game2", name: "Game 2", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Live Casino", provider: "Kaiyuan" },
  { id: "game3", name: "Game 3", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Poker", provider: "1G Poker" },
  { id: "game4", name: "Game 4", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Sports", provider: "MPoker" },
  { id: "game5", name: "Game 5", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Fishing", provider: "V8 Poker" },
  { id: "game6", name: "Game 6", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Slots", provider: "Kaiyuan" },
  { id: "game7", name: "Game 7", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Live Casino", provider: "1G Poker" },
  { id: "game8", name: "Game 8", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Poker", provider: "MPoker" },
  { id: "game9", name: "Game 9", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Sports", provider: "V8 Poker" },
  { id: "game10", name: "Game 10", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Fishing", provider: "Kaiyuan" },
  { id: "game11", name: "Game 11", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Slots", provider: "1G Poker" },
  { id: "game12", name: "Game 12", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Live Casino", provider: "MPoker" },
  { id: "game13", name: "Game 13", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Poker", provider: "V8 Poker" },
  { id: "game14", name: "Game 14", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Sports", provider: "Kaiyuan" },
  { id: "game15", name: "Game 15", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Fishing", provider: "1G Poker" },
  { id: "game16", name: "Game 16", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Slots", provider: "MPoker" },
  { id: "game17", name: "Game 17", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Live Casino", provider: "V8 Poker" },
  { id: "game18", name: "Game 18", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Poker", provider: "Kaiyuan" },
  { id: "game19", name: "Game 19", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Sports", provider: "1G Poker" },
  { id: "game20", name: "Game 20", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Fishing", provider: "MPoker" },
];

export function AllGame() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredGames = allGames.filter(
    (game) =>
      game.name.toLowerCase().includes(normalizedSearch) ||
      game.provider.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="flex flex-col gap-8 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500 bg-[#02040a]">
      {/* Top banner (left-right gradient is in InsidePageHero) */}
      <InsidePageHero image={ALL_GAMES_BANNER} />

      {/* Title section – color from banner (gold) */}
      <div className="mt-0 md:mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6 pb-0">
        <h2 className={PAGE_ACCENT.allGame.pageTitleClass}>
          {t("allGamesLabel")}
        </h2>
      </div>

      {/* Main content - same as Poker: search + grid */}
      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
        <GameSearchBar value={searchQuery} onChange={setSearchQuery} className="mb-12" />

        {/* Grid - same as Poker */}
        <div className="w-full">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]"
                  onClick={() => {
                    if (isAuthenticated) return;
                    sessionStorage.setItem('redirectAfterLogin', `${location.pathname}${location.search}`);
                    setShowLoginModal(true);
                  }}
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/5 transition-all duration-300 bg-[#0f1923] hover:border-white/10">
                    <img
                      src={game.img}
                      alt={game.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs md:text-sm font-bold text-white transition-colors">
                      {game.name}
                    </span>
                    <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                      {game.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full py-10 text-center text-gray-400">No games found</div>
          )}
        </div>
      </div>
      <LoginRequiredModal isOpen={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}
