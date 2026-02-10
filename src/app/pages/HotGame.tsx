import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { InsidePageHero } from "../components/shared/InsidePageHero";
import { PAGE_ACCENT } from "../config/themeTokens";
import { GameSearchBar } from "../components/shared/GameSearchBar";
import { LoginRequiredModal } from "../components/shared/LoginRequiredModal";

const HOT_GAMES_BANNER =
  "https://pksoftcdn.azureedge.net/media/cat_hotgames-202504100909086875.jpg";

// Hot games list (same structure as AllGame; replace with real hot games data)
const hotGamesList = [
  { id: "hot1", name: "Hot Game 1", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Slots", provider: "Slots" },
  { id: "hot2", name: "Hot Game 2", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Live Casino", provider: "Live Casino" },
  { id: "hot3", name: "Hot Game 3", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Poker", provider: "Poker" },
  { id: "hot4", name: "Hot Game 4", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Sports", provider: "Sports" },
  { id: "hot5", name: "Hot Game 5", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Fishing", provider: "Fishing" },
  { id: "hot6", name: "Hot Game 6", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Slots", provider: "Slots" },
  { id: "hot7", name: "Hot Game 7", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Live Casino", provider: "Live Casino" },
  { id: "hot8", name: "Hot Game 8", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Poker", provider: "Poker" },
  { id: "hot9", name: "Hot Game 9", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Sports", provider: "Sports" },
  { id: "hot10", name: "Hot Game 10", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Fishing", provider: "Fishing" },
  { id: "hot11", name: "Hot Game 11", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Slots", provider: "Slots" },
  { id: "hot12", name: "Hot Game 12", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Live Casino", provider: "Live Casino" },
  { id: "hot13", name: "Hot Game 13", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Poker", provider: "Poker" },
  { id: "hot14", name: "Hot Game 14", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Sports", provider: "Sports" },
  { id: "hot15", name: "Hot Game 15", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Fishing", provider: "Fishing" },
  { id: "hot16", name: "Hot Game 16", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Slots", provider: "Slots" },
  { id: "hot17", name: "Hot Game 17", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Live Casino", provider: "Live Casino" },
  { id: "hot18", name: "Hot Game 18", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Poker", provider: "Poker" },
  { id: "hot19", name: "Hot Game 19", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Sports", provider: "Sports" },
  { id: "hot20", name: "Hot Game 20", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Fishing", provider: "Fishing" },
];

export function HotGame() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredGames = hotGamesList.filter(
    (game) =>
      game.name.toLowerCase().includes(normalizedSearch) ||
      game.provider.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="flex flex-col gap-8 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500 bg-[#02040a]">
      <InsidePageHero image={HOT_GAMES_BANNER} />

      <div className="mt-0 md:mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6 pb-0">
        <h2 className={PAGE_ACCENT.hotGame.pageTitleClass}>
          {t("hotGames")}
        </h2>
      </div>

      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
        <GameSearchBar value={searchQuery} onChange={setSearchQuery} className="mb-12" />

        <div className="w-full">
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
        </div>
      </div>
      <LoginRequiredModal isOpen={showLoginModal} onOpenChange={setShowLoginModal} />
    </div>
  );
}
