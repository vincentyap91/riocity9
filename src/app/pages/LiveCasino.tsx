import React, { useState } from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Figma Asset Imports
import imgKh168Marbula2Providericon200X200Px2025101310310355541 from "@/assets/f6a50bd7817f3011aaeb196648cadbe4a3ae53b3.png";

// New Banner
import imgLiveCasinoBanner from "@/assets/03eddcf1c2f25160add74dab60888b5e1fbcbf0c.png";

import imgGameplayLiveCasino2025120510392605481 from "@/assets/1b526547f23589a0effd96c6158392e2d6fb3935.png";
import imgVerygoodbet2025090815305832881 from "@/assets/e4f88b3752ff1601da28db10545c860015afa477.png";
import img200X200ProviderbannerAllbet2024120609214312891 from "@/assets/e7bffee978d2e07b7503abbca2bba3aa68d0f266.png";
import img200X200ProviderbannerYeebet2024112009250169211 from "@/assets/11b3a08ee3b214daab6882a4382a2db797b54ae5.png";
import imgCopyOf200X200ProvidebannerCt8552024090210313059951 from "@/assets/f63800b44ca9b6f3d38f0aac7dfd1f2ec040af43.png";
import img200X200ProviderbannerBiggaming2024082612421850671 from "@/assets/cb906b3bf03cc6acfcb7ea2ab7374623421bb8cc.png";
import img200X200ProviderbannerAfbcasino2024081510241738152024081512002860141 from "@/assets/8b952f4f8efc7ab9452d911891a11049cf045587.png";
import img200X200ProviderbannerWcasino2024081509230919411 from "@/assets/809fa51dd86ce47eaf28b331fe1d6bbd63e199cd.png";
import img200X200ProviderbannerSaGaming2024072516231037371 from "@/assets/f63292375b3d6510a02ecd0751e8fefb6c545a34.png";
import img200X200ProviderbannerSexybaccarat2024040909120601271 from "@/assets/0c18a14e6167ec42bcf217a4281816aa37029ff4.png";
import img32023122015043915551 from "@/assets/d962173d340d1f347cd214f08272d88852cf6e32.png";

const providers = [
  { id: 'pragmatic', name: 'Pragmatic Play Casino', img: img32023122015043915551 },
  { id: 'gameplay', name: 'GamePlay Casino', img: imgGameplayLiveCasino2025120510392605481 },
  { id: 'marbula', name: 'Marbula2', img: imgKh168Marbula2Providericon200X200Px2025101310310355541 },
  { id: 'verygood', name: 'Very Good Bet', img: imgVerygoodbet2025090815305832881 },
  { id: 'sexy', name: 'Sexy Baccarat', img: img200X200ProviderbannerSexybaccarat2024040909120601271 },
  { id: 'sagaming', name: 'SA Gaming', img: img200X200ProviderbannerSaGaming2024072516231037371 },
  { id: 'wcasino', name: 'WCasino', img: img200X200ProviderbannerWcasino2024081509230919411 },
  { id: 'afb', name: 'AFB Gaming Casino', img: img200X200ProviderbannerAfbcasino2024081510241738152024081512002860141 },
  { id: 'biggaming', name: 'Big Gaming', img: img200X200ProviderbannerBiggaming2024082612421850671 },
  { id: 'ct855', name: 'CT855', img: imgCopyOf200X200ProvidebannerCt8552024090210313059951 },
  { id: 'yeebet', name: 'Yee Bet', img: img200X200ProviderbannerYeebet2024112009250169211 },
  { id: 'allbet', name: 'AllBet', img: img200X200ProviderbannerAllbet2024120609214312891 },
];

export function LiveCasino() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="flex flex-col gap-8 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500 bg-[#02040a]">
      
      {/* Hero Section */}
      <InsidePageHero image={imgLiveCasinoBanner} />

      {/* Simple Title Section */}
      <div className="mt-[-20px] relative z-20 w-full flex flex-col items-center gap-6 py-6 pb-0">
          <h2 className="text-4xl md:text-5xl font-black text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              {t('liveCasino')}
          </h2>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-[1200px] px-4 relative z-10 pb-20 flex flex-col items-center">
        
        {/* Search Bar */}
        <div className="w-full max-w-5xl mb-12">
            <div className="relative">
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 bg-[#16202c] border border-transparent hover:border-white/10 focus:border-blue-500/50 rounded-full pl-6 pr-14 text-white placeholder:text-gray-500 transition-all outline-none"
                    placeholder={t("searchPlaceholder")}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600/20 rounded-full text-blue-400">
                    <Search className="w-5 h-5" />
                </div>
            </div>
        </div>

        {/* Providers Grid */}
        <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 justify-items-center">
            {providers.map((provider) => (
                <div key={provider.id} className="flex flex-col items-start gap-2 md:gap-3 group cursor-pointer w-full max-w-[214px]">
                    <div 
                        className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 transition-all duration-300 bg-[#1a2536]"
                    >
                        <img 
                            src={provider.img} 
                            alt={provider.name} 
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Hover Overlay from Screenshot */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                <ArrowRight className="w-6 h-6 text-black stroke-[3]" />
                            </div>
                        </div>
                    </div>
                    
                    {/* Provider Name */}
                    <div className="flex flex-col gap-1">
                        <span className="text-xs md:text-sm font-bold text-white group-hover:text-emerald-500 transition-colors">
                            {provider.name}
                        </span>
                        <span className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-wider">Live Casino</span>
                    </div>
                </div>
            ))}
        </div>
        </div>
      </div>

    </div>
  );
}
