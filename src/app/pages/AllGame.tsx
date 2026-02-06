import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ArrowRight, Search } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { InsidePageHero } from "../components/shared/InsidePageHero";
import { sanitizeTextInput } from "../utils/security";
import { PAGE_ACCENT } from "../config/themeTokens";

const ALL_GAMES_BANNER =
  "https://pksoftcdn.azureedge.net/media/all-202406141221396060-202412171030459189.jpg";

// All games list (expand with real data as needed)
const allGames = [
  { id: "game1", name: "Game 1", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Slots" },
  { id: "game2", name: "Game 2", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Live Casino" },
  { id: "game3", name: "Game 3", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Poker" },
  { id: "game4", name: "Game 4", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Sports" },
  { id: "game5", name: "Game 5", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Fishing" },
  { id: "game6", name: "Game 6", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Slots" },
  { id: "game7", name: "Game 7", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Live Casino" },
  { id: "game8", name: "Game 8", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Poker" },
  { id: "game9", name: "Game 9", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Sports" },
  { id: "game10", name: "Game 10", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Fishing" },
  { id: "game11", name: "Game 11", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Slots" },
  { id: "game12", name: "Game 12", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Live Casino" },
  { id: "game13", name: "Game 13", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Poker" },
  { id: "game14", name: "Game 14", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Sports" },
  { id: "game15", name: "Game 15", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Fishing" },
  { id: "game16", name: "Game 16", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Slots" },
  { id: "game17", name: "Game 17", img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png", category: "Live Casino" },
  { id: "game18", name: "Game 18", img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png", category: "Poker" },
  { id: "game19", name: "Game 19", img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png", category: "Sports" },
  { id: "game20", name: "Game 20", img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png", category: "Fishing" },
];

export function AllGame() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const filteredGames = allGames.filter(
    (game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.category.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="w-full max-w-5xl mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(sanitizeTextInput(e.target.value).slice(0, 50))
              }
              maxLength={50}
              className="w-full h-14 bg-[#16202c] border border-transparent hover:border-white/10 focus:border-[#00bc7d]/50 rounded-full pl-6 pr-14 text-white placeholder:text-gray-500 transition-all outline-none"
              placeholder={t("searchPlaceholder")}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600/20 rounded-full text-emerald-400">
              <Search className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Grid - same as Poker */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]"
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
    </div>
  );
}
