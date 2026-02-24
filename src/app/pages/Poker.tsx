import React, { useState } from "react";
import { InsidePageHero } from "../components/shared/InsidePageHero";
import { useLanguage } from "../contexts/LanguageContext";
import { GAME_PAGE_LAYOUT, PAGE_ACCENT } from "../config/themeTokens";
import { GameSearchBar } from "../components/shared/GameSearchBar";
import { useAuth } from "../contexts/AuthContext";
import { LoginRequiredModal } from "../components/shared/LoginRequiredModal";
import { SlotsGameHoverOverlay } from "../components/shared/SlotsGameHoverOverlay";

const pokerBanner = "https://pksoftcdn.azureedge.net/media/poker%27-202502241408444412.jpg";

const pokerProviders = [
  {
    id: "v8poker",
    name: "V8Poker",
    img: "https://pksoftcdn.azureedge.net/media/v8poker_poker-202601191517288267.png",
  },
  {
    id: "kaiyuan",
    name: "Kai Yuan",
    img: "https://pksoftcdn.azureedge.net/media/kaiyuan-202504210825061750.png",
  },
  {
    id: "1gaming",
    name: "1Gaming",
    img: "https://pksoftcdn.azureedge.net/media/1g%20poker-202502191628300100.png",
  },
  {
    id: "mpoker",
    name: "MPoker",
    img: "https://pksoftcdn.azureedge.net/media/mpoker-202503111448116128.png",
  },
];

export function Poker() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredProviders = pokerProviders.filter((provider) =>
    provider.name.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="flex flex-col gap-8 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500 bg-[#02040a]">
        <InsidePageHero image={pokerBanner} />

      {/* Simple Title Section – color from provider / banner */}
      <div className={GAME_PAGE_LAYOUT.titleSection}>
        <h2 className={PAGE_ACCENT.poker.pageTitleClass}>
          {t("poker")}
        </h2>
      </div>

      {/* Main Content Area */}
      <div className={GAME_PAGE_LAYOUT.contentContainer}>
        
        {/* Search Bar */}
        <GameSearchBar value={searchQuery} onChange={setSearchQuery} className={GAME_PAGE_LAYOUT.searchBarSpacing} />

        {/* Providers Grid */}
        <div className="w-full">
        <div className={GAME_PAGE_LAYOUT.cardGrid}>
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              onClick={() => {
                if (!isAuthenticated) setShowLoginModal(true);
              }}
              className={`${GAME_PAGE_LAYOUT.cardWrap} group cursor-pointer`}
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
                <img
                  src={provider.img}
                  alt={provider.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay from Screenshot */}
                <SlotsGameHoverOverlay />
              </div>
              <div className={GAME_PAGE_LAYOUT.cardTextBlock}>
                <span className="text-xs md:text-sm font-bold text-white group-hover:text-emerald-500 transition-colors">
                  {provider.name}
                </span>
                <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-wider">Poker</span>
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
