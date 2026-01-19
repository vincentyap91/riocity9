import React from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { InsidePageHeader, PageNavItem } from '../components/shared/InsidePageHeader';
import { Fish, Anchor, Waves, Crosshair, Grid } from 'lucide-react';
import { GameCarousel } from '../components/home/GameCarousel';

// New Banner
import imgFishingBanner from "@/assets/71667b097dc0233c71967c40c7e2dc37f4fa9f8c.png";

// Re-using assets
import imgChickenPirate from "@/assets/9a1b3e7518d73d110198647fb78496c68bf98989.png"; // Placeholder
import imgFish1 from "@/assets/2947d765690866fed806f4ef749e66c8f9d99118.png"; // Placeholder

const fishingNavItems: PageNavItem[] = [
    { id: 'all', label: 'All Games', icon: Grid, isActive: true },
    { id: 'jili', label: 'JILI Fishing', icon: Fish },
    { id: 'cq9', label: 'CQ9', icon: Anchor },
    { id: 'spade', label: 'Spadegaming', icon: Waves },
    { id: 'shoot', label: 'Shooting', icon: Crosshair },
];

const fishingGames = [
  { id: 1, title: "Mega Fishing", provider: "JILI", image: imgFish1, tag: "Hot" },
  { id: 2, title: "Jackpot Fishing", provider: "JILI", image: imgChickenPirate, tag: "New" },
];

export function Fishing() {
  return (
    <div className="flex flex-col gap-8 pb-24 flex-1 overflow-x-hidden bg-[#02040a]">
        
        {/* Hero Section */}
        <InsidePageHero image={imgFishingBanner} />

        {/* Header & Nav */}
        <div className="mt-[-20px] relative z-20">
            <InsidePageHeader title="Fishing Games" navItems={fishingNavItems} iconColor="text-cyan-500" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-[1200px] 2xl:max-w-[1536px] px-4 mt-4">
            <GameCarousel 
                title="Top Fishing Games" 
                icon={<Fish className="text-cyan-400 w-5 h-5" />}
                items={fishingGames}
                aspectRatio="aspect-video"
            />
             <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="aspect-[16/10] bg-[#1a2536] rounded-xl border border-white/5 animate-pulse"></div>
                ))}
            </div>
        </div>
    </div>
  );
}
