import React, { useState } from "react";
import { InsidePageHero } from "../components/shared/InsidePageHero";
import { useLanguage } from "../contexts/LanguageContext";
import { EmptyState } from "../components/shared/EmptyState";
import { GAME_PAGE_LAYOUT, PAGE_ACCENT } from "../config/themeTokens";
import { GameSearchBar } from "../components/shared/GameSearchBar";
import { SlotsGameHoverOverlay } from "../components/shared/SlotsGameHoverOverlay";

const exchangeBanner = "https://pksoftcdn.azureedge.net/media/exchange_cricketsport-202502241408189099.jpg";

// Empty providers list for now
const exchangeProviders: any[] = [];

export function Exchange() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredProviders = exchangeProviders.filter((provider) =>
    provider.name.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="flex flex-col gap-8 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500 bg-[#02040a]">
        <InsidePageHero image={exchangeBanner} />

      {/* Simple Title Section */}
      <div className={GAME_PAGE_LAYOUT.titleSection}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="w-24 h-24 rounded-full bg-[#00bc7d] opacity-20 blur-[50px]"></div>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="w-24 h-24 rounded-full bg-[#00bc7d] opacity-20 blur-[50px]"></div>
        </div>

        <h2 className={PAGE_ACCENT.exchange.pageTitleClass}>
          {t("exchange")}
        </h2>
      </div>

      {/* Main Content Area */}
      <div className={GAME_PAGE_LAYOUT.contentContainer}>
        
        {/* Search Bar */}
        <GameSearchBar value={searchQuery} onChange={setSearchQuery} className={GAME_PAGE_LAYOUT.searchBarSpacing} />

        {/* Providers Grid or Empty State */}
        {exchangeProviders.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <EmptyState message="Oops! No data yet" />
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center py-20">
            <EmptyState message="No games found" />
          </div>
        ) : (
          <div className="w-full">
            <div className={GAME_PAGE_LAYOUT.cardGrid}>
              {filteredProviders.map((provider) => (
                <div key={provider.id} className={`${GAME_PAGE_LAYOUT.cardWrap} group cursor-pointer`}>
                  <div className="relative w-[214px] h-[214px] rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
                    <img
                      src={provider.img}
                      alt={provider.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <SlotsGameHoverOverlay />
                  </div>
                  <div className={GAME_PAGE_LAYOUT.cardTextBlock}>
                    <span className="text-sm font-bold text-white group-hover:text-emerald-500 transition-colors">
                      {provider.name}
                    </span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Exchange</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
