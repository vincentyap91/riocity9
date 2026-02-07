import React, { useState } from "react";
import { InsidePageHero } from "../components/shared/InsidePageHero";
import { useLanguage } from "../contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { EmptyState } from "../components/shared/EmptyState";
import { PAGE_ACCENT } from "../config/themeTokens";
import { GameSearchBar } from "../components/shared/GameSearchBar";

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
      <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6 pb-0">
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
      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
        
        {/* Search Bar */}
        <GameSearchBar value={searchQuery} onChange={setSearchQuery} className="mb-12" />

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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="flex flex-col items-start gap-3 group cursor-pointer">
                  <div className="relative w-[214px] h-[214px] rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 bg-[#1a2536] group-hover:ring-emerald-500/30 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]">
                    <img
                      src={provider.img}
                      alt={provider.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#00bc7d] flex items-center justify-center shadow-[0_0_20px_rgba(0,188,125,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
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
