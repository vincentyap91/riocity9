import React from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { InsidePageHeader, PageNavItem } from '../components/shared/InsidePageHeader';
import { Fish, Anchor, Waves, Crosshair, Grid, ArrowRight } from 'lucide-react';
import { GameCarousel } from '../components/home/GameCarousel';
import { useLanguage } from '../contexts/LanguageContext';

// New Banner
import imgFishingBanner from "@/assets/71667b097dc0233c71967c40c7e2dc37f4fa9f8c.png";

// Re-using assets
import imgChickenPirate from "@/assets/9a1b3e7518d73d110198647fb78496c68bf98989.png"; // Placeholder
import imgFish1 from "@/assets/2947d765690866fed806f4ef749e66c8f9d99118.png"; // Placeholder

const fishingGames = [
  { id: 1, title: "Mega Fishing", provider: "JILI", image: imgFish1, tag: "Hot" },
  { id: 2, title: "Jackpot Fishing", provider: "JILI", image: imgChickenPirate, tag: "New" },
];

export function Fishing() {
  const { t } = useLanguage();
  const fishingNavItems: PageNavItem[] = [
      { id: 'all', label: t('allGamesLabel'), icon: Grid, isActive: true },
      { id: 'jili', label: t('jiliFishing'), icon: Fish },
      { id: 'cq9', label: t('cq9'), icon: Anchor },
      { id: 'spade', label: t('spadegaming'), icon: Waves },
      { id: 'shoot', label: t('shooting'), icon: Crosshair },
  ];
  return (
    <div className="flex flex-col gap-8 pb-24 flex-1 overflow-x-hidden bg-[#02040a]">
        
        {/* Hero Section */}
        <InsidePageHero image={imgFishingBanner} />

        {/* Header & Nav */}
        <div className="mt-[-20px] relative z-20">
            <InsidePageHeader title={t('fishingGamesTitle')} navItems={fishingNavItems} iconColor="text-cyan-500" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-[1200px] px-4 mt-4 mb-20">
            <GameCarousel 
                title={t('topFishingGames')} 
                icon={<Fish className="text-cyan-400 w-5 h-5" />}
                items={fishingGames}
                aspectRatio="aspect-video"
            />
        </div>
    </div>
  );
}
