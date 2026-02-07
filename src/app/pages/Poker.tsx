import React, { useState } from "react";
import { InsidePageHero } from "../components/shared/InsidePageHero";
import { useLanguage } from "../contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { PAGE_ACCENT } from "../config/themeTokens";
import { GameSearchBar } from "../components/shared/GameSearchBar";

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
  const [searchQuery, setSearchQuery] = useState('');
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredProviders = pokerProviders.filter((provider) =>
    provider.name.toLowerCase().includes(normalizedSearch)
  );

  return (
    <div className="flex flex-col gap-8 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500 bg-[#02040a]">
        <InsidePageHero image={pokerBanner} />

      {/* Simple Title Section – color from provider / banner */}
      <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6 pb-0">
        <h2 className={PAGE_ACCENT.poker.pageTitleClass}>
          {t("poker")}
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
        
        {/* Search Bar */}
        <GameSearchBar value={searchQuery} onChange={setSearchQuery} className="mb-12" />

        {/* Providers Grid */}
        <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
                <img
                  src={provider.img}
                  alt={provider.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay from Screenshot */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#00bc7d] flex items-center justify-center shadow-[0_0_20px_rgba(0,188,125,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
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
    </div>
  );
}
