import React from 'react';
import { InsidePageHero } from '../components/shared/InsidePageHero';
import { InsidePageHeader, PageNavItem } from '../components/shared/InsidePageHeader';
import { Ticket, Hash, Clock, Grid, ArrowRight } from 'lucide-react';
import { GameCarousel } from '../components/home/GameCarousel';
import { useLanguage } from '../contexts/LanguageContext';

// Re-using assets
import imgKeno from "@/assets/c3e1f6dd2540a448e576e508365a39b42c0f9233.png";
import imgLucky6 from "@/assets/6018f5c05dbb4a11b804de6d1749571ae91ebb42.png";

// New Banner
import imgLotteryBanner from "@/assets/b18479f8e5e33aa224b895a9f36e7daacafa6f8b.png";

const lotteryGames = [
  { id: 1, title: "Keno Deluxe", provider: "TVBET", image: imgKeno, tag: "Live" },
  { id: 2, title: "Lucky 6", provider: "TVBET", image: imgLucky6 },
];

export function Lottery() {
  const { t } = useLanguage();
  const lotteryNavItems: PageNavItem[] = [
      { id: 'all', label: t('allLottery'), icon: Grid, isActive: true },
      { id: 'keno', label: t('keno'), icon: Hash },
      { id: 'lotto', label: t('lotto'), icon: Ticket },
      { id: 'fast', label: t('fastDraws'), icon: Clock },
  ];
  return (
    <div className="flex flex-col gap-8 pb-24 flex-1 overflow-x-hidden bg-[#02040a]">
        
        {/* Hero Section */}
        <InsidePageHero image={imgLotteryBanner} />

        {/* Header & Nav */}
        <div className="mt-[-20px] relative z-20">
            <InsidePageHeader title={t('lotteryKenoTitle')} navItems={lotteryNavItems} iconColor="text-purple-500" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-[1200px] px-4 mt-4 mb-20">
            <GameCarousel 
                title={t('featuredDraws')} 
                icon={<Ticket className="text-purple-400 w-5 h-5" />}
                items={lotteryGames}
                aspectRatio="aspect-video"
            />

            <div className="mt-12 flex flex-col gap-4">
                <div className="bg-[#1a2536] border border-white/5 rounded-2xl p-6 flex items-center justify-between">
                    <div>
                        <div className="text-purple-400 font-bold mb-1">{t('nextDraw')}: Keno 24/7</div>
                        <div className="text-3xl font-black text-white">00:04:32</div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold">
                        {t('betNow')}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}
