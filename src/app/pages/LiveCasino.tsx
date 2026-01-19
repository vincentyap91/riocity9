import React from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { InsidePageHeader, PageNavItem } from '../components/shared/InsidePageHeader';
import { Search, Filter, Grid, CircleDollarSign, Dices, Spade, Heart, Tv } from 'lucide-react';

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

const liveNavItems: PageNavItem[] = [
    { id: 'lobby', label: 'Lobby', icon: Grid, isActive: true },
    { id: 'baccarat', label: 'Baccarat', icon: CircleDollarSign },
    { id: 'roulette', label: 'Roulette', icon: Dices },
    { id: 'blackjack', label: 'Blackjack', icon: Spade },
    { id: 'poker', label: 'Poker', icon: Heart },
    { id: 'gameshow', label: 'Game Show', icon: Tv },
];

export function LiveCasino() {
  return (
    <div className="flex flex-col gap-8 pb-24 md:pb-0 flex-1 overflow-x-hidden animate-in fade-in duration-500 bg-[#02040a]">
      
      {/* Hero Section */}
      <InsidePageHero image={imgLiveCasinoBanner} />

      {/* Header & Nav */}
      <div className="mt-[-20px] relative z-20">
            <InsidePageHeader title="Live Casino" navItems={liveNavItems} iconColor="text-blue-500" />
      </div>

      {/* Providers Grid */}
      <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mb-20 mt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
            {providers.map((provider) => (
                <div key={provider.id} className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div 
                        className="relative w-full aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 group-hover:ring-emerald-500/50 shadow-lg group-hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] transition-all duration-300"
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:to-emerald-500/20 transition-all duration-500"></div>

                        {/* Image */}
                        <img 
                            src={provider.img} 
                            alt={provider.name} 
                            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                    
                    {/* Provider Name */}
                    <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors text-center">
                        {provider.name}
                    </span>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
}
